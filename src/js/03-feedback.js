import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInput, 500));

populateInput();

// при отправке убираем данные из хранилища, oчищаем форму

function onFormSubmit(event) {
  event.preventDefault();
  if (form.email.value === '' || form.message.value === '') {
    return alert('Все поля должны быть заполнены!');
  }
  console.log({
    email: form.email.value,
    message: form.message.value,
  });
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

// получаем значения полей и сохраняем их в хранилище

function onInput() {
  formData = {
    email: form.email.value,
    message: form.message.value,
  };
  const formDataJSON = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, formDataJSON);
}

// получаем значения из хранилища, если там что-то было, обновляем DOM

function populateInput() {
  const savedInput = localStorage.getItem(STORAGE_KEY);
  const parsedSavedInput = JSON.parse(savedInput);
  if (savedInput) {
    form.email.value = parsedSavedInput.email || '';
    form.message.value = parsedSavedInput.message || '';
  }
}
