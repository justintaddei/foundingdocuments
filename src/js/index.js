import route from "riot-route";
import "./components/us-constitution";
import "./components/us-header";
import "./components/us-dfn";
import "./components/bookmark-manager";
import { seek } from "./utils/dom";
import { toast } from "./components/toast";

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
    .register("{%ROOT%}/service-worker.js")
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

route.base("{%ROOT%}/");
route.start(true);
