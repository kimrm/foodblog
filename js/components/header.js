import { HtmlElement as html } from "../htmlElement.js";

export default function Header() {
  const container = new html("div");
  container.setClasses("container");
  const headerWrapper = new html("div");
  headerWrapper.setClasses("header__wrapper");
  const logoLink = createLogoLink();
  const rightDiv = createRightDiv(() => {
    const searchBoxDiv = createSearchBoxDiv();
    const nav = createNav(() => {
      const liItems = [];
      liItems.push(createNavLink("Home", "/"));
      liItems.push(createNavLink("All posts", "/posts"));
      liItems.push(createNavLink("About", "/about"));
      liItems.push(createNavLink("Contact", "/contact"));
      return liItems;
    });
    return [searchBoxDiv, nav];
  });
  container.appendChild(headerWrapper);
  headerWrapper.appendChildren(logoLink, rightDiv);
  return container.element;
}

function createLogoLink() {
  const logoLink = new html("a");
  logoLink.setClasses("logo");
  logoLink.setHref("/");
  logoLink.setText("Møllers Kitchen");
  return logoLink;
}

function createRightDiv(children) {
  const rightDiv = new html("div");
  rightDiv.setClasses("header__right");
  rightDiv.appendChildren(...children());
  return rightDiv;
}

function createSearchBoxDiv() {
  const searchBoxDiv = new html("div");
  searchBoxDiv.setClasses("header__search-box");
  const searchInput = new html("input");
  searchInput.setAttributes({
    type: "text",
    placeholder: "Keywords",
    "aria-label": "Search",
  });
  const searchButton = new html("button");
  searchButton.setClasses("header__search-button");
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
  return searchBoxDiv;
}

function createNav(liItems) {
  const nav = new html("nav");
  const ul = new html("ul");
  ul.appendChildren(...liItems());
  nav.appendChild(ul);
  return nav;
}

function createNavLink(text, href = "#") {
  const liItem = new html("li");
  const link = new html("a");
  link.setHref(href);
  link.setText(text);
  liItem.appendChild(link);
  return liItem;
}
