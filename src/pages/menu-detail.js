import { getMenuById } from "../services/menu/requests.js";
import { Notyf } from 'notyf';
import JustValidate from 'just-validate';
const detailHTML = {
    image: document.querySelector("#image"),
    title: document.querySelector("#title"),
    category: document.querySelector("#category"),
    country: document.querySelector("#country"),
    price: document.querySelector("#price"),
    preparation: document.querySelector("#preparation"),
    ingredientsList: document.querySelector("#ingredients"),
    reviewsList: document.querySelector("#reviews")
}
const reviewForm = document.querySelector("#add-review")
const reviewMessage = document.querySelector("#review-message")
const id = new URLSearchParams(window.location.search).get("id")

if (!id) {

    window.location.replace("menu.html")

}
document.addEventListener("DOMContentLoaded", async function () {
    const response = await getMenuById(id)
    console.log(response.data)
    if (!response.data) {
        window.location.replace("menu.html")
    }
    else {

        const {
            image,
            title,
            category, 
            preparationTime,
            ingredient,
            country,
            price,
            review,
        } = response.data;



        detailHTML.image.src = image;
        detailHTML.title.textContent = title;
        detailHTML.category.textContent = category;
        detailHTML.country.textContent = country;
        detailHTML.price.textContent = price;
  
        detailHTML.preparation.textContent = preparationTime;

        detailHTML.ingredientsList.innerHTML += `<li class=text-2xl font-thin>${ingredient}</li>`;

//         if (review.length==0){
//  detailHTML.reviewsList.innerHTML = `<h2 class="text-red-600 text-center text-xl">Not any review for this meal yet! </h2>`
//         } 
//         else {
//             detailHTML.reviewsList.innerHTML = ""
//             review.forEach(rev => {
                
     
//                 detailHTML.reviewsList.innerHTML += `
//                   <div class="border flex py-1 rounded pl-3 w-[70%] bg-gray-200 mb-3"><img class="w-[100px] rounded-4xl"
//           src="https://marketplace.canva.com/EAGNFdAoW90/3/0/1600w/canva-green-gradient-minimalist-business-linkedin-profile-picture-y3nJhl_19a8.jpg"
//           alt="image">
//         <div class="w-full">
//           <span class="w-full text-2xl pt-3" name="comment" id="comment">
// ${rev.message}
//           </span>
//  </div>
//         </div>
//         `
//             });
    //     }
    }

})

var notyf = new Notyf({
    duration: 1200,
    position: {
      x: 'right',
      y: 'top',
    }});
    const validator = new JustValidate('#review-message');

    validator
    .addField('#review-message', [
      {
          rule: 'required',
        
        },
        {
          validator: (value)=> {

const bannedWords = ["hate", "kill", "racist"];
const isSpam= bannedWords.find((c)=>c.toLocaleLowerCase().trim()== value.trim().toLocaleLowerCase());
if(isSpam){
    return false;
}
else{
    return true;
}
          },
          errorMessage: "you cannot use  those words!",
      },
    ])
    .onSuccess((event)=>{
   
    const formData = new FormData (event.target);
    const data = Object.fromEntries(formData.entries())
    console.log("data ", data)
    }).onFail(()=>{
        console.log("Failed!")
    })

