import showDialog from "../functions/showDialog.js";
import comments from "../components/comments.js";

export default function blogPost() {
  const blogId = new URLSearchParams(window.location.search).get("id");

  const url = `https://wp-foodblog.kimrune.dev/wp-json/wp/v2/posts/${blogId}?_embed=wp:featuredmedia`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.title = data.title.rendered + " - Møllers Kitchen";

      renderBlogPost(data);

      renderBlogPostContent(data);
    })
    .catch((error) => {
      showDialog(
        "Oh no, that's not supposed to happen!",
        "Something went wrong. Please try again later. "
      );
    });

  const commentsDiv = document.querySelector(".comments-container");
  const commentsElement = comments(blogId);
  commentsDiv.append(commentsElement);
}

function renderBlogPost(data) {
  const article = document.querySelector(".blog-post");
  article.innerHTML = "";
  const img = document.createElement("img");
  img.src =
    data._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
  img.alt = data._embedded["wp:featuredmedia"][0].alt_text;
  img.classList.add("blog-post__img");
  img.addEventListener("load", () => {
    img.classList.add("img-loaded");
  });
  const h1 = document.createElement("h1");
  h1.innerHTML = data.title.rendered;
  const h2 = document.createElement("h2");
  h2.innerHTML = data.excerpt.rendered;

  article.append(h1);
  article.append(img);
  article.append(h2);
}

function renderBlogPostContent(data) {
  const article = document.querySelector(".blog-post");
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

function showImageModal(image) {
  const modal = document.querySelector(".image-modal");
  modal.classList.add("show");
  const modalBody = document.querySelector(".image-modal__body");
  const modalImage = document.createElement("img");
  modalImage.src = image.src;
  modalBody.append(modalImage);
  modal.append(modalBody);
  modal.addEventListener("click", () => {
    modalBody.innerHTML = "";
    modal.classList.remove("show");
  });
}
