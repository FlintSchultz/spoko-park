// Language switch
document.getElementById('en-btn').onclick=()=>switchLang('en');
document.getElementById('pl-btn').onclick=()=>switchLang('pl');

function switchLang(lang){
  document.querySelectorAll('[data-en]').forEach(el=>el.textContent=el.dataset[lang]);
  document.querySelectorAll('.lang-switch button').forEach(btn=>btn.classList.toggle('active', btn.id.startsWith(lang)));
}

// Slider
const slides=document.querySelectorAll('.slide');
const dotsContainer=document.querySelector('.dots');
let current=0;

slides.forEach((_,i)=>{
  const d=document.createElement('span');
  d.className='dot';
  d.onclick=()=>goTo(i);
  dotsContainer.appendChild(d);
});
const dots=document.querySelectorAll('.dot');

function goTo(i){
  current=i;
  document.querySelector('.slider').style.transform=`translateX(-${100*i}%)`;
  dots.forEach((dot,idx)=>dot.classList.toggle('active', idx===i));
}
goTo(0);
setInterval(()=>goTo((current+1)%slides.length),4000);