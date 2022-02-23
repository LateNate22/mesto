let openPopup = document.querySelector('.profile__edit-button');
let closePopup = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let like = document.querySelectorAll('.content__card-like');
let formElement = document.querySelector('.popup__container');
let nameInput =  document.querySelector('.popup__name');
let activityInput = document.querySelector('.popup__activity');
let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');


function showPopup() {
    popup.classList.add('popup_opened');
}
openPopup.addEventListener('click', showPopup);


function hiddenPopup() {
    popup.classList.remove('popup_opened');
}
closePopup.addEventListener('click', hiddenPopup)


function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileActivity.textContent = activityInput.value;
    popup.classList.remove('popup_opened');
}
formElement.addEventListener('submit', formSubmitHandler);


// Я НЕ ПОНИМАЮ КАК ЗАСТАВИТЬ ЛАЙКИ РАБОТАТЬ!!!
// like.forEach(function likeActive(element) => {

// };


// document.querySelectorAll('.content__card-like').forEach(function(element) {
    
// });


// function likeActive() {
//     like.classList.toggle('content__card-like_active');
//     like.classList.toggle('content__card-like');
// }
// like.addEventListener('click', likeActive);


// like.forEach(like => like.addEventListener('click', likeActive {
//     function likeActive() {
//         like.classList.toggle('content__card-like_active');
//         like.classList.toggle('content__card-like');
//     }
// })