// ===========================
// ADMIN PAGE JAVASCRIPT
// ===========================

const ADMIN_USERNAME = "Vardhan";
const ADMIN_PASSWORD = "63017";
const ADMIN_AUTH_KEY = "adminAuthenticated";

document.addEventListener("DOMContentLoaded", () => {
  setupAdminAuth();
});

function setupAdminAuth() {
  const loginForm = document.getElementById("adminLoginForm");
  const logoutBtn = document.getElementById("adminLogoutBtn");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handleAdminLogin();
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleAdminLogout);
  }

  if (isAdminAuthenticated()) {
    showAdminDashboard();
  } else {
    showAdminLogin();
  }
}

function isAdminAuthenticated() {
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === "true";
}

function setAdminAuthenticated(value) {
  sessionStorage.setItem(ADMIN_AUTH_KEY, value ? "true" : "false");
}

function showAdminLogin() {
  const loginSection = document.getElementById("adminLogin");
  const dashboardSection = document.getElementById("adminDashboard");
  if (loginSection) loginSection.classList.remove("d-none");
  if (dashboardSection) dashboardSection.classList.add("d-none");
}

function showAdminDashboard() {
  const loginSection = document.getElementById("adminLogin");
  const dashboardSection = document.getElementById("adminDashboard");
  if (loginSection) loginSection.classList.add("d-none");
  if (dashboardSection) dashboardSection.classList.remove("d-none");
  renderAdminDashboard();
}

function handleAdminLogin() {
  const nameInput = document.getElementById("adminName");
  const passwordInput = document.getElementById("adminPassword");
  const errorDiv = document.getElementById("adminLoginError");

  const name = nameInput?.value.trim() || "";
  const password = passwordInput?.value.trim() || "";

  if (name === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    setAdminAuthenticated(true);
    if (errorDiv) {
      errorDiv.style.display = "none";
      errorDiv.textContent = "";
    }
    showAdminDashboard();
  } else {
    if (errorDiv) {
      errorDiv.style.display = "block";
      errorDiv.textContent = "Invalid admin credentials.";
    }
  }
}

function handleAdminLogout() {
  setAdminAuthenticated(false);
  showAdminLogin();
}

function renderAdminDashboard() {
  renderPendingSellRequests();
  renderPendingBuyRequests();
  renderActiveBooks();
}

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

function getPendingSellRequests() {
  return getStorageArray("pendingSellRequests");
}

function savePendingSellRequests(requests) {
  saveStorageArray("pendingSellRequests", requests);
}

function getPendingBuyRequests() {
  return getStorageArray("pendingBuyRequests");
}

function savePendingBuyRequests(requests) {
  saveStorageArray("pendingBuyRequests", requests);
}

function getPurchases() {
  return getStorageArray("purchases");
}

function savePurchases(purchases) {
  saveStorageArray("purchases", purchases);
}

function renderPendingSellRequests() {
  const requests = getPendingSellRequests();
  const container = document.getElementById("sellRequestsContainer");
  const count = document.getElementById("pendingSellCount");

  count.textContent = requests.length;

  if (!container) return;
  if (requests.length === 0) {
    container.innerHTML =
      '<div class="alert alert-info">No pending sell requests.</div>';
    return;
  }

  container.innerHTML = requests
    .map((req) => createSellRequestCard(req))
    .join("");
}

function renderPendingBuyRequests() {
  const requests = getPendingBuyRequests();
  const container = document.getElementById("buyRequestsContainer");
  const count = document.getElementById("pendingBuyCount");

  count.textContent = requests.length;

  if (!container) return;
  if (requests.length === 0) {
    container.innerHTML =
      '<div class="alert alert-info">No pending buy requests.</div>';
    return;
  }

  container.innerHTML = requests
    .map((req) => createBuyRequestCard(req))
    .join("");
}

function renderActiveBooks() {
  const container = document.getElementById("activeBooksContainer");
  const count = document.getElementById("activeBookCount");
  if (!container || !window.booksDatabase) return;

  const activeBooks = booksDatabase;
  count.textContent = activeBooks.length;

  if (activeBooks.length === 0) {
    container.innerHTML =
      '<div class="alert alert-info">No active books available.</div>';
    return;
  }

  container.innerHTML = `
        <div class="table-responsive">
            <table class="table table-striped align-middle">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Department</th>
                        <th>Seller</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${activeBooks
                      .map(
                        (book) => `
                        <tr>
                            <td>${book.title}</td>
                            <td>${book.author}</td>
                            <td>₹${book.sellingPrice.toLocaleString("en-IN")}</td>
                            <td>${book.department || "N/A"}</td>
                            <td>${book.seller || "N/A"}</td>
                            <td>
                                <button class="btn btn-sm btn-danger" onclick="handleDeleteBook(${book.id})">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    `,
                      )
                      .join("")}
                </tbody>
            </table>
        </div>
    `;
}

