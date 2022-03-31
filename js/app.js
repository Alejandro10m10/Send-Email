// Variables
const btnEnviar = document.querySelector('#enviar'),
      form = document.querySelector('#enviar-mail'),
      emailTo = document.querySelector('#emailTo'),
      emailFrom = document.querySelector('#emailFrom'),
      subject = document.querySelector('#asunto'),
      message = document.querySelector('#mensaje');



init();

// Functions

function init(){
    loadEventListeners();
}

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', startApp); // Event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
    emailTo.addEventListener('blur', validateForm);
    emailFrom.addEventListener('blur', validateForm);
    subject.addEventListener('blur', validateForm);
    message.addEventListener('blur', validateForm);
}

function startApp(){
    btnEnviar.disabled = true;
}

function validateForm(e){

    if(e.target.length > 0){

    } else{
        e.target.classList.add('border', 'border-red-500');
        showError();
    }
}

function showError(){
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Todos los campos son obligatorios';
    errorMessage.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-8', 'mb-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if(errores.length === 0) form.insertBefore(errorMessage, document.querySelector('.buttons'));
}