// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));

// Close mobile nav on link click
links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => links.classList.remove('open'));
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

// Hero background slideshow
const slides = document.querySelectorAll('.hero-bg-slide');
let currentSlide = 0;
setInterval(() => {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}, 5000);

// Contact form handler
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

// Auto-dismiss flash messages
document.querySelectorAll('.flash-message').forEach(msg => {
  setTimeout(() => {
    msg.style.opacity = '0';
    msg.style.transform = 'translateX(-50%) translateY(-10px)';
    msg.style.transition = 'all 0.4s ease';
    setTimeout(() => msg.remove(), 400);
  }, 4000);
});
