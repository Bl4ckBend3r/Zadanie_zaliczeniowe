import { initProjects } from './project.js';

export function initModal() {
    const { addProject } = initProjects() || {};
    if (!addProject) {
        console.warn("addProject function not available. Check if the projects container exists.");
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
        modal.classList.remove("show");
        document.body.style.overflow = "auto";
        resetErrors([projectTitleInput, technologiesInput]);
    });

    addProjectConfirmBtn.addEventListener("click", () => {
        const isTitleValid = validateTitle(projectTitleInput);
        const isTechnologiesValid = validateTechnologies(technologiesInput);

        if (isTitleValid && isTechnologiesValid) {
            addProject(projectTitleInput.value.trim(), technologiesInput.value.trim().split(","));
            modal.classList.remove("show");
            document.body.style.overflow = "auto";
            resetErrors([projectTitleInput, technologiesInput]);
        }
    });

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

    function resetErrors(inputs) {
        inputs.forEach((input) => hideError(input));
    }

    const showError = (input, message) => {
        const errorElement = input.nextElementSibling;
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add("visible");
        }
        input.classList.add("error");
    };
    
    const hideError = (input) => {
        const errorElement = input.nextElementSibling;
        if (errorElement) {
            errorElement.classList.remove("visible");
            errorElement.textContent = "";
        }
        input.classList.remove("error");
    };
    
}
