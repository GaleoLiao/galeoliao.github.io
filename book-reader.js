const reader = document.querySelector("#book-reader");
const leaf = reader.querySelector("#book-page");
const turnButton = reader.querySelector("#turn-page");
const images = Array.from(leaf.querySelectorAll("img"));
const statusLine = reader.querySelector("#page-status");
const originalLink = reader.querySelector("#full-page");

function showPage(english) {
  leaf.classList.toggle("turned", english);
  leaf.setAttribute("aria-label", english ? "Return to the Chinese page" : "Turn to the English page");
  turnButton.textContent = english ? "Back · 中文" : "Next · English";
  statusLine.textContent = english ? "English · Pages 1–2" : "中文 · 原页";
  originalLink.href = images[english ? 1 : 0].dataset.src;
  originalLink.textContent = english ? "Page 1" : "Full-size image";
  reader.querySelector("#right-page").hidden = !english;
}

function turnPage() {
  showPage(!leaf.classList.contains("turned"));
}

document.querySelector("#open-book").addEventListener("click", () => {
  for (const image of images) {
    if (!image.hasAttribute("src")) image.src = image.dataset.src;
  }
  showPage(false);
  reader.showModal();
});
leaf.addEventListener("click", turnPage);
turnButton.addEventListener("click", turnPage);
reader.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    showPage(event.key === "ArrowRight");
  }
});
reader.querySelector("#close-book").addEventListener("click", () => reader.close());
reader.addEventListener("click", event => {
  if (event.target === reader) reader.close();
});
