import JustValidate from 'just-validate';
import { User } from '../classes/user.class';
import { checkDuplicateUsername, checkDuplicateEmail } from '../services/users/requests';
import { register } from '../services/users/requests.js';
import { Notyf } from 'notyf';
import { protectUserRoute } from '../helpers/protect.js';




var notyf = new Notyf({
  duration: 1200,
  position: {
    x: 'right',
    y: 'top',
  }});
  const validator = new JustValidate('#register-form')
document.addEventListener("DOMContentLoaded", function(){

  protectUserRoute();
  
  });

validator
  .addField('#username', [
    {
      rule: 'required',
      errorMessage: 'Username is required!',
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Username must be at least 3 characters',
    },
      {
       
        validator: (value) => async () => {
         
     const {success}= await checkDuplicateUsername (value)
     if(success){
      return true;
     } 
     else{
      return false;
     }},
       
        errorMessage: 'Username already exists!',
      },
  
  ])
  .addField('#fullname', [
    {
      rule: 'required',
      errorMessage: 'Fullname is required!',
    },
    {
      rule: 'minLength',
      value: 5,
      errorMessage: 'Fullname must be at least 5 characters',
    }
  ])
  .addField('#email', [
    {
      rule: 'email',
      errorMessage: 'Email is required!',
    },
    {
        rule: 'minLength',
        value: 6,
        errorMessage: 'Email must be at least 6 characters',
      },
      {
        validator: (value) => async () => {
         
          const {success}= await checkDuplicateEmail (value)
          if(success){
           return true;
          } 
          else{
           return false;
          }},
            
             errorMessage: 'Email already exists!',
           },
  
  ])
  .addField('#password', [
    {
      rule: 'required',
      errorMessage: 'Password is required!',
    },
    {
        rule: 'minLength',
        value: 5,
        errorMessage: 'Password must be at least 5 characters',
      }
  ])
  .addField('#password1', [
    {
      rule: 'required',
      errorMessage: 'Confirm password is required!',
    },
    {
     validator: (value, fields)=>{
        if(value==fields["#password"].elem.value){
            return true;

        }else{
            return false;
        }
     },
     errorMessage: 'passwords must match!',
      }
  ])
 .onSuccess(async (event)=>{
  event.preventDefault()
const form=event.target
const formData=new FormData(form)
const data=Object.fromEntries(formData.entries())
const {username, email, password, fullname}= data
const newUser =new User(username, email, fullname, password);
 await register (newUser)
notyf.success({
  message: "user registered successfully!"
});
setTimeout(()=>{
  window.location.replace("login.html")
},1200)
}).onFail(()=>{
  console.log("Failed!")
})
