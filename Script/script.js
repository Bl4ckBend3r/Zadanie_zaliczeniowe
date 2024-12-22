import { exportPoject } from "./carusel.js";
import { initModal } from "./modal.js";
import { initTemplate } from "./template.js";
import { initProjects } from "./project.js";
import { sendMessage } from './contact.js';
import { mailBox } from "./message.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM content loaded. Initializing...");

  try {
    const carousel = document.querySelector(".carousel");
    if (carousel) {
      console.log("Carousel detected. Initializing projects...");
      await exportPoject();
      console.log("Projekty załadowane.");
    } else {
      console.log(
        "No carousel found on this page. Skipping project initialization."
      );
    }

    const projectsInitialized = initProjects();
    if (projectsInitialized) {
      console.log("Projekty załadowane.");
    }

    initModal();
    console.log("Modal zainicjalizowany.");

    await initTemplate();
    console.log("Nawigacja i stopka załadowane.");

    sendMessage();
    mailBox();
  } catch (error) {
    console.error("Błąd podczas inicjalizacji strony:", error);
  }
});
