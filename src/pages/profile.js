import { getUser } from "../store/userStore.js";
import moment from 'moment';


const profileElement = document.querySelector("#profile4")
const userFullName = document.querySelector("#user-full-name")
const roleElement = document.querySelector("#role")
const memberSince = document.querySelector("#member-since")
const balanceElement= document.querySelector("#balance")

document.addEventListener("DOMContentLoaded", async function () {
    const user = await getUser()
    if(!user){
window.location.replace("/login.html")
    }
    else{
        profileElement.src= user.profileImage;
        userFullName.textContent=user.fullName;
        roleElement.textContent= user.role;
        memberSince.textContent=moment(user.createdAt).format('MM Do YYYY, h:mm: a');
        balanceElement.textContent=user.balance
       
        if(user.role==="admin"){

roleElement.classList.add("text-amber-500")
        
        }
    }
    const openModal = document.querySelector('#open-modal');
const modal = document.getElementById('modal');
const amountSelect = document.getElementById('amountSelect');
const customAmount = document.getElementById('customAmount');
const addBtn = document.getElementById('addBtn');
const balance = document.getElementById('balance');

openModal.addEventListener('click', () => {
   
modal.classList.remove('modal-hidden');
});

amountSelect.addEventListener('change', () => {
if (amountSelect.value === 'custom') {
customAmount.classList.remove('modal-hidden');
} else {
customAmount.classList.add('modal-hidden');
}
});

addBtn.addEventListener('click', () => {
let amount = amountSelect.value === 'custom' ? Number(customAmount.value) : Number(amountSelect.value);
if (!isNaN(amount) && amount > 0) {
balance.textContent = (Number(balance.textContent) + amount).toFixed(2);
modal.classList.add('modal-hidden');
amountSelect.value = '';
customAmount.value = '';
customAmount.classList.add('modal-hidden');
} else {
alert('Please enter a valid amount.');
}
});
})




