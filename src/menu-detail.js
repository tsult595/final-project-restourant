import { instance } from "./service/axios-instance.js";
import { endpoints } from "./constans/constans.js";

let detailWrapper = document.querySelector('.detailWrapper');

document.addEventListener('DOMContentLoaded', async function () {
    let id = new URLSearchParams(window.location.search).get('id');
    if (!id) {
        window.location.replace('index.html');
        return;
    }

    try {
       
        let response = await instance.get(`${endpoints.menu}/${id}`);
        let m = response.data;

        detailWrapper.innerHTML = `
        <div class="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <img src="${m.image}" alt="${m.title}" class="w-full h-52 object-cover">
            <div class="p-6 flex flex-col gap-3">
                <h2 class="text-2xl font-bold text-gray-800">${m.title}</h2>
                <p class="text-gray-500 text-sm">Ingredients: ${m.ingredients.join(", ")}</p>
                <p class="text-gray-400 text-sm">Country: <span class="font-semibold text-gray-700">${m.country}</span></p>
                <p class="text-lg font-bold text-green-600">$${m.price.toFixed(2)}</p>
                <div class="mt-4 flex items-center justify-between">
                    <span class="text-sm text-gray-400">Ready in ${m.preparationTime} min</span>
                    <button class="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full text-2xl shadow-md transition-all">
                <ion-icon name="basket-outline"></ion-icon>
                ${m.available? 'add' : 'unavailable'}
              </button>
                </div>
            </div>
        </div>`;
    } catch (error) {
        console.error("Error loading menu item:", error);
        detailWrapper.innerHTML = `<p class="text-red-500">Failed to load menu item.</p>`;
    }
});
