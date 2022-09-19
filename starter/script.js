'use strict';

///////////////////////////////////////
// Modal window
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
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
// Button scrolling
//assigning the varibles to be used in the event listener accessing the html item

//get the window positioning
//listening for the button click on learn more to scroll the user to the first section
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());
  //get the users current scroll position
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  //distance from the top of the page in px
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight, //get the height and width of the viewport
    document.documentElement.clientWidth
  );
  //this is the older technique to scroll smooth
  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  //end this is the older technique to scroll smooth
  //working in modern browsers only for smooth scrolling
  // section1.scrollIntoView({ behavior: 'smooth' });
});

//!===============
//page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log('LINK');
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });

//using event propagation to apply event to all links with the parent element
//1.add event listener to common parent element
//2.Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  e.preventDefault;
  //matching strategy
  //determining where the click  event comes from on the parent container
  if (e.target.classList.contains('nav__link')) {
    console.log('object');
    const id = e.target.id;
    console.log(id);
    const section = document.querySelector(`#section--${id}`);
    console.log(section);
    section.scrollIntoView({ behavior: 'smooth' });
  }
});
//!======
//--------tab cards
//* const tabs = document.querySelectorAll('.operations__tab');
//* const tabsContainer = document.querySelector('.operations__tab-container');
//* const tabsContent = document.querySelectorAll('.operations__content');

// bad practice if you end up having lots  of events that its tied to because the duplicate, instead you should use
//event propagation
// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab'); //find the closest parent with the class name .operations__tab
  // console.log(clicked);

  if (!clicked) return; //guard clause if nothing is click return immediately keeps the rest of the code from being ran

  console.log('here');
  //remove active tabs
  tabs.forEach(t => t.classList.remove('operations__tab--active')); //remove the class from the button making it inactive
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  //active tab
  clicked.classList.add('operations__tab--active');
  //active content area
  // console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
//----- end tabs
//!======
//-----menu fade animation
// const nav = document.querySelector('.nav'); moved
const handleHover = function (e) {
  // console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
//passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
//!=============
//----sticky navigation
//----poor performance issues from high amount of scroll events from listener
/*
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener('scroll', function () {
  console.log(window, scrollY);

  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
*/
//------end sticky navigation
//!=============
//-------intersections OBSERVER API
/*
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};
const obsOptions = {
  root: null,
  threshold: [0, 0.2],
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height; //getting the rootmargin because we don't want 90px hard coded because of differences in screen sizes
// console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  //if entry intersecting false make give navigation bar the class of sticky else if its true remove the sticky class
  if (!entry.isIntersecting) {
    nav.classList.add('sticky'); //add sticky class
  } else {
    nav.classList.remove('sticky'); //remove sticky class
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, //the height of the navbar is 90 px
}); //get the navHeight from the getBoundingClientRect
headerObserver.observe(header);
//------intersections OBSERVER API
//!===============
//------ revealing images with the INTERSECTING OBSERVER API
const allSections = document.querySelectorAll('.section'); //get all the sections into variable
const revealSection = function (entries, observer) {
  const [entry] = entries; //deconstruct entry into entries
  // console.log(entry);
  if (!entry.isIntersecting) {
    return; //guard clause returns immediately if it is true
  } else {
    entry.target.classList.remove('section--hidden'); //remove the section--hidden class from the sections when the scrolling reaches the target sections
    observer.unobserve(entry.target); //unobserve the observer to save resources from being logged
  }
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//------ revealing images with the INTERSECTING OBSERVER API
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//!===============
//----- Selecting, Creating, and Deleting Elements
/*
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
*/
//----- Selecting, Creating, and Deleting Elements
//!===============
//----styles, attributes and classes
//styles
/*
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
console.log(link.getAttribute('href'));

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
*/
//----styles, attributes and classes

//!===============
// Button scrolling
//assigning the variables to be used in the event listener accessing the html item
/*
////const btnScrollTo = document.querySelector('.btn--scroll-to');
////const section1 = document.querySelector('#section--1');

//get the window positioning
//listening for the button click on learn more to scroll the user to the first section
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());
  //get the users current scroll position
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  //distance from the top of the page in px
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight, //get the height and width of the viewport
    document.documentElement.clientWidth
  );
  //this is the older technique to scroll smooth
  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  //end this is the older technique to scroll smooth
  //working in modern browsers only for smooth scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
});

//!==================
// events and event handlers
/*
const h1 = document.querySelector('h1');
//you can have multiple event listeners on a single item

//alertH1 function that can be called anywhere
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};
//alertH1 function that can be called anywhere

h1.addEventListener('mouseenter', alertH1);
//turn off and remove the event listener so the user does not have the prompt keep popping up after 3 seconds
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
!older and you can only have one
// h1.onmouseenter = function (e) {
  */
//   alert('onmouseenter:great! You are reading the heading:D');
// };
//!==================
// Event Propagation: Bubbling and Capturing
// rgb(255, 255, 255)
/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
//getting a random  rgb color grabbing a random numb between 0 and 255 3 times
//we use random Int to get the min and the max and do math at random
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());
console.log(randomInt(5, 96));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  //stop propagation, prevent it from bubbling out
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  }
  // true //this means it will catch the process as it goes down
);
*/
//-------- Event Propagation: Bubbling and Capturing
//!==================
//---Event Delegation: Implementing Page Navigation
//page navigation
//page smooth scrolling
//---------Event Delegation: Implementing Page Navigation
//!===============
//---------DOM traversing
/*
const h1 = document.querySelector('h1');
//going downwards: child
console.log(h1.querySelectorAll('.highlight'));
//getting all the children of h1
console.log(h1.childNodes); //includes all child nodes, including non-element nodes like text and comment. To get a collection containing only elements, use Element.children instead.
console.log(h1.children); //children property returns a live HTMLCollection which contains all of the child elements of the element upon which it was called.

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

console.log(h1.parentNode); //parentNode property of the Node interface returns the parent of the specified node in the DOM tree.
console.log(h1.parentElement);
h1.closest('header').style.background = 'var( --gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

//going sideways : siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
//-----end DOM traversing
//!===============
//-----tabbed component
// const tabs = document.querySelectorAll('.operations__tab');
// const tabsContainer = document.querySelector('.operations__tab-container');
// const tabsContent = document.querySelectorAll('.operations__content');

// // bad practice if you end up having lots  of events that its tied to because the duplicate, instead you should use
// //event propagation
// // tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));

// tabsContainer.addEventListener('click', function (e) {
//   e.preventDefault();
//   const clicked = e.target.closest('.operations__tab'); //find the closest parent with the class name .operations__tab
//   // console.log(clicked);

//   if (!clicked) return; //guard clause if nothing is click return immediately keeps the rest of the code from being ran

//   //remove active tabs
//   tabs.forEach(t => t.classList.remove('operations__tab--active')); //remove the class from the button making it inactive
//   tabsContent.forEach(c => c.classList.remove('operations__content--active'));
//   //active tab
//   clicked.classList.add('operations__tab--active');
//   //active content area
//   // console.log(clicked.dataset.tab);
//   document
//     .querySelector(`.operations__content--${clicked.dataset.tab}`)
//     .classList.add('operations__content--active');
//----end tabs
// });
//!===============
//----Passing Arguments to Event Handlers

//----Passing Arguments to Event Handlers
//!===============
