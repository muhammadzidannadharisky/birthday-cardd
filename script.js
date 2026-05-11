const messages = [
  {
    img: "virge.jpg",
    text: "Di antara semua hal selain ini, gw cuma mau bilang puas-puasin dihari spesial lu ini, dan makasih udah memilih tetep hidup wlau cobaan lu mungkin berat tapi percayalah kedepannya sudah ada hal baik yang menunggu lu disana."
  },
  {
    img: "pirji.jpg",
    text: "Dan mungkin lu berfikir kira-kira siapa yang rencanain buat ini semua? tapi lu gaperlu tau dulu, pada intinya gw berharap semoga suatu hari nanti lu sadar kalau diri lu pantas dicintai sebesar itu, tanpa harus capek jadi apa pun."
  },
  {
    img: "gie.jpg",
    text: "Happy birthday yaa yang ke-20. Semoga yang lu baca barusan bisa merasa lu jadi kek seakan-akan masih punya sosok yang masih care sama lu, dan semoga suatu hari nanti lu bisa ngerasain itu sepenuhnya. I'm glad you Happy."
  }
];

let currentSection = 0;
let currentMsg     = 0;
let confettiAnim   = null;
let musicPlaying   = false;

const sections = document.querySelectorAll('.section');
const navDots  = document.querySelectorAll('.nav-dot');

function goTo(idx) {
  if (idx === currentSection) return;
  sections[currentSection].classList.remove('active');
  navDots[currentSection].classList.remove('active');
  currentSection = idx;
  sections[idx].classList.add('active');
  navDots[idx].classList.add('active');
  onSectionEnter(idx);
}

function onSectionEnter(idx) {
  if (idx === 1) startCountdown();
  if (idx === 5) startConfetti();
  else           stopConfetti();
}

setTimeout(function () {
  if (currentSection === 0) goTo(1);
}, 4000);

function startCountdown() {
  var el = document.getElementById('countdown-num');
  var n  = 3;
  el.textContent = n;
  el.style.animation = 'countSpin 1s ease both';
  function tick() {
    n--;
    if (n <= 0) {
      setTimeout(function () { goTo(2); }, 800);
      return;
    }
    el.style.animation = 'none';
    void el.offsetWidth;
    el.textContent = n;
    el.style.animation = 'countSpin 1s ease both';
    setTimeout(tick, 1000);
  }
  setTimeout(tick, 1000);
}

