import search from "../pages/search.js";

export default function Header(activePage = "home") {
  const hamburger = createHamburgerButton();
  const container = document.createElement("div");
  container.classList.add("header-container");

  const headerWrapper = document.createElement("div");
  headerWrapper.classList.add("header__wrapper");

  const logoLink = createLogoLink();

  const rightDiv = createRightDiv(activePage);

  rightDiv.append(hamburger);
  container.append(headerWrapper);
  headerWrapper.append(logoLink, hamburger, rightDiv);
  return container;
}

function createHamburgerButton() {
  const div = document.createElement("div");
  div.classList.add("menu-button");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  const span3 = document.createElement("span");
  div.append(span1, span2, span3);
  div.addEventListener("click", () => {
    const nav = document.querySelector(".dropdown-menu");
    nav.classList.toggle("open");
  });
  return div;
}

function createLogoLink() {
  const logoLink = document.createElement("a");
  logoLink.classList.add("logo");
  logoLink.href = "/";
  logoLink.innerHTML = "Møllers Kitchen";
  return logoLink;
}

function createRightDiv(activePage = "home") {
  const rightDiv = document.createElement("div");
  rightDiv.classList.add("header__right");
  const searchBoxDiv = createSearchBoxDiv();
  const nav = createNav(activePage);
  rightDiv.append(searchBoxDiv, nav);
  return rightDiv;
}

function createSearchBoxDiv() {
  const form = document.createElement("form");
  form.action = "/blog/search.html";
  form.method = "GET";
  const searchKeywords = new URLSearchParams(window.location.search).get(
    "search"
  );
  const searchBoxDiv = document.createElement("div");
  searchBoxDiv.classList.add("header__search-box");
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.name = "search";
  searchInput.placeholder = "Keywords";
  searchInput.setAttribute("aria-label", "Search");
  if (searchKeywords) {
    searchInput.value = searchKeywords;
  }
  const searchButton = document.createElement("button");
  searchButton.classList.add("header__search-button");
  searchButton.addEventListener("click", () => {
    search(searchInput.value);
  });
  searchBoxDiv.append(searchInput);
  const searchButtonImg = document.createElement("img");
  searchButtonImg.src = "/images/search-button.svg";
  searchButtonImg.alt = "Search";
  searchButtonImg.classList.add("header__search-button-img");
  searchButtonImg.setAttribute("aria-hidden", "true");
  const searchButtonText = document.createElement("span");
  searchButtonText.classList.add("header__search-button-text");
  searchButtonText.innerHTML = "Search";
  searchButton.append(searchButtonImg, searchButtonText);
  searchBoxDiv.append(searchButton);
  form.append(searchBoxDiv);
  return form;
}

function createNav(activePage = "home") {
  const nav = document.createElement("nav");
  const ul = document.createElement("ul");
  const liItems = [];
  liItems.push(createNavLink("Home", "/", activePage === "home"));
  liItems.push(createNavLink("All posts", "/blog", activePage === "blog"));
  liItems.push(createNavLink("About", "/about", activePage === "about"));
  liItems.push(createNavLink("Contact", "/contact", activePage === "contact"));
  ul.append(...liItems);
  nav.appendChild(ul);
  return nav;
}

function createNavLink(text, href = "#", isActive = false) {
  const liItem = document.createElement("li");
  const link = document.createElement("a");
  link.classList.add("nav-link");
  if (isActive) {
    link.classList.add("active-animation");
    link.classList.add("active");
  }
  link.href = href;
  link.innerHTML = text;
  liItem.append(link);
  return liItem;
}
