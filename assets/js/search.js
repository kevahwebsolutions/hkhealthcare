document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('product-search-input');
    const searchButton = document.getElementById('search-button');
    let allProducts = [];
    
    // Fetch all products
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data.products;
            // Initialize your pagination here if needed
        })
        .catch(error => console.error('Error loading products:', error));
        function checkForNewProducts() {
            fetch('products.json?t=' + new Date().getTime())
              .then(response => response.json())
              .then(data => {
                if (data.products.length !== allProducts.length) {
                  allProducts = data.products;
                  loadProducts(currentPage); // Reload current view
                }
              });
          }
          
          // Check every 5 minutes (or when needed)
          setInterval(checkForNewProducts, 300000);
          
    // Search function
    function performSearch(searchTerm) {
        const productsContainer = document.querySelector('.product-grid .row');
        if (!productsContainer) {
            console.error('Products container not found');
            return;
        }

        if (!searchTerm.trim()) {
            loadProducts(1); // Your existing pagination function
            return;
        }

        const filteredProducts = allProducts.filter(product => {
            const searchLower = searchTerm.toLowerCase();
            return (
                product.name.toLowerCase().includes(searchLower) ||
                (product.id && product.id.toLowerCase().includes(searchLower)) ||
                (product.description && product.description.toLowerCase().includes(searchLower))
            );
        });

        displaySearchResults(filteredProducts);
    }

    // Display search results
    function displaySearchResults(products) {
        const productsContainer = document.querySelector('.product-grid .row');
        productsContainer.innerHTML = '';

        if (products.length === 0) {
            productsContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p>No products found matching your search</p>
                </div>
            `;
            return;
        }

        products.forEach(product => {
            const formattedPrice = `Ksh. ${parseInt(product.price).toLocaleString('en-KE')}.00`;
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
                                        data-price="${product.price}"
                                        data-image="assets/img/products/${product.image}"
                                        style="background-color: ${product.button_color || '#121cde'}; color: white; border: none; padding: 8px 15px; border-radius: 4px; width: 100%; margin-top: 10px;">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            productsContainer.insertAdjacentHTML('beforeend', productHTML);
        });

        updateSearchResultsText(products.length);
    }

    // Update results text
    function updateSearchResultsText(count) {
        const resultsText = document.querySelector('.shop-topbar-left p');
        if (resultsText) {
            resultsText.textContent = `Showing ${count} search results`;
        }
    }

    // Event listeners
    searchButton.addEventListener('click', () => performSearch(searchInput.value));
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch(searchInput.value);
    });
});