function createSellRequestCard(request) {
  return `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${request.bookName}</h5>
                <p class="card-text mb-1"><strong>Author:</strong> ${request.author}</p>
                <p class="card-text mb-1"><strong>Department:</strong> ${request.department}</p>
                <p class="card-text mb-1"><strong>Selling Price:</strong> ₹${request.sellingPrice.toLocaleString("en-IN")}</p>
                <p class="card-text mb-1"><strong>Seller:</strong> ${request.contactName}</p>
                <p class="card-text mb-1"><strong>Email:</strong> ${request.contactEmail}</p>
                <p class="card-text mb-1"><strong>Phone:</strong> ${request.contactPhone}</p>
                <p class="card-text"><strong>Message:</strong> ${request.description}</p>
                <div class="d-flex gap-2 mt-3">
                    <button class="btn btn-success btn-sm" onclick="approveSellRequest(${request.requestId})">Approve</button>
                    <button class="btn btn-outline-secondary btn-sm" onclick="rejectSellRequest(${request.requestId})">Reject</button>
                </div>
            </div>
        </div>
    `;
}

function createBuyRequestCard(request) {
  return `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${request.bookTitle}</h5>
                <p class="card-text mb-1"><strong>Buyer:</strong> ${request.buyerName}</p>
                <p class="card-text mb-1"><strong>Email:</strong> ${request.buyerEmail}</p>
                <p class="card-text mb-1"><strong>Phone:</strong> ${request.buyerPhone}</p>
                <p class="card-text mb-1"><strong>Seller:</strong> ${request.seller}</p>
                <p class="card-text"><strong>Note:</strong> ${request.buyerMessage || "No message provided."}</p>
                <div class="d-flex gap-2 mt-3">
                    <button class="btn btn-success btn-sm" onclick="approveBuyRequest(${request.requestId})">Approve</button>
                    <button class="btn btn-outline-secondary btn-sm" onclick="rejectBuyRequest(${request.requestId})">Reject</button>
                </div>
            </div>
        </div>
    `;
}

function approveSellRequest(requestId) {
  const requests = getPendingSellRequests();
  const request = requests.find((r) => r.requestId === requestId);
  if (!request) return;

  const newBook = {
    id: Date.now(),
    title: request.bookName,
    author: request.author,
    originalPrice: request.originalPrice,
    sellingPrice: request.sellingPrice,
    condition: request.condition,
    department: request.department,
    subject: request.subject,
    year: request.year || "N/A",
    image:
      request.image ||
      "https://via.placeholder.com/250x350/667eea/ffffff?text=New+Book",
    seller: request.contactName,
    location: `${request.contactPhone} • ${request.contactEmail}`,
    rating: 0,
    reviews: 0,
    description: request.description,
    discount: Math.round(
      ((request.originalPrice - request.sellingPrice) / request.originalPrice) *
        100,
    ),
    badge: "New",
  };

  addApprovedBook(newBook);
  const updated = requests.filter((r) => r.requestId !== requestId);
  savePendingSellRequests(updated);
  showNotification(
    `Sell request approved and book added: ${request.bookName}`,
    "success",
  );
  renderAdminDashboard();
}

function rejectSellRequest(requestId) {
  const requests = getPendingSellRequests();
  const updated = requests.filter((r) => r.requestId !== requestId);
  savePendingSellRequests(updated);
  showNotification("Sell request rejected.", "warning");
  renderAdminDashboard();
}

function approveBuyRequest(requestId) {
  const requests = getPendingBuyRequests();
  const request = requests.find((r) => r.requestId === requestId);
  if (!request) return;

  const purchases = getPurchases();
  purchases.push({
    ...request,
    approvedDate: new Date().toISOString(),
    status: "approved",
  });
  savePurchases(purchases);

  const updated = requests.filter((r) => r.requestId !== requestId);
  savePendingBuyRequests(updated);

  showNotification(`Buy request approved for ${request.bookTitle}`, "success");
  renderAdminDashboard();
}

function rejectBuyRequest(requestId) {
  const requests = getPendingBuyRequests();
  const updated = requests.filter((r) => r.requestId !== requestId);
  savePendingBuyRequests(updated);
  showNotification("Buy request rejected.", "warning");
  renderAdminDashboard();
}

function handleDeleteBook(bookId) {
  deleteBookById(bookId);
  showNotification("Book deleted from active listings.", "danger");
  renderAdminDashboard();
}
