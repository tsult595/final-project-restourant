import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { deleteReservation, getAllReservation, updateReservationStatus } from "../services/reservations/requests";
import { getAllMenu } from "../services/menu/requests";
import { Notyf } from 'notyf';
import moment from 'moment';


const reservationTable = document.querySelector("#reservation-table")
const statuses = ["pending", "confirmed", "seated", "completed", "canceled"]
 let reservations = null;
 let table = null;
document.addEventListener("DOMContentLoaded", async function () {

reservations = await getAllReservation()
    const menu = await getAllMenu()
     table = new Grid({
        search: true,
        sort: true,
        pagination: {
            limit: 5
        },
        columns: [
            "Full Name",
            "Phone Number",
            "Guest Count",
            {
                name: "Reservation Date",
                formatter: (cell) => {
                    return html(`<span>${moment(cell).fromNow()}</span>`);
                }
            },
            {
                name: "Reservation Creation Date",
                formatter: (cell) => {
                    return html(`<span>${moment(cell).fromNow()}</span>`);
                },
            }, {
                name: "Guest Notes",
                formatter: (cell) => {
                    return html(`<span>${cell ? cell : "not any notes!"}</span>`);
                }
            },
            {
                name: "Status",
                formatter: (cell, row) => {
                    return html(`<select data-id= "${row.cells[7].data}"id="status-select">
                        ${statuses.map((status) => {
                        return `<option ${status == cell ? `selected` : ""}> ${status}</option>`;
                    })}
       
            </select>`);
                }
            },
            {
                name: "Actions",
                formatter: (_, row) => {

                    return html(`<button data-id=${row.cells[7].data} class="bg-red-500 delete-button text-white px-2 py-1 rounded">
                Delete 
                </button>`)
                }
            },
        ],
        data: reservations.data.map((item) => [

            item.fullName,
            item.phoneNumber,
            item.guestCount,
            item.reservationTime,
            item.createdAt,
            item.guestNotes,
            item.status,
            item.id
        ])


    }).render(reservationTable);

});
var notyf = new Notyf({
    duration: 1200,
    position: {
        x: 'right',
        y: 'top',
    }
});

setTimeout(() => {
    document.querySelectorAll("#status-select").forEach((select) => {
        select.addEventListener("change", async (e) => {
            const id = e.target.getAttribute("data-id");
            console.log(e.target)
            const newStatus = e.target.value;
            console.log(newStatus)
            console.log(id)
            await updateReservationStatus(id, newStatus);


            notyf.success({

                message: "reservation status change successfully!"
            })
        })
    
    })
document.querySelectorAll(".delete-button").forEach((btn)=>{
    btn.addEventListener("click", async function () {
        const id = this.getAttribute("data-id");
        console.log("id", id);
         await deleteReservation(id);
         notyf.success({
            message: "reservation deleted successfully!"
         });
         const updateReservations = reservations.data.filter((x)=>x.id!=id)

         table.updateConfig({
            data: updateReservations.map((item) => [

                item.fullName,
                item.phoneNumber,
                item.guestCount,
                item.reservationTime,
                item.createdAt,
                item.guestNotes,
                item.status,
                item.id
            ])
         }).forceRender()

    })
})

}, 250);



