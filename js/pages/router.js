import index from "./index.js";
import blogIndex from "./blogIndex.js";
import blogPost from "./blogPost.js";
import aboutIndex from "./aboutIndex.js";
import contactIndex from "./contactIndex.js";
import search from "./search.js";
import HeaderElement from "../components/header.js";

export default function router() {
  const url = window.location.pathname;

  switch (url) {
    case "/":
    case "/index.html":
      setHeader("home");
      index();
      break;
    case "/blog/":
    case "/blog/index.html":
      setHeader("blog");
      blogIndex();
      break;
    case "/blog/blog-post.html":
      setHeader("blog");
      blogPost();
      break;
    case "/about/":
    case "/about/index.html":
      setHeader("about");
      aboutIndex();
      break;
    case "/contact/":
    case "/contact/index.html":
      setHeader("contact");
      contactIndex();
      break;
    case "/blog/search.html":
      setHeader("search");
      search();
  }
}

function setHeader(page) {
  const header = document.querySelector("header");
  if (header) {
    header.append(HeaderElement(page));
  }
}
