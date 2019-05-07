import {
  bookmarksVisible,
  getBookmarks,
  hideBookmarkHighlights,
  saveBookmarks,
  showBookmark
} from "../tools/bookmark";
import { toast } from "./toast";
import { seek } from "../utils/dom";

const html = String.raw;

export class BookmarkPreviewElement extends HTMLElement {
  constructor(bookmark) {
    super();

    this.bookmark = bookmark;

    this.innerHTML = html`
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
