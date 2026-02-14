(function($) {
    'use strict';
    
    /*--
    Menu Stick
    -----------------------------------*/
    var header = $('.transparent-bar');
    var win = $(window);
    
    win.on('scroll', function() {
        var scroll = win.scrollTop();
        if (scroll < 200) {
            header.removeClass('stick');
        } else {
            header.addClass('stick');
        }
    });
    
    
    /* jQuery MeanMenu */
    $('#mobile-menu-active').meanmenu({
        meanScreenWidth: "991",
        meanMenuContainer: ".mobile-menu-area .mobile-menu",
    });
    
    /* Cart */
    $(".language-click , .icon-cart , .icon-setting").on("click", function() {
        $(this).parent().find('.language-dropdown , .shopping-cart-content , .setting-wrapper').slideToggle('medium');
    })
    
    /* Slider active - MODIFIED FOR AUTO-PLAY */
    $('.slider-active').owlCarousel({
        loop: true,
        nav: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplaySpeed: 800,
        smartSpeed: 800,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
        item: 1,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
    
    /* Best selling active */
    $('.featured-product-active').owlCarousel({
        loop: true,
        nav: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplaySpeed: 800,
        smartSpeed: 800,
        navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
        item: 4,
        margin: 30,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 3
            },
            1100: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    })
    
    /* Best selling active */
    $('.best-selling-active').owlCarousel({
        loop: true,
        nav: true,
        autoplay: false,
        autoplayTimeout: 5000,
        navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
        item: 1,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1100: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    })
    
    /* Best selling active 2 */
    $('.best-selling-active-2').owlCarousel({
        loop: true,
        nav: false,
        item: 1,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1100: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    })
    
    /* Testimonial active - MODIFIED FOR AUTO-PLAY */
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
        item: 1,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
    
    /* Brand logo active */
    $('.brand-logo-active').owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        item: 5,
        margin: 80,
        responsive: {
            0: {
                items: 1,
                margin: 0,
            },
            480: {
                items: 2,
                margin: 30,
            },
            768: {
                items: 4,
                margin: 30,
            },
            992: {
                items: 4,
                margin: 100,
            },
            1200: {
                items: 5
            }
        }
    })
    
    /*---------------------
        Countdown
    --------------------- */
    $('[data-countdown]').each(function() {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function(event) {
            $this.html(event.strftime('<span class="cdown day">%-D <p>Days</p></span> <span class="cdown hour">%-H <p>Hour</p></span> <span class="cdown minutes">%M <p>Min</p></span class="cdown second"> <span>%S <p>Sec</p></span>'));
        });
    });
    
    
    /* Hover 3d init for tilt */
    if ($('.tilter').length > 0) {
        $('.tilter').tilt({
            maxTilt: 40,
            perspective: 800,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            scale: 1,
            speed: 800,
            transition: true,
        });
    }
    
    /*--------------------------
        ScrollUp
    ---------------------------- */
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-double-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });
    
    /*---------------------
        Price slider
    --------------------- */
    var sliderrange = $('#slider-range');
    var amountprice = $('#amount');
    $(function() {
        sliderrange.slider({
            range: true,
            min: 0,
            max: 1200,
            values: [300, 800],
            slide: function(event, ui) {
                amountprice.val("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });
        amountprice.val("$" + sliderrange.slider("values", 0) +
            " - $" + sliderrange.slider("values", 1));
    });
    
    /*---------------------
        Product dec slider
    --------------------- */
    $('.product-dec-slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerPadding: '60px',
        prevArrow: '<span class="product-dec-icon product-dec-prev"><i class="fa fa-angle-left"></i></span>',
        nextArrow: '<span class="product-dec-icon product-dec-next"><i class="fa fa-angle-right"></i></span>',
        responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });
    
    /*------ Wow Active ----*/
    new WOW().init();
    
    /* counterUp */
    $('.count').counterUp({
        delay: 10,
        time: 1000
    });
    
    /*----------------------------
    	Cart Plus Minus Button
    ------------------------------ */
    var CartPlusMinus = $('.cart-plus-minus');
    CartPlusMinus.prepend('<div class="dec qtybutton">-</div>');
    CartPlusMinus.append('<div class="inc qtybutton">+</div>');
    $(".qtybutton").on("click", function() {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.text() === "+") {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $button.parent().find("input").val(newVal);
    });
    
    /*-------------------------------------
        Thumbnail Product activation
    --------------------------------------*/
    $('.thumb-menu').owlCarousel({
        loop: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        margin: 15,
        smartSpeed: 1000,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 3,
                autoplay: true,
                smartSpeed: 300
            },
            768: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    })
    $('.thumb-menu a').on('click', function () {
        $('.thumb-menu a').removeClass('active');
    })
    
    
    /*---------------------
    shop grid list
    --------------------- */
    $('.view-mode li a').on('click', function() {
        var $proStyle = $(this).data('view');
        $('.view-mode li').removeClass('active');
        $(this).parent('li').addClass('active');
        $('.product-view').removeClass('product-grid product-list').addClass($proStyle);
    })
    
    /* blog gallery slider */
    $('.blog-gallery-slider').owlCarousel({
        loop: true,
        nav: true,
        autoplay: true,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText:['<i class="ion-chevron-left"></i>','<i class="ion-chevron-right"></i>'],
        item: 1,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
    
    /* isotop active */
    // filter items on button click
    $('.blog-area').imagesLoaded(function() {
        $('.portfolio-menu-active').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({
                filter: filterValue
            });
        });
        // init Isotope
        var $grid = $('.blog-grid').isotope({
            itemSelector: '.blog-grid-item',
            percentPosition: true,
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: '.blog-grid-item',
            }
        });
    });
    
    /*--------------------------
        Product Zoom
	---------------------------- */
    $(".zoompro").elevateZoom({
        gallery: "gallery",
        galleryActiveClass: "active",
        zoomWindowWidth: 300,
        zoomWindowHeight: 100,
        scrollZoom: false,
        zoomType: "inner",
        cursor: "crosshair"
    });
    
    $('.testimonial-2-active').owlCarousel({
        loop: true,
        margin:20,
        nav:true,
        navText: [ '<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>' ],
        items:2,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            800:{
                items:1
            },
            992:{
                items:2
            },
            1024:{
                items:2
            },
            1200:{
                items:2
            },
            1400:{
                items:2
            },
            1920:{
                items:2
            }
        }
    });

})(jQuery);


