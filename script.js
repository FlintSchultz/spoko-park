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

// Навигация по якорям
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.target).scrollIntoView({ behavior:'smooth' });
  });
});


const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const dotsContainer = document.querySelector('.dots');

let idx = 0;
const totalSlides = slides.length;

// Создаем точки навигации
for(let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('span');
  dot.className = 'dot';
  dot.setAttribute('role', 'tab');
  dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
  dot.setAttribute('tabindex', i === 0 ? '0' : '-1');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
}
const dots = document.querySelectorAll('.dot');

function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
    dot.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    dot.setAttribute('tabindex', i === idx ? '0' : '-1');
  });
}

function goTo(i) {
  idx = i;
  track.style.transform = `translateX(-${100 * idx}%)`;
  updateDots();
}

prev.addEventListener('click', () => {
  idx = (idx - 1 + totalSlides) % totalSlides;
  goTo(idx);
});

next.addEventListener('click', () => {
  idx = (idx + 1) % totalSlides;
  goTo(idx);
});

// Инициализация
goTo(0);

// Автопрокрутка каждые 5 секунд
setInterval(() => {
  idx = (idx + 1) % totalSlides;
  goTo(idx);
}, 5000);

// Простой скрипт для добавления класса visible при попадании в область видимости
document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.step');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    }
  );

  steps.forEach(step => observer.observe(step));
});

document.addEventListener('DOMContentLoaded', () => {
const steps = document.querySelectorAll('.step');

const observer = new IntersectionObserver(
    entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
        }
    });
    },
    {
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
    }
);

steps.forEach(step => observer.observe(step));
});
