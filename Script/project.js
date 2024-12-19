export function initProjects() {
  const projectsContainer = document.querySelector(".projects");

  if (!projectsContainer) {
    console.error("Projects container not found!");
    return;
  }

  const defaultProjects = [
    { title: "Calculator", technologies: ["HTML"] },
    { title: "Non-governmental organization", technologies: ["HTML", "CSS"] },
    { title: "Calculator Program", technologies: ["JavaScript"] },
    { title: "Calculator", technologies: ["HTML"] },
    { title: "Non-governmental organization", technologies: ["HTML", "CSS"] },
  ];

  function createProjectElement(project) {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");
    projectElement.innerHTML = `
        <h2>${project.title}</h2>
        <ul>
          ${project.technologies.map((tech) => `<li>${tech}</li>`).join("")}
        </ul>
        <div class="project-actions">
          <img src="./Photos/Trash.png" class="trash-icon" alt="Delete" />
        </div>
      `;
    return projectElement;
  }

  function loadDefaultProjects() {
    defaultProjects.forEach((project) => {
      const projectElement = createProjectElement(project);
      projectsContainer.appendChild(projectElement);
    });
  }

  function handleProjectActions(event) {
    if (event.target.classList.contains("trash-icon")) {
      const projectElement = event.target.closest(".project");
      if (projectElement) {
        projectElement.remove();
        console.log("Project removed.");
      }
    }
  }

  projectsContainer.addEventListener("click", handleProjectActions);
  loadDefaultProjects();
}
export function getDefaultProjects() {
  return [
    { title: "Calculator", technologies: ["HTML"] },
    { title: "Non-governmental organization", technologies: ["HTML", "CSS"] },
    { title: "Calculator Program", technologies: ["JavaScript"] },
    { title: "Calculator", technologies: ["HTML"] },
    { title: "Non-governmental organization", technologies: ["HTML", "CSS"] },
  ];
}
