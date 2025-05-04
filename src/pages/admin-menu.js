
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { getAllMenu } from "../services/menu/requests.js";



const menutable = document.querySelector("#menu-table")

document.addEventListener("DOMContentLoaded", async function () {
    const menu = await getAllMenu()
    const table = new Grid({
        search: true,
        sort: true,
        pagination: {
            limit: 7
        },
        columns: ["ID",
           {
            name: "Image",
            formatter: (cell) => html(`<img src="${cell}" class="w-30 h-15 object-cover rounded-2xl" alt="menu item" />`)
          }, "Title", "Category", "Country", "Price",
            {
              name: "Available",
              formatter: (cell) => html(`<span>${cell ? "Yes" : "No"}</span>`)
            }, {  name: "Actions",
            formatter: (cell, row) => {
              return html(`
                <button class="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onclick="window.location.href='menu-detail.html?id=${row.cells[0].data}'">
                  Edit
                </button>
                <button class="bg-red-500 text-white px-2 py-1 rounded"
                  onclick="alert('Delete item ID: ${row.cells[0].data}')">
                  Delete
                </button>
              `);}
            }],
        data: 
            [...menu.data.map((item) => {
                return { id: item.id,  
                  image: item.image,
                  title: item.title, 
                  category: item.category, 
                  country: item.country, 
                  price: item.price,
                  available:item.available }
            })],
    }).render(menutable);
})