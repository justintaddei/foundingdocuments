import { getBookmarks } from "../tools/bookmark";
import "./bookmark-preview";
import { BookmarkPreviewElement } from "./bookmark-preview";

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
