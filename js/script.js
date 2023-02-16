// form
const form = document.querySelector('#form');

// inputs
const nameInp = document.querySelector('#name');
const email = document.querySelector('#mail');
const phone = document.querySelector('#phone');
const password = document.querySelector('#password');

// errors spans
const nameError = document.querySelector('.error-name');
const emailError = document.querySelector('.error-email');
const phoneError = document.querySelector('.error-phone');
const passwordError = document.querySelector('.error-password');

function checkInputs(input) {
    input.addEventListener('input', (e) => {
        switch(input) {
            case email:
                if (email.validity.typeMismatch) {
                    emailError.textContent = '';
                    emailError.className = 'error'
                } else {
                    showError('email');
                }
                break;
            case phone:
                if (phone.value.length > 0) {

                    phoneError.textContent = '';
                    phoneError.className = 'error';
                } else {
                    showError('phone');
                }
                break;
            case nameInp:
                if (nameInp.value.length > 0) {
                    nameError.textContent = '';
                    nameError.className = 'error';
                } else {
                    showError('name');
                }
                break;
            case password:
                if (password.value.length > 0) {
                    passwordError.textContent = '';
                    passwordError.className = 'error';
                } else {
                    showError('password');
                }
                break;
        }
    })
}

checkInputs(nameInp);
checkInputs(email);
checkInputs(phone);
checkInputs(password);

function callTheShowError(input, e) {
    showError(input);
    e.preventDefault();
}

form.addEventListener('submit', (e) => {
    if (nameInp.value.length == 0) {
        callTheShowError('name', e);
    }

    if (!email.validity.valid) {
        callTheShowError('email', e);
    }

    if (phone.value.length == 0 || /\D/g.test(phone.value)) {
        callTheShowError('phone', e);
    } 

    if (password.value.length == 0 || !/[!@#$%^&]/g.test(password.value)) {
        callTheShowError('password', e);
    }
});

function showError(input) {
    let logically = /[!@#$%^&]/g.test(password.value) ? false : true;
    switch(input) {
        case 'name':
            if (nameInp.value.length == 0) {
                nameError.textContent = 'Please, write down your Name';
            }   
            nameError.className = 'error active';
            break;
        case 'email':
            if(email.value.length == 0) {
                emailError.textContent = 'You need to enter an e-mail address.';
            } else if(email.validity.typeMismatch) {
                emailError.textContent = 'Entered value must to be an e-mail address.';
            }
            emailError.className = 'error active';
            break;
        case 'phone':
            if (phone.value.length == 0) {
                phoneError.textContent = 'You need to enter an phone number.';
            }
             else if(phone.validity.patternMismatch) {
                phoneError.textContent = 'Entered value must to be only numbers characters.';
            }
            phoneError.className = 'error active';
            break;
        case 'password':
            if (password.value.length == 0) {
                passwordError.textContent = 'You need to enter a Password.';
            } else if(password.validity.tooShort) {
                passwordError.textContent = `Email should be more then ${password.minLength} characters; you entered ${password.value.length}`
            } else if (logically) {
                passwordError.textContent = 'There is not one spiccial symbol';
            }
            passwordError.className = 'error active';
            break;

    }
}