export function initModal() {
    const addProjectBtn = document.querySelector(".add_project button");
    const modal = document.getElementById("projectModal");
    const closeModalBtn = document.getElementById("closeModal");
    const addProjectConfirmBtn = document.getElementById("addProjectBtn");
    const projectTitleInput = document.getElementById("projectTitle");
    const technologiesInput = document.getElementById("technologies");
    const projectsContainer = document.querySelector(".projects");
  

    addProjectBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  

    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  

    addProjectConfirmBtn.addEventListener("click", () => {
      const title = projectTitleInput.value.trim();
      const technologies = technologiesInput.value.trim();
  
      if (title && technologies) {
        const newProject = document.createElement("div");
        newProject.classList.add("project");
        newProject.innerHTML = `
          <h2>${title}</h2>
          <ul>
            ${technologies
              .split(",")
              .map((tech) => `<li>${tech.trim()}</li>`)
              .join("")}
          </ul>
        `;
  
        projectsContainer.appendChild(newProject);
        modal.style.display = "none";
        projectTitleInput.value = "";
        technologiesInput.value = "";
      }
    });
  }
  