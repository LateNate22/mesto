const contentList = document.querySelector('.content__list');
const cardTemplate = document.querySelector('.content__template');

const editProfilePopup = document.querySelector('.popup__profile-edit'); //попап редактор профиля
const addCardPopup = document.querySelector('.popup__add-card'); //попап добавить карточку
const showImagePopup = document.querySelector('.popup__show-image'); //попап просмотр фото

const openEditProfilePopup = document.querySelector('.profile__edit-button'); //кнопка ОТКРЫТЬ редактор профиля
const closeEditProfilePopup = editProfilePopup.querySelector('.popup__close-button'); //кнопка ЗАКРЫТЬ редактора профиля

const openAddCardPopup = document.querySelector('.profile__add-button'); //кнопка ОТКРЫТЬ добавить карточку
const closeAddCardPopup = addCardPopup.querySelector('.popup__close-button'); //кнопка ЗАКРЫТЬ добавить карточку

const closeShowImagePopup = showImagePopup.querySelector('.popup__close-button'); //кнопка ЗАКРЫТЬ просмотр фото

//форма редактор профиля
const profileFormElement = document.querySelector('.popup__form_profile-edit');
const nameInput =  document.querySelector('.popup__input_input_name');
const activityInput = document.querySelector('.popup__input_input_activity');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');

//форма добавить карточку
const addCardFormElement = document.querySelector('.popup__form-add-card');
const cardNameInput = document.querySelector('.popup__input_input_cardname');
const cardLinkInput = document.querySelector('.popup__input_input_imagelink');

//просмотр фото
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
  ];
  
 //открывает и закрывает попап
 function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}


//редактирует профиль
function editProfile(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  togglePopup(editProfilePopup);
};


//лайк
function addLike(card) {
  const buttonLike = card.querySelector('.content__card-like');
  buttonLike.addEventListener('click', function (evt) {
      evt.target.classList.toggle('content__card-like_active');
  });
};


//удаление
function deleteCard(card) {
  const cardDeletes = card.querySelector('.content__card-delete'); 
  cardDeletes.addEventListener('click', function (evt) {
    evt.target.closest('.content__item').remove();
  });
};


//Открытие фотографии на весь экран
function showPhoto(photo) {
  photo.addEventListener('click', function() {
    togglePopup(showImagePopup);

    popupImage.alt = photo.alt;
    popupImage.src = photo.src;
    popupImageTitle.textContent = photo.alt;

    console.log(photo);
});
};


//создает карточки из масива
function createInitialCards(oneCard) {
  const card = cardTemplate.content.querySelector('.content__item').cloneNode(true);
  const cardTitle = card.querySelector('.content__card-name');
  const cardImage = card.querySelector('.content__image');
  
  cardTitle.textContent = oneCard.name;
  cardImage.src = oneCard.link;
  cardImage.alt = oneCard.name;

  addLike(card);
  deleteCard(card);
  showPhoto(cardImage);

  return card;
};

//добавляет карточку в разметку
function addNewCards(card) {
  contentList.prepend(card);
};

//обрабатывает элементы массива
initialCards.forEach((card) => {
  addNewCards(createInitialCards(card));
});


//создает новую карточку из формы
function addCardFromForm(evt) {
  evt.preventDefault();

  const cardFromForm = createInitialCards({ name: cardNameInput.value, link: cardLinkInput.value });
 
  contentList.prepend(cardFromForm);
  togglePopup(addCardPopup);
  
  cardNameInput.value = '';
  cardLinkInput.value = '';
};



//слушатели
profileFormElement.addEventListener('submit', editProfile); //редактор профиля

addCardFormElement.addEventListener('submit', addCardFromForm); //добавление карточки

openEditProfilePopup.addEventListener('click', function () { //ОТКРЫТЬ редактор профиля, заполнив инпуты дефолтными значениями
    nameInput.value = profileName.textContent; 
    activityInput.value = profileActivity.textContent;

    togglePopup(editProfilePopup)
}); 

openAddCardPopup.addEventListener('click', function () { //ОТКРЫТЬ форму добавить карточку
    togglePopup(addCardPopup);
});

closeEditProfilePopup.addEventListener('click', function () { //ЗАКРЫТЬ редактор профиля
    togglePopup(editProfilePopup)
});

closeAddCardPopup.addEventListener('click', function () { //ЗАКРЫТЬ форму добавить карточку
    togglePopup(addCardPopup)
});

closeShowImagePopup.addEventListener('click', function () { //ЗАКРЫТЬ просмотр фото
  togglePopup(showImagePopup)
});