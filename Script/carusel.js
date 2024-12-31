export function exportPoject() {
    console.log("Starting carousel initialization...");

    const prevBtn = document.querySelector(".carousel-control.prev");
    const nextBtn = document.querySelector(".carousel-control.next");
    const carousel = document.querySelector(".carousel");

    if (!carousel) {
        console.error("Error: Carousel container not found!");
        return Promise.reject(new Error("Carousel container not found!"));
    }

    if (!prevBtn || !nextBtn) {
        console.error("Error: Navigation buttons not found!");
        return Promise.reject(new Error("Navigation buttons not found!"));
    }

    console.log("Carousel and navigation buttons successfully found.");

    const visibleCount = 3;
    let startIndex = 0;

    function getProjectsFromLocalStorage() {
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        return projects;
    }

    function saveProjectsToLocalStorage(projects) {
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    const renderProjects = (projects) => {
        if (!Array.isArray(projects) || projects.length === 0) {
            console.log("No projects to display.");
            carousel.innerHTML = `
                <h2 class="empty-message">There are no projects to display.</h2>
            `;
            prevBtn.classList.add("hidden");
            nextBtn.classList.add("hidden");
            return;
        }

        if (projects.length <= visibleCount) {
            prevBtn.classList.add("hidden");
            nextBtn.classList.add("hidden");
        } else {
            prevBtn.classList.remove("hidden");
            nextBtn.classList.remove("hidden");
        }

        carousel.innerHTML = "";
        projects.forEach((project) => {
            const projectElement = document.createElement("div");
            projectElement.classList.add("project");
            projectElement.innerHTML = `
                <h2>${project.title}</h2>
                <ul>
                    ${project.technologies.map((tech) => `<li>${tech}</li>`).join("")}
                </ul>
            `;
            carousel.appendChild(projectElement);
        });
    };

    let projects = getProjectsFromLocalStorage();

    if (!Array.isArray(projects) || projects.length === 0) {
        console.log("No projects found.");
      }

    renderProjects(projects);

    let carouselProjects = Array.from(carousel.querySelectorAll(".project"));

    const updateCarousel = () => {
        if (carouselProjects.length === 0) {
            console.error("No projects available for carousel update.");
            return;
        }

        const updateVisibleProjects = () => {
            const totalProjects = carouselProjects.length;
            carouselProjects.forEach((project, index) => {
                if (
                    index === startIndex ||
                    index === (startIndex + 1) % totalProjects ||
                    index === (startIndex + 2) % totalProjects
                ) {
                    project.style.display = "block";
                } else {
                    project.style.display = "none";
                }
            });
            console.log(`Updated visible projects. Start index: ${startIndex}`);
        };

        prevBtn.addEventListener("click", () => {
            startIndex = (startIndex - 1 + carouselProjects.length) % carouselProjects.length;
            console.log("Previous button clicked.");
            updateVisibleProjects();
        });

        nextBtn.addEventListener("click", () => {
            startIndex = (startIndex + 1) % carouselProjects.length;
            console.log("Next button clicked.");
            updateVisibleProjects();
        });

        updateVisibleProjects();
    };

    updateCarousel();
}
