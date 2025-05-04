import { getAllMenu } from "../services/menu/requests.js";


import { Notyf } from 'notyf';
import { getMenuById } from "../services/menu/requests.js";
import { getUser } from "../store/userStore.js";
import { updateInfo } from "../services/users/requests.js";
var notyf = new Notyf({
    duration: 1200,
    position: {
        x: 'right',
        y: 'top',
    }
});

const menuList = document.querySelector(".menu-list")
const searchInput = document.querySelector("#search")
const filterSelect = document.querySelector("#filter")
const sortSelect = document.querySelector("#sort")

let response
document.addEventListener("DOMContentLoaded", async function () {
    response = await getAllMenu()
    console.log(response)
    renderMenuList(response.data)
})

searchInput.addEventListener("keyup", async function (e) {
    const searchQuery = e.target.value.trim().toLowerCase()
    const searchedMenu = response.data.filter((m) => m.title.toLowerCase().trim().includes(searchQuery))
    renderMenuList(searchedMenu)
})

function renderMenuList(arr) {
    menuList.innerHTML = "";
    arr.forEach(menuItem => {
        menuList.innerHTML +=
            `<div class="card rounded-2xl pt-5 bg-gray-50 w-98 ">
                <div class="image">
                    <img class="h-80 w-80 rounded-2xl"
                        src="${menuItem.image}" alt="${menuItem.title}">
                </div>
                <div class="info">
                    <h2 class="text-3xl font-semibold ${menuItem.available ? "text-gray-900" : "text-red-700"} underline mb-4 pt-3"><a href="menu-detail.html?id=${menuItem.id}">${menuItem.title}</a>       
                    </h2>
                    <p class="text-2xl pt-1 mb-5 text-gray-700"> Category: ${menuItem.category} </p>
                    <span class="text-2xl text-red-800 font-bold">$${menuItem.price}</span>
                </div>
                <div class="buttons pb-4">
                    <button data-id="${menuItem.id}" class= "add-to-cart px-5 py-3 mt-3 rounded-2xl bg-red-700"><ion-icon class="text-white text-2xl "
                            name="cart-outline"></ion-icon></button>
                </div>
            </div>`
    });


const addCartButtons = document.querySelectorAll(".add-to-cart");
addCartButtons.forEach((btn) => {

    btn.addEventListener("click", async function () {
      
        const user = await getUser()
        
        if (!user) {

            notyf.error({
                message: "login before adding!"
            });
        }
        else {
            const id = this.dataset.id
            const {data: product} = await getMenuById(id)
           
            const dublicateBasketItem = user.basketItems.find((x)=>x.id == product.id)
if(dublicateBasketItem){
dublicateBasketItem.quantity++;
const idx = user.basketItems.findIndex((x)=>x.id==dublicateBasketItem.id)
user.basketItems.splice(idx, 1, dublicateBasketItem)
await updateInfo (user.id, {
    basketItems: [...user.basketItems]
})
}
else{
await updateInfo (user.id, {
    basketItems: [
...user.basketItems,
{
    id: product.id,
    quantity:1,
    price:product.price,
    title:product.title,
category: product.category,
preparationTime: product.preparationTime,
}

    ]
})

}

        }
    
    })

})
}

sortSelect.addEventListener("change", function (e) {
    const selectedOption = e.target.value
    let sortedMenu = [...response.data]
    switch (selectedOption) {
        case "low-to-high":
            sortedMenu = [
                ...response.data.sort((a, b) => {
                    return a.price - b.price
                })
            ];
            break;
        case "high-to-low":
            sortedMenu = [
                ...response.data.sort((a, b) => {

                    return b.price - a.price
                })
            ];
            break;
        default:
            break;
    }
    renderMenuList(sortedMenu)
})

filterSelect.addEventListener("change", function (e) {
    const selectedFilter = e.target.value;
    let filtered = [...response.data]
    switch (selectedFilter) {
        case "all":
            renderMenuList([...response.data])
            break;
        case "available":
            filtered = [
                ...response.data.filter((x) => {
                    return x.available == true;
                })
            ]
            renderMenuList([...filtered])
            break;
        case "not-available":
            filtered = [
                ...response.data.filter((x) => {
                    return x.available == false;
                })
            ]
            renderMenuList([...filtered])
            break;
        default:
            break;
    }
})