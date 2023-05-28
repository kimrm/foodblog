import { currentPage } from "../helpers/helpers.js";

export default function footer() {
  const footer_grid = document.createElement("div");
  footer_grid.classList.add("footer-grid");

  const container = document.createElement("div");
  container.classList.add("container");

  const about_teaser = document.createElement("div");
  about_teaser.classList.add("about-teaser");

  const h3 = document.createElement("h3");
  h3.innerHTML = "Møllers Kitchen Food Blog";

  const p = document.createElement("p");
  p.innerHTML =
    "Welcome to Møllers Kitchen, a haven for all food enthusiasts who strive to elevate their culinary skills and indulge in exceptional flavors. We are here to inspire and guide the quality-minded amateur chef in their pursuit of delicious dishes and culinary excellence.";

  const a = document.createElement("a");
  a.classList.add("cta-button");
  a.href = "/about";
  a.innerHTML = "Read more in about us";

  about_teaser.append(h3, p, a);

  const copy_right = document.createElement("div");
  copy_right.classList.add("copyright");

  const copy_right_p = document.createElement("p");
  copy_right_p.innerHTML = "Copyright &copy; 2023 kimrune.dev";

  copy_right.append(copy_right_p);

  if (currentPage() !== "about") {
    container.append(about_teaser);
  }

  container.append(copy_right);

  footer_grid.append(container);

  return footer_grid;
}
