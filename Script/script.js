import { exportPoject } from "./carusel.js";
import { initModal } from "./modal.js";
import { initTemplate } from "./template.js";
import { initProjects } from "./project.js";
import { sendMessage } from './contact.js';
import { mailBox } from "./message.js";
import {updateSkill} from "./skillYears.js"

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM content loaded. Initializing...");

  try {
    const carousel = document.querySelector(".carousel");
    if (carousel) {
      console.log("Carousel detected. Initializing projects...");
      await exportPoject();
      console.log("Projekty załadowane.");
    } else {
      console.warn("No carousel found on this page. Skipping project initialization.");
    }

    if (!initProjects()) {
      console.warn("Projects container not found! Skipping project initialization.");
    }

    initModal();
    console.log("Modal initialization.");

    await initTemplate();
    

    sendMessage();
    mailBox();


    updateSkill();
  } catch (error) {
    console.error("Błąd podczas inicjalizacji strony:", error);
  }
});

