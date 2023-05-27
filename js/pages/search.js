export default function search() {
  const searchKeywords = new URLSearchParams(window.location.search).get(
    "search"
  );
  const search_term = document.querySelector(".search-term");
  search_term.textContent = searchKeywords;
  getPosts(searchKeywords).then((posts) => {
    const searchResults = document.querySelector(".search-results");
    posts.forEach((post) => {
      const div = searchResultItem(post);
      searchResults.append(div);
    });
  });
}

async function getPosts(keywords) {
  const url = `https://wp-foodblog.kimrune.dev/wp-json/wp/v2/posts?_embed=wp:featuredmedia&search=${keywords}`;
  const data = await fetch(url);
  return await data.json();
}

function searchResultItem(post) {
  const result_a = document.createElement("a");
  result_a.href = `blog-post.html?id=${post.id}`;
  result_a.classList.add("search-result-item__link");

  const div = document.createElement("div");
  div.classList.add("search-result-item");

  const img = document.createElement("img");
  img.src =
    post._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
  img.alt = post._embedded["wp:featuredmedia"][0].alt_text;
  img.classList.add("search-result-item__img");
  img.addEventListener("load", () => {
    img.classList.add("img-loaded");
  });

  const divText = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.innerHTML = post.title.rendered;
  const p = document.createElement("p");
  p.innerHTML = post.excerpt.rendered;

  divText.append(h2);
  divText.append(p);

  div.append(img);
  div.append(divText);

  result_a.append(div);

  return result_a;
}
