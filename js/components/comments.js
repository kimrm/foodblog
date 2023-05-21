export default function comments(post_id) {
  //https://wp-foodblog.kimrune.dev/wp-json/wp/v2/comments

  const commentButton = document.querySelector("#comment_submit_button");
  commentButton.addEventListener("click", (e) => {
    e.preventDefault();
    addComment(post_id);
  });

  fetch(
    `https://wp-foodblog.kimrune.dev/wp-json/wp/v2/comments?post=${post_id}`
  )
    .then((response) => response.json())
    .then((data) => {
      const commentsDiv = document.querySelector(".comments");
      data.forEach((element) => {
        const commentElement = createComment(element);
        commentsDiv.append(commentElement);
      });
    });
}

function createComment(item, marked = false) {
  const comment = document.createElement("div");
  comment.classList.add("comment");
  if (marked) {
    comment.classList.add("marked");
  }
  const author = document.createElement("div");
  author.classList.add("comment__author");
  author.innerHTML = item.author_name;
  const date = document.createElement("div");
  date.classList.add("comment__date");
  date.innerHTML = item.date;
  const content = document.createElement("div");
  content.classList.add("comment__content");
  content.innerHTML = item.content.rendered;
  comment.append(author);
  comment.append(date);
  comment.append(content);
  return comment;
}

function addComment(post_id) {
  const psw = "SVFm 61b0 tlPg 5xbW PYrh mkFh";
  const user = "krmadmin";
  const encoded = btoa(user + ":" + psw);

  const formData = {
    author_name: document.querySelector("#author_name").value,
    author_email: document.querySelector("#author_email").value,
    content: document.querySelector("#content").value,
    post: post_id,
  };

  fetch("https://wp-foodblog.kimrune.dev/wp-json/wp/v2/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${encoded}`,
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      const commentsDiv = document.querySelector(".comments");
      const commentElement = createComment(data, true);
      commentsDiv.append(commentElement);
    });
}
