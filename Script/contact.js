export function sendMessage() {
  const form = document.querySelector("#contactForm");
  if (!form) {
    console.warn("Form not found on the page. Skipping sendMessage initialization.");
    return;
}


  form.setAttribute("novalidate", "novalidate");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");


  nameInput.addEventListener("input", () => validateName(nameInput));
  emailInput.addEventListener("input", () => validateEmail(emailInput));
  messageInput.addEventListener("input", () => validateMessage(messageInput));

  function saveMessageToStorage(name, email, message) {
    const currentMessages = JSON.parse(localStorage.getItem("messages")) || [];
    currentMessages.push({ name, email, message });
    localStorage.setItem("messages", JSON.stringify(currentMessages));
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isNameValid = validateName(nameInput);
    const isEmailValid = validateEmail(emailInput);
    const isMessageValid = validateMessage(messageInput);

    if (isNameValid && isEmailValid && isMessageValid) {
      saveMessageToStorage(
        nameInput.value.trim(),
        emailInput.value.trim(),
        messageInput.value.trim()
      );
      console.log("Message saved successfully!");
      form.reset(); 
      resetErrors([nameInput, emailInput, messageInput]); 
    }
  });


  function validateName(input) {
    const value = input.value.trim();
    if (value.length < 3) {
      showError(input, "The name must be at least 3 characters long.");
      return false;
    } else if (value.length > 20) {
      showError(input, "The name must not exceed 20 characters.");
      return false;
    }
    hideError(input);
    return true;
  }

  function validateEmail(input) {
    const value = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showError(input, "Please enter a valid email address.");
      return false;
    }
    hideError(input);
    return true;
  }

  function validateMessage(input) {
    const value = input.value.trim();
    if (value === "") {
      showError(input, "The message cannot be empty.");
      return false;
    } else if (value.length > 100) {
      showError(input, "The message must not exceed 100 characters.");
      return false;
    }
    hideError(input);
    return true;
  }


  function resetErrors(inputs) {
    inputs.forEach((input) => {
      hideError(input);
    });
  }


  function showError(input, message) {
    const errorElement = input.nextElementSibling;
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.remove("hidden");
    }
    input.classList.add("error");
  }

  function hideError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement) {
      errorElement.classList.add("hidden");
      errorElement.textContent = "";
    }
    input.classList.remove("error");
  }
}
