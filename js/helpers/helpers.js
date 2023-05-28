export function currentPage() {
  const url = window.location.pathname;
  let page = "home";
  switch (url) {
    case "/":
    case "/index.html":
      page = "home";
      break;
    case "/blog/":
    case "/blog/index.html":
      page = "blog";
      break;
    case "/blog/blog-post.html":
      page = "blog-post";
      break;
    case "/about/":
    case "/about/index.html":
      page = "about";
      break;
    case "/contact/":
    case "/contact/index.html":
      page = "contact";
      break;
  }
  return page;
}
