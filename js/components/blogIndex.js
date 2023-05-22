import listItem from "./blogListItem.js";

export default function blogIndex(posts) {
  const url = `https://wp-foodblog.kimrune.dev/wp-json/wp/v2/posts?_embed=wp:featuredmedia&per_page=100`;

  const ul = document.querySelector(".blog-list");
  const loader = document.createElement("li");
  const loadMoreBtn = document.querySelector("#load_more");
  loader.innerHTML = `<p>Cooking up some posts for you... Please wait.</p>`;
  ul.append(loader);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      ul.innerHTML = "";
      const counter = 8;
      let position = 0;

      showPosts(data, position, counter);

      loadMoreBtn.addEventListener("click", () => {
        position += counter;
        if (data.length < position + counter) {
          loadMoreBtn.style.display = "none";
        }

        showPosts(data, position, counter);
      });
    });

  const filter_close = document.querySelector(".filter-menu__close");
  const width = window.innerWidth;
  if (width < 768) {
    const filter_menu_filters = document.querySelector(".filter-menu .filters");
    filter_menu_filters.classList.remove("open");
  }
  window.addEventListener("resize", handleResize);

  filter_close.addEventListener("click", () => {
    const filter_close_icon = document.querySelector(
      ".filter-menu__close-icon"
    );
    const filter_open_icon = document.querySelector(".filter-menu__open-icon");
    filter_close_icon.classList.toggle("hide");
    filter_open_icon.classList.toggle("hide");

    const filter_menu_filters = document.querySelector(".filter-menu .filters");
    filter_menu_filters.classList.toggle("open");
  });
}

function handleResize() {
  const filter_close_icon = document.querySelector(".filter-menu__close-icon");
  const filter_open_icon = document.querySelector(".filter-menu__open-icon");
  if (window.innerWidth < 768) {
    const filter_menu_filters = document.querySelector(".filter-menu .filters");
    filter_menu_filters.classList.remove("open");
    if (!filter_close_icon.classList.contains("hide")) {
      filter_close_icon.classList.add("hide");
      filter_open_icon.classList.remove("hide");
    }
  } else {
    const filter_menu_filters = document.querySelector(".filter-menu .filters");
    filter_menu_filters.classList.add("open");
    if (!filter_open_icon.classList.contains("hide")) {
      filter_open_icon.classList.add("hide");
      filter_close_icon.classList.remove("hide");
    }
  }
}

function showPosts(data, position, counter) {
  const ul = document.querySelector(".blog-list");

  const posts = data
    .map((post) => {
      const li = document.createElement("li");
      const article = listItem(post);
      li.append(article);
      return li;
    })
    .slice(position, position + counter);

  ul.append(...posts);
}
