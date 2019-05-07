/**
 * Scrolls to an element
 * @param {HTMLElement} elem The element to scroll to.
 */
export function seek(elem) {
  if (!elem) return;

  const top = elem.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: top - Math.min(200, window.innerHeight / 3),
    behavior: "smooth"
  });
  // elem.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Finds the next element matching a selector
 * @param {Element} element The element to start at
 * @param {string} query The CSS query
 */
export function next(element, query) {
  while ((element = element.nextSibling)) {
    if (element && element.matches && element.matches(query)) return element;
  }

  return null;
}

/**
 * Finds a previous element matching a selector
 * @param {Element} element The element to start at
 * @param {string} query The CSS query
 */
export function previous(element, query) {
  if (!element) return null;

  while ((element = element.previousSibling)) {
    if (element && element.matches && element.matches(query)) return element;
  }

  return null;
}
