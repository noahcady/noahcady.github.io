// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));

// Close mobile nav on link click
links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => links.classList.remove('open'));
});

// --- THEME TOGGLE ---
const themeToggle = document.getElementById('themeToggle');

function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  // Default to light unless user explicitly has dark system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

// Apply on load (backup for inline script)
applyTheme(getPreferredTheme());

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));

// Hero background slideshow (only on pages with hero)
const slides = document.querySelectorAll('.hero-bg-slide');
if (slides.length > 0) {
  let currentSlide = 0;
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
}

// Contact form handler (only on pages with contact form)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      const res = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#4a7c59';
        btn.style.borderColor = '#4a7c59';
        contactForm.reset();
      } else {
        btn.textContent = 'Error — Try Again';
        btn.style.background = '#b43c3c';
        btn.style.borderColor = '#b43c3c';
      }
    } catch (err) {
      btn.textContent = 'Error — Try Again';
      btn.style.background = '#b43c3c';
      btn.style.borderColor = '#b43c3c';
    }

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
    }, 2500);
  });
}

// Video modal (only on pages with video modal)
const videoModal = document.getElementById('videoModal');
if (videoModal) {
  const videoFrame = document.getElementById('videoFrame');
  const modalTitle = document.getElementById('modalTitle');
  const modalTag = document.getElementById('modalTag');
  const modalDesc = document.getElementById('modalDesc');

  function openVideoModal(card) {
    const videoId = card.dataset.video;
    const title = card.dataset.title;
    const tag = card.dataset.tag;
    const desc = card.dataset.desc;

    videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    modalTitle.textContent = title;
    modalTag.textContent = tag;
    modalDesc.textContent = desc;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
    // Stop the video by clearing the src
    setTimeout(() => { videoFrame.src = ''; }, 350);
  }

  // Open modal on project card click
  document.querySelectorAll('.project-card[data-video]').forEach(card => {
    card.addEventListener('click', () => openVideoModal(card));
  });

  // Close modal on overlay click, close button, or Escape key
  videoModal.querySelector('.video-modal-overlay').addEventListener('click', closeVideoModal);
  videoModal.querySelector('.video-modal-close').addEventListener('click', closeVideoModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
      closeVideoModal();
    }
  });
}

// Auto-dismiss flash messages
document.querySelectorAll('.flash-message').forEach(msg => {
  setTimeout(() => {
    msg.style.opacity = '0';
    msg.style.transform = 'translateX(-50%) translateY(-10px)';
    msg.style.transition = 'all 0.4s ease';
    setTimeout(() => msg.remove(), 400);
  }, 4000);
});

// --- IMAGE LIGHTBOX (Color Grading page) ---
const lightbox = document.getElementById('imageLightbox');
if (lightbox) {
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = img.alt || '';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 350);
  }

  lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}