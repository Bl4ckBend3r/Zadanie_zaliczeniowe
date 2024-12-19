export function sendMesage() {
    document.addEventListener("DOMContentLoaded", () => {
      const contactForm = document.getElementById("contact-form");
      const nameField = document.getElementById("name");
      const emailField = document.getElementById("email");
      const messageField = document.getElementById("message");
  
      const fields = [nameField, emailField, messageField];
  
      fields.forEach((field) => {
        field.addEventListener("input", () => {
          validateField(field);
        });
      });
  
      contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
  
        let isValid = true;
  
        fields.forEach((field) => {
          if (!validateField(field)) {
            isValid = false;
          }
        });
  
        if (isValid) {
          const queryParams = new URLSearchParams({
            name: nameField.value.trim(),
            email: emailField.value.trim(),
            message: messageField.value.trim(),
          }).toString();
  
          window.location.href = `./messages.html?${queryParams}`;
        }
      });
  
      function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
  
        resetError(field);
  
        if (field.id === "name" && value.length < 3) {
          showError(field, "The name must be at least 3 characters long.");
          isValid = false;
        }
  
        if (field.id === "email" && !validateEmail(value)) {
          showError(field, "Please enter a valid email address.");
          isValid = false;
        }
  
        if (field.id === "message" && value.length === 0) {
          showError(field, "The message cannot be empty.");
          isValid = false;
        }
  
        return isValid;
      }
  
      function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      }
  
      function showError(field, message) {
        const errorElement = field.nextElementSibling;
        field.classList.add("error");
        errorElement.textContent = message;
        errorElement.classList.remove("hidden");
      }
  
      function resetError(field) {
        field.classList.remove("error");
        const errorElement = field.nextElementSibling;
        errorElement.textContent = "";
        errorElement.classList.add("hidden");
      }
    });
  }
  