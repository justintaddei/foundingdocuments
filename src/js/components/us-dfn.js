import { panel } from "../tools/dfn-panel";

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
