import { changeTitle } from "./navbartitle.js";

export function initTemplate() {
    const fetchNavbar = fetch("./navbar.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("navbar-placeholder").innerHTML = data;
        });

    const fetchFooter = fetch("./footer.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("footer-placeholder").innerHTML = data;
        });

    Promise.all([fetchNavbar, fetchFooter]).then(() => {
        console.log("Navbar and footer loaded");
        changeTitle();

        const currentPath = window.location.pathname;

        const navbarLinks = document.querySelectorAll('.navbarlinks a');
        navbarLinks.forEach(link => {
            if (link.getAttribute('href') === `.${currentPath}` || link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });

        const footerLinks = document.querySelectorAll('.ftrlinks a');
        footerLinks.forEach(link => {
            if (link.getAttribute('href') === `.${currentPath}` || link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    });
}
