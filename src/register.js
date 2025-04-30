
import JustValidate from 'just-validate';



const validator = new JustValidate('#registerForm');

validator
  .addField('#username', [
    { rule: 'required', message: 'Username is required' },
    { rule: 'minLength', value: 3 },
    { rule: 'maxLength', value: 15 },
  ])
  .addField('#fullname', [
    { rule: 'required', message: 'Full name is required' },
    { rule: 'minLength', value: 3 },
  ])
  .addField('#email', [
    { rule: 'required', message: 'Email is required' },
    { rule: 'email', message: 'Email is not valid' },
    
  ])
  .addField('#confirmPassword', [
    {
      rule: 'required',
      message: 'Confirm Password is required',
    },
    {
      rule: 'minLength',
      value: 6,
      message: 'Password must be at least 6 characters',
    },
    {
      validator: (value, fields) => {
        return value === fields['#password'].elem.value;
      },
      message: 'Passwords do not match',
    }
  ])
    
  .addField('#password', [
    { rule: 'required', message: 'Password is required' },
    { rule: 'minLength', value: 6 },
  ])
  .onSuccess((event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log('Form submitted:', data);


  });
