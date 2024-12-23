export function changeTitle() {
    const hamburger = document.getElementById('hamburger');
    const navbarLinks = document.querySelector('.navbarlinks');
    
    hamburger.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
        hamburger.classList.toggle('active'); 
    });
    

  const waitForTitle = setInterval(() => {
    const pageTitle = document.getElementById("page-title");
    const pageSubtitle = document.getElementById("page-subtitle");

    if (pageTitle && pageSubtitle) {
      const currentPage = window.location.href;

      if (currentPage.includes("index.html")) {
        pageTitle.textContent = "JAN KOWALSKI";
        pageSubtitle.textContent = "WEB-DESIGNER";
      } else if (currentPage.includes("about.html")) {
        pageTitle.textContent = "ABOUT ME";
        pageSubtitle.textContent = "IT'S A-ME JAN!";
      } else if (currentPage.includes("project.html")) {
        pageTitle.textContent = "MY PROJECTS";
        pageSubtitle.textContent = "MADE WITH LOVE";
      } else if (currentPage.includes("contact.html")) {
        pageTitle.textContent = "CONTACT ME";
        pageSubtitle.textContent = "SAY HELLO TO ME";
      } else if (currentPage.includes("messages.html")) {
        pageTitle.textContent = "MESSAGES";
        pageSubtitle.textContent = "MESSAGE FROM INTERESTED PERSON";
      } else {
        pageTitle.textContent = "JAN KOWALSKI";
        pageSubtitle.textContent = "WEB-DESIGNER";
      }

      clearInterval(waitForTitle);
    }
  }, 100);
}
