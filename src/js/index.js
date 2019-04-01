import route from "riot-route";
import "./components/us-constitution";
import "./components/us-header";
import "./components/bookmark-manager";
import { seek } from "./utils/dom";
import { toast } from "./components/toast";

route("/preamble", () => {
  seek(document.querySelector("#preamble"));
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

document.querySelector("aside").addEventListener("click", e => {
  document.body.classList.remove("nav-open");
  route.exec();
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
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
route.base("/constitution");
route.start(true);
