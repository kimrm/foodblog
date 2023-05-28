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
}

main();
