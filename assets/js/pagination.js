document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.querySelector('.product-grid .row');
    const paginationContainer = document.querySelector('.pagination-style ul');
    const pageInfoContainer = document.querySelector('.page-info');
    let currentPage = 1;
  
    // Load products with pagination
    function loadProducts(page = 1) {
      currentPage = page;
      productsContainer.innerHTML = '<div class="loading">Loading products...</div>';
      
      fetch('products.json')
        .then(response => response.json())
        .then(data => {
          const productsPerPage = data.per_page || 12;
          const startIndex = (page - 1) * productsPerPage;
          const endIndex = startIndex + productsPerPage;
          const paginatedProducts = data.products.slice(startIndex, endIndex);
          
          displayProducts(paginatedProducts);
          setupPagination(data.total || data.products.length, page, productsPerPage);
          updatePageInfo(startIndex + 1, endIndex, data.total || data.products.length);
        });
    }
  
    // Display products
    function displayProducts(products) {
      productsContainer.innerHTML = '';
      
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
    }
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
      
    // Setup pagination buttons
    function setupPagination(totalProducts, currentPage, perPage) {
      const totalPages = Math.ceil(totalProducts / perPage);
      paginationContainer.innerHTML = '';
      
      // Previous button
      if (currentPage > 1) {
        paginationContainer.innerHTML += `
          <li><a class="prev-next prev" href="#" data-page="${currentPage - 1}">
            <i class="ion-ios-arrow-left"></i> Prev
          </a></li>
        `;
      }
  
      // Page numbers (show up to 5 pages around current)
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);
      
      if (startPage > 1) {
        paginationContainer.innerHTML += `<li><a href="#" data-page="1">1</a></li>`;
        if (startPage > 2) paginationContainer.innerHTML += `<li><span>...</span></li>`;
      }
  
      for (let i = startPage; i <= endPage; i++) {
        const active = i === currentPage ? 'active' : '';
        paginationContainer.innerHTML += `
          <li><a class="${active}" href="#" data-page="${i}">${i}</a></li>
        `;
      }
  
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) paginationContainer.innerHTML += `<li><span>...</span></li>`;
        paginationContainer.innerHTML += `<li><a href="#" data-page="${totalPages}">${totalPages}</a></li>`;
      }
  
      // Next button
      if (currentPage < totalPages) {
        paginationContainer.innerHTML += `
          <li><a class="prev-next next" href="#" data-page="${currentPage + 1}">
            Next <i class="ion-ios-arrow-right"></i>
          </a></li>
        `;
      }
  
      // Add click events
      document.querySelectorAll('.pagination-style a[data-page]').forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          loadProducts(parseInt(this.dataset.page));
          window.scrollTo({top: 0, behavior: 'smooth'});
        });
      });
    }
  
    // Update page info text
    function updatePageInfo(start, end, total) {
      const showingEnd = Math.min(end, total);
      pageInfoContainer.textContent = `Showing ${start}-${showingEnd} of ${total} results`;
    }
  
    // Initial load
    loadProducts();
  });