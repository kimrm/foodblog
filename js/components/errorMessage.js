export default function errorMessage(title, message) {
  const errorDialog = document.createElement("dialog");
  const h2Title = document.createElement("h2");
  h2Title.innerHTML = title;
  const pMessage = document.createElement("p");
  pMessage.innerHTML = message;
  const button = document.createElement("button");
  button.innerHTML = "Close";
  button.addEventListener("click", () => {
    errorDialog.close();
  });
  errorDialog.append(h2Title);
  errorDialog.append(pMessage);
  errorDialog.append(button);
  const body = document.querySelector("body");
  body.appendChild(errorDialog);

  errorDialog.showModal();
}
