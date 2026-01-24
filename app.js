
const FOTOS = document.querySelectorAll('.gallery__item img');
const POPUP = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const PopupImg = document.querySelector('.popup__img');
const PopupArrowLeft = document.querySelector('.popup__arrow--left');
const PopupArrowRight = document.querySelector('.popup__arrow--right');
let currentImgIndex;


function toggleBodyScroll(lock) {
if (lock) {
document.body.dataset.scrollY = window.scrollY;
document.body.style.overflow = 'hidden';
document.body.style.position = 'fixed';
document.body.style.top = `-${document.body.dataset.scrollY}px`;
document.body.style.width = '100%';
} else {
document.body.style.overflow = '';
document.body.style.position = '';
document.body.style.top = '';
document.body.style.width = '';
const scrollY = document.body.dataset.scrollY
? parseInt(document.body.dataset.scrollY)
: 0;
window.scrollTo(0, scrollY);
}
}


function closePopup() {
if (!POPUP.classList.contains('hidden')) {
POPUP.classList.add('hidden');
toggleBodyScroll(false); 
}
}

FOTOS.forEach((foto, index) => {
foto.addEventListener('click', (e) => {
POPUP.classList.remove('hidden');
PopupImg.src = e.target.src;
currentImgIndex = index;
toggleBodyScroll(true); 
});
});

popupClose.addEventListener('click', closePopup);

PopupArrowRight.addEventListener('click', () => {
currentImgIndex =
currentImgIndex === FOTOS.length - 1 ? 0 : currentImgIndex + 1;
PopupImg.src = FOTOS[currentImgIndex].src;
});

PopupArrowLeft.addEventListener('click', () => {
currentImgIndex =
currentImgIndex === 0 ? FOTOS.length - 1 : currentImgIndex - 1;
PopupImg.src = FOTOS[currentImgIndex].src;
});


document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') {
closePopup();
}
});


const navItems = document.querySelectorAll('.menu__item');
const sections = document.querySelectorAll('.section');
const mainNav = document.querySelector('.main-nav');


function scrollToSection(targetElement) {
const navHeight = mainNav.offsetHeight;
const targetPosition =
targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

window.scrollTo({
top: targetPosition,
behavior: 'smooth',
});
}


navItems.forEach((item) => {
const sectionId = item.getAttribute('data-section');
const targetSection = document.getElementById(sectionId);

item.addEventListener('click', function (event) {
event.preventDefault();

closePopup();

navItems.forEach((navItem) =>
navItem.classList.remove('menu__item--active')
);
item.classList.add('menu__item--active');

if (targetSection) {

scrollToSection(targetSection);
}
});
});


function changeDot() {
const NAV_OFFSET = mainNav.offsetHeight;
const scrollPosition = window.scrollY + NAV_OFFSET + 10;

sections.forEach((section) => {
const sectionTop = section.offsetTop;
const sectionHeight = section.offsetHeight;
const sectionId = section.id;

if (
scrollPosition >= sectionTop &&
scrollPosition < sectionTop + sectionHeight
) {
navItems.forEach((item) => item.classList.remove('menu__item--active'));
document
.querySelector(`[data-section="${sectionId}"]`)
.classList.add('menu__item--active');
}
});


if (window.scrollY < NAV_OFFSET) {
navItems.forEach((item) => item.classList.remove('menu__item--active'));
document
.querySelector('.menu__item--home')
.classList.add('menu__item--active');
}
}
window.addEventListener('scroll', changeDot);
document.addEventListener('DOMContentLoaded', changeDot);


function handleNavColor() {
const scrollValue = window.pageYOffset || document.documentElement.scrollTop;

if (scrollValue > 5) {
mainNav.classList.add('main-nav--colored');
} else {
mainNav.classList.remove('main-nav--colored');
}
}
window.addEventListener('scroll', handleNavColor);
document.addEventListener('DOMContentLoaded', handleNavColor);


const scrollToTopContainer = document.querySelector('.scroll-to-top');
const scrollToTopButton = document.querySelector('.scroll-to-top__button');
const homeSection = document.getElementById('home');


scrollToTopButton.addEventListener('click', function () {
window.scrollTo({
top: 0,
behavior: 'smooth',
});
});


window.addEventListener('scroll', function () {
if (!homeSection) return;

const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
if (window.scrollY > homeBottom) {
scrollToTopContainer.classList.add('visible');
} else {
scrollToTopContainer.classList.remove('visible');
}
});

const hamburger = document.querySelector('.hamburger');
const mainMenu = document.querySelector('.main-nav__menu');

hamburger.addEventListener('click', () => {
mainMenu.classList.toggle('active');
});
navItems.forEach((item) => {
item.addEventListener('click', () => {
if (mainMenu.classList.contains('active')) {
mainMenu.classList.remove('active');
}
});
});
const sliderImages = [
'imges/foto1.webp',
'imges/foto2.webp',
'imges/foto3.webp',
'imges/foto4.webp',
];
sliderImages.forEach((src) => {
const img = new Image();
img.src = src;
});