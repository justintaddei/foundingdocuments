(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var observable = createCommonjsModule(function (module, exports) {
	(function(window, undefined$1) {var observable = function(el) {

	  /**
	   * Extend the original object or create a new empty one
	   * @type { Object }
	   */

	  el = el || {};

	  /**
	   * Private variables
	   */
	  var callbacks = {},
	    slice = Array.prototype.slice;

	  /**
	   * Public Api
	   */

	  // extend the el object adding the observable methods
	  Object.defineProperties(el, {
	    /**
	     * Listen to the given `event` ands
	     * execute the `callback` each time an event is triggered.
	     * @param  { String } event - event id
	     * @param  { Function } fn - callback function
	     * @returns { Object } el
	     */
	    on: {
	      value: function(event, fn) {
	        if (typeof fn == 'function')
	          (callbacks[event] = callbacks[event] || []).push(fn);
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Removes the given `event` listeners
	     * @param   { String } event - event id
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    off: {
	      value: function(event, fn) {
	        if (event == '*' && !fn) callbacks = {};
	        else {
	          if (fn) {
	            var arr = callbacks[event];
	            for (var i = 0, cb; cb = arr && arr[i]; ++i) {
	              if (cb == fn) arr.splice(i--, 1);
	            }
	          } else delete callbacks[event];
	        }
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Listen to the given `event` and
	     * execute the `callback` at most once
	     * @param   { String } event - event id
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    one: {
	      value: function(event, fn) {
	        function on() {
	          el.off(event, on);
	          fn.apply(el, arguments);
	        }
	        return el.on(event, on)
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Execute all callback functions that listen to
	     * the given `event`
	     * @param   { String } event - event id
	     * @returns { Object } el
	     */
	    trigger: {
	      value: function(event) {

	        // getting the arguments
	        var arglen = arguments.length - 1,
	          args = new Array(arglen),
	          fns,
	          fn,
	          i;

	        for (i = 0; i < arglen; i++) {
	          args[i] = arguments[i + 1]; // skip first argument
	        }

	        fns = slice.call(callbacks[event] || [], 0);

	        for (i = 0; fn = fns[i]; ++i) {
	          fn.apply(el, args);
	        }

	        if (callbacks['*'] && event != '*')
	          el.trigger.apply(el, ['*', event].concat(args));

	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    }
	  });

	  return el

	};
	  /* istanbul ignore next */
	  // support CommonJS, AMD & browser
	  module.exports = observable;

	})(typeof window != 'undefined' ? window : undefined);
	});

	/**
	 * Simple client-side router
	 * @module riot-route
	 */

	var RE_ORIGIN = /^.+?\/\/+[^/]+/,
	  EVENT_LISTENER = 'EventListener',
	  REMOVE_EVENT_LISTENER = 'remove' + EVENT_LISTENER,
	  ADD_EVENT_LISTENER = 'add' + EVENT_LISTENER,
	  HAS_ATTRIBUTE = 'hasAttribute',
	  POPSTATE = 'popstate',
	  HASHCHANGE = 'hashchange',
	  TRIGGER = 'trigger',
	  MAX_EMIT_STACK_LEVEL = 3,
	  win = typeof window != 'undefined' && window,
	  doc = typeof document != 'undefined' && document,
	  hist = win && history,
	  loc = win && (hist.location || win.location), // see html5-history-api
	  prot = Router.prototype, // to minify more
	  clickEvent = doc && doc.ontouchstart ? 'touchstart' : 'click',
	  central = observable();

	var
	  started = false,
	  routeFound = false,
	  debouncedEmit,
	  current,
	  parser,
	  secondParser,
	  emitStack = [],
	  emitStackLevel = 0;

	/**
	 * Default parser. You can replace it via router.parser method.
	 * @param {string} path - current path (normalized)
	 * @returns {array} array
	 */
	function DEFAULT_PARSER(path) {
	  return path.split(/[/?#]/)
	}

	/**
	 * Default parser (second). You can replace it via router.parser method.
	 * @param {string} path - current path (normalized)
	 * @param {string} filter - filter string (normalized)
	 * @returns {array} array
	 */
	function DEFAULT_SECOND_PARSER(path, filter) {
	  var f = filter
	    .replace(/\?/g, '\\?')
	    .replace(/\*/g, '([^/?#]+?)')
	    .replace(/\.\./, '.*');
	  var re = new RegExp(("^" + f + "$"));
	  var args = path.match(re);

	  if (args) { return args.slice(1) }
	}

	/**
	 * Simple/cheap debounce implementation
	 * @param   {function} fn - callback
	 * @param   {number} delay - delay in seconds
	 * @returns {function} debounced function
	 */
	function debounce(fn, delay) {
	  var t;
	  return function () {
	    clearTimeout(t);
	    t = setTimeout(fn, delay);
	  }
	}

	/**
	 * Set the window listeners to trigger the routes
	 * @param {boolean} autoExec - see route.start
	 */
	function start(autoExec) {
	  debouncedEmit = debounce(emit, 1);
	  win[ADD_EVENT_LISTENER](POPSTATE, debouncedEmit);
	  win[ADD_EVENT_LISTENER](HASHCHANGE, debouncedEmit);
	  doc[ADD_EVENT_LISTENER](clickEvent, click);

	  if (autoExec) { emit(true); }
	}

	/**
	 * Router class
	 */
	function Router() {
	  this.$ = [];
	  observable(this); // make it observable
	  central.on('stop', this.s.bind(this));
	  central.on('emit', this.e.bind(this));
	}

	function normalize(path) {
	  return path.replace(/^\/|\/$/, '')
	}

	function isString(str) {
	  return typeof str == 'string'
	}

	/**
	 * Get the part after domain name
	 * @param {string} href - fullpath
	 * @returns {string} path from root
	 */
	function getPathFromRoot(href) {
	  return (href || loc.href).replace(RE_ORIGIN, '')
	}

	/**
	 * Get the part after base
	 * @param {string} href - fullpath
	 * @returns {string} path from base
	 */
	function getPathFromBase(href) {
	  var base = route._.base;
	  return base[0] === '#'
	    ? (href || loc.href || '').split(base)[1] || ''
	    : (loc ? getPathFromRoot(href) : href || '').replace(base, '')
	}

	function emit(force) {
	  // the stack is needed for redirections
	  var isRoot = emitStackLevel === 0;
	  if (MAX_EMIT_STACK_LEVEL <= emitStackLevel) { return }

	  emitStackLevel++;
	  emitStack.push(function() {
	    var path = getPathFromBase();
	    if (force || path !== current) {
	      central[TRIGGER]('emit', path);
	      current = path;
	    }
	  });

	  if (isRoot) {
	    var first;
	    while (first = emitStack.shift()) { first(); } // stack increses within this call
	    emitStackLevel = 0;
	  }
	}

	function click(e) {
	  if (
	    e.which !== 1 // not left click
	    || e.metaKey || e.ctrlKey || e.shiftKey // or meta keys
	    || e.defaultPrevented // or default prevented
	  ) { return }

	  var el = e.target;
	  while (el && el.nodeName !== 'A') { el = el.parentNode; }

	  if (
	    !el || el.nodeName !== 'A' // not A tag
	    || el[HAS_ATTRIBUTE]('download') // has download attr
	    || !el[HAS_ATTRIBUTE]('href') // has no href attr
	    || el.target && el.target !== '_self' // another window or frame
	    || el.href.indexOf(loc.href.match(RE_ORIGIN)[0]) === -1 // cross origin
	  ) { return }

	  var base = route._.base;

	  if (el.href !== loc.href
	    && (
	      el.href.split('#')[0] === loc.href.split('#')[0] // internal jump
	      || base[0] !== '#' && getPathFromRoot(el.href).indexOf(base) !== 0 // outside of base
	      || base[0] === '#' && el.href.split(base)[0] !== loc.href.split(base)[0] // outside of #base
	      || !go(getPathFromBase(el.href), el.title || doc.title) // route not found
	    )) { return }

	  e.preventDefault();
	}

	/**
	 * Go to the path
	 * @param {string} path - destination path
	 * @param {string} title - page title
	 * @param {boolean} shouldReplace - use replaceState or pushState
	 * @returns {boolean} - route not found flag
	 */
	function go(path, title, shouldReplace) {
	  // Server-side usage: directly execute handlers for the path
	  if (!hist) { return central[TRIGGER]('emit', getPathFromBase(path)) }

	  path = route._.base + normalize(path);
	  title = title || doc.title;
	  // browsers ignores the second parameter `title`
	  shouldReplace
	    ? hist.replaceState(null, title, path)
	    : hist.pushState(null, title, path);
	  // so we need to set it manually
	  doc.title = title;
	  routeFound = false;
	  emit();
	  return routeFound
	}

	/**
	 * Go to path or set action
	 * a single string:                go there
	 * two strings:                    go there with setting a title
	 * two strings and boolean:        replace history with setting a title
	 * a single function:              set an action on the default route
	 * a string/RegExp and a function: set an action on the route
	 * @param {(string|function)} first - path / action / filter
	 * @param {(string|RegExp|function)} second - title / action
	 * @param {boolean} third - replace flag
	 */
	prot.m = function(first, second, third) {
	  if (isString(first) && (!second || isString(second))) { go(first, second, third || false); }
	  else if (second) { this.r(first, second); }
	  else { this.r('@', first); }
	};

	/**
	 * Stop routing
	 */
	prot.s = function() {
	  this.off('*');
	  this.$ = [];
	};

	/**
	 * Emit
	 * @param {string} path - path
	 */
	prot.e = function(path) {
	  this.$.concat('@').some(function(filter) {
	    var args = (filter === '@' ? parser : secondParser)(normalize(path), normalize(filter));
	    if (typeof args != 'undefined') {
	      this[TRIGGER].apply(null, [filter].concat(args));
	      return routeFound = true // exit from loop
	    }
	  }, this);
	};

	/**
	 * Register route
	 * @param {string} filter - filter for matching to url
	 * @param {function} action - action to register
	 */
	prot.r = function(filter, action) {
	  if (filter !== '@') {
	    filter = '/' + normalize(filter);
	    this.$.push(filter);
	  }

	  this.on(filter, action);
	};

	var mainRouter = new Router();
	var route = mainRouter.m.bind(mainRouter);

	// adding base and getPathFromBase to route so we can access them in route.tag's script
	route._ = { base: null, getPathFromBase: getPathFromBase };

	/**
	 * Create a sub router
	 * @returns {function} the method of a new Router object
	 */
	route.create = function() {
	  var newSubRouter = new Router();
	  // assign sub-router's main method
	  var router = newSubRouter.m.bind(newSubRouter);
	  // stop only this sub-router
	  router.stop = newSubRouter.s.bind(newSubRouter);
	  return router
	};

	/**
	 * Set the base of url
	 * @param {(str|RegExp)} arg - a new base or '#' or '#!'
	 */
	route.base = function(arg) {
	  route._.base = arg || '#';
	  current = getPathFromBase(); // recalculate current path
	};

	/** Exec routing right now **/
	route.exec = function() {
	  emit(true);
	};

	/**
	 * Replace the default router to yours
	 * @param {function} fn - your parser function
	 * @param {function} fn2 - your secondParser function
	 */
	route.parser = function(fn, fn2) {
	  if (!fn && !fn2) {
	    // reset parser for testing...
	    parser = DEFAULT_PARSER;
	    secondParser = DEFAULT_SECOND_PARSER;
	  }
	  if (fn) { parser = fn; }
	  if (fn2) { secondParser = fn2; }
	};

	/**
	 * Helper function to get url query as an object
	 * @returns {object} parsed query
	 */
	route.query = function() {
	  var q = {};
	  var href = loc.href || current;
	  href.replace(/[?&](.+?)=([^&]*)/g, function(_, k, v) { q[k] = v; });
	  return q
	};

	/** Stop routing **/
	route.stop = function () {
	  if (started) {
	    if (win) {
	      win[REMOVE_EVENT_LISTENER](POPSTATE, debouncedEmit);
	      win[REMOVE_EVENT_LISTENER](HASHCHANGE, debouncedEmit);
	      doc[REMOVE_EVENT_LISTENER](clickEvent, click);
	    }

	    central[TRIGGER]('stop');
	    started = false;
	  }
	};

	/**
	 * Start routing
	 * @param {boolean} autoExec - automatically exec after starting if true
	 */
	route.start = function (autoExec) {
	  if (!started) {
	    if (win) {
	      if (document.readyState === 'interactive' || document.readyState === 'complete') {
	        start(autoExec);
	      } else {
	        document.onreadystatechange = function () {
	          if (document.readyState === 'interactive') {
	            // the timeout is needed to solve
	            // a weird safari bug https://github.com/riot/route/issues/33
	            setTimeout(function() { start(autoExec); }, 1);
	          }
	        };
	      }
	    }

	    started = true;
	  }
	};

	/** Prepare the router **/
	route.base();
	route.parser();

	/**
	 * Scrolls to an element
	 * @param {HTMLElement} elem The element to scroll to.
	 */
	function seek(elem) {
	  if (!elem) return;

	  const top = elem.getBoundingClientRect().top + window.pageYOffset;

	  window.scrollTo({
	    top: top - 200,
	    // top: top - Math.min(200, window.innerHeight / 3),
	    behavior: "smooth"
	  });
	  // elem.scrollIntoView({ behavior: "smooth", block: "start" });
	}

	function toast(msg, button, delay) {
	  return new USToastElement(msg, button, delay);
	}

	const html = String.raw;

	class USToastElement extends HTMLElement {
	  constructor(msg, button = { label: "Close" }, delay = 10000) {
	    super();
	    this.action =
	      button && typeof button.action === "function" ? button.action : () => {};

	    this.innerHTML = html`
      <span>${msg}</span>
      <button>${button.label}</button>
    `;

	    const container = document.querySelector("#toastContainer");
	    if (container) container.appendChild(this);
	    this._delay = delay;
	    this.setTimeout();

	    this.querySelector("button").addEventListener("click", () => {
	      this.remove();
	      this.action();
	      this.clearTimeout();
	    });
	  }

	  setTimeout() {
	    this._timeout = setTimeout(this.remove.bind(this), this._delay);
	  }
	  clearTimeout() {
	    clearTimeout(this._timeout);
	  }
	}

	if (!customElements.get("us-toast")) {
	  customElements.define("us-toast", USToastElement);
	}

	let offset = null;
	const readingObserver = new IntersectionObserver(
	  entries => {
	    for (const entry of entries)
	      if (entry.isIntersecting) {
	        offset = entry.target;
	      }
	  },
	  {
	    rootMargin: "0px 0px -90% 0px",
	    threshold: 1.0
	  }
	);

	document.addEventListener("beforeunload", () => {
	  /* let article = 0;
	  let section = 0;
	  let paragraph = 0;

	  if (offset && offset.tagName === "H3") {
	    const section = offset.closest("section");
	    paragraph = [...section.querySelectorAll("h3")].indexOf(offset);
	    offset = section;
	  }

	  if (offset && offset.tagName !== "H2") {
	    let sectionHeading = previous(offset, "h2");
	    if (sectionHeading) offset = sectionHeading;
	  }

	  if (offset && offset.tagName === "H2") {
	    const article = offset.closest("article");
	    section = [...article.querySelectorAll("h2")].indexOf(offset);
	  }

	  if (offset && offset.tagName !== "H1") offset = previous(offset, "h1");

	  if (offset && offset.tagName === "H1") {
	    offset = offset.closest("article");
	    article = [...offset.parentNode.querySelectorAll("article")].indexOf(
	      offset
	    );
	  } */
	  localStorage.setItem("lastRead", window.pageYOffset);
	});

	document.addEventListener("pointerup", () => {
	  localStorage.setItem("lastRead", window.pageYOffset);
	});

	document.addEventListener("blur", () => {
	  localStorage.setItem("lastRead", window.pageYOffset);
	});

	class USConstitutionElement extends HTMLElement {
	  constructor() {
	    super();
	  }

	  connectedCallback() {
	    this.continueWhereLastRead();
	  }

	  async continueWhereLastRead() {
	    // const targets = this.querySelectorAll("h1, h2, h3");

	    // targets.forEach(target => readingObserver.observe(target));

	    let lastRead = localStorage.getItem("lastRead");
	    if (!lastRead) return;

	    toast("Continue where you left off?", {
	      label: "Go",
	      action: () => {
	        // const [article, section, paragraph] = lastRead
	        //   .split(",")
	        //   .map(s => parseInt(s, 10));

	        // console.log("[article, section, paragraph] :", [
	        //   article,
	        //   section,
	        //   paragraph
	        // ]);

	        // let articleElem, sectionElem, paragraphElem;
	        // articleElem = this.querySelectorAll("article")[article];

	        // sectionElem = articleElem.querySelectorAll("section")[section];

	        // if (sectionElem) {
	        //   paragraphElem = sectionElem.querySelectorAll("h3")[paragraph];
	        //   if (paragraphElem) return seek(paragraphElem);

	        //   const sm = previous(sectionElem, ".section-marker");
	        //   if (sm) return seek(sm);
	        // }

	        // let h1 = articleElem.querySelector("h1");
	        // return seek(previous(h1, "hr[id]"));
	        window.scrollTo({
	          top: parseFloat(lastRead, 10),
	          behavior: "smooth"
	        });
	      }
	    });
	  }
	}

	if (!customElements.get("us-constitution")) {
	  customElements.define("us-constitution", USConstitutionElement);
	}

	var mark = createCommonjsModule(function (module, exports) {
	/*!***************************************************
	* mark.js v8.11.1
	* https://markjs.io/
	* Copyright (c) 2014–2018, Julian Kühnel
	* Released under the MIT license https://git.io/vwTVl
	*****************************************************/

	(function (global, factory) {
		module.exports = factory();
	}(commonjsGlobal, (function () {
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};











	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();







	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	var DOMIterator = function () {
	  function DOMIterator(ctx) {
	    var iframes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	    var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	    var iframesTimeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5000;
	    classCallCheck(this, DOMIterator);

	    this.ctx = ctx;
	    this.iframes = iframes;
	    this.exclude = exclude;
	    this.iframesTimeout = iframesTimeout;
	  }

	  createClass(DOMIterator, [{
	    key: 'getContexts',
	    value: function getContexts() {
	      var ctx = void 0,
	          filteredCtx = [];
	      if (typeof this.ctx === 'undefined' || !this.ctx) {
	        ctx = [];
	      } else if (NodeList.prototype.isPrototypeOf(this.ctx)) {
	        ctx = Array.prototype.slice.call(this.ctx);
	      } else if (Array.isArray(this.ctx)) {
	        ctx = this.ctx;
	      } else if (typeof this.ctx === 'string') {
	        ctx = Array.prototype.slice.call(document.querySelectorAll(this.ctx));
	      } else {
	        ctx = [this.ctx];
	      }
	      ctx.forEach(function (ctx) {
	        var isDescendant = filteredCtx.filter(function (contexts) {
	          return contexts.contains(ctx);
	        }).length > 0;
	        if (filteredCtx.indexOf(ctx) === -1 && !isDescendant) {
	          filteredCtx.push(ctx);
	        }
	      });
	      return filteredCtx;
	    }
	  }, {
	    key: 'getIframeContents',
	    value: function getIframeContents(ifr, successFn) {
	      var errorFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

	      var doc = void 0;
	      try {
	        var ifrWin = ifr.contentWindow;
	        doc = ifrWin.document;
	        if (!ifrWin || !doc) {
	          throw new Error('iframe inaccessible');
	        }
	      } catch (e) {
	        errorFn();
	      }
	      if (doc) {
	        successFn(doc);
	      }
	    }
	  }, {
	    key: 'isIframeBlank',
	    value: function isIframeBlank(ifr) {
	      var bl = 'about:blank',
	          src = ifr.getAttribute('src').trim(),
	          href = ifr.contentWindow.location.href;
	      return href === bl && src !== bl && src;
	    }
	  }, {
	    key: 'observeIframeLoad',
	    value: function observeIframeLoad(ifr, successFn, errorFn) {
	      var _this = this;

	      var called = false,
	          tout = null;
	      var listener = function listener() {
	        if (called) {
	          return;
	        }
	        called = true;
	        clearTimeout(tout);
	        try {
	          if (!_this.isIframeBlank(ifr)) {
	            ifr.removeEventListener('load', listener);
	            _this.getIframeContents(ifr, successFn, errorFn);
	          }
	        } catch (e) {
	          errorFn();
	        }
	      };
	      ifr.addEventListener('load', listener);
	      tout = setTimeout(listener, this.iframesTimeout);
	    }
	  }, {
	    key: 'onIframeReady',
	    value: function onIframeReady(ifr, successFn, errorFn) {
	      try {
	        if (ifr.contentWindow.document.readyState === 'complete') {
	          if (this.isIframeBlank(ifr)) {
	            this.observeIframeLoad(ifr, successFn, errorFn);
	          } else {
	            this.getIframeContents(ifr, successFn, errorFn);
	          }
	        } else {
	          this.observeIframeLoad(ifr, successFn, errorFn);
	        }
	      } catch (e) {
	        errorFn();
	      }
	    }
	  }, {
	    key: 'waitForIframes',
	    value: function waitForIframes(ctx, done) {
	      var _this2 = this;

	      var eachCalled = 0;
	      this.forEachIframe(ctx, function () {
	        return true;
	      }, function (ifr) {
	        eachCalled++;
	        _this2.waitForIframes(ifr.querySelector('html'), function () {
	          if (! --eachCalled) {
	            done();
	          }
	        });
	      }, function (handled) {
	        if (!handled) {
	          done();
	        }
	      });
	    }
	  }, {
	    key: 'forEachIframe',
	    value: function forEachIframe(ctx, filter, each) {
	      var _this3 = this;

	      var end = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

	      var ifr = ctx.querySelectorAll('iframe'),
	          open = ifr.length,
	          handled = 0;
	      ifr = Array.prototype.slice.call(ifr);
	      var checkEnd = function checkEnd() {
	        if (--open <= 0) {
	          end(handled);
	        }
	      };
	      if (!open) {
	        checkEnd();
	      }
	      ifr.forEach(function (ifr) {
	        if (DOMIterator.matches(ifr, _this3.exclude)) {
	          checkEnd();
	        } else {
	          _this3.onIframeReady(ifr, function (con) {
	            if (filter(ifr)) {
	              handled++;
	              each(con);
	            }
	            checkEnd();
	          }, checkEnd);
	        }
	      });
	    }
	  }, {
	    key: 'createIterator',
	    value: function createIterator(ctx, whatToShow, filter) {
	      return document.createNodeIterator(ctx, whatToShow, filter, false);
	    }
	  }, {
	    key: 'createInstanceOnIframe',
	    value: function createInstanceOnIframe(contents) {
	      return new DOMIterator(contents.querySelector('html'), this.iframes);
	    }
	  }, {
	    key: 'compareNodeIframe',
	    value: function compareNodeIframe(node, prevNode, ifr) {
	      var compCurr = node.compareDocumentPosition(ifr),
	          prev = Node.DOCUMENT_POSITION_PRECEDING;
	      if (compCurr & prev) {
	        if (prevNode !== null) {
	          var compPrev = prevNode.compareDocumentPosition(ifr),
	              after = Node.DOCUMENT_POSITION_FOLLOWING;
	          if (compPrev & after) {
	            return true;
	          }
	        } else {
	          return true;
	        }
	      }
	      return false;
	    }
	  }, {
	    key: 'getIteratorNode',
	    value: function getIteratorNode(itr) {
	      var prevNode = itr.previousNode();
	      var node = void 0;
	      if (prevNode === null) {
	        node = itr.nextNode();
	      } else {
	        node = itr.nextNode() && itr.nextNode();
	      }
	      return {
	        prevNode: prevNode,
	        node: node
	      };
	    }
	  }, {
	    key: 'checkIframeFilter',
	    value: function checkIframeFilter(node, prevNode, currIfr, ifr) {
	      var key = false,
	          handled = false;
	      ifr.forEach(function (ifrDict, i) {
	        if (ifrDict.val === currIfr) {
	          key = i;
	          handled = ifrDict.handled;
	        }
	      });
	      if (this.compareNodeIframe(node, prevNode, currIfr)) {
	        if (key === false && !handled) {
	          ifr.push({
	            val: currIfr,
	            handled: true
	          });
	        } else if (key !== false && !handled) {
	          ifr[key].handled = true;
	        }
	        return true;
	      }
	      if (key === false) {
	        ifr.push({
	          val: currIfr,
	          handled: false
	        });
	      }
	      return false;
	    }
	  }, {
	    key: 'handleOpenIframes',
	    value: function handleOpenIframes(ifr, whatToShow, eCb, fCb) {
	      var _this4 = this;

	      ifr.forEach(function (ifrDict) {
	        if (!ifrDict.handled) {
	          _this4.getIframeContents(ifrDict.val, function (con) {
	            _this4.createInstanceOnIframe(con).forEachNode(whatToShow, eCb, fCb);
	          });
	        }
	      });
	    }
	  }, {
	    key: 'iterateThroughNodes',
	    value: function iterateThroughNodes(whatToShow, ctx, eachCb, filterCb, doneCb) {
	      var _this5 = this;

	      var itr = this.createIterator(ctx, whatToShow, filterCb);
	      var ifr = [],
	          elements = [],
	          node = void 0,
	          prevNode = void 0,
	          retrieveNodes = function retrieveNodes() {
	        var _getIteratorNode = _this5.getIteratorNode(itr);

	        prevNode = _getIteratorNode.prevNode;
	        node = _getIteratorNode.node;

	        return node;
	      };
	      while (retrieveNodes()) {
	        if (this.iframes) {
	          this.forEachIframe(ctx, function (currIfr) {
	            return _this5.checkIframeFilter(node, prevNode, currIfr, ifr);
	          }, function (con) {
	            _this5.createInstanceOnIframe(con).forEachNode(whatToShow, function (ifrNode) {
	              return elements.push(ifrNode);
	            }, filterCb);
	          });
	        }
	        elements.push(node);
	      }
	      elements.forEach(function (node) {
	        eachCb(node);
	      });
	      if (this.iframes) {
	        this.handleOpenIframes(ifr, whatToShow, eachCb, filterCb);
	      }
	      doneCb();
	    }
	  }, {
	    key: 'forEachNode',
	    value: function forEachNode(whatToShow, each, filter) {
	      var _this6 = this;

	      var done = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

	      var contexts = this.getContexts();
	      var open = contexts.length;
	      if (!open) {
	        done();
	      }
	      contexts.forEach(function (ctx) {
	        var ready = function ready() {
	          _this6.iterateThroughNodes(whatToShow, ctx, each, filter, function () {
	            if (--open <= 0) {
	              done();
	            }
	          });
	        };
	        if (_this6.iframes) {
	          _this6.waitForIframes(ctx, ready);
	        } else {
	          ready();
	        }
	      });
	    }
	  }], [{
	    key: 'matches',
	    value: function matches(element, selector) {
	      var selectors = typeof selector === 'string' ? [selector] : selector,
	          fn = element.matches || element.matchesSelector || element.msMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector;
	      if (fn) {
	        var match = false;
	        selectors.every(function (sel) {
	          if (fn.call(element, sel)) {
	            match = true;
	            return false;
	          }
	          return true;
	        });
	        return match;
	      } else {
	        return false;
	      }
	    }
	  }]);
	  return DOMIterator;
	}();

	var Mark$1 = function () {
	  function Mark(ctx) {
	    classCallCheck(this, Mark);

	    this.ctx = ctx;
	    this.ie = false;
	    var ua = window.navigator.userAgent;
	    if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1) {
	      this.ie = true;
	    }
	  }

	  createClass(Mark, [{
	    key: 'log',
	    value: function log(msg) {
	      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'debug';

	      var log = this.opt.log;
	      if (!this.opt.debug) {
	        return;
	      }
	      if ((typeof log === 'undefined' ? 'undefined' : _typeof(log)) === 'object' && typeof log[level] === 'function') {
	        log[level]('mark.js: ' + msg);
	      }
	    }
	  }, {
	    key: 'escapeStr',
	    value: function escapeStr(str) {
	      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	    }
	  }, {
	    key: 'createRegExp',
	    value: function createRegExp(str) {
	      if (this.opt.wildcards !== 'disabled') {
	        str = this.setupWildcardsRegExp(str);
	      }
	      str = this.escapeStr(str);
	      if (Object.keys(this.opt.synonyms).length) {
	        str = this.createSynonymsRegExp(str);
	      }
	      if (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) {
	        str = this.setupIgnoreJoinersRegExp(str);
	      }
	      if (this.opt.diacritics) {
	        str = this.createDiacriticsRegExp(str);
	      }
	      str = this.createMergedBlanksRegExp(str);
	      if (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) {
	        str = this.createJoinersRegExp(str);
	      }
	      if (this.opt.wildcards !== 'disabled') {
	        str = this.createWildcardsRegExp(str);
	      }
	      str = this.createAccuracyRegExp(str);
	      return str;
	    }
	  }, {
	    key: 'createSynonymsRegExp',
	    value: function createSynonymsRegExp(str) {
	      var syn = this.opt.synonyms,
	          sens = this.opt.caseSensitive ? '' : 'i',
	          joinerPlaceholder = this.opt.ignoreJoiners || this.opt.ignorePunctuation.length ? '\0' : '';
	      for (var index in syn) {
	        if (syn.hasOwnProperty(index)) {
	          var value = syn[index],
	              k1 = this.opt.wildcards !== 'disabled' ? this.setupWildcardsRegExp(index) : this.escapeStr(index),
	              k2 = this.opt.wildcards !== 'disabled' ? this.setupWildcardsRegExp(value) : this.escapeStr(value);
	          if (k1 !== '' && k2 !== '') {
	            str = str.replace(new RegExp('(' + this.escapeStr(k1) + '|' + this.escapeStr(k2) + ')', 'gm' + sens), joinerPlaceholder + ('(' + this.processSynomyms(k1) + '|') + (this.processSynomyms(k2) + ')') + joinerPlaceholder);
	          }
	        }
	      }
	      return str;
	    }
	  }, {
	    key: 'processSynomyms',
	    value: function processSynomyms(str) {
	      if (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) {
	        str = this.setupIgnoreJoinersRegExp(str);
	      }
	      return str;
	    }
	  }, {
	    key: 'setupWildcardsRegExp',
	    value: function setupWildcardsRegExp(str) {
	      str = str.replace(/(?:\\)*\?/g, function (val) {
	        return val.charAt(0) === '\\' ? '?' : '\x01';
	      });
	      return str.replace(/(?:\\)*\*/g, function (val) {
	        return val.charAt(0) === '\\' ? '*' : '\x02';
	      });
	    }
	  }, {
	    key: 'createWildcardsRegExp',
	    value: function createWildcardsRegExp(str) {
	      var spaces = this.opt.wildcards === 'withSpaces';
	      return str.replace(/\u0001/g, spaces ? '[\\S\\s]?' : '\\S?').replace(/\u0002/g, spaces ? '[\\S\\s]*?' : '\\S*');
	    }
	  }, {
	    key: 'setupIgnoreJoinersRegExp',
	    value: function setupIgnoreJoinersRegExp(str) {
	      return str.replace(/[^(|)\\]/g, function (val, indx, original) {
	        var nextChar = original.charAt(indx + 1);
	        if (/[(|)\\]/.test(nextChar) || nextChar === '') {
	          return val;
	        } else {
	          return val + '\0';
	        }
	      });
	    }
	  }, {
	    key: 'createJoinersRegExp',
	    value: function createJoinersRegExp(str) {
	      var joiner = [];
	      var ignorePunctuation = this.opt.ignorePunctuation;
	      if (Array.isArray(ignorePunctuation) && ignorePunctuation.length) {
	        joiner.push(this.escapeStr(ignorePunctuation.join('')));
	      }
	      if (this.opt.ignoreJoiners) {
	        joiner.push('\\u00ad\\u200b\\u200c\\u200d');
	      }
	      return joiner.length ? str.split(/\u0000+/).join('[' + joiner.join('') + ']*') : str;
	    }
	  }, {
	    key: 'createDiacriticsRegExp',
	    value: function createDiacriticsRegExp(str) {
	      var sens = this.opt.caseSensitive ? '' : 'i',
	          dct = this.opt.caseSensitive ? ['aàáảãạăằắẳẵặâầấẩẫậäåāą', 'AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ', 'cçćč', 'CÇĆČ', 'dđď', 'DĐĎ', 'eèéẻẽẹêềếểễệëěēę', 'EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ', 'iìíỉĩịîïī', 'IÌÍỈĨỊÎÏĪ', 'lł', 'LŁ', 'nñňń', 'NÑŇŃ', 'oòóỏõọôồốổỗộơởỡớờợöøō', 'OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ', 'rř', 'RŘ', 'sšśșş', 'SŠŚȘŞ', 'tťțţ', 'TŤȚŢ', 'uùúủũụưừứửữựûüůū', 'UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ', 'yýỳỷỹỵÿ', 'YÝỲỶỸỴŸ', 'zžżź', 'ZŽŻŹ'] : ['aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ', 'cçćčCÇĆČ', 'dđďDĐĎ', 'eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ', 'iìíỉĩịîïīIÌÍỈĨỊÎÏĪ', 'lłLŁ', 'nñňńNÑŇŃ', 'oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ', 'rřRŘ', 'sšśșşSŠŚȘŞ', 'tťțţTŤȚŢ', 'uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ', 'yýỳỷỹỵÿYÝỲỶỸỴŸ', 'zžżźZŽŻŹ'];
	      var handled = [];
	      str.split('').forEach(function (ch) {
	        dct.every(function (dct) {
	          if (dct.indexOf(ch) !== -1) {
	            if (handled.indexOf(dct) > -1) {
	              return false;
	            }
	            str = str.replace(new RegExp('[' + dct + ']', 'gm' + sens), '[' + dct + ']');
	            handled.push(dct);
	          }
	          return true;
	        });
	      });
	      return str;
	    }
	  }, {
	    key: 'createMergedBlanksRegExp',
	    value: function createMergedBlanksRegExp(str) {
	      return str.replace(/[\s]+/gmi, '[\\s]+');
	    }
	  }, {
	    key: 'createAccuracyRegExp',
	    value: function createAccuracyRegExp(str) {
	      var _this = this;

	      var chars = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~¡¿';
	      var acc = this.opt.accuracy,
	          val = typeof acc === 'string' ? acc : acc.value,
	          ls = typeof acc === 'string' ? [] : acc.limiters,
	          lsJoin = '';
	      ls.forEach(function (limiter) {
	        lsJoin += '|' + _this.escapeStr(limiter);
	      });
	      switch (val) {
	        case 'partially':
	        default:
	          return '()(' + str + ')';
	        case 'complementary':
	          lsJoin = '\\s' + (lsJoin ? lsJoin : this.escapeStr(chars));
	          return '()([^' + lsJoin + ']*' + str + '[^' + lsJoin + ']*)';
	        case 'exactly':
	          return '(^|\\s' + lsJoin + ')(' + str + ')(?=$|\\s' + lsJoin + ')';
	      }
	    }
	  }, {
	    key: 'getSeparatedKeywords',
	    value: function getSeparatedKeywords(sv) {
	      var _this2 = this;

	      var stack = [];
	      sv.forEach(function (kw) {
	        if (!_this2.opt.separateWordSearch) {
	          if (kw.trim() && stack.indexOf(kw) === -1) {
	            stack.push(kw);
	          }
	        } else {
	          kw.split(' ').forEach(function (kwSplitted) {
	            if (kwSplitted.trim() && stack.indexOf(kwSplitted) === -1) {
	              stack.push(kwSplitted);
	            }
	          });
	        }
	      });
	      return {
	        'keywords': stack.sort(function (a, b) {
	          return b.length - a.length;
	        }),
	        'length': stack.length
	      };
	    }
	  }, {
	    key: 'isNumeric',
	    value: function isNumeric(value) {
	      return Number(parseFloat(value)) == value;
	    }
	  }, {
	    key: 'checkRanges',
	    value: function checkRanges(array) {
	      var _this3 = this;

	      if (!Array.isArray(array) || Object.prototype.toString.call(array[0]) !== '[object Object]') {
	        this.log('markRanges() will only accept an array of objects');
	        this.opt.noMatch(array);
	        return [];
	      }
	      var stack = [];
	      var last = 0;
	      array.sort(function (a, b) {
	        return a.start - b.start;
	      }).forEach(function (item) {
	        var _callNoMatchOnInvalid = _this3.callNoMatchOnInvalidRanges(item, last),
	            start = _callNoMatchOnInvalid.start,
	            end = _callNoMatchOnInvalid.end,
	            valid = _callNoMatchOnInvalid.valid;

	        if (valid) {
	          item.start = start;
	          item.length = end - start;
	          stack.push(item);
	          last = end;
	        }
	      });
	      return stack;
	    }
	  }, {
	    key: 'callNoMatchOnInvalidRanges',
	    value: function callNoMatchOnInvalidRanges(range, last) {
	      var start = void 0,
	          end = void 0,
	          valid = false;
	      if (range && typeof range.start !== 'undefined') {
	        start = parseInt(range.start, 10);
	        end = start + parseInt(range.length, 10);
	        if (this.isNumeric(range.start) && this.isNumeric(range.length) && end - last > 0 && end - start > 0) {
	          valid = true;
	        } else {
	          this.log('Ignoring invalid or overlapping range: ' + ('' + JSON.stringify(range)));
	          this.opt.noMatch(range);
	        }
	      } else {
	        this.log('Ignoring invalid range: ' + JSON.stringify(range));
	        this.opt.noMatch(range);
	      }
	      return {
	        start: start,
	        end: end,
	        valid: valid
	      };
	    }
	  }, {
	    key: 'checkWhitespaceRanges',
	    value: function checkWhitespaceRanges(range, originalLength, string) {
	      var end = void 0,
	          valid = true,
	          max = string.length,
	          offset = originalLength - max,
	          start = parseInt(range.start, 10) - offset;
	      start = start > max ? max : start;
	      end = start + parseInt(range.length, 10);
	      if (end > max) {
	        end = max;
	        this.log('End range automatically set to the max value of ' + max);
	      }
	      if (start < 0 || end - start < 0 || start > max || end > max) {
	        valid = false;
	        this.log('Invalid range: ' + JSON.stringify(range));
	        this.opt.noMatch(range);
	      } else if (string.substring(start, end).replace(/\s+/g, '') === '') {
	        valid = false;
	        this.log('Skipping whitespace only range: ' + JSON.stringify(range));
	        this.opt.noMatch(range);
	      }
	      return {
	        start: start,
	        end: end,
	        valid: valid
	      };
	    }
	  }, {
	    key: 'getTextNodes',
	    value: function getTextNodes(cb) {
	      var _this4 = this;

	      var val = '',
	          nodes = [];
	      this.iterator.forEachNode(NodeFilter.SHOW_TEXT, function (node) {
	        nodes.push({
	          start: val.length,
	          end: (val += node.textContent).length,
	          node: node
	        });
	      }, function (node) {
	        if (_this4.matchesExclude(node.parentNode)) {
	          return NodeFilter.FILTER_REJECT;
	        } else {
	          return NodeFilter.FILTER_ACCEPT;
	        }
	      }, function () {
	        cb({
	          value: val,
	          nodes: nodes
	        });
	      });
	    }
	  }, {
	    key: 'matchesExclude',
	    value: function matchesExclude(el) {
	      return DOMIterator.matches(el, this.opt.exclude.concat(['script', 'style', 'title', 'head', 'html']));
	    }
	  }, {
	    key: 'wrapRangeInTextNode',
	    value: function wrapRangeInTextNode(node, start, end) {
	      var hEl = !this.opt.element ? 'mark' : this.opt.element,
	          startNode = node.splitText(start),
	          ret = startNode.splitText(end - start);
	      var repl = document.createElement(hEl);
	      repl.setAttribute('data-markjs', 'true');
	      if (this.opt.className) {
	        repl.setAttribute('class', this.opt.className);
	      }
	      repl.textContent = startNode.textContent;
	      startNode.parentNode.replaceChild(repl, startNode);
	      return ret;
	    }
	  }, {
	    key: 'wrapRangeInMappedTextNode',
	    value: function wrapRangeInMappedTextNode(dict, start, end, filterCb, eachCb) {
	      var _this5 = this;

	      dict.nodes.every(function (n, i) {
	        var sibl = dict.nodes[i + 1];
	        if (typeof sibl === 'undefined' || sibl.start > start) {
	          if (!filterCb(n.node)) {
	            return false;
	          }
	          var s = start - n.start,
	              e = (end > n.end ? n.end : end) - n.start,
	              startStr = dict.value.substr(0, n.start),
	              endStr = dict.value.substr(e + n.start);
	          n.node = _this5.wrapRangeInTextNode(n.node, s, e);
	          dict.value = startStr + endStr;
	          dict.nodes.forEach(function (k, j) {
	            if (j >= i) {
	              if (dict.nodes[j].start > 0 && j !== i) {
	                dict.nodes[j].start -= e;
	              }
	              dict.nodes[j].end -= e;
	            }
	          });
	          end -= e;
	          eachCb(n.node.previousSibling, n.start);
	          if (end > n.end) {
	            start = n.end;
	          } else {
	            return false;
	          }
	        }
	        return true;
	      });
	    }
	  }, {
	    key: 'wrapMatches',
	    value: function wrapMatches(regex, ignoreGroups, filterCb, eachCb, endCb) {
	      var _this6 = this;

	      var matchIdx = ignoreGroups === 0 ? 0 : ignoreGroups + 1;
	      this.getTextNodes(function (dict) {
	        dict.nodes.forEach(function (node) {
	          node = node.node;
	          var match = void 0;
	          while ((match = regex.exec(node.textContent)) !== null && match[matchIdx] !== '') {
	            if (!filterCb(match[matchIdx], node)) {
	              continue;
	            }
	            var pos = match.index;
	            if (matchIdx !== 0) {
	              for (var i = 1; i < matchIdx; i++) {
	                pos += match[i].length;
	              }
	            }
	            node = _this6.wrapRangeInTextNode(node, pos, pos + match[matchIdx].length);
	            eachCb(node.previousSibling);
	            regex.lastIndex = 0;
	          }
	        });
	        endCb();
	      });
	    }
	  }, {
	    key: 'wrapMatchesAcrossElements',
	    value: function wrapMatchesAcrossElements(regex, ignoreGroups, filterCb, eachCb, endCb) {
	      var _this7 = this;

	      var matchIdx = ignoreGroups === 0 ? 0 : ignoreGroups + 1;
	      this.getTextNodes(function (dict) {
	        var match = void 0;
	        while ((match = regex.exec(dict.value)) !== null && match[matchIdx] !== '') {
	          var start = match.index;
	          if (matchIdx !== 0) {
	            for (var i = 1; i < matchIdx; i++) {
	              start += match[i].length;
	            }
	          }
	          var end = start + match[matchIdx].length;
	          _this7.wrapRangeInMappedTextNode(dict, start, end, function (node) {
	            return filterCb(match[matchIdx], node);
	          }, function (node, lastIndex) {
	            regex.lastIndex = lastIndex;
	            eachCb(node);
	          });
	        }
	        endCb();
	      });
	    }
	  }, {
	    key: 'wrapRangeFromIndex',
	    value: function wrapRangeFromIndex(ranges, filterCb, eachCb, endCb) {
	      var _this8 = this;

	      this.getTextNodes(function (dict) {
	        var originalLength = dict.value.length;
	        ranges.forEach(function (range, counter) {
	          var _checkWhitespaceRange = _this8.checkWhitespaceRanges(range, originalLength, dict.value),
	              start = _checkWhitespaceRange.start,
	              end = _checkWhitespaceRange.end,
	              valid = _checkWhitespaceRange.valid;

	          if (valid) {
	            _this8.wrapRangeInMappedTextNode(dict, start, end, function (node) {
	              return filterCb(node, range, dict.value.substring(start, end), counter);
	            }, function (node) {
	              eachCb(node, range);
	            });
	          }
	        });
	        endCb();
	      });
	    }
	  }, {
	    key: 'unwrapMatches',
	    value: function unwrapMatches(node) {
	      var parent = node.parentNode;
	      var docFrag = document.createDocumentFragment();
	      while (node.firstChild) {
	        docFrag.appendChild(node.removeChild(node.firstChild));
	      }
	      parent.replaceChild(docFrag, node);
	      if (!this.ie) {
	        parent.normalize();
	      } else {
	        this.normalizeTextNode(parent);
	      }
	    }
	  }, {
	    key: 'normalizeTextNode',
	    value: function normalizeTextNode(node) {
	      if (!node) {
	        return;
	      }
	      if (node.nodeType === 3) {
	        while (node.nextSibling && node.nextSibling.nodeType === 3) {
	          node.nodeValue += node.nextSibling.nodeValue;
	          node.parentNode.removeChild(node.nextSibling);
	        }
	      } else {
	        this.normalizeTextNode(node.firstChild);
	      }
	      this.normalizeTextNode(node.nextSibling);
	    }
	  }, {
	    key: 'markRegExp',
	    value: function markRegExp(regexp, opt) {
	      var _this9 = this;

	      this.opt = opt;
	      this.log('Searching with expression "' + regexp + '"');
	      var totalMatches = 0,
	          fn = 'wrapMatches';
	      var eachCb = function eachCb(element) {
	        totalMatches++;
	        _this9.opt.each(element);
	      };
	      if (this.opt.acrossElements) {
	        fn = 'wrapMatchesAcrossElements';
	      }
	      this[fn](regexp, this.opt.ignoreGroups, function (match, node) {
	        return _this9.opt.filter(node, match, totalMatches);
	      }, eachCb, function () {
	        if (totalMatches === 0) {
	          _this9.opt.noMatch(regexp);
	        }
	        _this9.opt.done(totalMatches);
	      });
	    }
	  }, {
	    key: 'mark',
	    value: function mark(sv, opt) {
	      var _this10 = this;

	      this.opt = opt;
	      var totalMatches = 0,
	          fn = 'wrapMatches';

	      var _getSeparatedKeywords = this.getSeparatedKeywords(typeof sv === 'string' ? [sv] : sv),
	          kwArr = _getSeparatedKeywords.keywords,
	          kwArrLen = _getSeparatedKeywords.length,
	          sens = this.opt.caseSensitive ? '' : 'i',
	          handler = function handler(kw) {
	        var regex = new RegExp(_this10.createRegExp(kw), 'gm' + sens),
	            matches = 0;
	        _this10.log('Searching with expression "' + regex + '"');
	        _this10[fn](regex, 1, function (term, node) {
	          return _this10.opt.filter(node, kw, totalMatches, matches);
	        }, function (element) {
	          matches++;
	          totalMatches++;
	          _this10.opt.each(element);
	        }, function () {
	          if (matches === 0) {
	            _this10.opt.noMatch(kw);
	          }
	          if (kwArr[kwArrLen - 1] === kw) {
	            _this10.opt.done(totalMatches);
	          } else {
	            handler(kwArr[kwArr.indexOf(kw) + 1]);
	          }
	        });
	      };

	      if (this.opt.acrossElements) {
	        fn = 'wrapMatchesAcrossElements';
	      }
	      if (kwArrLen === 0) {
	        this.opt.done(totalMatches);
	      } else {
	        handler(kwArr[0]);
	      }
	    }
	  }, {
	    key: 'markRanges',
	    value: function markRanges(rawRanges, opt) {
	      var _this11 = this;

	      this.opt = opt;
	      var totalMatches = 0,
	          ranges = this.checkRanges(rawRanges);
	      if (ranges && ranges.length) {
	        this.log('Starting to mark with the following ranges: ' + JSON.stringify(ranges));
	        this.wrapRangeFromIndex(ranges, function (node, range, match, counter) {
	          return _this11.opt.filter(node, range, match, counter);
	        }, function (element, range) {
	          totalMatches++;
	          _this11.opt.each(element, range);
	        }, function () {
	          _this11.opt.done(totalMatches);
	        });
	      } else {
	        this.opt.done(totalMatches);
	      }
	    }
	  }, {
	    key: 'unmark',
	    value: function unmark(opt) {
	      var _this12 = this;

	      this.opt = opt;
	      var sel = this.opt.element ? this.opt.element : '*';
	      sel += '[data-markjs]';
	      if (this.opt.className) {
	        sel += '.' + this.opt.className;
	      }
	      this.log('Removal selector "' + sel + '"');
	      this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT, function (node) {
	        _this12.unwrapMatches(node);
	      }, function (node) {
	        var matchesSel = DOMIterator.matches(node, sel),
	            matchesExclude = _this12.matchesExclude(node);
	        if (!matchesSel || matchesExclude) {
	          return NodeFilter.FILTER_REJECT;
	        } else {
	          return NodeFilter.FILTER_ACCEPT;
	        }
	      }, this.opt.done);
	    }
	  }, {
	    key: 'opt',
	    set: function set$$1(val) {
	      this._opt = _extends({}, {
	        'element': '',
	        'className': '',
	        'exclude': [],
	        'iframes': false,
	        'iframesTimeout': 5000,
	        'separateWordSearch': true,
	        'diacritics': true,
	        'synonyms': {},
	        'accuracy': 'partially',
	        'acrossElements': false,
	        'caseSensitive': false,
	        'ignoreJoiners': false,
	        'ignoreGroups': 0,
	        'ignorePunctuation': [],
	        'wildcards': 'disabled',
	        'each': function each() {},
	        'noMatch': function noMatch() {},
	        'filter': function filter() {
	          return true;
	        },
	        'done': function done() {},
	        'debug': false,
	        'log': window.console
	      }, val);
	    },
	    get: function get$$1() {
	      return this._opt;
	    }
	  }, {
	    key: 'iterator',
	    get: function get$$1() {
	      return new DOMIterator(this.ctx, this.opt.iframes, this.opt.exclude, this.opt.iframesTimeout);
	    }
	  }]);
	  return Mark;
	}();

	function Mark(ctx) {
	  var _this = this;

	  var instance = new Mark$1(ctx);
	  this.mark = function (sv, opt) {
	    instance.mark(sv, opt);
	    return _this;
	  };
	  this.markRegExp = function (sv, opt) {
	    instance.markRegExp(sv, opt);
	    return _this;
	  };
	  this.markRanges = function (sv, opt) {
	    instance.markRanges(sv, opt);
	    return _this;
	  };
	  this.unmark = function (opt) {
	    instance.unmark(opt);
	    return _this;
	  };
	  return this;
	}

	return Mark;

	})));
	});

	function dispatchUpdate(detail) {
	  window.dispatchEvent(new CustomEvent("bookmark-update", { detail }));
	}
	function dispatchVisibilityChange(detail) {
	  window.dispatchEvent(
	    new CustomEvent("bookmark-visibility-change", { detail })
	  );
	}

	/**
	 * Returns an id used to serialize an element reference.
	 * @param {Element} elem
	 */
	function computeIdFromElement(elem) {
	  // const tagName =
	  return {
	    data: elem.data,
	    tag: elem.parentElement.tagName,
	    html: elem.parentElement.innerHTML
	  };
	}

	/**
	 * Returns a node from an id created by `computeIdFromElement`
	 * @param {Object} id
	 */
	function computeElementFromId(id) {
	  let parentElem = null;

	  for (const elem of document.querySelectorAll(id.tag)) {
	    if (elem.innerHTML === id.html) {
	      parentElem = elem;
	      break;
	    }
	  }

	  if (!parentElem) {
	    toast("Sorry, we couldn't find this bookmark");
	    return;
	  }

	  let finalNode = null;

	  for (const node of parentElem.childNodes) {
	    if (node.data === id.data) {
	      finalNode = node;
	      break;
	    }
	  }

	  return finalNode;
	}

	function restoreBookmarkSelectionBounds(bookmark) {
	  bookmark.offset.startNode = computeElementFromId(bookmark.offset.startNode);
	  bookmark.offset.endNode = computeElementFromId(bookmark.offset.endNode);
	}

	/**
	 * Creates a bookmark
	 * @param {Selection} selection
	 */
	function computeBookmark(selection) {
	  if (!selection.rangeCount) return toast("No text selected");

	  hideBookmarkHighlights();

	  var range = selection.getRangeAt(0);
	  const originalData = {
	    text: range.toString().trim(),
	    startContainer: range.startContainer,
	    startOffset: range.startOffset,
	    endContainer: range.endContainer,
	    endOffset: range.endOffset
	  };

	  const startContainerId = computeIdFromElement(originalData.startContainer);
	  const endContainerId = computeIdFromElement(originalData.endContainer);

	  const bookmark = {
	    time: Date.now(),
	    text: originalData.text,
	    offset: {
	      start: originalData.startOffset,
	      end: originalData.endOffset,
	      startNode: startContainerId,
	      endNode: endContainerId
	    }
	  };

	  return bookmark;
	}

	/**
	 * Creates a bookmark
	 * @param {Selection} selection
	 */
	function createBookmark(selection) {
	  const bookmark = computeBookmark(selection);

	  const bookmarks = getBookmarks();

	  bookmarks.push(bookmark);

	  saveBookmarks(bookmarks);
	  toast("Bookmark saved", {
	    label: "View",
	    action() {
	      showBookmark(bookmark);
	    }
	  });
	  //FIXME: showBookmarkHighlights();
	}

	function rangeIntersectsNode(node, range) {
	  if (range.intersectsNode) {
	    return range.intersectsNode(node);
	  }

	  return rangesIntersect(createRangeAroundNode(node), range);
	}

	function createRangeAroundNode(node) {
	  var rangeAroundNode = node.ownerDocument.createRange();
	  try {
	    rangeAroundNode.selectNode(node);
	  } catch (ex) {
	    rangeAroundNode.selectNodeContents(node);
	  }
	  return rangeAroundNode;
	}

	function rangesIntersect(range0, range1) {
	  return (
	    range1.compareBoundaryPoints(range1.END_TO_START, range0) === -1 &&
	    range1.compareBoundaryPoints(range1.START_TO_END, range0) === 1
	  );
	}

	const highlightElement = document.createElement("mark");
	highlightElement.classList.add("bookmark-highlight");

	function wrap(elem, id) {
	  const wrapper = highlightElement.cloneNode();
	  wrapper.dataset.id = id;
	  elem.parentNode.insertBefore(wrapper, elem);
	  wrapper.appendChild(elem);
	}

	/**
	 *
	 * @param {HTMLElement} parentNode
	 * @param {Range} range
	 */
	function highlight(parentNode, range, id) {
	  if (range.startContainer === range.endContainer) {
	    let currElem = range.startContainer.splitText(range.startOffset);
	    currElem.splitText(range.endOffset);

	    wrap(currElem, id);
	    return;
	  }
	  var treeWalker = document.createTreeWalker(
	    parentNode,
	    NodeFilter.SHOW_TEXT,
	    {
	      acceptNode: function(node) {
	        return rangeIntersectsNode(node, range)
	          ? NodeFilter.FILTER_ACCEPT
	          : NodeFilter.FILTER_REJECT;
	      }
	    },
	    false
	  );

	  while (treeWalker.nextNode()) {
	    let currElem = treeWalker.currentNode;

	    if (currElem === range.startContainer)
	      currElem = currElem.splitText(range.startOffset);
	    else if (currElem === range.endContainer) {
	      currElem.splitText(range.endOffset);
	    }

	    wrap(currElem, id);
	  }
	}

	function hideBookmarkHighlights() {
	  dispatchVisibilityChange(false);
	  window.is_highlighting_bookmarks = false;

	  const highlights = document.querySelectorAll(".bookmark-highlight");

	  for (const h of highlights) {
	    const p = h.parentNode;
	    h.replaceWith(...h.childNodes);
	    p.normalize();
	  }
	}

	function showBookmark(bookmark) {
	  bookmark = JSON.parse(JSON.stringify(bookmark));
	  restoreBookmarkSelectionBounds(bookmark);
	  dispatchVisibilityChange(true);
	  window.is_highlighting_bookmarks = true;
	  const selection = window.getSelection();
	  selection.removeAllRanges();

	  const range = document.createRange();

	  console.log("restored bookmark", bookmark);

	  range.setStart(bookmark.offset.startNode, bookmark.offset.start);
	  range.setEnd(bookmark.offset.endNode, bookmark.offset.end);

	  let node = range.commonAncestorContainer;

	  if (node.nodeType != 1) node = node.parentElement;

	  highlight(node, range, bookmark.time);
	}

	function showBookmarkHighlights() {
	  throw new Error("FIXME: Cannot show all bookmarks without risk of overlap.");
	  dispatchVisibilityChange(true);
	  window.is_highlighting_bookmarks = true;
	  const bookmarks = getBookmarks();

	  if (!bookmarks || !bookmarks.length) return;

	  for (const bookmark of bookmarks) {
	    restoreBookmarkSelectionBounds(bookmark);
	  }

	  for (const bookmark of bookmarks) {
	    showBookmark(bookmark);
	  }
	}

	function toggleBookmarkHighlighting() {
	  if (window.is_highlighting_bookmarks) hideBookmarkHighlights();
	  else showBookmarkHighlights();

	  return window.is_highlighting_bookmarks;
	}

	function bookmarksVisible() {
	  return window.is_highlighting_bookmarks;
	}

	function hasBookmarks() {
	  const bookmarks = getBookmarks();

	  return bookmarks.length;
	}

	function getBookmarks() {
	  return JSON.parse(localStorage.getItem("bookmarks") || "[]");
	}

	function saveBookmarks(bookmarks) {
	  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

	  dispatchUpdate();
	}

	const html$1 = String.raw;

	class UsHeaderElement extends HTMLElement {
	  get searchBar() {
	    return this.querySelector("input");
	  }

	  get searching() {
	    return this.classList.contains("searching");
	  }

	  set searching(value) {
	    if (value) {
	      hideBookmarkHighlights();
	      document.body.classList.remove("bookmarks-drawer-active");
	      this.classList.add("searching");
	      this.searchBar.focus();
	      document.addEventListener("touchstart", this.blurSearchIfFocused);
	      this.search();
	    } else {
	      this.classList.remove("searching");
	      this.searchBar.blur();
	      document.removeEventListener("touchstart", this.blurSearchIfFocused);
	      this.dispatchEvent(new CustomEvent("search-closed"));
	    }
	  }

	  /**
	   * @param {boolean} value
	   */
	  set bookmarksVisible(value) {
	    if (value) {
	      this.classList.add("bookmarks-visible");
	    } else {
	      this.classList.remove("bookmarks-visible");
	    }
	  }
	  /**
	   * @param {boolean} value
	   */
	  set hasBookmarks(value) {
	    if (value) {
	      this.classList.add("has-bookmarks");
	    } else {
	      this.classList.remove("has-bookmarks");
	    }
	  }

	  get selecting() {
	    return this.classList.contains("selecting");
	  }

	  set selecting(value) {
	    if (value) {
	      this.classList.add("selecting");
	    } else {
	      this.classList.remove("selecting");
	    }
	  }

	  set totalFoundFromSearch(value) {
	    this.querySelector("#searchTotalNumber").textContent = value;
	    this.currentFoundFromSearch = 1;
	  }

	  get totalFoundFromSearch() {
	    return parseInt(this.querySelector("#searchTotalNumber").textContent, 10);
	  }

	  set currentFoundFromSearch(value) {
	    if (this.totalFoundFromSearch === 0) value = 0;
	    else if (value < 1 || value > this.totalFoundFromSearch) return;

	    this.querySelector("#searchCurrentNumber").textContent = value;

	    for (const otherActive of document.querySelectorAll("mark.search.active"))
	      otherActive.classList.remove("active");

	    console.log(
	      'document.querySelectorAll("mark.search") :',
	      document.querySelectorAll("mark.search").length
	    );
	    const active = document.querySelectorAll("mark.search")[value - 1];
	    if (active) {
	      active.classList.add("active");
	      seek(active);
	    }
	  }
	  get currentFoundFromSearch() {
	    return parseInt(this.querySelector("#searchCurrentNumber").textContent, 10);
	  }

	  constructor() {
	    super();

	    this.hasBookmarks = hasBookmarks();

	    window.addEventListener("bookmark-update", () => {
	      this.hasBookmarks = hasBookmarks();
	    });
	    window.addEventListener("bookmark-visibility-change", ({ detail }) => {
	      console.log("udpate;");
	      this.bookmarksVisible = detail;
	    });

	    this.innerHTML = html$1`
      <button
        class="if-nav-hidden not-when-searching if-bookmarks-not-open"
        id="toggleNav"
        title="Menu"
      >
        <svg
          class="if-nav-not-open"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            fill="currentColor"
            d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"
          />
        </svg>
        <svg
          class="if-nav-open"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            fill="currentColor"
            d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
          />
        </svg>
      </button>
      <button
        class="if-nav-not-open if-selection"
        id="saveBookmark"
        title="Bookmark"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            fill="currentColor"
            d="M19.65 9.04l-4.84-.42-1.89-4.45c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.73 3.67-3.18c.67-.58.32-1.68-.56-1.75zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
          />
        </svg>
      </button>
      <button
        class="not-when-searching if-bookmarks"
        id="toggleBookmarks"
        title="Toggle bookmarks"
      >
        <svg
          class="if-bookmarks-not-visible if-nav-not-open"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            fill="currentColor"
            d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"
          />
        </svg>
        <svg
          class="if-bookmarks-visible if-nav-not-open"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            fill="currentColor"
            d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z"
          />
        </svg>
      </button>

      <button
        class="if-nav-not-open not-when-searching"
        id="viewBookmarks"
        title="Bookmark"
      >
        <svg
          class="if-bookmarks-not-open"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            fill="currentColor"
            d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"
          />
        </svg>

        <svg
          class="if-bookmarks-open"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            fill="currentColor"
            d="M17.5 4.5c-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5-1.45 0-2.99.22-4.28.79C1.49 5.62 1 6.33 1 7.14v11.28c0 1.3 1.22 2.26 2.48 1.94.98-.25 2.02-.36 3.02-.36 1.56 0 3.22.26 4.56.92.6.3 1.28.3 1.87 0 1.34-.67 3-.92 4.56-.92 1 0 2.04.11 3.02.36 1.26.33 2.48-.63 2.48-1.94V7.14c0-.81-.49-1.52-1.22-1.85-1.28-.57-2.82-.79-4.27-.79zM21 17.23c0 .63-.58 1.09-1.2.98-.75-.14-1.53-.2-2.3-.2-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5.92 0 1.83.09 2.7.28.46.1.8.51.8.98v9.47z"
          />
        </svg>
      </button>

      <div class="search-container">
        <input type="text" placeholder="Search..." />
        <div class="search-controls">
          <button id="searchBackward">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path
                fill="currentColor"
                d="M14.71 6.71c-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L10.83 12l3.88-3.88c.39-.39.38-1.03 0-1.41z"
              />
            </svg>
          </button>
          <div class="count">
            <span id="searchCurrentNumber">0</span>
            /
            <span id="searchTotalNumber">0</span>
          </div>

          <button id="searchForward">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path
                fill="currentColor"
                d="M9.29 6.71c-.39.39-.39 1.02 0 1.41L13.17 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"
              />
            </svg>
          </button>
        </div>
      </div>
      <button class="if-nav-not-open" title="Search">
        <svg
          class="not-when-searching"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>

        <svg
          class="when-searching"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            fill="currentColor"
            d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
          />
        </svg>
      </button>
    `;

	    this.marker = new mark(document.querySelector("us-constitution main"));

	    this.toggle = this.toggle.bind(this);
	    this.search = this.search.bind(this);
	    this.handleClick = this.handleClick.bind(this);
	    this.detectSelection = this.detectSelection.bind(this);
	    this.blurSearchIfFocused = this.blurSearchIfFocused.bind(this);
	  }

	  connectedCallback() {
	    this.querySelector("button[title=Search]").addEventListener(
	      "click",
	      this.toggle
	    );
	    this.searchBar.addEventListener("input", this.search);

	    this.addEventListener(
	      "search-update",
	      e => (this.totalFoundFromSearch = e.detail)
	    );

	    this.addEventListener("search-closed", () => this.clearHighlight());

	    this.addEventListener("click", this.handleClick);

	    const bookmarkSaveButton = this.querySelector("#saveBookmark");
	    bookmarkSaveButton.addEventListener("mousedown", () => this.saveBookmark());
	    bookmarkSaveButton.addEventListener("touchstart", () =>
	      this.saveBookmark()
	    );

	    document.addEventListener("mouseup", this.detectSelection);
	    document.addEventListener("touchstart", e => e.preventDefault());
	    document.addEventListener("touchmove", e => e.preventDefault());
	    document.addEventListener("touchcancel", this.detectSelection);
	    document.addEventListener("touchend", this.detectSelection);
	    document.addEventListener("keyup", this.detectSelection);
	  }

	  blurSearchIfFocused(e) {
	    if (e.target === this.searchBar) return;
	    this.searchBar.blur();
	  }

	  detectSelection() {
	    const selection = window.getSelection();

	    if (!selection.rangeCount || selection.toString().trim() === "") {
	      this.selecting = false;
	      return;
	    }

	    const range = selection.getRangeAt(0);

	    const pStart =
	      range.startContainer.nodeType === 1
	        ? range.startContainer
	        : range.startContainer.parentElement;
	    const pEnd =
	      range.endContainer.nodeType === 1
	        ? range.endContainer
	        : range.endContainer.parentElement;

	    if (
	      !(
	        pStart.closest("article") ||
	        pStart.closest("#declarationOfIndependence") ||
	        pStart.closest(".amendments")
	      ) ||
	      !(
	        pEnd.closest("article") ||
	        pEnd.closest("#declarationOfIndependence") ||
	        pEnd.closest(".amendments")
	      )
	    ) {
	      this.selecting = false;
	      return;
	    }

	    this.selecting = true;
	    this.lastSelection = selection;
	    if (!localStorage.getItem("bookmark_toast")) {
	      localStorage.setItem("bookmark_toast", true);
	      toast("Tip: click the star to save a bookmark");
	    }
	  }

	  saveBookmark() {
	    if (!this.selecting) return;

	    createBookmark(this.lastSelection);

	    this.lastSelection.empty();
	    this.selecting = false;
	  }

	  toggleBookmarkHighlighting() {
	    this.bookmarksVisible = toggleBookmarkHighlighting();
	  }

	  handleClick(e) {
	    if (e.target.closest("#searchForward")) this.currentFoundFromSearch++;
	    else if (e.target.closest("#searchBackward")) this.currentFoundFromSearch--;
	    else if (e.target.closest("#toggleBookmarks"))
	      this.toggleBookmarkHighlighting();
	    else if (e.target.closest("#viewBookmarks"))
	      document.body.classList.toggle("bookmarks-drawer-active");
	    else if (e.target.closest("#toggleNav"))
	      document.body.classList.toggle("nav-open");
	  }

	  toggle(e) {
	    this.searching = !this.searching;
	  }

	  highlight(term) {
	    this.marker.mark(term, {
	      acrossElements: true,
	      separateWordSearch: false,
	      className: "search",
	      exclude: ["h1.usc"],
	      done: total => {
	        this.dispatchEvent(
	          new CustomEvent("search-update", {
	            detail: total
	          })
	        );
	      }
	    });
	  }

	  clearHighlight() {
	    return new Promise(resolve => {
	      this.marker.unmark({
	        className: "search",
	        done() {
	          resolve();
	        }
	      });
	      if (this.searchBar.value.length < 2) this.totalFoundFromSearch = 0;
	    });
	  }

	  search() {
	    if (!this.searching) return;
	    if (this._searchTimeout) clearTimeout(this._searchTimeout);

	    this._searchTimeout = setTimeout(async () => {
	      await this.clearHighlight();
	      if (this.searchBar.value.length < 2) return;
	      requestIdleCallback(() => {
	        this.highlight(this.searchBar.value.trim());
	      });
	    }, 100);
	  }
	}

	if (!customElements.get("us-header")) {
	  customElements.define("us-header", UsHeaderElement);
	}

	const dfnPanel = document.createElement("div");
	dfnPanel.classList.add("dfn-panel");
	document.body.appendChild(dfnPanel);

	document.addEventListener("click", e => {
	  hide();
	});

	function show() {
	  dfnPanel.classList.add("visible");
	}

	function hide() {
	  if (!dfnPanel.classList.contains("visible")) return Promise.resolve();

	  return new Promise(resolve => {
	    dfnPanel.addEventListener(
	      "transitionend",
	      () => {
	        dfnPanel.textContent = "";
	        resolve();
	      },
	      { once: true }
	    );

	    dfnPanel.classList.remove("visible");
	    document
	      .querySelectorAll(".dfn-highlighted")
	      .forEach(el => el.classList.remove("dfn-highlighted"));
	  });
	}

	async function setText(txt) {
	  if (dfnPanel.textContent === txt) {
	    await hide();
	    return false;
	  }

	  await hide();

	  dfnPanel.textContent = txt;
	  show();
	  return true;
	}

	const panel = { setText, hide, show };

	document.addEventListener("click", e => {
	  if (typeof e.target.closest !== "function") return;

	  const dfn = e.target.closest("us-dfn");
	  if (!dfn) return;

	  dfn.show();
	});

	class UsDfnElement extends HTMLElement {
	  constructor() {
	    super();
	  }

	  connectedCallback() {
	    if (!this.explanation) {
	      return console.warn("Untitiled dfn", this);
	    }
	  }

	  get explanation() {
	    return this.dataset.explanation;
	  }

	  async show() {
	    const shouldBeVisible = await panel.setText(this.explanation);

	    document
	      .querySelectorAll(".dfn-highlighted")
	      .forEach(el => el.classList.remove("dfn-highlighted"));

	    if (shouldBeVisible) this.classList.add("dfn-highlighted");
	  }
	}

	if (!customElements.get("us-dfn")) {
	  customElements.define("us-dfn", UsDfnElement);
	}

	const html$2 = String.raw;

	class BookmarkPreviewElement extends HTMLElement {
	  constructor(bookmark) {
	    super();

	    this.bookmark = bookmark;

	    this.innerHTML = html$2`
      <p>${this.truncate(this.bookmark.text)}</p>
    `;
	  }

	  /**
	   * @param {String} text
	   */
	  truncate(text) {
	    if (text.length < 50) return text;
	    else return `${text.substr(0, 50)}...`;
	  }

	  delete() {
	    hideBookmarkHighlights();

	    const bookmarks = getBookmarks().filter(
	      bookmark => bookmark.time !== this.bookmark.time
	    );

	    saveBookmarks(bookmarks);
	  }

	  scrollToHighlight() {
	    hideBookmarkHighlights();
	    if (!bookmarksVisible()) showBookmark(this.bookmark);

	    const mark = document.querySelector(
	      `mark.bookmark-highlight[data-id="${this.bookmark.time}"]`
	    );

	    if (document.body.classList.contains("bookmarks-drawer-active"))
	      document.body.classList.remove("bookmarks-drawer-active");

	    if (!mark) {
	      toast("Can't scroll to bookmark");
	      return;
	    }

	    seek(mark);
	  }
	}

	if (!customElements.get("bookmark-preview")) {
	  customElements.define("bookmark-preview", BookmarkPreviewElement);
	}

	class BookmarkManagerElement extends HTMLElement {
	  constructor() {
	    super();

	    this.handleClick = this.handleClick.bind(this);

	    this.buildBookmarksList();
	    window.addEventListener("storage", event => {
	      if (event.key !== "bookmark") return;
	      this.buildBookmarksList();
	    });

	    this.addEventListener("click", this.handleClick);

	    window.addEventListener("bookmark-update", () => this.buildBookmarksList());
	  }

	  destoryBookmarksList() {
	    this.querySelectorAll("bookmark-preview, p.no-bookmarks").forEach(
	      bookmarkPreview => bookmarkPreview.remove()
	    );
	  }

	  buildBookmarksList() {
	    console.log("building list");
	    this.destoryBookmarksList();

	    const bookmarks = getBookmarks();

	    if (!bookmarks.length) {
	      this.classList.remove("editing");
	      const p = document.createElement("p");
	      p.classList.add("no-bookmarks");
	      p.innerHTML = "No Bookmarks.<br>Select some text to add one.";
	      this.appendChild(p);
	      return;
	    }

	    for (const bookmark of bookmarks) {
	      this.add(bookmark);
	    }
	  }

	  add(bookmark) {
	    const preview = new BookmarkPreviewElement(bookmark);

	    this.appendChild(preview);
	  }

	  handleClick(e) {
	    if (e.target.closest("#bookmarkEdit")) {
	      this.classList.toggle("editing");
	      return;
	    }

	    document.body.classList.remove("bookmarks-drawer-active");
	    if (e.target.closest("bookmark-preview")) return this.handlePreviewClick(e);
	  }

	  handlePreviewClick(e) {
	    const preview = e.target.closest("bookmark-preview");

	    if (this.classList.contains("editing")) {
	      preview.delete();
	      this.classList.remove("editing");
	    } else preview.scrollToHighlight();
	  }
	}

	if (!customElements.get("bookmark-manager")) {
	  customElements.define("bookmark-manager", BookmarkManagerElement);
	}

	route("/", () => {
	  window.scrollTo({ top: 0, behavior: "smooth" });
	});

	route("/preamble", () => {
	  seek(document.querySelector("#preamble"));
	});
	route("/declaration-of-independence", () => {
	  seek(document.querySelector("#declarationOfIndependence"));
	});
	route("/bill-of-rights", () => {
	  seek(document.querySelector("#billOfRights"));
	});
	route("/articles-of-confederation", () => {
	  seek(document.querySelector("#oldPreamble"));
	});
	route("/about", () => {
	  seek(document.querySelector("#about"));
	});

	route("/article/*", article => {
	  const articleHeading = document.querySelector(`#article${article}`);
	  seek(articleHeading);
	});

	route("/article/*/*", (article, sectionNumber) => {
	  const articleHeading = document.querySelector(`#article${article}`);

	  if (!articleHeading) return;

	  const section = articleHeading
	    .closest("article")
	    .querySelectorAll(".section-marker")[parseInt(sectionNumber, 10) - 1];

	  seek(section);
	});

	route("/amendment/*", amendment => {
	  const amendmentHeading = document.querySelector(`#amendment${amendment}`);
	  seek(amendmentHeading);
	});

	route("/confederation/*", article => {
	  const articleHeading = document.querySelector(`#oldArticle${article}`);
	  seek(articleHeading);
	});

	document.querySelector("aside").addEventListener("click", e => {
	  document.body.classList.remove("nav-open");
	  route.exec();
	});

	if ("serviceWorker" in navigator) {
	  navigator.serviceWorker
	    .register("/foundingdocuments/service-worker.js")
	    .then(() => {
	      if (!localStorage.getItem("offline-prompt")) {
	        toast("Available offline", { label: "Ok" }, 10000);
	        localStorage.setItem("offline-prompt", true);
	      }
	    })
	    .catch(err => {
	      console.log("Service worker registration failed: " + err);
	    });
	}

	route.base("/foundingdocuments/");
	route.start(true);

}());

//# sourceMappingURL=/es6/maps/index.js.map
