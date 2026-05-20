// ===========================
// SELL BOOK PAGE JAVASCRIPT
// ===========================

let uploadedImage = null;

document.addEventListener("DOMContentLoaded", () => {
  setupUploadArea();
  setupFormSubmission();
  setupPriceValidation();
});

/**
 * Setup drag and drop upload area
 */
function setupUploadArea() {
  const uploadArea = document.getElementById("uploadArea");
  const bookImageInput = document.getElementById("bookImage");

  if (!uploadArea || !bookImageInput) return;

  // Click to upload
  uploadArea.addEventListener("click", () => {
    bookImageInput.click();
  });

  // File selected
  bookImageInput.addEventListener("change", (e) => {
    handleImageUpload(e.target.files[0]);
  });

  // Drag and drop
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.style.backgroundColor = "#e7f1ff";
    uploadArea.style.borderColor = "#0066cc";
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.style.backgroundColor = "";
    uploadArea.style.borderColor = "";
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.style.backgroundColor = "";
    uploadArea.style.borderColor = "";

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  });
}

/**
 * Handle image upload
 */
function handleImageUpload(file) {
  if (!file) return;

  // Validate file type
  if (!file.type.startsWith("image/")) {
    showNotification("Please upload an image file", "danger");
    return;
  }

  // Validate file size (5MB)
  if (file.size > 5 * 1024 * 1024) {
    showNotification("File size must be less than 5MB", "danger");
    return;
  }

  // Read file
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImage = e.target.result;

    // Update upload area
    const uploadArea = document.getElementById("uploadArea");
    uploadArea.innerHTML = `
            <img src="${uploadedImage}" alt="Preview" style="max-height: 200px; border-radius: 8px;">
            <p class="mt-2 mb-0"><i class="fas fa-check-circle text-success"></i> Image uploaded successfully</p>
        `;

    showNotification("Image uploaded successfully", "success");
  };
  reader.readAsDataURL(file);
}

/**
 * Setup price validation
 */
function setupPriceValidation() {
  const originalPrice = document.getElementById("originalPrice");
  const sellingPrice = document.getElementById("sellingPrice");

  if (!originalPrice || !sellingPrice) return;

  sellingPrice.addEventListener("change", () => {
    const original = parseInt(originalPrice.value) || 0;
    const selling = parseInt(sellingPrice.value) || 0;

    if (selling > original) {
      showNotification(
        "Selling price cannot be more than original price",
        "warning",
      );
      sellingPrice.value = "";
    }
  });
}

/**
 * Setup form submission
 */
function setupFormSubmission() {
  const form = document.getElementById("sellBookForm");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm();
  });
}

/**
 * Submit form
 */
function submitForm() {
  if (!uploadedImage) {
    showNotification("Please upload a book image", "warning");
    return;
  }

  // Gather form data
  const formData = {
    bookName: document.getElementById("bookName").value,
    author: document.getElementById("authorName").value,
    department: document.getElementById("department").value,
    subject: document.getElementById("subject").value,
    originalPrice: parseInt(document.getElementById("originalPrice").value),
    sellingPrice: parseInt(document.getElementById("sellingPrice").value),
    condition: document.getElementById("condition").value,
    description: document.getElementById("description").value,
    contactName: document.getElementById("contactName").value,
    contactPhone: document.getElementById("contactPhone").value,
    contactEmail: document.getElementById("contactEmail").value,
    image: uploadedImage,
  };

  // Validate form data
  if (!validateFormData(formData)) {
    return;
  }

  // Store sell request in pending admin queue
  const pendingSellRequests = JSON.parse(
    localStorage.getItem("pendingSellRequests") || "[]",
  );
  pendingSellRequests.push({
    ...formData,
    requestId: Date.now(),
    status: "pending",
    requestDate: new Date().toISOString(),
  });
  localStorage.setItem(
    "pendingSellRequests",
    JSON.stringify(pendingSellRequests),
  );

  // Show success message
  showNotification("Sell request sent to admin for approval.", "success");

  // Reset form
  setTimeout(() => {
    document.getElementById("sellBookForm").reset();
    uploadedImage = null;
    document.getElementById("uploadArea").innerHTML = `
            <i class="fas fa-image fa-3x text-primary mb-2"></i>
            <p class="mb-0">Click to upload or drag and drop</p>
            <small class="text-muted">PNG, JPG up to 5MB</small>
        `;

    // Redirect to home
    // window.location.href = 'index.html';
  }, 1500);
}

/**
 * Validate form data
 */
function validateFormData(data) {
  if (!data.bookName.trim()) {
    showNotification("Please enter book name", "warning");
    return false;
  }

  if (!data.author.trim()) {
    showNotification("Please enter author name", "warning");
    return false;
  }

  if (!data.department) {
    showNotification("Please select department", "warning");
    return false;
  }

  if (!data.subject.trim()) {
    showNotification("Please enter subject", "warning");
    return false;
  }

  if (data.originalPrice <= 0) {
    showNotification("Please enter valid original price", "warning");
    return false;
  }

  if (data.sellingPrice <= 0) {
    showNotification("Please enter valid selling price", "warning");
    return false;
  }

  if (data.sellingPrice > data.originalPrice) {
    showNotification(
      "Selling price cannot be more than original price",
      "warning",
    );
    return false;
  }

  if (!data.condition) {
    showNotification("Please select book condition", "warning");
    return false;
  }

  if (!data.description.trim()) {
    showNotification("Please enter description", "warning");
    return false;
  }

  if (!data.contactName.trim()) {
    showNotification("Please enter your name", "warning");
    return false;
  }

  if (!data.contactPhone.trim()) {
    showNotification("Please enter phone number", "warning");
    return false;
  }

  if (!validateEmail(data.contactEmail)) {
    showNotification("Please enter valid email address", "warning");
    return false;
  }

  return true;
}
