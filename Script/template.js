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
    });
}
