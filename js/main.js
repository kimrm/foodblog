import HeaderElement from "./components/header.js";
import carousel from "../css/Components/carousel.js";

function main() {
  const header = document.querySelector("header");
  if (header) {
    header.append(HeaderElement());
  }

  window.addEventListener("scroll", scrolled);

  getThePosts();

  insertCarousel();
}

async function fetchPosts() {
  const url =
    "https://wp-foodblog.kimrune.dev/wp-json/wp/v2/posts?_embed=wp:featuredmedia&per_page=100";
  const posts = await fetch(url);
  const data = await posts.json();
  return data.filter((post) => post.sticky === false);
}

function insertCarousel() {
  fetchPosts().then((data) => {
    const carousel_div = document.querySelector("#carousel");
    carousel_div.innerHTML = "";
    carousel_div.append(carousel(data));
  });
}

function scrolled() {
  const header = document.querySelector("header");
  if (header && window.scrollY > 100) {
    if (!header.classList.contains("scrolled")) {
      header.classList.add("scrolled");
    }
  } else {
    header.classList.remove("scrolled");
  }
}

function getThePosts() {
  const url =
    "https://wp-foodblog.kimrune.dev/wp-json/wp/v2/posts?_embed=wp:featuredmedia&per_page=100";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      renderStickyPost(data);
    });
}

function renderStickyPost(data) {
  const post = data.filter((post) => post.sticky === true)[0];
  const title = document.querySelector(".diagonal-hero__title");
  title.innerHTML = post.title.rendered;
  const body = document.querySelector(".diagonal-hero__text");
  body.innerHTML = post.excerpt.rendered;
  const image_front = document.querySelector(".main-image");
  const image_back = document.querySelector(".second-image");
  image_front.src = post.featured_image_src;
  image_back.src = post.featured_image_src;
  const image =
    post._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
  const image1 = document.querySelector(".main-image");
  image1.src = image;
  const image2 = document.querySelector(".second-image");
  image2.src = image;
}

main();
