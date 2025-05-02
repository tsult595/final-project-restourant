import { Notyf } from "notyf";
import JustValidate from "just-validate";
import { getAllUsers } from "./users/requests";

const notyf = new Notyf();

const validator = new JustValidate('#login-form');

validator
  .addField('#email', [
    { rule: 'required', errorMessage: 'your email' },
    { rule: 'email', errorMessage: 'incorrect email' },
  ])
  .addField('#password', [
    { rule: 'required', errorMessage: 'Введите пароль' },
  ])
  .onSuccess(async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const { email, password } = Object.fromEntries(formData.entries());

    const response = await getAllUsers();
    const users = response.data?.data || response.data; 

    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      notyf.success('ok!');
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      window.location.href = 'index.html'; 
    } else {
      notyf.error('not ok!');
    }
  });


