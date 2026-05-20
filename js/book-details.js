// ===========================
// BOOK DETAILS PAGE JAVASCRIPT
// ===========================

let currentBook = null;

document.addEventListener("DOMContentLoaded", () => {
  loadBookDetails();
  loadRelatedBooks();
  setupBuyButton();
});

/**
 * Load book details from URL parameter
 */
function loadBookDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = parseInt(urlParams.get("id"));

  if (!bookId) {
    showNotification("Book not found", "danger");
    setTimeout(() => (window.location.href = "buy-books.html"), 2000);
    return;
  }

  currentBook = getBookById(bookId);

  if (!currentBook) {
    showNotification("Book not found", "danger");
    setTimeout(() => (window.location.href = "buy-books.html"), 2000);
    return;
  }

  // Update page title
  document.title = `${currentBook.title} - BookBridge`;

  // Display book details
  displayBookDetails();
}

/**
 * Display book details on the page
 */
function displayBookDetails() {
  if (!currentBook) return;

  const discount = calculateDiscount(
    currentBook.originalPrice,
    currentBook.sellingPrice,
  );

  // Update breadcrumb
  document.getElementById("bookBreadcrumb").textContent = currentBook.title;

  // Update image
  document.getElementById("bookImage").src = currentBook.image;
  document.getElementById("bookImage").alt = currentBook.title;

  // Update discount badge
  const discountBadgeContainer = document.getElementById("discountBadge");
  if (currentBook.badge) {
    discountBadgeContainer.innerHTML = `<span class="badge bg-${currentBook.badge.includes("Best") ? "warning" : "danger"} fs-6">${currentBook.badge}</span>`;
  } else {
    discountBadgeContainer.innerHTML = `<span class="badge bg-danger fs-6">${discount}% OFF</span>`;
  }

  // Update title
  document.getElementById("bookTitle").textContent = currentBook.title;

  // Update rating
  document.getElementById("ratingStars").innerHTML = getStarRating(
    currentBook.rating,
  );

  // Update pricing
  document.getElementById("originalPrice").textContent = formatPrice(
    currentBook.originalPrice,
  );
  document.getElementById("sellingPrice").textContent = formatPrice(
    currentBook.sellingPrice,
  );
  document.getElementById("savingBadge").textContent = `Save ${discount}%`;

  // Update book details
  document.getElementById("authorName").textContent = currentBook.author;
  document.getElementById("bookCondition").textContent = currentBook.condition;
  document.getElementById("bookDepartment").textContent =
    currentBook.department;
  document.getElementById("bookSubject").textContent = currentBook.subject;

  // Update seller info
  document.getElementById("sellerName").textContent = currentBook.seller;
  document.getElementById("sellerLocation").textContent = currentBook.location;

  // Update description
  document.getElementById("bookDescription").textContent =
    currentBook.description;

  // Update modal
  document.getElementById("modalBookName").textContent = currentBook.title;
  document.getElementById("modalPrice").textContent = formatPrice(
    currentBook.sellingPrice,
  );
}

/**
 * Load related books
 */
function loadRelatedBooks() {
  if (!currentBook) return;

  // Get related books (same subject or department)
  const relatedBooks = booksDatabase
    .filter(
      (book) =>
        book.id !== currentBook.id &&
        (book.subject === currentBook.subject ||
          book.department === currentBook.department),
    )
    .slice(0, 4);

  const container = document.getElementById("relatedBooksContainer");
  if (container) {
    if (relatedBooks.length === 0) {
      container.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info" role="alert">
                        No related books found at the moment.
                    </div>
                </div>
            `;
    } else {
      container.innerHTML = relatedBooks
        .map((book) => createBookCard(book))
        .join("");
    }
  }
}

/**
 * Setup buy button
 */
function setupBuyButton() {
  const confirmBuyBtn = document.getElementById("confirmBuyBtn");
  if (confirmBuyBtn) {
    confirmBuyBtn.addEventListener("click", processPurchase);
  }
}

/**
 * Process purchase
 */
function processPurchase() {
  if (!currentBook) return;

  const buyerName = document.getElementById("buyerName").value.trim();
  const buyerEmail = document.getElementById("buyerEmail").value.trim();
  const buyerPhone = document.getElementById("buyerPhone").value.trim();
  const buyerMessage = document.getElementById("buyerMessage").value.trim();

  if (!buyerName) {
    showNotification("Please enter your name", "warning");
    return;
  }

  if (!validateEmail(buyerEmail)) {
    showNotification("Please enter a valid email address", "warning");
    return;
  }

  if (!buyerPhone) {
    showNotification("Please enter your phone number", "warning");
    return;
  }

  const pendingBuyRequests = JSON.parse(
    localStorage.getItem("pendingBuyRequests") || "[]",
  );
  pendingBuyRequests.push({
    requestId: Date.now(),
    status: "pending",
    requestDate: new Date().toISOString(),
    bookId: currentBook.id,
    bookTitle: currentBook.title,
    seller: currentBook.seller,
    buyerName,
    buyerEmail,
    buyerPhone,
    buyerMessage,
  });
  localStorage.setItem(
    "pendingBuyRequests",
    JSON.stringify(pendingBuyRequests),
  );

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("buyModal"),
  );
  modal.hide();

  showNotification(
    `Buy request for "${currentBook.title}" sent to admin for approval.`,
    "success",
  );

  setTimeout(() => {
    window.location.href = "buy-books.html";
  }, 2000);
}
