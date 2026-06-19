/* World Musa Taekwondo — vanilla JS */
(function () {
  // Year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu
  var burger = document.getElementById('burger');
  var mobile = document.getElementById('navMobile');
  if (burger && mobile) {
    burger.addEventListener('click', function () {
      var open = mobile.getAttribute('data-open') === 'true';
      mobile.setAttribute('data-open', String(!open));
      mobile.hidden = open;
      burger.setAttribute('aria-expanded', String(!open));
    });
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobile.setAttribute('data-open', 'false');
        mobile.hidden = true;
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Marquee: duplicate content for seamless loop
  var marquee = document.getElementById('marquee');
  if (marquee) {
    var original = marquee.innerHTML;
    // duplicate enough times to fill width
    marquee.innerHTML = original + original + original + original;
  }

  // Smooth scroll (CSS handles it; this offsets for the fixed nav)
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // Share button
  var shareBtn = document.getElementById('shareBtn');
  var toast = document.getElementById('toast');
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 2400);
  }
  if (shareBtn) {
    shareBtn.addEventListener('click', async function () {
      var data = {
        title: 'World Musa Taekwondo',
        text: 'Projeto social gratuito de Taekwondo no Centro da Juventude. Seg e Qua, 16:00–17:30.',
        url: window.location.href
      };
      try {
        if (navigator.share) {
          await navigator.share(data);
          return;
        }
      } catch (_) { /* user cancelled */ return; }
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Link copiado!');
      } catch (_) {
        showToast('Copie a URL manualmente');
      }
    });
  }
})();
