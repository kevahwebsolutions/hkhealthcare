document.addEventListener('DOMContentLoaded', function() {
    // Fetch products from JSON file
    fetch('assets/data/products.json')
        .then(response => response.json())
        .then(products => {
            const productContainer = document.getElementById('product-container');
            
            // Clear any loading content
            productContainer.innerHTML = '';
            
            // Create product cards for each product
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-width col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 mb-30';
                productCard.innerHTML = `
                    <div class="product-wrapper">
                        <div class="product-img">
                            <a href="${product.url}">
                                <img alt="${product.name}" src="${product.image}">
                            </a>
                        </div>
                        <div class="product-content text-left">
                            <div class="product-title">
                                <h4>
                                    <a href="${product.url}">${product.name}</a>
                                </h4>
                            </div>
                            <div class="product-price-wrapper">
                                <span>Ksh. ${product.price.toFixed(2)}</span>
                            </div>
                            <div class="product-add-to-cart">
                                <button class="add-to-cart-btn" 
                                        onclick="addToCart(${product.id})" 
                                        style="background-color: #121cde; color: white; border: none; padding: 8px 15px; border-radius: 4px; width: 100%; margin-top: 10px;">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                productContainer.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Error loading products:', error);
            document.getElementById('product-container').innerHTML = `
                <div class="col-12 text-center py-5">
                    <p>Error loading products. Please try again later.</p>
                </div>
            `;
        });
});

// Basic cart functionality (you can expand this)
function addToCart(productId) {
    // This is a basic implementation - you'll want to expand it
    console.log(`Product ${productId} added to cart`);
    alert('Product added to cart!');
    
    // In a real implementation, you would:
    // 1. Find the product in your products array
    // 2. Add it to a cart array in localStorage or state
    // 3. Update the cart UI
}