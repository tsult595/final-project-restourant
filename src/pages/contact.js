import { renderHeader } from "../helpers/render-header.js";
import { Notyf } from "notyf";
import JustValidate from "just-validate";
import { postMessage } from "../services/messages/request.js";
import { Message } from "../classes/message.class.js";



var notyf = new Notyf({
    duration: 1200,
    position: {
      x: 'right',
      y: 'top',
    }});

    const validator = new JustValidate('#contact-form');


    document.addEventListener("DOMContentLoaded", function(){
        renderHeader()
    })

    validator
.addField('#fullName', [
    {
      rule: 'required',
      errorMessage: 'Fullname is required!',
    },
    {
      rule: 'minLength',
      value: 5,
   
    }
  ])
  .addField('#email', [
    {
      rule: 'required',
      errorMessage: 'email is required!',
    },
    {
      rule: 'email',
    },
   
  ])
  .addField('#subject', [
    {
      rule: 'required',

    },
    {
      rule: 'minLength',
      value:5
    },
   
  ])
  .addField('#message', [
    {
        rule: 'required',
  
      },
      {
        rule: 'maxLength',
        value:200
      },
   
  ]).onSuccess( async (event)=>{
  
    const formData= new FormData(event.target)
    const data= Object.fromEntries(formData.entries())
    console.log("data: ", data)
    const newMessage= new Message(data.fullName, data.email, data.subject, data.message)
    console.log("new message ", newMessage)
  await postMessage(newMessage)
   notyf.success({
      message: "your message sent to admin!"
   });
  setTimeout(()=>{
      event.target.reset();
  
  },1200);
  
    }).onFail(()=>{
      console.log("Failed!")
    })