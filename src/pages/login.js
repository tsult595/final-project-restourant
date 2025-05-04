import { Notyf } from 'notyf';

import { login } from '../services/users/requests.js';
import { setUser } from '../store/userStore.js';
import { protectUserRoute } from '../helpers/protect.js';
import JustValidate from 'just-validate';


var notyf = new Notyf({
    duration: 1200,
    position: {
      x: 'right',
      y: 'top',
    }});
    const validator = new JustValidate('#form123');

  document.addEventListener("DOMContentLoaded", function(){
 
    protectUserRoute()

    });

  validator
  .addField('#email', [
    {
        rule: 'required',
      
      },
      {
        rule: 'email'
    }
  ])
  .addField("#password", [
    {
        rule: 'required',
      
      },
      
  ])
  .onSuccess(async(event)=>{
const form=event.target;
const formData = new FormData (form);
const {email, password} =Object.fromEntries(formData.entries());

const response = await login(email, password)
if(response.data){
    notyf.success({
        message: response.message,
    });
   
    setUser(response.data.id)
    setTimeout(()=>{
        window.location.replace("./profile.html")
    },1200)
}
else{
    notyf.error({
        message: response.message,
    })
}

  }).onFail(()=>{})

 
