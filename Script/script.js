import { exportPoject } from "./carusel.js";
import { initModal } from "./modal.js";
import { initTemplate } from "./template.js";
import { initProjects } from "./project.js";
import {sendMesage} from "./contact.js"

document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM content loaded. Initializing...");

    try {
        await initTemplate();
        console.log("Nawigacja i stopka załadowane.");

        const carousel = document.querySelector(".carousel");
        if (carousel) {
            console.log("Carousel detected. Initializing projects...");
            await exportPoject();
            console.log("Projekty załadowane.");
        } else {
            console.log("No carousel found on this page. Skipping project initialization.");
        }

        // Inicjalizuj projekty (domyślne i dynamiczne)
        initProjects();
        console.log("Projects initialized and default projects loaded.");

        // Inicjalizuj modal
        initModal();
        console.log("Modal zainicjalizowany.");

        sendMesage();
    } catch (error) {
        console.error("Błąd podczas inicjalizacji strony:", error);
    }
});