function initStars(canvasId) {
  var c = document.getElementById(canvasId);
  if (!c) return;
  var ctx = c.getContext('2d');
  function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  var stars = [];
  for (var i = 0; i < 160; i++) {
    stars.push({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2
    });
  }
  function draw(t) {
    ctx.clearRect(0, 0, c.width, c.height);
    stars.forEach(function (s) {
      var alpha = 0.3 + 0.5 * Math.sin(t * s.speed * 60 + s.phase);
      ctx.beginPath();
      ctx.arc(s.x * c.width, s.y * c.height, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(240,230,200,' + alpha + ')';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

function initBokeh(canvasId) {
  var c = document.getElementById(canvasId);
  if (!c) return;
  var ctx = c.getContext('2d');
  function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  var orbs = [];
  for (var i = 0; i < 18; i++) {
    var hues = [42, 35, 30, 200, 280];
    orbs.push({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 90 + 40,
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      h: hues[Math.floor(Math.random() * hues.length)],
      s: Math.random() * 20 + 20,
      l: Math.random() * 20 + 20,
      a: Math.random() * 0.25 + 0.05
    });
  }
  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = '#0e0e1a';
    ctx.fillRect(0, 0, c.width, c.height);
    orbs.forEach(function (o) {
      o.x = (o.x + o.vx + 1) % 1;
      o.y = (o.y + o.vy + 1) % 1;
      var cx = o.x * c.width;
      var cy = o.y * c.height;
      var grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.r);
      grd.addColorStop(0, 'hsla(' + o.h + ',' + o.s + '%,' + o.l + '%,' + o.a + ')');
      grd.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, o.r, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

function startConfetti() {
  var c = document.getElementById('confetti-canvas');
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  var ctx = c.getContext('2d');
  var palette = ['#c8a96e', '#e8c882', '#ffffff', '#d4a0b0', '#9090c0'];
  var pieces = [];
  for (var i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * c.width,
      y: Math.random() * c.height - c.height,
      w: Math.random() * 8 + 4,
      h: Math.random() * 14 + 6,
      color: palette[Math.floor(Math.random() * palette.length)],
      rot: Math.random() * 360,
      rspeed: (Math.random() - 0.5) * 3,
      vy: Math.random() * 2 + 1.5,
      vx: (Math.random() - 0.5) * 1.5
    });
  }
  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    pieces.forEach(function (p) {
      p.y += p.vy; p.x += p.vx; p.rot += p.rspeed;
      if (p.y > c.height) { p.y = -20; p.x = Math.random() * c.width; }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    confettiAnim = requestAnimationFrame(draw);
  }
  draw();
}

function stopConfetti() {
  if (confettiAnim) { cancelAnimationFrame(confettiAnim); confettiAnim = null; }
  var c = document.getElementById('confetti-canvas');
  c.getContext('2d').clearRect(0, 0, c.width, c.height);
}

function buildDots() {
  var track = document.getElementById('dot-track');
  track.innerHTML = '';
  messages.forEach(function (_, i) {
    var d = document.createElement('div');
    d.className = 'msg-dot' + (i === currentMsg ? ' active' : '');
    d.setAttribute('onclick', 'setMsg(' + i + ')');
    track.appendChild(d);
  });
}

function setMsg(i) {
  currentMsg = i;
  document.getElementById('msg-img').src = messages[i].img;
  document.getElementById('msg-p').textContent = messages[i].text;
  document.querySelectorAll('.msg-dot').forEach(function (d, j) {
    d.classList.toggle('active', j === i);
  });
}

function prevMsg() { setMsg((currentMsg - 1 + messages.length) % messages.length); }
function nextMsg() { setMsg((currentMsg + 1) % messages.length); }

buildDots();

// ✅ GOLD BORDER PINDAH SAAT FOTO DIKLIK
function initPhotoClick() {
  var cells = document.querySelectorAll('.photo-cell');
  cells.forEach(function (cell) {
    cell.addEventListener('click', function () {
      cells.forEach(function (c) { c.classList.remove('glow'); });
      cell.classList.add('glow');
    });
  });
}
initPhotoClick();

function toggleMusic() {
  var audio = document.getElementById('bgm');
  var btn   = document.getElementById('music-btn');
  if (musicPlaying) {
    audio.pause();
    musicPlaying = false;
    btn.textContent = '♪';
  } else {
    audio.play().catch(function () {});
    musicPlaying = true;
    btn.textContent = '⏸';
  }
}

// ✅ LAGU LANGSUNG PLAY DARI AWAL
window.addEventListener('load', function () {
  var audio = document.getElementById('bgm');
  var btn   = document.getElementById('music-btn');
  audio.volume = 1.0;
  audio.play().then(function () {
    musicPlaying = true;
    btn.textContent = '⏸';
  }).catch(function () {
    document.body.addEventListener('click', function onFirstClick() {
      audio.play().then(function () {
        musicPlaying = true;
        btn.textContent = '⏸';
      }).catch(function () {});
      document.body.removeEventListener('click', onFirstClick);
    }, { once: true });
  });
});

function replayAll() {
  stopConfetti();
  goTo(0);
  setTimeout(function () { goTo(1); }, 800);
}

initStars('stars1');
initBokeh('bokeh2');
initBokeh('bokeh3');
initBokeh('bokeh4');
initBokeh('bokeh5');
initBokeh('bokeh6');