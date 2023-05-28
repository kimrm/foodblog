import dropdown from "./components/dropdown.js";
import footer from "./components/footer.js";
import router from "./pages/router.js";
import loadHotjarModule from "./components/hotjar.js";

function main() {
  loadHotjarModule();

  router();

  const body = document.querySelector("body");
  const dropdownElement = dropdown();
  body.append(dropdownElement);

  const footerElement = document.querySelector("footer");
  const footerContent = footer();
  footerElement.append(footerContent);

  window.addEventListener("scroll", scrolled);
}

function scrolled() {
  const header = document.querySelector("header");
  if (header && window.scrollY > 1) {
    if (!header.classList.contains("scrolled")) {
      header.classList.add("scrolled");
    }
  } else {
    header.classList.remove("scrolled");
  }
}

main();
