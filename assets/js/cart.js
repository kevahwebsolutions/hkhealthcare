document.addEventListener('DOMContentLoaded', function () {
    // Function to format numbers with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Initialize cart if it doesn't exist
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    // Create notification container
    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-container';
    document.body.appendChild(notificationContainer);

    // Show notification
    function showNotification(productName, quantity) {
        const existingNotif = Array.from(document.querySelectorAll('.cart-notification'))
            .find(notif => notif.dataset.product === productName);

        if (existingNotif) {
            const quantitySpan = existingNotif.querySelector('.notification-quantity');
            const newQuantity = parseInt(quantitySpan.textContent) + quantity;
            quantitySpan.textContent = formatNumber(newQuantity);

            clearTimeout(existingNotif.dataset.timeout);
            existingNotif.dataset.timeout = setTimeout(() => {
                existingNotif.classList.add('fade-out');
                setTimeout(() => existingNotif.remove(), 300);
            }, 3000);

            return;
        }

        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.dataset.product = productName;
        notification.innerHTML = `
            <span>${productName} <span class="notification-quantity">${formatNumber(quantity)}</span> added to cart</span>
            <button class="close-notification">&times;</button>
        `;

        notificationContainer.appendChild(notification);

        notification.dataset.timeout = setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);

        notification.querySelector('.close-notification').addEventListener('click', () => {
            clearTimeout(notification.dataset.timeout);
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        });
    }

    // Update cart count
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = formatNumber(count);
        });
    }

    // Update mini cart
    function updateMiniCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const miniCart = document.querySelector('.shopping-cart-content ul');

        if (!miniCart) return;

        if (cart.length === 0) {
            miniCart.innerHTML = '<li class="empty-cart">Your cart is empty</li>';
            if (document.querySelector('.shop-total')) {
                document.querySelector('.shop-total').textContent = 'Ksh. 0.00';
            }
            return;
        }

        let html = '';
        let subtotal = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            html += `
                <li class="single-shopping-cart">
                    <div class="shopping-cart-img">
                        <a href="${item.url}"><img alt="${item.name}" src="${item.image}"></a>
                    </div>
                    <div class="shopping-cart-title">
                        <h4><a href="${item.url}">${item.name}</a></h4>
                        <h6>Qty: ${formatNumber(item.quantity)}</h6>
                        <span>Ksh. ${formatNumber(itemTotal.toFixed(2))}</span>
                    </div>
                    <div class="shopping-cart-delete">
                        <a href="#" class="remove-item" data-id="${item.id}"><i class="ion ion-close"></i></a>
                    </div>
                </li>
            `;
        });

        miniCart.innerHTML = html;

        if (document.querySelector('.shop-total')) {
            document.querySelector('.shop-total').textContent = `Ksh. ${formatNumber(subtotal.toFixed(2))}`;
        }
    }

    // Remove from cart function
    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateMiniCart();
        updateCartCount();
    }

    // Listen for remove click (event delegation)
    document.body.addEventListener('click', function (e) {
        if (e.target.closest('.remove-item')) {
            e.preventDefault();
            const id = e.target.closest('.remove-item').dataset.id;
            removeFromCart(id);
        }
    });

    // Add to cart listener
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const button = e.target;
            const product = {
                id: button.dataset.id,
                name: button.dataset.name,
                price: parseFloat(button.dataset.price),
                image: button.dataset.image,
                url: button.dataset.url,
                quantity: 1
            };

            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cart.find(item => item.id === product.id);

            let quantityAdded = 1;
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateMiniCart();
            showNotification(product.name, quantityAdded);
        }
    });

    // Initialize cart UI
    updateCartCount();
    updateMiniCart();
});