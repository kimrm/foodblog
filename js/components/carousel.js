export default function carousel(posts) {
  return createCarousel(posts);
}

function slide(posts, container, position) {
  const columns = createGrid(posts, position);
  container.classList.remove("out");
  container.append(...columns);
}

function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function createCarousel(posts) {
  let position = 0;

  const carousel = document.createElement("div");
  carousel.classList.add("carousel");

  const grid = document.createElement("div");
  grid.classList.add("posts-grid");

  slide(posts, grid, position);

  const spanCarouselButtonLeft = document.createElement("span");
  spanCarouselButtonLeft.classList.add("carousel__button-container", "left");
  const spanCarouselButtonRight = document.createElement("span");
  spanCarouselButtonRight.classList.add("carousel__button-container", "right");
  const buttonLeft = document.createElement("button");
  buttonLeft.classList.add("carousel__button");
  buttonLeft.textContent = "back";
  const buttonRight = document.createElement("button");
  buttonRight.classList.add("carousel__button");
  buttonRight.textContent = "next";
  buttonRight.addEventListener("click", () => {
    grid.classList.add("out");
    setTimeout(() => {
      removeChildren(grid);
    }, 1000);

    position += 3;
    console.log(position, posts.length);
    if (position > posts.length) {
      position = posts.length - position;
    }
    if (position + 3 > posts.length) {
      spanCarouselButtonRight.classList.add("hide");
    }
    spanCarouselButtonLeft.classList.remove("hide");
    slide(posts, grid, position);
  });
  buttonLeft.addEventListener("click", () => {
    removeChildren(grid);
    position -= 3;
    slide(posts, grid, position);
    if (position === 0) {
      spanCarouselButtonLeft.classList.add("hide");
    }
    spanCarouselButtonRight.classList.remove("hide");
  });

  if (position === 0) {
    spanCarouselButtonLeft.classList.add("hide");
  }
  spanCarouselButtonLeft.append(buttonLeft);
  spanCarouselButtonRight.append(buttonRight);

  carousel.append(spanCarouselButtonLeft, spanCarouselButtonRight, grid);

  return carousel;
}

function createGrid(data, position, count = 3) {
  const displayPosts = data.slice(position, position + count);

  const columns = displayPosts.map((post) => {
    const post_column = document.createElement("div");
    post_column.classList.add("posts-column");
    post_column.innerHTML = `
        <img
        class="posts-column__image"
        src="${post._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url}"
        alt=""
        />`;
    return post_column;
  });

  return columns;
}
