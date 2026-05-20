// ===========================
// GLOBAL VARIABLES & DATA
// ===========================

const initialBooksDatabase = [
  {
    id: 1,
    title: "DSA Made Easy",
    author: "Narasimha Karumanchi",
    originalPrice: 200,
    sellingPrice: 100,
    condition: "Good",
    department: "CSE",
    subject: "Algorithms",
    year: "2nd Year",
    image: "https://m.media-amazon.com/images/I/51QnHyRKv5L.jpg",
    seller: "shanmukha vardhan",
    location: "College Campus",
    rating: 4.5,
    reviews: 42,
    description:
      "Book contains highlighted notes and margin notes. Pages are in good condition with minimal wear. Great reference for Data Structures and Algorithms preparation.",
    discount: 50,
    badge: "Best Seller",
  },
  {
    id: 2,
    title: "Java Programming",
    author: "Herbert Schildt",
    originalPrice: 150,
    sellingPrice: 100,
    condition: "Good",
    department: "CSE",
    subject: "Programming",
    year: "1st Year",
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgIPg7erQO8ISlB45My7zxEtJPeMjOL1WEjDol-bucMLrCwK1ByfHrLSgkaApqvimQo4qbLlpDMeti4u3oDpySirBEYgmTQbcYCjRAweXi9MXEXAbbn0_KUuyKFkD3CCcf8J9C3is9ZYZekURNbA5AvvHsWkfQAenhHJQ5rbPQ2qKP2P_PkXllRDRiTGw/s1973/java.PNG",
    seller: "Rahul Singh",
    location: "Hostel A",
    rating: 4.3,
    reviews: 28,
    description:
      "Complete Java book with all concepts explained clearly. Fresh copy with minimal markings.",
    discount: 50,
    badge: "Best Seller",
  },
  {
    id: 3,
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    originalPrice: 200,
    sellingPrice: 100,
    condition: "Moderate",
    department: "CSE",
    subject: "Networks",
    year: "3rd Year",
    image: "https://m.media-amazon.com/images/I/81G+P0nd+DL._SL1500_.jpg",
    seller: "Priya Sharma",
    location: "Library",
    rating: 4.2,
    reviews: 35,
    description:
      "Well-written networking book with some margin notes. Good for exam preparation.",
    discount: 58,
    badge: "",
  },
  {
    id: 4,
    title: "Operating Systems",
    author: "Silberschatz",
    originalPrice: 200,
    sellingPrice: 100,
    condition: "Good",
    department: "CSE",
    subject: "Database",
    year: "3rd Year",
    image:
      "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https://substack-post-media.s3.amazonaws.com/public/images/3cc99ea2-e8b0-47a8-8bd5-f32e1b795180_500x617.jpeg",
    seller: "Aman Patel",
    location: "Room 201",
    rating: 4.6,
    reviews: 50,
    description:
      "Classic OS book with detailed explanations. Nearly new condition.",
    discount: 50,
    badge: "Limited Stock",
  },
  {
    id: 5,
    title: "Database Management Systems",
    author: "Navathe",
    originalPrice: 250,
    sellingPrice: 200,
    condition: "Good",
    department: "CSE",
    subject: "Database",
    year: "2nd Year",
    image: "https://m.media-amazon.com/images/I/71sbdF227cL._SL1500_.jpg",
    seller: "Neha Gupta",
    location: "College Campus",
    rating: 4.4,
    reviews: 38,
    description: "Complete DBMS reference with SQL queries and examples.",
    discount: 50,
    badge: "",
  },
  {
    id: 6,
    title: "Python for Beginners",
    author: "Bill Lutz",
    originalPrice: 150,
    sellingPrice: 100,
    condition: "Like New",
    department: "CSE",
    subject: "Programming",
    year: "1st Year",
    image:
      "https://images-na.ssl-images-amazon.com/images/P/1449355730.01.L.jpg",
    seller: "Rohit Kumar",
    location: "Academic Block",
    rating: 4.5,
    reviews: 45,
    description:
      "Fresh copy of Python programming book. Perfect for beginners.",
    discount: 60,
    badge: "Best Seller",
  },
  {
    id: 7,
    title: "C Programming Language",
    author: "Kernighan & Ritchie",
    originalPrice: 200,
    sellingPrice: 150,
    condition: "Good",
    department: "CSE",
    subject: "Programming",
    year: "1st Year",
    image:
      "https://images-na.ssl-images-amazon.com/images/P/0131103628.01.L.jpg",
    seller: "Vikram Singh",
    location: "Hostel B",
    rating: 4.3,
    reviews: 32,
    description:
      "The classic C programming book with all fundamentals covered.",
    discount: 50,
    badge: "",
  },
  {
    id: 8,
    title: "Web Development with HTML/CSS",
    author: "Jon Ducket",
    originalPrice: 300,
    sellingPrice: 150,
    condition: "Good",
    department: "CSE",
    subject: "Programming",
    year: "2nd Year",
    image:
      "https://cdn.hackr.io/uploads/posts/attachments/1685715589qoQB4VEK9x.png",
    seller: "Sneha Patel",
    location: "College Campus",
    rating: 4.4,
    reviews: 40,
    description:
      "Beautiful illustrated guide to web development. Very helpful.",
    discount: 60,
    badge: "",
  },
  {
    id: 9,
    title: "Discrete Mathematics",
    author: "Kenneth Rosen",
    originalPrice: 200,
    sellingPrice: 100,
    condition: "Moderate",
    department: "CSE",
    subject: "Algorithms",
    year: "2nd Year",
    image:
      "https://images-na.ssl-images-amazon.com/images/P/0073383090.01.L.jpg",
    seller: "Arjun Reddy",
    location: "Hostel C",
    rating: 4.2,
    reviews: 25,
    description: "Good reference for discrete math with solved problems.",
    discount: 50,
    badge: "",
  },
  {
    id: 10,
    title: "Compiler Design",
    author: "Aho & Ullman",
    originalPrice: 250,
    sellingPrice: 150,
    condition: "Good",
    department: "CSE",
    subject: "Programming",
    year: "4th Year",
    image:
      "https://images-na.ssl-images-amazon.com/images/P/8131708674.01.L.jpg",
    seller: "Deepak Kumar",
    location: "Library",
    rating: 4.5,
    reviews: 30,
    description:
      "Comprehensive compiler design book with examples and diagrams.",
    discount: 50,
    badge: "Limited Stock",
  },
  {
    id: 11,
    title: "Data Science Handbook",
    author: "Jake VanderPlas",
    originalPrice: 200,
    sellingPrice: 100,
    condition: "Good",
    department: "CSE",
    subject: "Programming",
    year: "3rd Year",
    image:
      "https://images-na.ssl-images-amazon.com/images/P/1491912057.01.L.jpg",
    seller: "Maya Singh",
    location: "Room 305",
    rating: 4.6,
    reviews: 55,
    description: "Complete guide to data science with Python. Very practical.",
    discount: 60,
    badge: "Best Seller",
  },
  {
    id: 12,
    title: "Artificial Intelligence",
    author: "Stuart Russell",
    originalPrice: 250,
    sellingPrice: 150,
    condition: "Good",
    department: "CSE",
    subject: "Programming",
    year: "4th Year",
    image:
      "https://images-na.ssl-images-amazon.com/images/P/0135962609.01.L.jpg",
    seller: "Rishab Patel",
    location: "College Campus",
    rating: 4.4,
    reviews: 33,
    description: "Advanced AI concepts explained with algorithms and examples.",
    discount: 50,
    badge: "",
  },
  {
    id: 13,
    title: "Cloud Computing",
    author: "Rajkumar Buyya",
    originalPrice: 1000,
    sellingPrice: 300,
    condition: "Like New",
    department: "CSE",
    subject: "Programming",
    year: "3rd Year",
    image:
      "https://images-na.ssl-images-amazon.com/images/P/0124199266.01.L.jpg",
    seller: "Anjali Sharma",
    location: "Hostel D",
    rating: 4.3,
    reviews: 22,
    description: "Perfect book for cloud computing fundamentals.",
    discount: 50,
    badge: "",
  },
  {
    id: 14,
    title: "Cybersecurity Basics",
    author: "Charles Severance",
    originalPrice: 900,
    sellingPrice: 250,
    condition: "Good",
    department: "CSE",
    subject: "Programming",
    year: "3rd Year",
    image:
      "https://images-na.ssl-images-amazon.com/images/P/1491910399.01.L.jpg",
    seller: "Vikrant Sharma",
    location: "Academic Block",
    rating: 4.5,
    reviews: 38,
    description: "Great book on cybersecurity concepts and best practices.",
    discount: 60,
    badge: "",
  },
  {
    id: 15,
    title: "Mobile App Development",
    author: "Google",
    originalPrice: 800,
    sellingPrice: 220,
    condition: "Good",
    department: "CSE",
    subject: "Programming",
    year: "2nd Year",
    image:
      "https://images-na.ssl-images-amazon.com/images/P/1449374093.01.L.jpg",
    seller: "Sachin Kumar",
    location: "Room 102",
    rating: 4.4,
    reviews: 44,
    description: "Complete guide to mobile app development with Android.",
    discount: 60,
    badge: "Best Seller",
  },
];

