function validateForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Validate name
    if (name.length < 3) {
        showError('nameError', 'Name must be at least 3 characters long');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone (only digits, 10 digits minimum)
    const phoneRegex = /^\d{10,}$/;
    const phoneDigits = phone.replace(/\D/g, ''); // Remove non-digits
    
    if (!phoneRegex.test(phoneDigits) || phoneDigits.length < 10) {
        showError('phoneError', 'Phone number must contain only digits and be at least 10 digits long');
        isValid = false;
    }
    
    // Validate password
    if (password.length < 6) {
        showError('passwordError', 'Password must be at least 6 characters long');
        isValid = false;
    }
    
    if (isValid) {
        alert('Registration successful!');
        document.getElementById('registrationForm').reset();
    }
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}


