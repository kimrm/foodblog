import showDialog from "../functions/showDialog.js";
import { validateEmail } from "../helpers/validate.js";

export default function contact() {
  const btn = document.querySelector("#contact_submit_button");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const nameElement = document.querySelector("#contact_name");
    const emailElement = document.querySelector("#contact_email");
    const subjectElement = document.querySelector("#contact_subject");
    const messageElement = document.querySelector("#contact_message");
    const name = nameElement.value;
    const email = emailElement.value;
    const subject = subjectElement.value;
    const message = messageElement.value;

    let hasErrors = false;
    if (message.length < 25) {
      const message_error = document.querySelector("#message_error");
      message_error.classList.add("show");
      messageElement.focus();
      hasErrors = true;
    } else {
      const message_error = document.querySelector("#message_error");
      message_error.classList.remove("show");
    }
    if (subject.length < 15) {
      const subject_error = document.querySelector("#subject_error");
      subject_error.classList.add("show");
      subjectElement.focus();
      hasErrors = true;
    } else {
      const subject_error = document.querySelector("#subject_error");
      subject_error.classList.remove("show");
    }
    if (validateEmail(email) === false) {
      const email_error = document.querySelector("#email_error");
      email_error.classList.add("show");
      emailElement.focus();
      hasErrors = true;
    } else {
      const email_error = document.querySelector("#email_error");
      email_error.classList.remove("show");
    }
    if (name.length < 5) {
      const name_error = document.querySelector("#name_error");
      name_error.classList.add("show");
      nameElement.focus();
      hasErrors = true;
    } else {
      const name_error = document.querySelector("#name_error");
      name_error.classList.remove("show");
    }

    if (hasErrors) {
      return false;
    }

    const formElement = document.querySelector("#contact_form");
    const formData = new FormData(formElement);

    fetch(
      "https://wp-foodblog.kimrune.dev/wp-json/contact-form-7/v1/contact-forms/53/feedback",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "mail_sent") {
          clearForm();
          showDialog("Email sent", data.message);
        } else {
          showDialog("Could not send email", data.message, "error");
        }
      })
      .catch((error) => {
        showDialog("Could not send email", error, "error");
      });
  });
}

function clearForm() {
  const nameElement = document.querySelector("#contact_name");
  const emailElement = document.querySelector("#contact_email");
  const subjectElement = document.querySelector("#contact_subject");
  const messageElement = document.querySelector("#contact_message");
  nameElement.value = "";
  emailElement.value = "";
  subjectElement.value = "";
  messageElement.value = "";
}
