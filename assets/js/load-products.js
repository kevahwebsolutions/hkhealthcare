// 1. Wait for page to load
document.addEventListener('DOMContentLoaded', function() {

    // 2. Where to insert products
    const productsContainer = document.querySelector('.product-grid .row');
    
    // 3. Fetch products from JSON
    fetch('products.json')
      .then(response => response.json())
      .then(data => {
        
        // 4. Loop through each product
        data.products.forEach(product => {
          
          // 5. Format price (Ksh. 95,000.00)
          const formattedPrice = 'Ksh. ' + product.price.toLocaleString('en-KE') + '.00';
          
          // 6. Create HTML for each product
          const productHTML = `
            <div class="product-width col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 mb-30">
              <div class="product-wrapper">
                <div class="product-img">
                  <a>
                    <img alt="${product.name}" src="assets/img/products/${product.image}">
                  </a>
                </div>
                <div class="product-content text-left">
                  <div class="product-title">
                    <h4><a>${product.name}</a></h4>
                  </div>
                  <div class="product-price-wrapper">
                    <span>${formattedPrice}</span>
                  </div>
                  <div class="product-add-to-cart">
                    <button class="add-to-cart-btn" 
                            data-id="${product.id}"
                            data-name="${product.name}"
                            data-price="${product.price}.00"
                            data-image="assets/img/products/${product.image}"
                            style="background-color: #121cde; color: white; border: none; padding: 8px 15px; border-radius: 4px; width: 100%; margin-top: 10px;">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
          
          // 7. Add to page
          productsContainer.insertAdjacentHTML('beforeend', productHTML);
        });
        
        // 8. Initialize cart after products load
        if (typeof initCart === 'function') {
          initCart();
        }
      })
      .catch(error => console.error('Error loading products:', error));
  });