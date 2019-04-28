import { toast } from "../components/toast";

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

export function restoreBookmarkSelectionBounds(bookmark) {
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
export function createBookmark(selection) {
  const bookmark = computeBookmark(selection);

  const bookmarks = getBookmarks();

  bookmarks.push(bookmark);

  saveBookmarks(bookmarks);
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

export function hideBookmarkHighlights() {
  dispatchVisibilityChange(false);
  window.is_highlighting_bookmarks = false;

  const highlights = document.querySelectorAll(".bookmark-highlight");

  for (const h of highlights) {
    const p = h.parentNode;
    h.replaceWith(...h.childNodes);
    p.normalize();
  }
}

export function showBookmark(bookmark) {
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

export function showBookmarkHighlights() {
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

export function toggleBookmarkHighlighting() {
  if (window.is_highlighting_bookmarks) hideBookmarkHighlights();
  else showBookmarkHighlights();

  return window.is_highlighting_bookmarks;
}

export function bookmarksVisible() {
  return window.is_highlighting_bookmarks;
}

export function hasBookmarks() {
  const bookmarks = getBookmarks();

  return bookmarks.length;
}

export function getBookmarks() {
  return JSON.parse(localStorage.getItem("bookmarks") || "[]");
}

export function saveBookmarks(bookmarks) {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  dispatchUpdate();
}
