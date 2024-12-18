export function exportPoject() {
  const carousel = document.querySelector(".carousel");

  if (!carousel) {
    console.error("Nie znaleziono elementu '.carousel' w DOM.");
    return;
  }

  fetch("./project.html")
    .then((response) => {
      if (!response.ok) throw new Error(`Błąd: ${response.statusText}`);
      return response.text();
    })
    .then((html) => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;

      const projectElements = tempDiv.querySelectorAll(".project");
      if (projectElements.length === 0) {
        console.warn("Brak elementów '.project' w pliku project.html.");
      }

      projectElements.forEach((project, index) => {
        if (index < 3) {
          project.classList.add("visible");
        } else {
          project.classList.add("hidden");
        }
        carousel.appendChild(project.cloneNode(true));
      });

      console.log("Projekty zostały załadowane.");
      initializeCarouselControls(); 
    })
    .catch((error) => console.error("Błąd podczas ładowania projektów:", error));

    function initializeCarouselControls() {
      const prevBtn = document.querySelector(".carousel-control.prev");
      const nextBtn = document.querySelector(".carousel-control.next");
      const projects = document.querySelectorAll(".carousel .project");
    
      if (!prevBtn || !nextBtn || projects.length === 0) {
        console.error("Brak elementów kontrolnych lub projektów.");
        return;
      }
    
      let startIndex = 0; 
      const visibleCount = 3;
    
      const updateVisibleProjects = () => {
        projects.forEach((project, index) => {
          if (index >= startIndex && index < startIndex + visibleCount) {
            project.classList.add("visible");
            project.classList.remove("hidden");
          } else {
            project.classList.add("hidden");
            project.classList.remove("visible");
          }
        });
      };
    
      prevBtn.addEventListener("click", () => {
        startIndex = (startIndex - visibleCount + projects.length) % projects.length;
        updateVisibleProjects();
      });
    
      nextBtn.addEventListener("click", () => {
        startIndex = (startIndex + visibleCount) % projects.length;
        updateVisibleProjects();
      });
    
      updateVisibleProjects(); 
    }
    
  }
