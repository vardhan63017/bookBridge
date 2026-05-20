// ===========================
// CONTACT PAGE JAVASCRIPT
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    setupContactForm();
});

/**
 * Setup contact form submission
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitContactForm();
    });
}

/**
 * Submit contact form
 */
function submitContactForm() {
    const formData = {
        name: document.getElementById('contactName').value.trim(),
        email: document.getElementById('contactEmail').value.trim(),
        phone: document.getElementById('contactPhone').value.trim(),
        subject: document.getElementById('contactSubject').value.trim(),
        message: document.getElementById('contactMessage').value.trim()
    };

    // Validate form data
    if (!validateContactForm(formData)) {
        return;
    }

    // Store in localStorage (or send to backend)
    let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push({
        ...formData,
        id: Date.now(),
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('contacts', JSON.stringify(contacts));

    // Show success message
    showNotification(
        'Thank you for contacting us! We\'ll get back to you within 24 hours.',
        'success'
    );

    // Reset form
    setTimeout(() => {
        document.getElementById('contactForm').reset();
    }, 500);
}

/**
 * Validate contact form
 */
function validateContactForm(data) {
    if (!data.name) {
        showNotification('Please enter your name', 'warning');
        return false;
    }

    if (!validateEmail(data.email)) {
        showNotification('Please enter a valid email address', 'warning');
        return false;
    }

    if (!data.subject) {
        showNotification('Please enter a subject', 'warning');
        return false;
    }

    if (!data.message) {
        showNotification('Please enter your message', 'warning');
        return false;
    }

    if (data.message.length < 10) {
        showNotification('Message must be at least 10 characters long', 'warning');
        return false;
    }

    return true;
}
