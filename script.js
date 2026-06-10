const header = document.querySelector('.site-header');
const navLinks = document.querySelectorAll('.site-nav a');
const sections = document.querySelectorAll('section[id]');

function updateHeader() {
    if (!header) return;

    if (window.scrollY > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

function updateActiveNav() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    updateHeader();
    updateActiveNav();
});

updateHeader();
updateActiveNav();

/* CARS SLIDER */

const carsTrack = document.querySelector('.cars-track');
const carCards = document.querySelectorAll('.auto-card');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');

let currentSlide = 0;

function getVisibleCards() {
    if (window.innerWidth <= 520) return 1;
    if (window.innerWidth <= 780) return 2;
    if (window.innerWidth <= 1100) return 3;
    return 4;
}

function updateCarsSlider() {
    if (!carsTrack || carCards.length === 0) return;

    const visibleCards = getVisibleCards();
    const maxSlide = Math.max(carCards.length - visibleCards, 0);

    if (currentSlide > maxSlide) {
        currentSlide = maxSlide;
    }

    if (currentSlide < 0) {
        currentSlide = 0;
    }

    const cardWidth = carCards[0].offsetWidth;
    const gap = 16;
    const offset = currentSlide * (cardWidth + gap);

    carsTrack.style.transform = `translateX(-${offset}px)`;
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCards();
        const maxSlide = Math.max(carCards.length - visibleCards, 0);

        if (currentSlide >= maxSlide) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }

        updateCarsSlider();
    });

    prevBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCards();
        const maxSlide = Math.max(carCards.length - visibleCards, 0);

        if (currentSlide <= 0) {
            currentSlide = maxSlide;
        } else {
            currentSlide--;
        }

        updateCarsSlider();
    });

    window.addEventListener('resize', updateCarsSlider);
    updateCarsSlider();
}

/* CALCULATOR */

const carPriceInput = document.querySelector('#carPrice');
const calculateButton = document.querySelector('.calculate-button');
const calcResult = document.querySelector('#calcResult');

const basePriceEl = document.querySelector('#basePrice');
const deliveryPriceEl = document.querySelector('#deliveryPrice');
const dutyPriceEl = document.querySelector('#dutyPrice');
const recyclePriceEl = document.querySelector('#recyclePrice');
const docsPriceEl = document.querySelector('#docsPrice');
const companyFeeEl = document.querySelector('#companyFee');
const totalPriceEl = document.querySelector('#totalPrice');

function formatRub(value) {
    return new Intl.NumberFormat('ru-RU').format(Math.round(value)) + ' ₽';
}

function getCleanPriceValue() {
    if (!carPriceInput) return 0;

    return Number(
        carPriceInput.value
            .replace(/\s/g, '')
            .replace(/[^\d]/g, '')
    );
}

function calculateCarPrice() {
    const basePrice = getCleanPriceValue();

    if (!basePrice || basePrice <= 0) {
        carPriceInput.focus();
        return;
    }

    const chinaExpenses = 200000;
    const rfExpenses = 120000;
    const companyFee = 50000;

    const total =
        basePrice +
        chinaExpenses +
        rfExpenses +
        companyFee;

    basePriceEl.textContent = formatRub(basePrice);
    deliveryPriceEl.textContent = formatRub(chinaExpenses);
    dutyPriceEl.textContent = formatRub(rfExpenses);
    recyclePriceEl.textContent = formatRub(companyFee);

    totalPriceEl.textContent =
        formatRub(total) +
        " + утильсбор, доставка по РФ и таможенная пошлина";

    calcResult.classList.add('show');
}

if (calculateButton && carPriceInput) {
    calculateButton.addEventListener('click', calculateCarPrice);

    carPriceInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            calculateCarPrice();
        }
    });
}

/* ICONS */

if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}