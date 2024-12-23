import { initProjects } from "./project.js";
import { showError, hideError, resetErrors } from "./error.js";

export function initModal() {
  const { addProject } = initProjects() || {};
  if (!addProject) {
    console.warn(
      "addProject function not available. Check if the projects container exists."
    );
    return;
  }
  const messagesContainer = document.querySelector("#messages-container");
  if (!messagesContainer) {
    console.warn("Messages container not found on the page.");
    return;
  }

  const modal = document.getElementById("projectModal");
  const addProjectBtn = document.querySelector(".add_project button");
  const closeModalBtn = document.getElementById("closeModal");
  const addProjectConfirmBtn = document.getElementById("addProjectBtn");
  const projectTitleInput = document.getElementById("projectTitle");
  const technologiesInput = document.getElementById("technologies");

  if (!modal || !addProjectBtn || !closeModalBtn || !addProjectConfirmBtn) {
    console.error("Modal elements not found. Check your HTML.");
    return;
  }

  addProjectBtn.addEventListener("click", () => {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
    resetErrors([projectTitleInput, technologiesInput]);
    projectTitleInput.value = "";
    technologiesInput.value = "";
  });

  closeModalBtn.addEventListener("click", () => {
    closeModal();
  });

  addProjectConfirmBtn.addEventListener("click", () => {
    const isTitleValid = validateTitle(projectTitleInput);
    const isTechnologiesValid = validateTechnologies(technologiesInput);

    if (isTitleValid && isTechnologiesValid) {
      addProject(
        projectTitleInput.value.trim(),
        technologiesInput.value.trim().split(",")
      );
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
    resetErrors([projectTitleInput, technologiesInput]);
  }

  function validateTitle(input) {
    const value = input.value.trim();
    if (value.length < 3) {
      showError(input, "The title must be at least 3 characters long.");
      return false;
    } else if (value.length > 30) {
      showError(input, "The title must not exceed 30 characters.");
      return false;
    }
    hideError(input);
    return true;
  }

  function validateTechnologies(input) {
    const value = input.value.trim();
    if (value === "") {
      showError(input, "Please add some technologies.");
      return false;
    }
    hideError(input);
    return true;
  }
}
