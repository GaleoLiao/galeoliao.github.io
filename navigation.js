const header = document.querySelector("header");
const links = Array.from(header.querySelectorAll("nav a"));
const sections = links.map(link => document.querySelector(link.hash));
let currentLink;

function updateCurrentSection() {
  const boundary = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) + 2;
  const atEnd = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  let index = sections.length - 1;
  if (!atEnd) {
    while (index > 0 && sections[index].getBoundingClientRect().top > boundary) index--;
  }
  if (links[index] === currentLink) return;
  currentLink?.removeAttribute("aria-current");
  currentLink = links[index];
  currentLink.setAttribute("aria-current", "location");
}

function measureHeader() {
  document.documentElement.style.setProperty("--header-height", header.offsetHeight + "px");
  updateCurrentSection();
}

measureHeader();
new ResizeObserver(measureHeader).observe(header);
window.addEventListener("scroll", updateCurrentSection, { passive: true });
window.addEventListener("pageshow", measureHeader);
