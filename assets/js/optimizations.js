// Performance & Feature Optimizations for HK Healthcare

(function() {
    'use strict';

    // ============================================
    // 1. LAZY LOADING IMAGES
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        // Fallback for browsers that don't support native lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
        }
    });


    // ============================================
    // 2. ENHANCED SLIDER AUTO-PLAY (3 SECONDS)
    // ============================================
    function initializeAutoPlaySliders() {
        // Update slider configurations after jQuery is loaded
        if (typeof jQuery !== 'undefined') {
            const $ = jQuery;

            // Main slider with 3-second auto-play
            if ($('.slider-active').length) {
                $('.slider-active').owlCarousel({
                    loop: true,
                    nav: true,
                    autoplay: true,
                    autoplayTimeout: 3000, // 3 seconds
                    autoplaySpeed: 800,
                    smartSpeed: 800,
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                    navText: [
                        '<i class="fa fa-chevron-left"></i>',
                        '<i class="fa fa-chevron-right"></i>'
                    ],
                    items: 1,
                    responsive: {
                        0: { items: 1 },
                        768: { items: 1 },
                        1000: { items: 1 }
                    }
                });
            }

            // Testimonial carousel with auto-play
            if ($('.testimonial-active').length) {
                $('.testimonial-active').owlCarousel({
                    loop: true,
                    nav: false,
                    dots: true,
                    autoplay: true,
                    autoplayTimeout: 3000,
                    autoplaySpeed: 800,
                    smartSpeed: 800,
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                    items: 1,
                    responsive: {
                        0: { items: 1 },
                        768: { items: 1 },
                        1000: { items: 1 }
                    }
                });
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAutoPlaySliders);
    } else {
        initializeAutoPlaySliders();
    }


    // ============================================
    // 3. SLIDING CART PANEL (Right Side)
    // ============================================
    function initializeCartPanel() {
        // Wait for jQuery to be available
        if (typeof jQuery === 'undefined') {
            setTimeout(initializeCartPanel, 100);
            return;
        }

        const $ = jQuery;

        // Create sliding cart panel if it doesn't exist
        if ($('#cart-panel').length === 0) {
            const cartPanelHTML = `
                <div id="cart-panel" class="cart-panel">
                    <div class="cart-panel-header">
                        <h3>Shopping Cart</h3>
                        <button id="close-cart-panel" class="cart-panel-close" aria-label="Close cart">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                    <div class="cart-panel-content">
                        <ul id="cart-panel-items" class="cart-items-list">
                            <li class="empty-state">
                                <i class="ti-shopping-cart"></i>
                                <p>Your cart is empty</p>
                            </li>
                        </ul>
                    </div>
                    <div class="cart-panel-footer">
                        <div class="cart-summary">
                            <div class="summary-row">
                                <span>Subtotal:</span>
                                <span id="panel-subtotal">Ksh. 0.00</span>
                            </div>
                            <div class="summary-row">
                                <span>Shipping:</span>
                                <span id="panel-shipping">Ksh. 0.00</span>
                            </div>
                            <div class="summary-row total">
                                <span>Total:</span>
                                <span id="panel-total">Ksh. 0.00</span>
                            </div>
                        </div>
                        <button class="cart-panel-btn cart-panel-view" onclick="window.location.href='cart-page.html';">
                            View Cart
                        </button>
                        <button class="cart-panel-btn cart-panel-checkout" onclick="window.location.href='checkout.html';">
                            Checkout
                        </button>
                    </div>
                </div>
                <div id="cart-panel-overlay" class="cart-panel-overlay"></div>
            `;

            $('body').append(cartPanelHTML);
        }

        // Cart panel toggle
        const cartToggle = $('.cart-toggle');
        const cartPanel = $('#cart-panel');
        const cartOverlay = $('#cart-panel-overlay');
        const closeBtn = $('#close-cart-panel');

        cartToggle.on('click', function(e) {
            e.preventDefault();
            cartPanel.addClass('active');
            cartOverlay.addClass('active');
            updateCartPanel();
        });

        closeBtn.on('click', function() {
            cartPanel.removeClass('active');
            cartOverlay.removeClass('active');
        });

        cartOverlay.on('click', function() {
            cartPanel.removeClass('active');
            cartOverlay.removeClass('active');
        });

        // Remove the old dropdown cart from display
        $('.shopping-cart-content').hide();
    }

    // Initialize sliding cart panel
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCartPanel);
    } else {
        initializeCartPanel();
    }


    // ============================================
    // 4. UPDATE CART DISPLAY IN HEADER & PANEL
    // ============================================
    window.updateCartPanel = function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartList = document.getElementById('cart-panel-items');
        let subtotal = 0;
        let shippingCost = 0;

        if (cart.length === 0) {
            cartList.innerHTML = `
                <li class="empty-state">
                    <i class="ti-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </li>
            `;
            document.getElementById('panel-subtotal').textContent = 'Ksh. 0.00';
            document.getElementById('panel-shipping').textContent = 'Ksh. 0.00';
            document.getElementById('panel-total').textContent = 'Ksh. 0.00';
            return;
        }

        let html = '';
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            html += `
                <li class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <h5>${item.name}</h5>
                        <p class="item-price">Ksh. ${formatNumber(item.price.toFixed(2))}</p>
                        <div class="item-quantity">
                            <button class="qty-btn qty-minus" data-id="${item.id}">−</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}" title="Remove item">
                        <i class="fa fa-trash"></i>
                    </button>
                </li>
            `;
        });

        cartList.innerHTML = html;

        // Calculate shipping
        shippingCost = subtotal >= 5000 ? 0 : 200;
        const grandTotal = subtotal + shippingCost;

        document.getElementById('panel-subtotal').textContent = `Ksh. ${formatNumber(subtotal.toFixed(2))}`;
        document.getElementById('panel-shipping').textContent = `Ksh. ${formatNumber(shippingCost.toFixed(2))}`;
        document.getElementById('panel-total').textContent = `Ksh. ${formatNumber(grandTotal.toFixed(2))}`;

        // Update cart header count
        const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-count').textContent = cartCount;

        // Add event listeners to quantity buttons
        document.querySelectorAll('.qty-plus').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                updateQuantity(id, 1);
            });
        });

        document.querySelectorAll('.qty-minus').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                updateQuantity(id, -1);
            });
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                removeFromCart(id);
            });
        });
    };

    function updateQuantity(id, change) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cart.find(p => p.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                cart = cart.filter(p => p.id !== id);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartPanel();
        }
    }

    function removeFromCart(id) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(p => p.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartPanel();
    }

    window.formatNumber = function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Update cart panel when items are added
    const originalAddToCart = window.addToCart;
    if (typeof originalAddToCart === 'function') {
        window.addToCart = function(...args) {
            originalAddToCart.apply(this, args);
            updateCartPanel();
        };
    }

    // Initialize cart panel on load
    window.addEventListener('load', updateCartPanel);

})();

// ============================================
// 5. PERFORMANCE MONITORING
// ============================================
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page load time: ' + pageLoadTime + 'ms');
        }, 0);
    });
}
