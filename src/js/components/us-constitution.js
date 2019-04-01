import { seek, previous } from "../utils/dom";
import { toast } from "./toast";
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

window.addEventListener("beforeunload", () => {
  let article = 0;
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
  }

  localStorage.setItem("lastRead", [article, section, paragraph]);
});

class USConstitutionElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.continueWhereLastRead();
  }

  async continueWhereLastRead() {
    const targets = this.querySelectorAll("h1, h2, h3");

    targets.forEach(target => readingObserver.observe(target));

    let lastRead = localStorage.getItem("lastRead");
    if (!lastRead) return;

    setTimeout(() => {
      toast("Continue where you left off?", {
        label: "Go",
        action: () => {
          const [article, section, paragraph] = lastRead
            .split(",")
            .map(s => parseInt(s, 10));

          console.log("[article, section, paragraph] :", [
            article,
            section,
            paragraph
          ]);

          let articleElem, sectionElem, paragraphElem;
          articleElem = this.querySelectorAll("article")[article];

          sectionElem = articleElem.querySelectorAll("section")[section];

          if (sectionElem) {
            paragraphElem = sectionElem.querySelectorAll("h3")[paragraph];
            if (paragraphElem) return seek(paragraphElem);

            const sm = previous(sectionElem, ".section-marker");
            if (sm) return seek(sm);
          }

          let h1 = articleElem.querySelector("h1");
          return seek(previous(h1, "hr[id]"));
        }
      });
    }, 1500);
  }
}

if (!customElements.get("us-constitution")) {
  customElements.define("us-constitution", USConstitutionElement);
}
