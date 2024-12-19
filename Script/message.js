export function mailBox() {
  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const name = params.get("name");
    const email = params.get("email");
    const message = params.get("message");

    const messageContainer = document.getElementById("message-container");

    if (name && email && message) {
      messageContainer.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `;
    } else {
      messageContainer.textContent = "No message data received.";
    }
  });
}
