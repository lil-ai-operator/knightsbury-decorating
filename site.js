// KNIGHTSBURY — Shared Site JS v3

// ── Hamburger menu ──────────────────────
(function() {
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      var isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      } else {
        hamburger.classList.add('active');
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
})();

// ── Nav scroll ─────────────────────────
(function() {
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }
})();

// ── Hero Slider ─────────────────────────
(function() {
  var slides = document.querySelectorAll('.hero-bg');
  var dots = document.querySelectorAll('.hero-dot');
  var prevBtn = document.querySelector('.hero-arrow.prev');
  var nextBtn = document.querySelector('.hero-arrow.next');
  var current = 0;
  var timer;

  if (slides.length === 0) return;

  function setSlide(n) {
    if (slides.length === 0) return;
    slides[current].className = 'hero-bg';
    dots[current].className = 'hero-dot';
    current = (n + slides.length) % slides.length;
    slides[current].className = 'hero-bg active zoom';
    dots[current].className = 'hero-dot active';
  }

  function next() { setSlide(current + 1); }
  function prev() { setSlide(current - 1); }

  function startTimer() {
    stopTimer();
    timer = window.setInterval(next, 5000);
  }
  function stopTimer() {
    if (timer) window.clearInterval(timer);
  }

  if (nextBtn) nextBtn.addEventListener('click', function() { stopTimer(); next(); startTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', function() { stopTimer(); prev(); startTimer(); });

  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() { stopTimer(); setSlide(i); startTimer(); });
  });

  var hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mouseenter', stopTimer);
    hero.addEventListener('mouseleave', startTimer);
  }

  startTimer();
})();

// ── Partners Logo Slider ────────────────
(function() {
  var track = document.querySelector('.partners-track');
  var prevBtn = document.querySelector('.partners-arrow.prev');
  var nextBtn = document.querySelector('.partners-arrow.next');
  var current = 0;

  if (!track) return;
  var items = track.querySelectorAll('.partner-item');
  if (items.length === 0) return;

  function getVisible() {
    if (window.innerWidth <= 480) return 2;
    if (window.innerWidth <= 768) return 3;
    return 5;
  }

  function update() {
    var visible = getVisible();
    var maxIndex = items.length - visible;
    if (current > maxIndex) current = maxIndex;
    if (current < 0) current = 0;
    var pct = (current / (items.length - 1)) * 100;
    track.style.transform = 'translateX(-' + pct + '%)';
    if (prevBtn) prevBtn.style.opacity = current === 0 ? '0.3' : '1';
    if (nextBtn) nextBtn.style.opacity = current >= maxIndex ? '0.3' : '1';
  }

  function nextSlide() {
    var visible = getVisible();
    var maxIndex = items.length - visible;
    if (current < maxIndex) { current++; update(); }
  }

  function prevSlide() {
    if (current > 0) { current--; update(); }
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  window.addEventListener('resize', update);
  update();
})();

// ── Intersection Observer reveals ───────
(function() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.gold-rule').forEach(function(el) {
    observer.observe(el);
  });
})();

// ── FAQ Accordion ───────────────────────
(function() {
  var btns = document.querySelectorAll('.faq-q');
  if (btns.length === 0) return;

  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btns.forEach(function(b) {
        b.setAttribute('aria-expanded', 'false');
        b.classList.remove('open');
      });
      document.querySelectorAll('.faq-a').forEach(function(a) {
        a.style.maxHeight = '0px';
      });
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        btn.classList.add('open');
        var ans = btn.nextElementSibling;
        if (ans) ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });
})();
