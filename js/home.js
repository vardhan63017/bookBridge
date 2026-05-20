// ===========================
// HOME PAGE JAVASCRIPT
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedBooks();
    loadCarousel();
    setupSearchFunctionality();
});

/**
 * Load featured books on home page
 */
function loadFeaturedBooks() {
    const container = document.getElementById('featuredBooksContainer');
    if (!container) return;

    // Get first 8 books for featured section
    const featuredBooks = booksDatabase.slice(0, 8);
    
    container.innerHTML = featuredBooks
        .map(book => createBookCard(book))
        .join('');

    // Add hover animations
    document.querySelectorAll('.book-card').forEach(card => {
        card.classList.add('fade-in');
    });
}

/**
 * Load carousel with top books
 */
function loadCarousel() {
    const carouselContent = document.getElementById('carouselContent');
    if (!carouselContent) return;

    // Get top 3 books for carousel
    const topBooks = booksDatabase.slice(0, 3);
    
    let carouselHTML = '';
    topBooks.forEach((book, index) => {
        const isActive = index === 0 ? 'active' : '';
        const discount = calculateDiscount(book.originalPrice, book.sellingPrice);
        
        carouselHTML += `
            <div class="carousel-item ${isActive}">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <img src="${book.image}" alt="${book.title}" class="img-fluid rounded">
                    </div>
                    <div class="col-md-6">
                        <h2 class="fw-bold">${book.title}</h2>
                        <p class="lead text-muted">${book.author}</p>
                        <div class="mb-3">
                            <span class="badge bg-danger">${discount}% OFF</span>
                            <span class="badge bg-success">Best Seller</span>
                        </div>
                        <h4 class="text-success fw-bold mb-3">${formatPrice(book.sellingPrice)}</h4>
                        <p class="text-muted">${book.description}</p>
                        <div class="d-grid gap-2">
                            <a href="book-details.html?id=${book.id}" class="btn btn-primary btn-lg">View Details</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    carouselContent.innerHTML = carouselHTML;
}

/**
 * Setup search functionality
 */
function setupSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (!searchInput || !searchBtn) return;

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    // Search suggestions
    const suggestions = ['DSA', 'Java', 'DBMS', 'Operating Systems', 'Python', 'Networks'];
    searchInput.addEventListener('input', () => {
        const value = searchInput.value.toLowerCase();
        if (value.length > 0) {
            const matching = suggestions.filter(s => s.toLowerCase().includes(value));
            // Could implement a dropdown here
        }
    });
}

/**
 * Perform search
 */
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim();

    if (searchQuery.length === 0) {
        showNotification('Please enter a search query', 'warning');
        return;
    }

    // Redirect to buy page with search query
    window.location.href = `buy-books.html?search=${encodeURIComponent(searchQuery)}`;
}
