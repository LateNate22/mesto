let openPopup = document.querySelector('.profile__edit-button');
let closePopup = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');
let nameInput =  document.querySelector('.popup__input_input_name');
let activityInput = document.querySelector('.popup__input_input_activity');
let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');


function showPopup() {
    nameInput.value = profileName.textContent;
    activityInput.value = profileActivity.textContent;

    popup.classList.add('popup_opened');
}


function hiddenPopup() {
    popup.classList.remove('popup_opened');
}


function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileActivity.textContent = activityInput.value;
    hiddenPopup();
}


openPopup.addEventListener('click', showPopup);
closePopup.addEventListener('click', hiddenPopup);
formElement.addEventListener('submit', formSubmitHandler);


// let likes = document.querySelectorAll('.content__card-like');
// likes.forEach((like) => {
//     like.addEventListener('click', () => {
//         like.classList.toggle('content__card-like_active');
//     });
// });