import showDialog from "../functions/showDialog.js";
import blogListItem from "../components/blogListItem.js";
import tags from "../components/tags.js";

let currentPostsPage = 1;

export default function blogIndex() {
  const ul = document.querySelector(".blog-list");
  const loader = document.createElement("li");
  loader.innerHTML = `<p>Cooking up some posts for you... Please wait.</p>`;
  ul.append(loader);

  fetchPosts()
    .then((data) => {
      loader.remove();
      appendListItems(data);
    })
    .catch((error) => {
      showDialog(
        "Error",
        "Something unexpected happened! Please try again later.",
        "error"
      );
    });

  createEvents();

  renderTagsFilter();
}

function appendListItems(data) {
  const ul = document.querySelector(".blog-list");
  const loadMoreBtn = document.querySelector("#load_more");
  let listItems = [];
  try {
    listItems = postsListItems(data);
  } catch (error) {
    const messageLi = document.createElement("li");
    messageLi.innerHTML = `No more posts to show.`;
    listItems.push(messageLi);
  }

  ul.append(...listItems);

  if (listItems.length < 10) {
    if (!loadMoreBtn.classList.contains("hide")) {
      loadMoreBtn.classList.add("hide");
    }
  } else {
    if (loadMoreBtn.classList.contains("hide")) {
      loadMoreBtn.classList.remove("hide");
    }
  }
}

async function fetchPosts(resultPage = 1, tags = []) {
  let url = `https://wp-foodblog.kimrune.dev/wp-json/wp/v2/posts?_embed=wp:featuredmedia&per_page=10&page=${resultPage}`;

  if (tags.length > 0) {
    url += `&tags=${tags.join(",")}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function createEvents() {
  const filter_close = document.querySelector(".filter-menu__close");
  const loadMoreBtn = document.querySelector("#load_more");
  const filter_close_icon = document.querySelector(".filter-menu__close-icon");
  const filter_open_icon = document.querySelector(".filter-menu__open-icon");
  const filter_menu_filters = document.querySelector(".filter-menu .filters");

  window.addEventListener("resize", handleResize);

  filter_close.addEventListener("click", () => {
    filter_close_icon.classList.toggle("hide");
    filter_open_icon.classList.toggle("hide");

    filter_menu_filters.classList.toggle("open");
  });

  loadMoreBtn.addEventListener("click", () => {
    currentPostsPage++;
    fetchPosts(currentPostsPage).then((data) => {
      appendListItems(data);
    });
  });
}

async function renderTagsFilter() {
  const tagsFilter = document.querySelector(".tags-filter");
  const tagsListItems = await tags();
  tagsFilter.addEventListener("tagSelected", (event) => {
    const tagsArray = [];
    const tagsList = document.querySelectorAll(".filter-menu__checkbox");
    tagsList.forEach((tag) => {
      if (tag.checked) {
        tagsArray.push(tag.value);
      }
    });
    currentPostsPage = 1;
    fetchPosts(currentPostsPage, tagsArray).then((data) => {
      const ul = document.querySelector(".blog-list");
      ul.innerHTML = "";
      appendListItems(data);
    });
  });
  tagsFilter.append(...tagsListItems);
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

function postsListItems(data) {
  const posts = data.map((post) => {
    const li = document.createElement("li");
    const article = blogListItem(post);
    li.append(article);
    return li;
  });

  return posts;
}
