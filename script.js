// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ============================================
// MOBILE MENU
// ============================================
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ============================================
// PRODUCT FILTERING
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    productCards.forEach(card => {
      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        card.style.display = 'flex';
        // Trigger small animation
        card.style.opacity = '0';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ============================================
// FORM SUBMISSION
// ============================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Check if it's pointing to formspree
    const action = contactForm.getAttribute('action');
    if (action.includes('placeholder')) {
      // Just show success since no real endpoint provided
      formStatus.textContent = 'Thank you! We will contact you soon.';
      formStatus.style.color = '#10b981';
      contactForm.reset();
    } else {
      // Actually submit
      const formData = new FormData(contactForm);
      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          formStatus.textContent = 'Thank you! We will contact you soon.';
          formStatus.style.color = '#10b981';
          contactForm.reset();
        } else {
          formStatus.textContent = 'Oops! There was a problem submitting your form.';
          formStatus.style.color = '#ef4444';
        }
      }).catch(error => {
        formStatus.textContent = 'Oops! There was a problem submitting your form.';
        formStatus.style.color = '#ef4444';
      });
    }
  });
}
