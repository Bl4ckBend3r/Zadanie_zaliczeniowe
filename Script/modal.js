export function initModal() {
  const addProjectBtn = document.querySelector(".add_project button");
  const modal = document.getElementById("projectModal");
  const closeModalBtn = document.getElementById("closeModal");
  const addProjectConfirmBtn = document.getElementById("addProjectBtn");
  const projectTitleInput = document.getElementById("projectTitle");
  const technologiesInput = document.getElementById("technologies");
  const projectsContainer = document.querySelector(".projects");

  function createProject(title, technologies) {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");
    projectElement.innerHTML = `
          <h2>${title}</h2>
          <ul>
              ${technologies.map((tech) => `<li>${tech.trim()}</li>`).join("")}
          </ul>
          <img src="./Photos/Trash.png" class="trash-icon" alt="Delete" />
      `;
    projectsContainer.appendChild(projectElement);
    console.log(`Project "${title}" added successfully.`);
  }

  addProjectBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  addProjectConfirmBtn.addEventListener("click", () => {
    const title = projectTitleInput.value.trim();
    const technologies = technologiesInput.value.trim().split(",");

    if (title && technologies.length > 0) {
      createProject(title, technologies);
      modal.style.display = "none";
      projectTitleInput.value = "";
      technologiesInput.value = "";
    } else {
      console.error("Please fill in all fields!");
    }
  });
}
