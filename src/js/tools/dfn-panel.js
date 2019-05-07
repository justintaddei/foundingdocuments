const dfnPanel = document.createElement("div");
dfnPanel.classList.add("dfn-panel");
document.body.appendChild(dfnPanel);

document.addEventListener("click", e => {
  hide();
});

function show() {
  dfnPanel.classList.add("visible");
}

function hide() {
  if (!dfnPanel.classList.contains("visible")) return Promise.resolve();

  return new Promise(resolve => {
    dfnPanel.addEventListener(
      "transitionend",
      () => {
        dfnPanel.textContent = "";
        resolve();
      },
      { once: true }
    );

    dfnPanel.classList.remove("visible");
    document
      .querySelectorAll(".dfn-highlighted")
      .forEach(el => el.classList.remove("dfn-highlighted"));
  });
}

async function setText(txt) {
  if (dfnPanel.textContent === txt) {
    await hide();
    return false;
  }

  await hide();

  dfnPanel.textContent = txt;
  show();
  return true;
}

export const panel = { setText, hide, show };
