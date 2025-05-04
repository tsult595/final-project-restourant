import { Notyf } from 'notyf';
import { getAllMenu, getMenuById } from "../services/menu/requests.js";
import { getUser } from "../store/userStore.js";
import { updateInfo } from "../services/users/requests.js";

const notyf = new Notyf({
  duration: 1200,
  position: { x: 'right', y: 'top' }
});

const menuList = document.querySelector(".menu-list");
const searchInput = document.querySelector("#search");
const filterSelect = document.querySelector("#filter");
const sortSelect = document.querySelector("#sort");

let menuData = [];

// ✅ Create card HTML
function createCard(item) {
  return `
    <div class="card rounded-2xl pt-5 bg-gray-50 w-98" data-id="${item.id}">
      <div class="image">
        <img class="h-80 w-80 rounded-2xl" src="${item.image}" alt="${item.title}">
      </div>
      <div class="info">
        <h2 class="text-3xl font-semibold ${item.available ? 'text-gray-900' : 'text-red-700'} underline mb-4 pt-3">
          ${item.title}
        </h2>
        <p class="text-2xl pt-1 mb-2 text-gray-700">Category: ${item.category}</p>
        <p class="text-xl text-gray-600">Origin: ${item.country}</p>
        <p class="text-sm text-gray-500 mb-2">Prep Time: ${item.preparationTime} min</p>
        <span class="text-2xl text-red-800 font-bold">$${item.price}</span>
      </div>
      <div class="buttons pb-4">
        <button class="add-to-cart px-5 py-3 mt-3 rounded-2xl bg-red-700">
          <ion-icon class="text-white text-2xl" name="cart-outline"></ion-icon>
        </button>
      </div>
    </div>
  `;
}

// ✅ Render cards
function renderMenuList(arr) {
  menuList.innerHTML = arr.map(createCard).join("");
}

// ✅ On DOM load, fetch menu and render
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await getAllMenu();
    menuData = response.data;
    renderMenuList(menuData);
  } catch (err) {
    notyf.error("Failed to load menu");
    console.error(err);
  }
});

// ✅ Search
searchInput.addEventListener("keyup", (e) => {
  const query = e.target.value.trim().toLowerCase();
  const results = menuData.filter(item =>
    item.title.toLowerCase().includes(query)
  );
  renderMenuList(results);
});

// ✅ Sort
sortSelect.addEventListener("change", (e) => {
  let sorted = [...menuData];
  if (e.target.value === "low-to-high") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (e.target.value === "high-to-low") {
    sorted.sort((a, b) => b.price - a.price);
  }
  renderMenuList(sorted);
});

// ✅ Filter availability
filterSelect.addEventListener("change", (e) => {
  let filtered = [...menuData];
  if (e.target.value === "available") {
    filtered = filtered.filter(item => item.available);
  } else if (e.target.value === "not-available") {
    filtered = filtered.filter(item => !item.available);
  }
  renderMenuList(filtered);
});

// ✅ Add to basket
menuList.addEventListener("click", async (e) => {
  const btn = e.target.closest(".add-to-cart");
  if (!btn) return;

  const card = btn.closest(".card");
  const id = card.dataset.id;

  const user = await getUser();
  if (!user) {
    return notyf.error({ message: "Login before adding!" });
  }

  try {
    const { data: product } = await getMenuById(id);
    const existing = user.basketItems.find(item => item.id == product.id);
    let updatedBasket;

    if (existing) {
      updatedBasket = user.basketItems.map(item =>
        item.id == product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedBasket = [
        ...user.basketItems,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          category: product.category,
          preparationTime: product.preparationTime
        }
      ];
    }

    await updateInfo(user.id, { basketItems: updatedBasket });
    notyf.success({ message: "Added to basket!" });
  } catch (err) {
    console.error("Add-to-cart error:", err);
    notyf.error({ message: "Error adding to basket!" });
  }
});