// ===========================
// BACK TO TOP BUTTON
// ===========================

document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Theme toggle
  initThemeToggle();
});

// ===========================
// THEME TOGGLE FUNCTION
// ===========================

function initThemeToggle() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    document.documentElement.style.colorScheme = "dark";
  }
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

/**
 * Format price with currency
 */
function formatPrice(price) {
  return `₹${price.toLocaleString("en-IN")}`;
}

/**
 * Calculate discount percentage
 */
function calculateDiscount(original, selling) {
  return Math.round(((original - selling) / original) * 100);
}

/**
 * Get star rating HTML
 */
function getStarRating(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars += '<i class="fas fa-star text-warning"></i>';
    } else if (i < rating) {
      stars += '<i class="fas fa-star-half-alt text-warning"></i>';
    } else {
      stars += '<i class="fas fa-star text-muted"></i>';
    }
  }
  return stars;
}

/**
 * Create book card HTML
 */
function createBookCard(book) {
  const discount = calculateDiscount(book.originalPrice, book.sellingPrice);
  let badgeHtml = "";

  if (book.badge) {
    badgeHtml = `<span class="book-discount-badge ${book.badge.includes("Best") ? "" : "book-best-seller"}">${book.badge}</span>`;
  } else {
    badgeHtml = `<span class="book-discount-badge">${discount}% OFF</span>`;
  }

  return `
        <div class="col-sm-6 col-lg-4 col-xl-3">
            <div class="book-card shadow-sm">
                ${badgeHtml}
                <img src="${book.image}" alt="${book.title}" class="book-card-image">
                <div class="book-card-body">
                    <h5 class="book-card-title" title="${book.title}">${book.title}</h5>
                    <p class="book-card-author">${book.author}</p>
                    <div class="book-price">
                        <span class="book-original-price">${formatPrice(book.originalPrice)}</span>
                        <span class="book-selling-price">${formatPrice(book.sellingPrice)}</span>
                    </div>
                    <span class="book-condition">${book.condition}</span>
                    <div class="d-grid gap-2">
                        <a href="book-details.html?id=${book.id}" class="btn btn-primary btn-sm">View Details</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Filter books based on criteria
 */
function filterBooks(filters = {}) {
  return booksDatabase.filter((book) => {
    if (filters.department && book.department !== filters.department)
      return false;
    if (filters.year && book.year !== filters.year) return false;
    if (filters.subject && book.subject !== filters.subject) return false;
    if (filters.condition && book.condition !== filters.condition) return false;
    if (filters.maxPrice && book.sellingPrice > filters.maxPrice) return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      return (
        book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search)
      );
    }
    return true;
  });
}

/**
 * Get book by ID
 */
function getBookById(id) {
  return booksDatabase.find((book) => book.id === parseInt(id));
}

/**
 * Storage helpers
 */
const APPROVED_BOOKS_KEY = "approvedBooks";
const REMOVED_BOOK_IDS_KEY = "removedBookIds";
const PENDING_SELL_KEY = "pendingSellRequests";
const PENDING_BUY_KEY = "pendingBuyRequests";
const PURCHASES_KEY = "purchases";

let booksDatabase = [];

function getStorageArray(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch (error) {
    return [];
  }
}

function saveStorageArray(key, array) {
  localStorage.setItem(key, JSON.stringify(array));
}

function getApprovedBooks() {
  return getStorageArray(APPROVED_BOOKS_KEY);
}

function saveApprovedBooks(books) {
  saveStorageArray(APPROVED_BOOKS_KEY, books);
}

function getRemovedBookIds() {
  return getStorageArray(REMOVED_BOOK_IDS_KEY);
}

function saveRemovedBookIds(ids) {
  saveStorageArray(REMOVED_BOOK_IDS_KEY, ids);
}

function getPendingSellRequests() {
  return getStorageArray(PENDING_SELL_KEY);
}

function savePendingSellRequests(requests) {
  saveStorageArray(PENDING_SELL_KEY, requests);
}

function getPendingBuyRequests() {
  return getStorageArray(PENDING_BUY_KEY);
}

function savePendingBuyRequests(requests) {
  saveStorageArray(PENDING_BUY_KEY, requests);
}

function getPurchases() {
  return getStorageArray(PURCHASES_KEY);
}

function savePurchases(purchases) {
  saveStorageArray(PURCHASES_KEY, purchases);
}

function getActiveBooks() {
  const removedBookIds = getRemovedBookIds();
  const approvedBooks = getApprovedBooks();
  const baseBooks = initialBooksDatabase.filter(
    (book) => !removedBookIds.includes(book.id),
  );
  const activeApprovedBooks = approvedBooks.filter(
    (book) => !removedBookIds.includes(book.id),
  );
  return [...baseBooks, ...activeApprovedBooks].sort((a, b) => a.id - b.id);
}

function addApprovedBook(book) {
  const approvedBooks = getApprovedBooks();
  approvedBooks.push(book);
  saveApprovedBooks(approvedBooks);
  booksDatabase = getActiveBooks();
}

function deleteBookById(bookId) {
  const removedBookIds = getRemovedBookIds();
  if (!removedBookIds.includes(bookId)) {
    removedBookIds.push(bookId);
    saveRemovedBookIds(removedBookIds);
  }
  booksDatabase = getActiveBooks();
}

booksDatabase = getActiveBooks();

/**
 * Display notification
 */
function showNotification(message, type = "success") {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  alertDiv.style.top = "100px";
  alertDiv.style.right = "20px";
  alertDiv.style.zIndex = "9999";
  alertDiv.style.minWidth = "300px";
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
}

/**
 * Validate email
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Format phone number
 */
function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length === 10 ? `+91 ${cleaned}` : phone;
}
