'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//!===============
//----- Selecting, Creating, and Deleting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelector('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
console.log(document.getElementsByClassName('btn'));

// creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We  use cookies for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>';
//can be used to move a element since it can only be in one place at a time
// header.prepend(message); //it is the first child of the header
header.append(message); //append is the last child of the header
//header.append(message.cloneNode(true));//copy the message and allow it to be in both places
// header.before(message);
// header.after(message);
//delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    //dom traversing
    message.parentElement.removeChild(message);
  });

//----- Selecting, Creating, and Deleting Elements
//!===============
//----styles, attributes and classes
//styles
message.style.backgroundColor = '#37373d';
message.style.width = '120%';
console.log(message.style.height); //getting the height from the inline style attributes.. will not fetch the height from the css file
console.log(message.style.backgroundColor);
console.log(getComputedStyle(message).color); //we can however us this to get the color without it being inline
console.log(getComputedStyle(message).height); //get the height
//parsing out the px so that it is not a string, so we can then at 40 px to the original height
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'; //increase the height of the cookie navigation bar by 40px
document.documentElement.style.setProperty('--color-primary', 'orangered');
//Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

//non-standard attribute
console.log(logo.designer); //cannot be gotten like this
console.log(logo.getAttribute('designer')); //however you can still get the designer attribute like this
logo.setAttribute('company', 'Bankist'); //add a attribute and give it the string of Bankist
console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('hef'));

//data attributes

console.log(logo.CDATA_SECTION_NODE.versionNumber);
//classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); //not includes

// do not do this
//this will over ride the classes of the element
//only allow for one class
logo.className = 'jonas';
//----styles, attributes and classes

//!===============
//!==================
