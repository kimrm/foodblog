export default function dropdown() {
  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown-menu");
  const dropdownHeaderDiv = document.createElement("div");
  dropdownHeaderDiv.classList.add("dropdown-header-div");

  const dropdownHeader = document.createElement("h2");
  dropdownHeader.classList.add("logo");
  dropdownHeader.textContent = "Møllers Kitchen";

  const menu_button = document.createElement("div");
  menu_button.classList.add("menu-button", "open");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  const span3 = document.createElement("span");
  menu_button.append(span1, span2, span3);
  menu_button.addEventListener("click", () => {
    const nav = document.querySelector(".dropdown-menu");
    nav.classList.toggle("open");
  });
  dropdownHeaderDiv.append(dropdownHeader, menu_button);
  const ul = document.createElement("ul");
  const links = [
    createLink("Home", "/"),
    createLink("All posts", "/blog"),
    createLink("About", "/about"),
    createLink("Contact", "/contact"),
  ];
  ul.append(...links);
  dropdown.append(dropdownHeaderDiv);
  dropdown.append(ul);
  const searchForm = createSearchBoxForm();
  dropdown.append(searchForm);
  return dropdown;
}

function createSearchBoxForm() {
  const form = document.createElement("form");
  form.setAttribute("action", "/blog/search.html");
  form.setAttribute("method", "GET");
  const searchKeywords = new URLSearchParams(window.location.search).get(
    "search"
  );
  const searchBoxDiv = document.createElement("div");
  searchBoxDiv.classList.add("dropdown-menu__searchbox");
  const searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("name", "search");
  searchInput.setAttribute("placeholder", "Keywords");
  searchInput.setAttribute("aria-label", "Search");
  if (searchKeywords) {
    searchInput.setAttribute("value", searchKeywords);
  }
  const searchButton = document.createElement("button");
  searchButton.textContent = "Search";
  searchButton.addEventListener("click", () => {
    search(searchInput.value);
  });
  searchBoxDiv.append(searchInput);
  const searchButtonImg = document.createElement("img");
  searchButtonImg.setAttribute("src", "/images/search-button.svg");

  searchButton.append(searchButtonImg);
  searchBoxDiv.append(searchButton);
  form.append(searchBoxDiv);
  return form;
}

function _createSearchBoxDiv() {
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

function createLink(text, href) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.classList.add("dropdown-item");
  a.href = href;
  a.textContent = text;
  li.append(a);
  return li;
}
