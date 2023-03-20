//Открытие закрытие попапа
const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close');

function openPopup() {                    //Функция открывает попап
    popup.classList.add('popup_opened');
    jobInput.value = jobAuthor.textContent;
    nameInput.value = nameAuthor.textContent;
}

function closePopup() {                    //Функция закрывает попап
    popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openPopup) //Вызoв функции открыть попап по клику
popupCloseButton.addEventListener('click', closePopup) //Вызoв функции закрыть попап по клику

//Внесение данных в форму
const formElement = document.querySelector('.popup__container');

const nameAuthor = document.querySelector('.profile__title');
const jobAuthor = document.querySelector('.profile__subtitle');

const jobInput = document.querySelector('.popup__input_type_job');// Получите значение полей jobInput и nameInput из свойства value
const nameInput = document.querySelector('.popup__input_type_name');

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    jobAuthor.textContent = jobInput.value; // Вставьте новые значения с помощью textContent
    nameAuthor.textContent = nameInput.value;

    closePopup();

}


formElement.addEventListener('submit', handleFormSubmit); // Обработчик формы submit следит за отправкой данных пользователя 