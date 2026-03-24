// KNIGHTSBURY — Shared Site JS

// ── Hamburger menu ──────────────────────
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    hamburger.classList.toggle('active', !isOpen);
    mobileMenu.classList.toggle('open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close when clicking outside the menu (on the overlay)
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// ── Nav scroll ─────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Hero Slider ─────────────────────────
const slides = document.querySelectorAll('.hero-bg');
const dots = document.querySelectorAll('.hero-dot');
const prevBtn = document.querySelector('.hero-arrow.prev');
const nextBtn = document.querySelector('.hero-arrow.next');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
  slides[currentSlide].classList.remove('active', 'zoom');
  dots[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active', 'zoom');
  dots[currentSlide].classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function startSlideshow() {
  slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideshow() {
  clearInterval(slideInterval);
}

if (slides.length) {
  // Arrow controls
  if (nextBtn) nextBtn.addEventListener('click', () => { stopSlideshow(); nextSlide(); startSlideshow(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { stopSlideshow(); prevSlide(); startSlideshow(); });

  // Dot controls
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopSlideshow();
      goToSlide(parseInt(dot.dataset.slide));
      startSlideshow();
    });
  });

  // Pause on hover
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopSlideshow);
    heroSection.addEventListener('mouseleave', startSlideshow);
  }

  startSlideshow();
}

// ── Intersection Observer reveals ───────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.gold-rule').forEach(el => {
  revealObserver.observe(el);
});

// ── FAQ Accordion (if on page) ─────────
if (document.querySelector('.faq-q')) {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      // Close all
      document.querySelectorAll('.faq-q').forEach(b => { b.setAttribute('aria-expanded','false'); b.classList.remove('open'); });
      document.querySelectorAll('.faq-a').forEach(a => a.style.maxHeight = '0px');
      // Open clicked if was closed
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        btn.classList.add('open');
        const ans = btn.nextElementSibling;
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });
}
