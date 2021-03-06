const contentList = document.querySelector('.content__list');
const cardTemplate = document.querySelector('.content__template');

const editProfilePopup = document.querySelector('.popup-profile-edit'); //попап редактор профиля
const addCardPopup = document.querySelector('.popup-add-card'); //попап добавить карточку
const showImagePopup = document.querySelector('.popup-show-image'); //попап просмотр фото

const openEditProfilePopupButton = document.querySelector('.profile__edit-button'); //кнопка ОТКРЫТЬ редактор профиля
const closeEditProfilePopupButton = editProfilePopup.querySelector('.popup__close-button'); //кнопка ЗАКРЫТЬ редактора профиля

const openAddCardPopupButton = document.querySelector('.profile__add-button'); //кнопка ОТКРЫТЬ добавить карточку
const closeAddCardPopupButton = addCardPopup.querySelector('.popup__close-button'); //кнопка ЗАКРЫТЬ добавить карточку

const closeShowImagePopupButton = showImagePopup.querySelector('.popup__close-button'); //кнопка ЗАКРЫТЬ просмотр фото

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

const ESC_KEY = "Escape";

//выключает кнопку
function disableSubmitButton(form) {
  const submitFormButton = form.querySelector('.popup__save-button');

  submitFormButton.classList.add('popup__save-button_inactive');
  submitFormButton.setAttribute('disabled', 'disabled');
}

//открывает попап
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closeByClick);
}

//закрывает попап
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('click', closeByClick);
}

//закрывает попап через esc
function closeByEsc(evt) {
  if (evt.key === ESC_KEY) {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  }
}

//закрывает попап по клику на overlay
function closeByClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  };
}

//редактирует профиль
function editProfile(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopup(editProfilePopup);
};

//заполняет инпуты профиля дефолтным значением
function fillInput() {
  nameInput.value = profileName.textContent; 
  activityInput.value = profileActivity.textContent;
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
    openPopup(showImagePopup);

    popupImage.alt = photo.alt;
    popupImage.src = photo.src;
    popupImageTitle.textContent = photo.alt;
});
};


//создает карточки из масива
function createCard(oneCard) {
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
  addNewCards(createCard(card));
});


//создает новую карточку из формы
function addCardFromForm(evt) {
  evt.preventDefault();

  const cardFromForm = createCard({ name: cardNameInput.value, link: cardLinkInput.value });
 
  contentList.prepend(cardFromForm);
  closePopup(addCardPopup);
  
  addCardFormElement.reset();
};



//слушатели
profileFormElement.addEventListener('submit', editProfile); //редактор профиля

addCardFormElement.addEventListener('submit', addCardFromForm); //добавление карточки

openEditProfilePopupButton.addEventListener('click', function () { //ОТКРЫТЬ редактор профиля, заполнив инпуты дефолтными значениями
  fillInput();
  openPopup(editProfilePopup);
}); 

openAddCardPopupButton.addEventListener('click', function () { //ОТКРЫТЬ форму добавить карточку
  openPopup(addCardPopup);
  disableSubmitButton(addCardFormElement);
});

closeEditProfilePopupButton.addEventListener('click', function () { //ЗАКРЫТЬ редактор профиля
  closePopup(editProfilePopup)
});

closeAddCardPopupButton.addEventListener('click', function () { //ЗАКРЫТЬ форму добавить карточку
  closePopup(addCardPopup)
});

closeShowImagePopupButton.addEventListener('click', function () { //ЗАКРЫТЬ просмотр фото
  closePopup(showImagePopup)
});
