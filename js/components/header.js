import { HtmlElement as html } from "../htmlElement.js";
import search from "../search.js";

export default function Header(activePage = "home") {
  const container = new html("div");
  container.setClasses("container");
  const headerWrapper = new html("div");
  headerWrapper.setClasses("header__wrapper");
  const logoLink = createLogoLink();

  const rightDiv = createRightDiv(activePage);

  const hamburger = createHamburgerButton();
  rightDiv.appendChild(hamburger);
  container.appendChild(headerWrapper);
  headerWrapper.appendChildren(logoLink, hamburger, rightDiv);
  return container.element;
}

function createHamburgerButton() {
  const div = new html("div");
  div.setClasses("menu-button");
  const span1 = new html("span");
  const span2 = new html("span");
  const span3 = new html("span");
  div.appendChildren(span1, span2, span3);
  div.setEventListener("click", () => {
    const nav = document.querySelector(".dropdown-menu");
    nav.classList.toggle("open");
    const hamburger = document.querySelector("#hamburger_button");
    hamburger.classList.toggle("active");
  });
  return div;
}

function createLogoLink() {
  const logoLink = new html("a");
  logoLink.setClasses("logo");
  logoLink.setHref("/");
  logoLink.setText("Møllers Kitchen");
  return logoLink;
}

function createRightDiv(activePage = "home") {
  const rightDiv = new html("div");
  rightDiv.setClasses("header__right");
  const searchBoxDiv = createSearchBoxDiv();
  const nav = createNav(activePage);
  rightDiv.appendChildren(searchBoxDiv, nav);
  return rightDiv;
}

function createSearchBoxDiv() {
  const form = new html("form");
  form.setAttributes({ action: "/blog/search.html", method: "GET" });
  const searchKeywords = new URLSearchParams(window.location.search).get(
    "search"
  );
  const searchBoxDiv = new html("div");
  searchBoxDiv.setClasses("header__search-box");
  const searchInput = new html("input");
  searchInput.setAttributes({
    type: "text",
    name: "search",
    placeholder: "Keywords",
    "aria-label": "Search",
  });
  if (searchKeywords) {
    searchInput.setAttributes({ value: searchKeywords });
  }
  const searchButton = new html("button");
  searchButton.setClasses("header__search-button");
  searchButton.setEventListener("click", () => {
    search(searchInput.element.value);
  });
  searchBoxDiv.appendChild(searchInput);
  const searchButtonImg = new html("img");
  searchButtonImg
    .setSrc("/images/search-button.svg")
    .setClasses("header__search-button-img");
  const searchButtonText = new html("span");
  searchButtonText.setText("Search");
  searchButton.appendChild(searchButtonImg);
  searchButton.appendChild(searchButtonText);
  searchBoxDiv.appendChild(searchButton);
  form.appendChild(searchBoxDiv);
  return form;
}

function createNav(activePage = "home") {
  const nav = new html("nav");
  const ul = new html("ul");
  const liItems = [];
  liItems.push(createNavLink("Home", "/", activePage === "home"));
  liItems.push(createNavLink("All posts", "/blog", activePage === "blog"));
  liItems.push(createNavLink("About", "/about", activePage === "about"));
  liItems.push(createNavLink("Contact", "/contact", activePage === "contact"));
  ul.appendChildren(...liItems);
  nav.appendChild(ul);
  return nav;
}

function createNavLink(text, href = "#", isActive = false) {
  const liItem = new html("li");
  const link = new html("a");
  if (isActive) {
    link.setClasses("active-animation");
    link.setClasses("active");
  }
  link.setHref(href);
  link.setText(text);
  liItem.appendChild(link);
  return liItem;
}
