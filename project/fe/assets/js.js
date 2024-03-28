'use strict';

//#region vars


//#endregion vars
const mainForm = document.getElementById('main_form')
const myForm2 = document.getElementById('myForm2')
//#region func


function validateUsername(username) {
  const validationAnswer = {}
  if (username.length < 3) {
    validationAnswer.status = false;
    validationAnswer.text = 'The name must contain at least 3 characters';
  } else if (!/^[a-zA-Z0-9]+$/.test(username.trim()))  {
      validationAnswer.status = false;
      validationAnswer.text = 'The name must contain only alphanumeric characters';
  } else {
      validationAnswer.status = true;
      validationAnswer.text = 'Validation successful';
  }
  // console.log(validationAnswer);
  return validationAnswer;
}

function validatePassword(password) {
  const validationAnswer = {}
  if (password.length < 6) {
    validationAnswer.status = false;
    validationAnswer.text = 'The password must contain at least 6 characters';
  }else {
    validationAnswer.status = true;
    validationAnswer.text = 'Validation successful';
}
  return validationAnswer;
}

function clearInputs(form) {
	// Get all input elements within the form
	const inputs = form.querySelectorAll('input[type="text"], input[type="password"], input[type="email"], input[type="number"]');
    	
	// Iterate over each input element and set its value to an empty string
	for (var i = 0; i < inputs.length; i++) {
		 inputs[i].value = '';
	}
}

//#endregion func

mainForm.addEventListener("submit", function(event){
  event.preventDefault();
  const msgElem = document.querySelector('.msg>span');
  const inputName = mainForm.querySelector('.name input[name="username"]').value.trim();
  const inputPassword = mainForm.querySelector('.password input[name="userpassword"]').value.trim();

  const answerFromNameInput = validateUsername(inputName);
  const answerFromPasswordInput = validatePassword(inputPassword);
 
  if(answerFromNameInput.status !== true){
    msgElem.textContent = answerFromNameInput.text;
    msgElem.classList.add('error');
  } else if(answerFromPasswordInput.status !== true){
    msgElem.textContent = answerFromPasswordInput.text;
    msgElem.classList.add('error');
  }else{
	const formData = {'name': inputName, 'password': inputPassword}
	console.log(formData)
	fetch('http://localhost:3000/submit-data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
})
	.then(response => response.text())
	.then(data => {
		// console.log(data); 
		msgElem.textContent = 'Data was send';
		msgElem.classList.remove('error');
		msgElem.classList.add('success');
	})
	.catch(error => {
		 console.error('Error:', error);
	});
    
  }
  clearInputs(this)
});






