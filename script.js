document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const menu = document.querySelector('.menu ul');

  if (hamburger && menu) {
    hamburger.addEventListener('click', function () {
      this.classList.toggle('active');
      menu.classList.toggle('active');
    });
  }

  // Menu tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const menuGrids = document.querySelectorAll('.menu-grid');

  if (tabButtons.length && menuGrids.length) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function () {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        menuGrids.forEach(grid => grid.classList.remove('active'));

        this.classList.add('active');

        const category = this.getAttribute('data-category');
        const targetGrid = document.getElementById(category);
        if (targetGrid) {
          targetGrid.classList.add('active');
        }
      });
    });
  }

  // Testimonial slider
  const testimonials = document.querySelectorAll('.testimonial');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    if (testimonials[index]) testimonials[index].classList.add('active');
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function () {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentTestimonial);
    });

    nextBtn.addEventListener('click', function () {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    });
  }

  // Shopping cart functionality
  const cartIcon = document.getElementById('cartIcon');
  const cartModal = document.getElementById('cartModal');
  const closeCart = document.querySelector('.close-cart');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total span');
  const cartCount = document.querySelector('.cart-count');

  let cart = [];

  if (cartIcon && cartModal && closeCart) {
    cartIcon.addEventListener('click', function () {
      cartModal.classList.add('active');
    });

    closeCart.addEventListener('click', function () {
      cartModal.classList.remove('active');
    });
  }

  if (addToCartButtons.length) {
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function () {
        const menuItem = this.closest('.menu-item');
        const itemName = menuItem.querySelector('h3').textContent;
        const itemPrice = parseFloat(menuItem.querySelector('.price').textContent.replace('$', ''));
        const itemImage = menuItem.querySelector('img').src;

        const existingItem = cart.find(item => item.name === itemName);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({
            name: itemName,
            price: itemPrice,
            image: itemImage,
            quantity: 1
          });
        }

        updateCart();
        cartModal.classList.add('active');

        cartIcon.classList.add('animate');
        setTimeout(() => {
          cartIcon.classList.remove('animate');
        }, 500);
      });
    });
  }

  function updateCart() {
    cartItemsContainer.innerHTML = '';

    let total = 0;
    let itemCount = 0;

    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>$${item.price.toFixed(2)}</p>
          <div class="cart-item-controls">
            <button class="decrease">-</button>
            <span>${item.quantity}</span>
            <button class="increase">+</button>
            <span class="remove-item"><i class="fas fa-trash"></i></span>
          </div>
        </div>
      `;

      cartItemsContainer.appendChild(cartItem);
      total += item.price * item.quantity;
      itemCount += item.quantity;

      cartItem.querySelector('.decrease').addEventListener('click', function () {
        const itemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
        if (cart[itemIndex].quantity > 1) {
          cart[itemIndex].quantity -= 1;
        } else {
          cart.splice(itemIndex, 1);
        }
        updateCart();
      });

      cartItem.querySelector('.increase').addEventListener('click', function () {
        const itemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
        cart[itemIndex].quantity += 1;
        updateCart();
      });

      cartItem.querySelector('.remove-item').addEventListener('click', function () {
        const itemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
        cart.splice(itemIndex, 1);
        updateCart();
      });
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = itemCount;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
    }
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });

        hamburger.classList.remove('active');
        menu.classList.remove('active');
      }
    });
  });

  // Animation on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .menu-item');

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }

  document.querySelectorAll('.feature-card, .menu-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s, transform 0.5s';
  });

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
});
