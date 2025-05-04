import { getUser } from "../store/userStore.js";
import { logout } from "../store/userStore.js";
import { Notyf } from "notyf";

var notyf = new Notyf({
  duration: 1200,
  position: {
    x: 'right',
    y: 'top',
  }});


  export async function renderHeader() {
    const userData = await getUser();
    const headerNav = document.querySelector("#header-nav");
  
    //links for both 
    const baseLinks = `
      <a class="hover:scale-90 transition" title="home" href="./index.html">
        <ion-icon name="home-outline"></ion-icon>
      </a>
      <a class="hover:scale-90 transition" title="menu" href="./menu.html">
        <ion-icon name="fast-food-outline"></ion-icon>
      </a>
      <a class="hover:scale-90 transition" title="about" href="./about.html">
        <ion-icon name="restaurant-outline"></ion-icon>
      </a>
      <a class="hover:scale-90 transition" title="contact" href="./contact.html">
        <ion-icon name="call-outline"></ion-icon>
      </a>
    `;
  
    // I logged in
    if (userData) {
      headerNav.innerHTML = `
        ${baseLinks}
        <a class="hover:scale-90 transition" title="${userData.username}" href="./profile.html">
          <img src="${userData.profileImage}" class="rounded-full w-6 h-6 object-cover">
        </a>
        ${
          userData.role === "admin"
            ? `<a class="hover:scale-90 transition" title="admin panel" href="/admin-dashboard.html">
                <ion-icon name="bag-outline"></ion-icon>
              </a>`
            : ""
        }
        <button class="log-out hover:scale-90 transition" title="log out">
          <ion-icon name="download-outline"></ion-icon>
        </button>
      `;
  
      // Logout event listener
      document.querySelector(".log-out").addEventListener("click", () => {
        logout();
        renderHeader();
        notyf.success("User logged out successfully!");
      });
    } 
    // Inot logged in
    else {
      headerNav.innerHTML = `
        ${baseLinks}
        <a id="login-link" class="hover:scale-90 transition" title="login" href="./login.html">
          <ion-icon name="log-in-outline"></ion-icon>
        </a>
        <a id="register-link" class="hover:scale-90 transition" title="register" href="./register.html">
          <ion-icon name="person-add-outline"></ion-icon>
        </a>
      `;
    }
  }
  