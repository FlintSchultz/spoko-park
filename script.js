// Языковой переключатель
const btnEn = document.getElementById('en-btn'),
      btnPl = document.getElementById('pl-btn'),
      navBtns = document.querySelectorAll('.nav-btn');
btnEn.onclick = () => switchLang('en');
btnPl.onclick = () => switchLang('pl');
function switchLang(lang) {
  document.querySelectorAll('[data-en]').forEach(el => el.textContent = el.dataset[lang]);
  btnEn.classList.toggle('active', lang==='en');
  btnPl.classList.toggle('active', lang==='pl');
}


// Слайдер
const swiper = new Swiper('.mySwiper', {
  slidesPerView: 3,
  centeredSlides: true,
  loop: true,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
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
    threshold: 0.55 // блок считается видимым, если больше половины видно
  }
);

// Наблюдаем за каждым разделом
sections.forEach(section => observer.observe(section));
