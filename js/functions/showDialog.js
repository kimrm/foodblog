export default function showDialog(title, message, type = "success") {
  const dialogElement = document.createElement("dialog");
  dialogElement.classList.add(type);
  const dialogBody = document.createElement("div");
  dialogBody.classList.add("dialog-body");
  const h2Title = document.createElement("h2");
  h2Title.innerHTML = title;
  const pMessage = document.createElement("p");
  pMessage.innerHTML = message;
  const button = document.createElement("button");
  button.classList.add("dialog-ok-button", type);
  button.innerHTML = "Okay";
  button.addEventListener("click", () => {
    dialogElement.close();
  });
  dialogBody.append(h2Title, pMessage, button);
  dialogElement.append(dialogBody);
  const body = document.querySelector("body");
  body.appendChild(dialogElement);

  dialogElement.showModal();
}
