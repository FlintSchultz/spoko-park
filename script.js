// Языковой переключатель
const btnEn = document.getElementById('en-btn'),
      btnPl = document.getElementById('pl-btn'),
      navBtns = document.querySelectorAll('.nav-btn');
btnEn.onclick = () => switchLang('en');
btnPl.onclick = () => switchLang('pl');
function switchLang(lang) {
  document.querySelectorAll('[data-en]').forEach(el => {
    const link = el.querySelector('a');

    // Если внутри есть ссылка
    if (link) {
      // Политика конфиденциальности
      if (link.id === 'privacy-policy-link') {
        const text = lang === 'pl' ? el.dataset.pl : el.dataset.en;
        const href = link.dataset[`href${lang === 'pl' ? 'Pl' : 'En'}`];
        link.textContent = text;
        link.setAttribute('href', href);

      } else {
        // Текст + ссылка, как "Email us at <a>info@...</a>"
        const fullText = el.dataset[lang];
        const linkText = link.textContent;

        // Заменяем всё содержимое элемента, но вставляем <a> заново
        el.innerHTML = '';
        const textNode = document.createTextNode(fullText.replace(linkText, '').trim() + ' ');
        el.appendChild(textNode);
        el.appendChild(link);
      }

    } else {
      // Простой текст
      el.textContent = el.dataset[lang];
    }
  });
  btnEn.classList.toggle('active', lang==='en');
  btnPl.classList.toggle('active', lang==='pl'); 
}

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.addEventListener("DOMContentLoaded", function () {
  // Инициализируем язык по умолчанию
  const initialLang = document.documentElement.lang || 'en';
  switchLang(initialLang);

  // Анимация How it works
    const steps = document.querySelectorAll(".step");
  const wrapper = document.querySelector(".sticky-wrapper");
  const vh = window.innerHeight;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const start = wrapper.offsetTop;

    steps.forEach((step, i) => {
      const triggerPoint = start + i * vh * 1.0;
      if (scrollTop + vh * 0.6 > triggerPoint) {
        step.classList.add("visible");
      }
    });
  });
});


// Слайдер
const swiper = new Swiper('.mySwiper', {
  centeredSlides: true,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    }
  }
});

// Навигация по якорям
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Удаляем .active у всех кнопок
    navBtns.forEach(b => b.classList.remove('active'));
    // Добавляем .active текущей
    btn.classList.add('active');
    document.getElementById(btn.dataset.target).scrollIntoView({ behavior:'smooth' });
  });
});


// Обновление активной кнопки по прокрутке
const sections = [...navBtns].map(btn => document.getElementById(btn.dataset.target));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navBtns.forEach(btn => {
          btn.classList.toggle('active', btn.dataset.target === id);
        });
      }
    });
  },
  {
    threshold: 0.15 // блок считается видимым, если больше половины видно
  }
);

// Наблюдаем за каждым разделом
sections.forEach(section => observer.observe(section));
