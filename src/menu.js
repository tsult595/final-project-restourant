import { getAllMenu } from "./menu/requests.js";

let cardsWrapper = document.querySelector('.cardsWrapper');
let inputSearch = document.querySelector('.inputSearch');
let isFastInput = document.querySelector('.isFastInput');
let fromLowtoHigh = document.querySelector('.fromLowtoHigh');

let menuData = []; 




document.addEventListener('DOMContentLoaded', async function() {
  let response = await getAllMenu();
  menuData = response.data;
  renderMenu(menuData);
});


inputSearch.addEventListener('keyup', function(e) {
  let searchQuery = e.target.value.trim().toLowerCase();
  let filtered = menuData.filter(m => m.title.toLowerCase().includes(searchQuery));
  renderMenu(filtered);
});

///////////////////////////////


fromLowtoHigh.addEventListener('change', function(e) {
  let selectedOpt = e.target.value;

  let sorted = [...menuData];

  if (selectedOpt === 'Low-To-High') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (selectedOpt === 'High-To-Low') {
    sorted.sort((a, b) => b.price - a.price);
  }

  renderMenu(sorted);
});


function renderMenu(arr) {
  cardsWrapper.innerHTML = '';
  arr.forEach(m => {
    cardsWrapper.innerHTML += `
      <div class="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
        <img src="${m.image}" alt="${m.title}" class="w-full h-52 object-cover">
        <div class="p-6 flex flex-col gap-3">
          <h2 class="text-2xl font-bold text-gray-800">
            <a href="./menu-detail.html?id=${m.id}">${m.title}</a>
          </h2>
          <p class="text-gray-500 text-sm">Ingredients: ${m.ingredients.join(", ")}</p>
          <p class="text-gray-400 text-sm">Country: <span class="font-semibold text-gray-700">${m.country}</span></p>
          <p class="text-lg font-bold text-green-600">$${m.price.toFixed(2)}</p>

          <div class="mt-4 flex items-center justify-between">
            <span class="text-sm text-gray-400">Ready in ${m.preparationTime} min</span>
            <button class="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full text-2xl shadow-md transition-all">
                <ion-icon name="basket-outline"></ion-icon>
                ${m.available? 'Add' : 'unavailable'}
              </button>
          </div>
        </div>
      </div>
    `;
  });
}

function createPost(title, content) {
    return {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toISOString()
    };
  }
  
  const newPost = createPost("Hello", "This is my first post");
  console.log(newPost.title); // Hello
  