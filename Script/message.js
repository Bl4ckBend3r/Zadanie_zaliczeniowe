export function mailBox() {
  document.addEventListener("DOMContentLoaded", () => {
    const messageContainer = document.getElementById("messagesList");
    if (!messageContainer) {
      console.warn("Messages container not found on the page.");
      return;
    }


    const defaultMessages = [
      {
        name: "Karol",
        email: "karol@email.com",
        message: "Hello, I've reviewed your impressive portfolio and am interested in discussing a potential collaboration. Please call me at 712-218-123 to talk further.",
      },
      {
        name: "Ernest",
        email: "ernest@email.com",
        message: "Hello, Please call me at 351-152-555 to talk further..",
      },
      {
        name: "Jan",
        email: "jan@email.com",
        message: "Welcome Jan. You created a really nice project.",
      },
    ];


    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];

    const allMessages = [...defaultMessages, ...storedMessages];

    messageContainer.innerHTML = "";
    allMessages.forEach((msg) => {
      const messageItem = document.createElement("div");
      messageItem.classList.add("message-item");
      messageItem.innerHTML = `
              <p><strong>
              Name: ${msg.name}
              Email: ${msg.email}
              Message: ${msg.message}
              </p></strong>
          `;
      messageContainer.appendChild(messageItem);
    });
  });
}
