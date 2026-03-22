// ─── CraZyDevelopers – script.js ───

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ── Mobile burger menu ──
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  }

  // ── Intersection Observer for fade-in animations ──
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeEls.forEach((el, i) => {
    // Stagger children in a grid
    const parent = el.parentElement;
    const siblings = parent.querySelectorAll('.fade-in');
    const idx = Array.from(siblings).indexOf(el);
    el.style.transitionDelay = `${idx * 0.08}s`;
    observer.observe(el);
  });

  // ── Smooth counter animation for stats ──
  const statNums = document.querySelectorAll('.stat-num, .istat-num');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const text = el.textContent;
    const num = parseFloat(text.replace(/[^0-9.]/g, ''));
    if (isNaN(num) || num === 0) return;

    const suffix = text.replace(/[0-9.]/g, '');
    const duration = 1200;
    const start = performance.now();

    function step(timestamp) {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * num);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ── Active nav link highlighting ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ── Subtle parallax on hero bg grid ──
  const bgGrid = document.querySelector('.hero-bg-grid');
  if (bgGrid) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      bgGrid.style.transform = `translateY(${y * 0.3}px)`;
    }, { passive: true });
  }

  // ── Code card typewriter animation ──
  const ccLines = document.querySelectorAll('.cc-typed');
  const ccCursor = document.getElementById('ccCursor');

  if (ccLines.length && ccCursor) {
    // Delay start slightly so the page has settled
    setTimeout(() => {
      ccLines.forEach((line, i) => {
        setTimeout(() => {
          // Move cursor to sit after current line
          line.insertAdjacentElement('afterend', ccCursor);
          ccCursor.style.opacity = '1';
          ccCursor.style.animation = 'blink 1s step-end infinite';

          line.style.transition = 'opacity 0.15s ease';
          line.style.opacity = '1';

          // After the last line, park cursor at the bottom for good
          if (i === ccLines.length - 1) {
            setTimeout(() => {
              ccCursor.style.animation = 'blink 1s step-end infinite';
            }, 200);
          }
        }, i * 420);
      });
    }, 600);
  }

  // ── Service cards hover ripple effect ──
  document.querySelectorAll('.service-card, .stat-card, .contact-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });

  // ── Contact card shimmer pulse ──
  const waCard = document.querySelector('.wa-card');
  if (waCard) {
    setTimeout(() => {
      waCard.style.animation = 'pulse 2s ease-in-out infinite';
    }, 1500);
  }

  // ── Ticker speed control ──
  const ticker = document.querySelector('.ticker-track');
  if (ticker) {
    ticker.addEventListener('mouseenter', () => {
      ticker.style.animationPlayState = 'paused';
    });
    ticker.addEventListener('mouseleave', () => {
      ticker.style.animationPlayState = 'running';
    });
  }

});
