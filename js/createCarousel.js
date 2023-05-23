export default function createCarousel(posts) {
  const container = document.querySelector(".carousel");
  const posts_grid = document.querySelector(".posts-grid");
  const button_left = document.querySelector("#button_left");
  const button_right = document.querySelector("#button_right");

  let position = 0;
  const count = 3;
  const columns = createGrid(posts, position, count);
  posts_grid.append(...columns);
  setTimeout(() => {
    clearAnimations();
  }, 1000);

  button_right.addEventListener("click", () => {
    position += count;
    setSlideOut();
    setTimeout(() => {
      insertPosts(posts, position, count);
    }, 500);
  });

  button_left.addEventListener("click", () => {
    position -= count;
    setSlideOut();
    setTimeout(() => {
      insertPosts(posts, position, count);
    }, 500);
  });
}

function clearAnimations() {
  const columns = document.querySelectorAll(".posts-column");
  columns.forEach((column) => {
    column.classList.remove("slidable");
    column.classList.remove("out");
    column.classList.remove("in");
  });
}

function insertPosts(data, position, count = 3) {
  const displayPosts = data.slice(position, position + count);
  const columns = document.querySelectorAll(".posts-column");
  let i = 0;
  columns.forEach((column) => {
    column.href = `/blog/blog-post.html?id=${displayPosts[i].id}`;
    column.classList.remove("in");
    const img = column.querySelector("img");
    img.classList.add("posts-column__image");
    img.src = `${displayPosts[i]._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url}`;
    const title = column.querySelector("h3");
    title.classList.add("posts-column__title");
    title.innerHTML = `${displayPosts[i].title.rendered}`;
    img.addEventListener("load", () => {
      column.classList.add("in");
      setTimeout(() => {
        column.classList.remove("out");
        column.classList.remove("in");
      }, 1000);
    });
    i++;
  });
}

function setSlideOut() {
  const columns = document.querySelectorAll(".posts-column");
  columns.forEach((column) => {
    setTimeout(() => {
      column.classList.remove("slidable");
      column.classList.remove("in");
      column.classList.add("out");
    }, 200);
  });
}

function createGrid(data, position, count = 3) {
  const displayPosts = data.slice(position, position + count);

  const columns = displayPosts.map((post) => {
    const post_column_a = document.createElement("a");
    post_column_a.href = `/blog/blog-post.html?id=${post.id}`;
    post_column_a.classList.add("posts-column", "slidable");

    const img = document.createElement("img");
    img.classList.add("posts-column__image");
    img.src = `${post._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url}`;
    img.addEventListener("load", () => {
      post_column_a.classList.add("in");
    });
    const title = document.createElement("h3");
    title.classList.add("posts-column__title");
    title.innerHTML = `${post.title.rendered}`;

    post_column_a.append(img, title);

    return post_column_a;
  });

  return columns;
}