document.addEventListener('DOMContentLoaded', function() {
    // Function to format numbers with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Define available coupons
    const availableCoupons = [
        {
            code: "HEALTH10",
            discount: 10, // percentage
            type: "percentage",
            minPurchase: 1000, // minimum cart amount to apply
            description: `10% off on orders over Ksh. ${formatNumber(1000)}`
        },
        {
            code: "SAVE500",
            discount: 500, // fixed amount
            type: "fixed",
            minPurchase: 2000,
            description: `Ksh. ${formatNumber(500)} off on orders over Ksh. ${formatNumber(2000)}`
        },
        {
            code: "NEWCUSTOMER",
            discount: 15,
            type: "percentage",
            minPurchase: 0,
            description: "15% off for new customers"
        },
        {
            code: "FREESHIP",
            discount: 0,
            type: "freeship",
            minPurchase: 1500,
            description: `Free shipping on orders over Ksh. ${formatNumber(1500)}`
        }
    ];

    // Load applied coupon from localStorage
    let appliedCoupon = JSON.parse(localStorage.getItem('appliedCoupon')) || null;
    let shippingCost = 0;

    // Coupon form submission
    document.getElementById('coupon-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const couponCode = document.getElementById('coupon-code').value.trim().toUpperCase();
        const messageEl = document.getElementById('coupon-message');
        
        // Check if coupon exists
        const coupon = availableCoupons.find(c => c.code === couponCode);
        
        if (!coupon) {
            messageEl.textContent = "Invalid coupon code";
            messageEl.style.color = "red";
            return;
        }
        
        // Get cart subtotal
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Check minimum purchase
        if (subtotal < coupon.minPurchase) {
            messageEl.textContent = `This coupon requires a minimum purchase of Ksh. ${formatNumber(coupon.minPurchase)}`;
            messageEl.style.color = "red";
            return;
        }
        
        // Apply coupon
        appliedCoupon = coupon;
        localStorage.setItem('appliedCoupon', JSON.stringify(appliedCoupon));
        
        messageEl.textContent = `Coupon applied: ${coupon.description}`;
        messageEl.style.color = "green";
        
        // Reload cart to update totals
        loadCartPage();
    });

    // Function to calculate discount
    function calculateDiscount(subtotal) {
        if (!appliedCoupon) return 0;
        
        if (appliedCoupon.type === "percentage") {
            return subtotal * (appliedCoupon.discount / 100);
        } else if (appliedCoupon.type === "fixed") {
            return appliedCoupon.discount;
        }
        return 0;
    }

    // Function to calculate shipping
    function calculateShipping(subtotal) {
        if (appliedCoupon && appliedCoupon.type === "freeship" && subtotal >= appliedCoupon.minPurchase) {
            return 0;
        }
        
        // Your regular shipping calculation logic here
        // For example: Free shipping over 5000, otherwise 200
        return subtotal >= 5000 ? 0 : 200;
    }

    // Modified loadCartPage function
    function loadCartPage() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartTable = document.getElementById('cart-table').querySelector('tbody');
        let subtotal = 0;

        if (cart.length === 0) {
            cartTable.innerHTML = '<tr><td colspan="6" class="text-center">Your cart is empty</td></tr>';
            document.getElementById('cart-subtotal').textContent = 'Ksh. 0.00';
            document.getElementById('cart-grand-total').textContent = 'Ksh. 0.00';
            
            // Clear coupon if cart is empty
            if (appliedCoupon) {
                appliedCoupon = null;
                localStorage.removeItem('appliedCoupon');
                document.getElementById('coupon-message').textContent = "Coupon removed (cart is empty)";
            }
            return;
        }

        let html = '';
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            html += `
                <tr>
                    <td class="product-thumbnail">
                        <a href="${item.url}"><img src="${item.image}" alt="${item.name}" style="max-width: 80px;"></a>
                    </td>
                    <td class="product-name"><a href="${item.url}">${item.name}</a></td>
                    <td class="product-price-cart"><span class="amount">Ksh. ${formatNumber(item.price.toFixed(2))}</span></td>
                    <td class="product-quantity">
                        <div class="pro-dec-cart">
                            <input class="cart-plus-minus-box" type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                        </div>
                    </td>
                    <td class="product-subtotal">Ksh. ${formatNumber(itemTotal.toFixed(2))}</td>
                    <td class="product-remove">
                        <a href="#" class="remove-item" data-id="${item.id}"><i class="fa fa-times"></i></a>
                    </td>
                </tr>
            `;
        });

        cartTable.innerHTML = html;
        
        // Calculate discount and shipping
        const discount = calculateDiscount(subtotal);
        shippingCost = calculateShipping(subtotal);
        const grandTotal = subtotal - discount + shippingCost;
        
        // Update displayed totals with formatted numbers
        document.getElementById('cart-subtotal').textContent = `Ksh. ${formatNumber(subtotal.toFixed(2))}`;
        document.getElementById('cart-grand-total').textContent = `Ksh. ${formatNumber(grandTotal.toFixed(2))}`;
        
        // Show discount if applied
        const shippingElement = document.querySelector('.total-shipping h5 span');
        if (shippingElement) {
            shippingElement.textContent = `Ksh. ${formatNumber(shippingCost.toFixed(2))}`;
            
            // Add discount row if coupon is applied
            const discountRow = document.querySelector('.discount-row');
            if (discountRow) {
                discountRow.remove();
            }
            
            if (appliedCoupon && discount > 0) {
                const shippingParent = document.querySelector('.total-shipping');
                const discountHtml = `
                    <div class="discount-row">
                        <h5>Discount <span style="color: green;">- Ksh. ${formatNumber(discount.toFixed(2))}</span></h5>
                    </div>
                `;
                shippingParent.insertAdjacentHTML('afterend', discountHtml);
            }
        }
    }

    // Add remove coupon functionality (optional)
    function addRemoveCouponButton() {
        if (appliedCoupon) {
            const messageEl = document.getElementById('coupon-message');
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove Coupon';
            removeBtn.style.marginLeft = '10px';
            removeBtn.style.padding = '2px 5px';
            removeBtn.style.fontSize = '12px';
            removeBtn.style.background = '#ff0000';
            removeBtn.style.color = '#fff';
            removeBtn.style.border = 'none';
            removeBtn.style.borderRadius = '3px';
            removeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                appliedCoupon = null;
                localStorage.removeItem('appliedCoupon');
                messageEl.textContent = 'Coupon removed';
                messageEl.style.color = 'green';
                loadCartPage();
                this.remove();
            });
            messageEl.appendChild(removeBtn);
        }
    }

    // Initialize
    loadCartPage();
    addRemoveCouponButton();

    // Rest of your existing event listeners...
});
