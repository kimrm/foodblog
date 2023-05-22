export default function dropdown() {
  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown-menu");
  const dropdownHeaderDiv = document.createElement("div");
  dropdownHeaderDiv.classList.add("dropdown-header-div");

  const dropdownHeader = document.createElement("h2");
  dropdownHeader.classList.add("dropdown-header");
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
  return dropdown;
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
