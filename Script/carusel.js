import { getDefaultProjects } from "./project.js";

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

  const defaultProjects = getDefaultProjects();

  
  const renderProjects = (projects) => {
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

  renderProjects(defaultProjects);

  let carouselProjects = Array.from(carousel.querySelectorAll(".project"));

  const updateCarousel = () => {
    while (carouselProjects.length < visibleCount) {
      const clone = carouselProjects[carouselProjects.length % carouselProjects.length].cloneNode(true);
      carousel.appendChild(clone);
      carouselProjects = Array.from(carousel.querySelectorAll(".project"));
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


  window.addProjectToCarousel = (project) => {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");
    projectElement.innerHTML = `
      <h2>${project.title}</h2>
      <ul>
        ${project.technologies.map((tech) => `<li>${tech}</li>`).join("")}
      </ul>
    `;
    carousel.appendChild(projectElement);
    carouselProjects = Array.from(carousel.querySelectorAll(".project"));
    updateCarousel();
    console.log("New project added to carousel:", project.title);
  };
}
