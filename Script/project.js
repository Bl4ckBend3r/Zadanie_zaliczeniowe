import { restoreDefaults } from "./defaultRestore.js";

export function initProjects() {
    const projectsContainer = document.querySelector(".projects");
    if (!projectsContainer) {
        console.warn("Projects container not found! Skipping initialization.");
        return null;
    }

    const defaultProjects = [
        { id: generateId(), title: "Calculator", technologies: ["HTML"] },
        { id: generateId(), title: "Non-governmental organization", technologies: ["HTML", "CSS"] },
        { id: generateId(), title: "Calculator Program", technologies: ["JavaScript"] },
        { id: generateId(), title: "Calculator", technologies: ["HTML"] },
        { id: generateId(), title: "Non-governmental organization", technologies: ["HTML", "CSS"] },
    ];

    function generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    function addProject(title, technologies) {
        let projects = getProjectsFromLocalStorage();
        projects.push({ id: generateId(), title, technologies });
        saveProjectsToLocalStorage(projects);
        console.log(`Project "${title}" added successfully.`);
        loadProjects();
    }

    function removeProject(id) {
        let projects = getProjectsFromLocalStorage();
        const filteredProjects = projects.filter((project) => project.id !== id);

        if (filteredProjects.length !== projects.length) {
            saveProjectsToLocalStorage(filteredProjects);
            console.log(`Project with ID "${id}" removed successfully.`);
            loadProjects();
        } else {
            console.warn(`Project with ID "${id}" not found. No action taken.`);
        }
    }

    function getProjectsFromLocalStorage() {
        const storedProjects = JSON.parse(localStorage.getItem("projects"));
        console.log("Retrieved projects from localStorage:", storedProjects);
        return storedProjects || restoreDefaults("projects", defaultProjects);
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
            console.log(`Attempting to remove project with ID: ${project.id}`);
            removeProject(project.id);
        });

        return projectElement;
    }

    function loadProjects() {
        const projects = getProjectsFromLocalStorage();
        console.log("Loading projects:", projects);

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
