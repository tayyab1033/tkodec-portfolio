// Scroll Animation Observer
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

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');

if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
    });
}

// Add to Cart Mock Functionality
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');
const cartToast = document.getElementById('cartToast');
let currentItems = 0;

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Button effect
        const originalText = btn.textContent;
        btn.textContent = 'Adding...';
        btn.style.backgroundColor = 'var(--color-primary)';
        btn.style.color = '#fff';
        
        setTimeout(() => {
            // Update Number
            currentItems++;
            if (cartCount) cartCount.textContent = currentItems;
            
            // Restore button
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
            
            // Show toast
            if (cartToast) {
                cartToast.classList.add('show');
                setTimeout(() => {
                    cartToast.classList.remove('show');
                }, 3000);
            }
        }, 600);
    });
});
