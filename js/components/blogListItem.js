import visibleDetector from "../functions/observer.js";

export default function blogListItem(post) {
  const excerpt = post.excerpt.rendered.substring(0, 200) + "...";
  const img = document.createElement("img");
  img.src =
    post._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
  img.alt = post._embedded["wp:featuredmedia"][0].alt_text;
  img.classList.add("blog-list-item__img");
  img.addEventListener("load", () => {
    img.classList.add("img-loaded");
  });
  const article = document.createElement("article");
  article.classList.add("blog-list-item");
  const a = document.createElement("a");
  a.href = `blog-post.html?id=${post.id}`;
  a.classList.add("blog-list-item__card-link");
  a.append(img);
  const h2 = document.createElement("h2");
  h2.innerHTML = post.title.rendered;
  a.append(h2);
  const p = document.createElement("p");
  p.innerHTML = `${excerpt} <a class="blog-list-item__link" href="blog-post.html?id=${post.id}">show more</a>`;
  a.append(p);
  article.append(a);
  visibleDetector(article), "loaded";
  return article;
}
