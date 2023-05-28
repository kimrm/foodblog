import showDialog from "../functions/showDialog.js";
import showImageModal from "../functions/showImageModal.js";

export default function aboutIndex() {
  fetch(
    "https://wp-foodblog.kimrune.dev/wp-json/wp/v2/pages/45?_embed=wp:featuredmedia"
  )
    .then((response) => response.json())
    .then((data) => {
      const article = document.querySelector(".about-page");
      article.innerHTML = "";
      const img = document.createElement("img");
      img.src = data._embedded["wp:featuredmedia"][0].source_url;
      img.alt = data._embedded["wp:featuredmedia"][0].alt_text;
      img.classList.add("about-page__img");
      img.addEventListener("load", () => {
        img.classList.add("img-loaded");
      });
      const h1 = document.createElement("h1");
      h1.innerHTML = data.title.rendered;
      //   const p = document.createElement("p");
      //   p.innerHTML = data.content.rendered;
      article.append(h1);
      article.append(img);
      //article.append(p);

      renderBlogPostContent(data);
    })
    .catch((error) => {
      showDialog(
        "Oh no, that's not supposed to happen!",
        "Something went wrong. Please try again later."
      );
    });
}

function renderBlogPostContent(data) {
  const article = document.querySelector(".about-page");
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("blog-post");

  const parser = new DOMParser();
  const doc = parser.parseFromString(
    data.content.rendered.replace(data.excerpt.rendered, ""),
    "text/html"
  );
  const figures = doc.querySelectorAll("figure");
  figures.forEach((figure) => {
    figure.addEventListener("click", (event) => {
      showImageModal(figure.querySelector("img"));
    });
    figure.childNodes[0].addEventListener("load", (event) => {
      event.target.classList.add("img-loaded");
    });
  });
  const body = doc.querySelector("body");
  body.childNodes.forEach((node) => {
    article.append(node);
  });
}
