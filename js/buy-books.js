// ===========================
// BUY BOOKS PAGE JAVASCRIPT
// ===========================

let allBooks = [...booksDatabase];
let filteredBooks = [...booksDatabase];

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupFilterEventListeners();
    loadSearchQuery();
});

/**
 * Load products on page
 */
function loadProducts(books = allBooks) {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    if (books.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center" role="alert">
                    <i class="fas fa-search"></i> No books found matching your criteria. Try adjusting your filters.
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = books
        .map(book => createBookCard(book))
        .join('');

    // Add animations
    document.querySelectorAll('.book-card').forEach(card => {
        card.classList.add('fade-in');
    });
}

/**
 * Setup filter event listeners
 */
function setupFilterEventListeners() {
    // Department filters
    document.querySelectorAll('.dept-filter').forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Year filters
    document.querySelectorAll('.year-filter').forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Subject filters
    document.querySelectorAll('.subject-filter').forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Price range filter
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    if (priceRange) {
        priceRange.addEventListener('input', (e) => {
            priceValue.textContent = `₹${e.target.value}`;
        });
    }

    // Apply filters button
    const applyBtn = document.getElementById('applyFilters');
    if (applyBtn) {
        applyBtn.addEventListener('click', applyFilters);
    }

    // Clear filters button
    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearAllFilters);
    }
}

/**
 * Apply all filters
 */
function applyFilters() {
    const filters = {
        departments: [],
        years: [],
        subjects: [],
        maxPrice: parseInt(document.getElementById('priceRange')?.value || 5000)
    };

    // Get selected departments
    document.querySelectorAll('.dept-filter:checked').forEach(checkbox => {
        filters.departments.push(checkbox.value);
    });

    // Get selected years
    document.querySelectorAll('.year-filter:checked').forEach(checkbox => {
        filters.years.push(checkbox.value);
    });

    // Get selected subjects
    document.querySelectorAll('.subject-filter:checked').forEach(checkbox => {
        filters.subjects.push(checkbox.value);
    });

    // Filter books
    filteredBooks = allBooks.filter(book => {
        if (filters.departments.length > 0 && !filters.departments.includes(book.department)) {
            return false;
        }
        if (filters.years.length > 0 && !filters.years.includes(book.year)) {
            return false;
        }
        if (filters.subjects.length > 0 && !filters.subjects.includes(book.subject)) {
            return false;
        }
        if (book.sellingPrice > filters.maxPrice) {
            return false;
        }
        return true;
    });

    loadProducts(filteredBooks);
    showNotification(`Found ${filteredBooks.length} books matching your criteria`, 'success');
}

/**
 * Clear all filters
 */
function clearAllFilters() {
    // Uncheck all filters
    document.querySelectorAll('.dept-filter, .year-filter, .subject-filter').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Reset price range
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.value = 5000;
        document.getElementById('priceValue').textContent = '₹5000';
    }

    // Reset filtered books
    filteredBooks = [...allBooks];
    loadProducts(allBooks);
    showNotification('All filters cleared', 'success');
}

/**
 * Load search query from URL
 */
function loadSearchQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');

    if (searchQuery) {
        const searchResults = allBooks.filter(book => 
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.subject.toLowerCase().includes(searchQuery.toLowerCase())
        );

        loadProducts(searchResults);
        showNotification(`${searchResults.length} books found for "${searchQuery}"`, 'info');
    }
}
