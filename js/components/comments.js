import showDialog from "../functions/showDialog.js";
import { validateEmail } from "../helpers/validate.js";

export default function comments(post_id) {
  const commentButton = document.querySelector("#comment_submit_button");
  commentButton.addEventListener("click", (e) => {
    e.preventDefault();
    postComment(post_id);
  });

  const commentsDiv = document.createElement("div");
  commentsDiv.classList.add("comments");

  fetch(
    `https://wp-foodblog.kimrune.dev/wp-json/wp/v2/comments?post=${post_id}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        const commentElement = commentItem(element);
        commentsDiv.append(commentElement);
      });
    })
    .catch((error) => {
      const commentElement = document.createElement("div");
      commentElement.innerHTML = `<p>Could not fetch comments.. Please try again later.</p>`;
      commentElement.classList.add("error-alert-text");
      commentsDiv.append(commentElement);
    });
  return commentsDiv;
}

function commentItem(item, marked = false) {
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
  date.innerHTML = formatDate(item.date);
  const content = document.createElement("div");
  content.classList.add("comment__content");
  content.innerHTML = item.content.rendered;
  comment.append(author);
  comment.append(date);
  comment.append(content);
  return comment;
}

function formatDate(date) {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth().toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");
  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function clearForm() {
  document.querySelector("#author_name").value = "";
  document.querySelector("#author_email").value = "";
  document.querySelector("#content").value = "";
}

function validateForm() {
  const name = document.querySelector("#author_name").value;
  const email = document.querySelector("#author_email").value;
  const content = document.querySelector("#content").value;
  const name_error = document.querySelector("#name_error");
  const email_error = document.querySelector("#email_error");
  const message_error = document.querySelector("#message_error");

  let invalid = false;

  if (name.length === 0) {
    name_error.classList.add("show");
    invalid = true;
  } else {
    name_error.classList.remove("show");
  }

  if (!validateEmail(email)) {
    email_error.classList.add("show");
    invalid = true;
  } else {
    email_error.classList.remove("show");
  }

  if (content.length < 3) {
    message_error.classList.add("show");
    invalid = true;
  } else {
    message_error.classList.remove("show");
  }

  return !invalid;
}

function postComment(post_id) {
  if (!validateForm()) {
    return;
  }

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
      const commentElement = commentItem(data, true);
      commentsDiv.append(commentElement);
      clearForm();
      showDialog("Comment added", "Thank you for your comment!");
    })
    .catch((error) => {
      showDialog("Could not add comment", "Please try again later." + error);
    });
}
