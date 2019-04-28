import Mark from "mark.js";
import { seek } from "../utils/dom";
import { toast } from "./toast";
import {
  createBookmark,
  toggleBookmarkHighlighting,
  hasBookmarks,
  hideBookmarkHighlights
} from "../tools/bookmark";

const html = String.raw;

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

  set bookmarksVisible(value) {
    if (value) {
      this.classList.add("bookmarks-visible");
    } else {
      this.classList.remove("bookmarks-visible");
    }
  }
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

    const active = document.querySelectorAll("mark.search")[value - 1];
    if (active) active.classList.add("active");

    seek(active);
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

    this.innerHTML = html`
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

    this.marker = new Mark(document.querySelector("us-constitution main"));

    this.toggle = this.toggle.bind(this);
    this.search = this.search.bind(this);
    this.seekSearch = this.handleClick.bind(this);
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

    document.addEventListener("mouseup", this.detectSelection);
    document.addEventListener("touchstart", e => e.preventDefault());
    document.addEventListener("touchmove", e => e.preventDefault());
    document.addEventListener("touchcancel", this.detectSelection);
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
        pStart.closest("#declarationOfIndependence")
      ) ||
      !(pEnd.closest("article") || pEnd.closest("#declarationOfIndependence"))
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
    else if (e.target.closest("#saveBookmark")) this.saveBookmark();
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
    this.marker.unmark({ className: "search" });

    if (this.searchBar.value.length < 2) this.totalFoundFromSearch = 0;
  }

  search() {
    if (!this.searching) return;
    this.clearHighlight();
    if (this.searchBar.value.length < 2) return;
    requestIdleCallback(() => {
      this.highlight(this.searchBar.value);
    });
  }
}

if (!customElements.get("us-header")) {
  customElements.define("us-header", UsHeaderElement);
}
