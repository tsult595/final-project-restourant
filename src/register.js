import JustValidate from 'just-validate';
import { User } from './user-class.js';
import {
  checkDoublecateUserName,
  checkDoublecateUserEmail,
  register
} from './users/requests.js';

const validator = new JustValidate('#registerForm');

validator
  .addField('#username', [
    { rule: 'required', errorMessage: 'Username is required' },
    { rule: 'minLength', value: 3 },
    { rule: 'maxLength', value: 15 },
    {
      validator: async (value) => {
        const { success } = await checkDoublecateUserName(value);
        return success;
      },
      errorMessage: 'Username already exists',
    },
  ])
  .addField('#fullname', [
    { rule: 'required', errorMessage: 'Full name is required' },
    { rule: 'minLength', value: 3 },
  ])
  .addField('#email', [
    { rule: 'required', errorMessage: 'Email is required' },
    { rule: 'email', errorMessage: 'Email is not valid' },
    {
      validator: async (value) => {
        const { success } = await checkDoublecateUserEmail(value);
        return success;
      },
      errorMessage: 'Email already in use',
    },
  ])
  .addField('#password', [
    { rule: 'required', errorMessage: 'Password is required' },
    { rule: 'minLength', value: 6 },
  ])
  .addField('#confirmPassword', [
    { rule: 'required', errorMessage: 'Confirm Password is required' },
    {
      validator: (value, fields) => {
        return value === fields['#password'].elem.value;
      },
      errorMessage: 'Passwords do not match',
    },
  ])
  .onSuccess(async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  
    const { username, email, fullname, password } = data;
    const newUser = new User(username, email, fullname, password);
  
    
    const response = await register(newUser);
  
    if (response.data) {
      console.log('User registered:', response.data);
      alert('Registration successful!');
      event.target.reset(); 
    } else {
      alert('Registration failed: ' + response.message);
    }
  })
  .onFail(() => {
    console.log('Validation failed');
  });
