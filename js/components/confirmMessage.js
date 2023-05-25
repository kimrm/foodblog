export default function confirmMessage(title, message) {
  const errorDialog = document.createElement("dialog");
  const dialogBody = document.createElement("div");
  dialogBody.classList.add("dialog-body");
  const h2Title = document.createElement("h2");
  h2Title.innerHTML = title;
  const pMessage = document.createElement("p");
  pMessage.innerHTML = message;
  const button = document.createElement("button");
  button.classList.add("dialog-ok-button");
  button.innerHTML = "Hoooray!";
  button.addEventListener("click", () => {
    errorDialog.close();
  });
  dialogBody.append(h2Title, pMessage, button);
  errorDialog.append(dialogBody);
  const body = document.querySelector("body");
  body.appendChild(errorDialog);

  errorDialog.showModal();
}
