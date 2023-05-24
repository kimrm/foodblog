import HeaderElement from "./components/header.js";
import carousel from "./components/carousel.js";
import createCarousel from "./createCarousel.js";
import blogIndex from "./components/blogIndex.js";
import blogPost from "./components/blogPost.js";
import aboutPage from "./components/aboutPage.js";
import search from "./search.js";
import dropdown from "./components/dropdown.js";
import footer from "./components/footer.js";

function main() {
  router();

  window.addEventListener("scroll", scrolled);

  const body = document.querySelector("body");
  const dropdownElement = dropdown();
  body.append(dropdownElement);

  const footerElement = document.querySelector("footer");
  footerElement.innerHTML = footer();
}

function router() {
  const url = window.location.pathname;

  switch (url) {
    case "/":
    case "/index.html":
      setHeader("home");
      getThePosts();
      break;
    case "/blog/blog-post.html":
      setHeader("blog");
      blogPost();
      break;
    case "/blog/":
    case "/blog/index.html":
      setHeader("blog");
      blogIndex();
      break;
    case "/about/":
    case "/about/index.html":
      setHeader("about");
      aboutPage();
      break;
    case "/contact/":
    case "/contact/index.html":
      setHeader("contact");
      contact();
      break;
    case "/blog/search.html":
      setHeader("search");
      search();
  }
}

function contact() {
  const btn = document.querySelector("#contact_submit_button");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const nameElement = document.querySelector("#contact_name");
    const emailElement = document.querySelector("#contact_email");
    const subjectElement = document.querySelector("#contact_subject");
    const messageElement = document.querySelector("#contact_message");
    const name = nameElement.value;
    const email = emailElement.value;
    const subject = subjectElement.value;
    const message = messageElement.value;

    let hasErrors = false;
    if (message.length < 25) {
      const message_error = document.querySelector("#message_error");
      message_error.classList.add("show");
      messageElement.focus();
      hasErrors = true;
    } else {
      const message_error = document.querySelector("#message_error");
      message_error.classList.remove("show");
    }
    if (subject.length < 15) {
      const subject_error = document.querySelector("#subject_error");
      subject_error.classList.add("show");
      subjectElement.focus();
      hasErrors = true;
    } else {
      const subject_error = document.querySelector("#subject_error");
      subject_error.classList.remove("show");
    }
    if (validateEmail(email) === false) {
      const email_error = document.querySelector("#email_error");
      email_error.classList.add("show");
      emailElement.focus();
      hasErrors = true;
    } else {
      const email_error = document.querySelector("#email_error");
      email_error.classList.remove("show");
    }
    if (name.length < 5) {
      const name_error = document.querySelector("#name_error");
      name_error.classList.add("show");
      nameElement.focus();
      hasErrors = true;
    } else {
      const name_error = document.querySelector("#name_error");
      name_error.classList.remove("show");
    }

    if (hasErrors) {
      return false;
    }

    const formElement = document.querySelector("#contact_form");
    const formData = new FormData(formElement);

    fetch(
      "https://wp-foodblog.kimrune.dev/wp-json/contact-form-7/v1/contact-forms/53/feedback",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

function setHeader(page) {
  const header = document.querySelector("header");
  if (header) {
    header.append(HeaderElement(page));
  }
}

async function fetchPosts() {
  const url =
    "https://wp-foodblog.kimrune.dev/wp-json/wp/v2/posts?_embed=wp:featuredmedia&per_page=100";
  const posts = await fetch(url);
  const data = await posts.json();
  return data.filter((post) => post.sticky === false);
}

function scrolled() {
  const header = document.querySelector("header");
  if (header && window.scrollY > 1) {
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
      createCarousel(data);
    });
}

function renderStickyPost(data) {
  const post = data.filter((post) => post.sticky === true)[0];
  const title = document.querySelector(".diagonal-hero__title");
  title.innerHTML = post.title.rendered;
  const body = document.querySelector(".diagonal-hero__text");
  body.innerHTML = post.excerpt.rendered;

  const image =
    post._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
  const image1 = document.querySelector(".main-image");
  image1.src = image;
  const image2 = document.querySelector(".second-image");
  image2.src = image;
  image1.addEventListener("load", () => {
    image1.classList.add("main-image-visible");
  });
  image2.addEventListener("load", () => {
    image2.classList.add("second-image-visible");
  });

  const cta_button = document.querySelector(".hero-cta-button");
  cta_button.href = `/blog/blog-post.html?id=${post.id}`;
}

main();
