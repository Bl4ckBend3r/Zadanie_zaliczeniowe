import { exportPoject } from "./project.js";
import { initModal } from "./modal.js";
import { initTemplate } from "./template.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
   
    await initTemplate();
    console.log("Nawigacja i stopka załadowane.");


    exportPoject();
    console.log("Projekty załadowane.");


    initModal();
    console.log("Modal zainicjalizowany.");
  } catch (error) {
    console.error("Błąd podczas inicjalizacji strony:", error);
  }
});
