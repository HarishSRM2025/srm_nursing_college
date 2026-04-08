const slides = document.querySelectorAll('.slide');
const track = document.getElementById('track');
const indContainer = document.getElementById('indicators');
const curNum = document.getElementById('curNum');
const total = slides.length;
let current = 0;
let autoTimer = null;
let fillTimer = null;
const DURATION = 5000;

const thumbBgs = [
  'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=200&q=60',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&q=60',
  'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=200&q=60',
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=60'
];
const thumbLabels = ['Our Vision', 'Facilities', 'Placement', 'Admissions'];

const inds = [];
const thumbEls = [];

for (let i = 0; i < total; i++) {
  const ind = document.createElement('div');
  ind.className = 'ind' + (i === 0 ? ' active' : '');
  const fill = document.createElement('div');
  fill.className = 'ind-fill';
  ind.appendChild(fill);
  ind.addEventListener('click', () => goTo(i));
  indContainer.appendChild(ind);
  inds.push(ind);

  const thumb = document.createElement('div');
  thumb.className = 'thumb' + (i === 0 ? ' active' : '');
  const ti = document.createElement('div');
  ti.className = 'thumb-img';
  ti.style.backgroundImage = `url('${thumbBgs[i]}')`;
  const tl = document.createElement('div');
  tl.className = 'thumb-label';
  tl.textContent = thumbLabels[i];
  thumb.appendChild(ti);
  thumb.appendChild(tl);
  thumb.addEventListener('click', () => goTo(i));
  thumbEls.push(thumb);
}

function goTo(index) {
  slides[current].classList.remove('active');
  inds[current].classList.remove('active');
  thumbEls[current].classList.remove('active');
  inds[current].querySelector('.ind-fill').style.width = '0%';

  current = (index + total) % total;

  slides[current].classList.add('active');
  inds[current].classList.add('active');
  thumbEls[current].classList.add('active');
  track.style.transform = `translateX(-${current * 100}%)`;
  curNum.textContent = String(current + 1).padStart(2, '0');

  startFill();
  resetAuto();
}

function startFill() {
  clearInterval(fillTimer);
  const fill = inds[current].querySelector('.ind-fill');
  fill.style.transition = 'none';
  fill.style.width = '0%';
  let start = null;
  fillTimer = setInterval(() => {
    if (start === null) start = Date.now();
    const elapsed = Date.now() - start;
    const pct = Math.min((elapsed / DURATION) * 100, 100);
    fill.style.width = pct + '%';
    if (pct >= 100) clearInterval(fillTimer);
  }, 50);
}

function resetAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => goTo(current + 1), DURATION);
}

document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

document.getElementById('swiper').addEventListener('mouseenter', () => {
  clearInterval(autoTimer);
  clearInterval(fillTimer);
});
document.getElementById('swiper').addEventListener('mouseleave', () => {
  startFill();
  resetAuto();
});

startFill();
resetAuto();