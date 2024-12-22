export function initProjects() {
  const projectsContainer = document.querySelector(".projects");

  if (!projectsContainer) {
    console.error("Projects container not found!");
    return null;
  }

  return function addProject(project) {

    const defaultProjects = [
      { title: "Calculator", technologies: ["HTML"] },
      { title: "Non-governmental organization", technologies: ["HTML", "CSS"] },
      { title: "Calculator Program", technologies: ["JavaScript"] },
      { title: "Calculator", technologies: ["HTML"] },
      { title: "Non-governmental organization", technologies: ["HTML", "CSS"] },
    ];

    function getProjectsFromLocalStorage() {
      const projects = JSON.parse(localStorage.getItem("projects"));
      return Array.isArray(projects) ? projects : [];
    }


    function saveProjectsToLocalStorage(projects) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }


    function ensureDefaultProjects() {
      const projects = getProjectsFromLocalStorage();
      if (projects.length === 0) {
        saveProjectsToLocalStorage(defaultProjects);
        return defaultProjects;
      }
      return projects;
    }


    function createProjectElement(project) {
      const projectElement = document.createElement("div");
      projectElement.classList.add("project");
      projectElement.innerHTML = `
            <h2>${project.title}</h2>
            <ul>
                ${project.technologies
                  .map((tech) => `<li>${tech}</li>`)
                  .join("")}
            </ul>
            <div class="project-actions">
                <img src="./Photos/Trash.png" class="trash-icon" alt="Delete" />
            </div>
        `;
      return projectElement;
    }


    function loadProjects() {
      const projects = ensureDefaultProjects();
      projectsContainer.innerHTML = "";

      if (projects.length === 0) {
        projectsContainer.innerHTML = `<h2 class="empty-message">There are no projects to display.</h2>`;
      } else {
        projects.forEach((project) => {
          const projectElement = createProjectElement(project);
          projectsContainer.appendChild(projectElement);
        });
      }
    }


    function addProject(title, technologies) {
      const projects = getProjectsFromLocalStorage();
      projects.push({ title, technologies });
      saveProjectsToLocalStorage(projects);
      loadProjects();
      console.log(`Project "${title}" added successfully.`);
    }

    projectsContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("trash-icon")) {
        const projectElement = event.target.closest(".project");
        const title = projectElement.querySelector("h2").textContent;

        const projects = getProjectsFromLocalStorage();
        const updatedProjects = projects.filter(
          (project) => project.title !== title
        );
        saveProjectsToLocalStorage(updatedProjects);

        projectElement.remove();
        console.log(`Project "${title}" removed.`);
        if (updatedProjects.length === 0) {
          projectsContainer.innerHTML = `<h2 class="empty-message">There are no projects to display.</h2>`;
        }
      }
    });


    loadProjects();

    return { addProject };
  };
}
