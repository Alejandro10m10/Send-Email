// Variables
const btnEnviar = document.querySelector('#enviar'),
      form = document.querySelector('#enviar-mail'),
      emailTo = document.querySelector('#emailTo'),
      emailFrom = document.querySelector('#emailFrom'),
      subject = document.querySelector('#asunto'),
      message = document.querySelector('#mensaje'),
      emailRegularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



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

    let field = e.target;
    let fieldValue = e.target.value;

    deleteErrors();

    if(fieldValue.length > 0){
        paintField(field, true);
    } else{
        paintField(field, false);
        showError('Todos los campos son obligatorios');
        return;
    }

    if(field.type == 'email'){
        if(emailRegularExpression.test( fieldValue )){
            paintField(field, true);
        } else{
            paintField(field, false);
            showError('El email no es valido');
            return;
        }
    }

    if(emailRegularExpression.test(emailTo.value) && emailRegularExpression.test( emailFrom.value ) && subject.value !== '' && message.value !== '' ){
        enanbleSendBtn(true);
    }
}

function paintField(field, value){
    if(value){
        field.classList.remove('border', 'border-red-500');
        field.classList.add('border', 'border-green-500');
    } else{
        field.classList.remove('border', 'border-green-500');
        field.classList.add('border', 'border-red-500');
        enanbleSendBtn(false);
    }
}

function enanbleSendBtn(value){
    if(value){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    } else{
        btnEnviar.disabled = true;
        btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    }
}

function deleteErrors(){
    const error = document.querySelector('p.error');
    if(error) error.remove();
}

function showError(message){
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-8', 'mb-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if(errores.length === 0) form.insertBefore(errorMessage, document.querySelector('.buttons'));
}