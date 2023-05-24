import errorMessage from "./errorMessage.js";

//https://wp-foodblog.kimrune.dev/introducing-mollers-kitchen-a-culinary-journey-for-the-quality-minded-amateur-chef/

export default function aboutPage() {
  fetch(
    "https://wp-foodblog.kimrune.dev/wp-json/wp/v2/pages/45?_embed=wp:featuredmedia"
  )
    .then((response) => response.json())
    .then((data) => {
      const article = document.querySelector(".about-page");
      const img = document.createElement("img");
      img.src = data._embedded["wp:featuredmedia"][0].source_url;
      img.alt = data._embedded["wp:featuredmedia"][0].alt_text;
      img.classList.add("about-page__img");
      img.addEventListener("load", () => {
        img.classList.add("img-loaded");
      });
      const h1 = document.createElement("h1");
      h1.innerHTML = data.title.rendered;
      const p = document.createElement("p");
      p.innerHTML = data.content.rendered;
      article.append(h1);
      article.append(img);
      article.append(p);
    })
    .catch((error) => {
      errorMessage(
        "Oh no, that's not supposed to happen!",
        "Something went wrong. Please try again later."
      );
    });
}
