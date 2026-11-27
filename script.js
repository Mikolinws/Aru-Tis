
// ================================
// ARU TIS — INTERACTIONS
// ================================


// MOBILE NAVIGATION

const menuToggle = document.getElementById('menuToggle');
const navigation = document.getElementById('navigation');

function closeMenu() {
  if (!menuToggle || !navigation) return;

  navigation.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Открыть меню');
}

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('active');

    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Закрыть меню' : 'Открыть меню'
    );
  });

  navigation.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', event => {
    if (
      !navigation.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}


// ================================
// SERVICES ACCORDION
// ================================

const serviceButtons = document.querySelectorAll('.service-toggle');

serviceButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.closest('.service-category');
    const detailsId = button.getAttribute('aria-controls');
    const details = document.getElementById(detailsId);

    if (!category || !details) return;

    const isOpen = button.getAttribute('aria-expanded') === 'true';

    // Закрываем остальные категории
    serviceButtons.forEach(otherButton => {
      if (otherButton === button) return;

      const otherId = otherButton.getAttribute('aria-controls');
      const otherDetails = document.getElementById(otherId);
      const otherCategory = otherButton.closest('.service-category');

      otherButton.setAttribute('aria-expanded', 'false');

      if (otherDetails) {
        otherDetails.hidden = true;
      }

      if (otherCategory) {
        otherCategory.classList.remove('active');
      }
    });

    // Переключаем выбранную категорию
    button.setAttribute('aria-expanded', String(!isOpen));
    details.hidden = isOpen;
    category.classList.toggle('active', !isOpen);
  });
});


// ================================
// WHATSAPP
// ================================

const whatsappNumber = '77774266993';

const generalMessage =
  'Здравствуйте! Хочу записаться на консультацию в Aru Tis. Подскажите, пожалуйста, свободное время.';

function createWhatsAppUrl(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Общая запись

document.querySelectorAll('.whatsapp-link').forEach(link => {
  const service = link.dataset.service;

  if (service) {
    const message =
      `Здравствуйте! Хочу записаться на ${service} в Aru Tis. Подскажите, пожалуйста, свободное время и подробности по стоимости.`;

    link.href = createWhatsAppUrl(message);
  } else {
    link.href = createWhatsAppUrl(generalMessage);
  }
});


// ================================
// TOOTH IMAGE FALLBACK
// ================================

const tooth = document.querySelector('.hero-tooth');
const toothFallback = document.querySelector('.tooth-fallback');

function showToothFallback() {
  if (!tooth || !toothFallback) return;

  tooth.hidden = true;
  toothFallback.style.display = 'grid';
}

if (tooth && toothFallback) {
  tooth.addEventListener('error', showToothFallback);

  if (tooth.complete && tooth.naturalWidth === 0) {
    showToothFallback();
  }
}


// ================================
// REVIEWS — MOUSE DRAG
// ================================

const reviewsTrack = document.getElementById('reviewsTrack');

if (reviewsTrack) {
  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;
  let activePointerId = null;

  reviewsTrack.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch' || event.button !== 0) {
      return;
    }

    isDragging = true;
    activePointerId = event.pointerId;

    startX = event.clientX;
    startScrollLeft = reviewsTrack.scrollLeft;

    reviewsTrack.classList.add('is-dragging');
    reviewsTrack.setPointerCapture(event.pointerId);
  });

  reviewsTrack.addEventListener('pointermove', event => {
    if (!isDragging || event.pointerId !== activePointerId) {
      return;
    }

    const distance = event.clientX - startX;
    reviewsTrack.scrollLeft = startScrollLeft - distance;
  });

  function stopDragging(event) {
    if (!isDragging) return;

    if (
      event &&
      activePointerId !== null &&
      event.pointerId !== activePointerId
    ) {
      return;
    }

    isDragging = false;
    activePointerId = null;

    reviewsTrack.classList.remove('is-dragging');
  }

  reviewsTrack.addEventListener('pointerup', stopDragging);
  reviewsTrack.addEventListener('pointercancel', stopDragging);
  reviewsTrack.addEventListener('lostpointercapture', stopDragging);
}


// ================================
// CURRENT YEAR
// ================================

const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
