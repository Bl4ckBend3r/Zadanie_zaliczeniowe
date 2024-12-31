import { restoreDefaults } from "./defaultRestore.js";

export function initProjects() {
    const projectsContainer = document.querySelector(".projects");
    if (!projectsContainer) {
      console.warn("Projects container not found! Skipping initialization.");
      return null;
    }

    const defaultProjects = [
        { title: "Calculator", technologies: ["HTML"] },
        { title: "Non-governmental organization", technologies: ["HTML", "CSS"] },
        { title: "Calculator Program", technologies: ["JavaScript"] },
        { title: "Calculator", technologies: ["HTML"] },
        { title: "Non-governmental organization", technologies: ["HTML", "CSS"] },
    ];

    function addProject(title, technologies) {
        const projects = getProjectsFromLocalStorage();
        projects.push({ title, technologies });
        saveProjectsToLocalStorage(projects);
        loadProjects();
        console.log(`Project "${title}" added successfully.`);
    }

    function removeProject(title) {
        let projects = getProjectsFromLocalStorage();
        projects = projects.filter((project) => project.title !== title);
        saveProjectsToLocalStorage(projects);
        loadProjects();
        console.log(`Project "${title}" removed successfully.`);
    }

    function getProjectsFromLocalStorage() {
        return restoreDefaults("projects", defaultProjects);
    }

    function saveProjectsToLocalStorage(projects) {
        localStorage.setItem("projects", JSON.stringify(projects));
    }

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

        const trashIcon = projectElement.querySelector(".trash-icon");
        trashIcon.addEventListener("click", () => {
            removeProject(project.title);
        });

        return projectElement;
    }

    function loadProjects() {
        const projects = getProjectsFromLocalStorage();
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

    loadProjects();

    return { addProject };
}
