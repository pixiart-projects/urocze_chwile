// === GALLERY POPUP LOGIC ===
const FOTOS = document.querySelectorAll('.gallery__item img');
const POPUP = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const PopupImg = document.querySelector('.popup__img');
const PopupArrowLeft = document.querySelector('.popup__arrow--left');
const PopupArrowRight = document.querySelector('.popup__arrow--right');
let currentImgIndex;

// Funkcja blokująca/odblokowująca scrollowanie body (WAŻNE ZMIANY)
function toggleBodyScroll(lock) {
  if (lock) {
    // Zapisz aktualną pozycję scrolla
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
    // Przywróć pozycję scrolla
    const scrollY = document.body.dataset.scrollY
      ? parseInt(document.body.dataset.scrollY)
      : 0;
    window.scrollTo(0, scrollY);
  }
}

// Funkcja zamykająca popup
function closePopup() {
  if (!POPUP.classList.contains('hidden')) {
    POPUP.classList.add('hidden');
    toggleBodyScroll(false); // Odblokuj scroll
  }
}

FOTOS.forEach((foto, index) => {
  foto.addEventListener('click', (e) => {
    POPUP.classList.remove('hidden');
    PopupImg.src = e.target.src;
    currentImgIndex = index;
    toggleBodyScroll(true); // Zablokuj scroll
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

// Dodaj nasłuchiwanie na klawisz ESC, aby zamknąć popup
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePopup();
  }
});

// === NAVIGATION ACTIVE STATE AND SMOOTH SCROLL ===
const navItems = document.querySelectorAll('.menu__item');
const sections = document.querySelectorAll('.section');
const mainNav = document.querySelector('.main-nav');

// Uproszczona funkcja przewijania z dynamicznym offsetem
function scrollToSection(targetElement) {
  const navHeight = mainNav.offsetHeight;
  const targetPosition =
    targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
}

// Mapowanie i dodanie nasłuchiwania dla kliknięcia
navItems.forEach((item) => {
  const sectionId = item.getAttribute('data-section');
  const targetSection = document.getElementById(sectionId);

  item.addEventListener('click', function (event) {
    event.preventDefault();

    // GŁÓWNA ZMIANA: Zamknięcie popupu, jeśli jest otwarty
    closePopup();

    // Ustaw aktywny link (żeby był widoczny po przejściu)
    navItems.forEach((navItem) =>
      navItem.classList.remove('menu__item--active')
    );
    item.classList.add('menu__item--active');

    // Przewiń do sekcji
    if (targetSection) {
      // Ponieważ zamknięcie popupu przywraca scrolla, możemy przewinąć od razu.
      scrollToSection(targetSection);
    }
  });
});

// Funkcja zmieniająca aktywny punkt w menu podczas przewijania
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

  // Obsługa sekcji HOME
  if (window.scrollY < NAV_OFFSET) {
    navItems.forEach((item) => item.classList.remove('menu__item--active'));
    document
      .querySelector('.menu__item--home')
      .classList.add('menu__item--active');
  }
}
window.addEventListener('scroll', changeDot);
document.addEventListener('DOMContentLoaded', changeDot);

// === NAVIGATION BACKGROUND COLOR ===
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

// === SCROLL TO TOP BUTTON LOGIC ===
const scrollToTopContainer = document.querySelector('.scroll-to-top');
const scrollToTopButton = document.querySelector('.scroll-to-top__button');
const homeSection = document.getElementById('home');

// Funkcja przewijania (już była, zostaw ją)
scrollToTopButton.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// PRZYWRÓĆ TĘ FUNKCJĘ: Ukrycie/pokazanie przycisku scroll-to-top
window.addEventListener('scroll', function () {
  // Sprawdzenie, czy element 'homeSection' istnieje
  if (!homeSection) return;

  const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;

  // Pokaż po minięciu sekcji HOME
  if (window.scrollY > homeBottom) {
    scrollToTopContainer.classList.add('visible');
  } else {
    scrollToTopContainer.classList.remove('visible');
  }
});
