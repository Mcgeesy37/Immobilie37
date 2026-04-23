/* FLORIAN CHRIST — main.js */
document.addEventListener('DOMContentLoaded', function () {

  /* ── CURSOR ── */
  var cur = document.createElement('div');
  cur.id = 'cursor';
  cur.innerHTML = '<div class="c-dot"></div><div class="c-ring"></div>';
  document.body.appendChild(cur);
  var dot  = cur.querySelector('.c-dot');
  var ring = cur.querySelector('.c-ring');
  var mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = 'translate('+mx+'px,'+my+'px) translate(-50%,-50%)';
  });
  (function loop() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.transform = 'translate('+rx+'px,'+ry+'px) translate(-50%,-50%)';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a, .card, .cc').forEach(function (el) {
    el.addEventListener('mouseenter', function () { ring.classList.add('big'); });
    el.addEventListener('mouseleave', function () { ring.classList.remove('big'); });
  });

  /* ── HEADER border on scroll ── */
  var hdr = document.getElementById('hdr');
  if (hdr) {
    window.addEventListener('scroll', function () {
      hdr.style.borderBottomColor = window.scrollY > 60
        ? 'rgba(200,184,154,0.32)' : 'rgba(200,184,154,0.15)';
    }, { passive: true });
  }

  /* ── SCROLL REVEAL ── */
  var reveals = document.querySelectorAll(
    '.sec-header, .about-copy, .about-portrait, .quote-inner, .contact-inner, .stats-grid'
  );
  reveals.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
  });
  if ('IntersectionObserver' in window) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        rio.unobserve(e.target);
      });
    }, { threshold: 0.1 });
    reveals.forEach(function (el) { rio.observe(el); });
  } else {
    reveals.forEach(function (el) { el.style.opacity='1'; el.style.transform='none'; });
  }

});
