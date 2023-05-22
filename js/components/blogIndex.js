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
