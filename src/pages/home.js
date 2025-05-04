import { renderHeader } from "../helpers/render-header";
import JustValidate from 'just-validate';
import { Notyf } from 'notyf';
import { Reservation } from "../classes/reservation.class.js";
import { makeReservation } from "../services/reservations/requests";



var notyf = new Notyf({
    duration: 1200,
    position: {
      x: 'right',
      y: 'top',
    }});
    const validator = new JustValidate('#reservation-form');

document.addEventListener("DOMContentLoaded", function(){
    renderHeader()
})

validator
.addField('#fullname', [
    {
      rule: 'required',
      errorMessage: 'Fullname is required!',
    },
    {
      rule: 'minLength',
      value: 5,
   
    }
  ])
  .addField('#phone', [
    {
      rule: 'required',
      errorMessage: 'phone number is required!',
    },
    {
      rule: 'number',
    },
   
  ])
  .addField('#guest', [
    {
      rule: 'required',

    },
    {
      rule: 'number',
    },
    {
        rule: 'minNumber',
        value: 2,
     
      }
  ])
  .addField('#time', [
    {
      rule: 'required',

    },
   { validator: (value, context)=>{
    const currentDate = new Date()
    const reservationDate=value
        if(new Date(reservationDate).getTime()> currentDate.getTime()){
            return true;

        }else{
            return false;
        }
     },
     errorMessage: "invalid reservation date!"
    }
  ]) .onSuccess( async (event)=>{

  const formData= new FormData(event.target)
  const data= Object.fromEntries(formData.entries())
  console.log("data: ", data)
  const newReservation= new Reservation(data.fullname, data.phone, data.guest, data.time, data.textarea)
 const res = await makeReservation(newReservation)
 notyf.success({
    message: "reservation request sent to admin!"
 });
setTimeout(()=>{
    event.target.reset();

},1200);

  }).onFail(()=>{
    console.log("Failed!")
  })