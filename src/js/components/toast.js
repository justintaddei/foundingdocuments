export function toast(msg, button, delay) {
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
