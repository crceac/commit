function validateAndSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const sessions = document.querySelectorAll('input[name="sessions"]:checked');
    
    let isValid = true;
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
    
    // Validate sessions
    if (sessions.length === 0) {
        showError('sessionsError', 'Please select at least one session');
        isValid = false;
    }
    
    if (isValid) {
        showSuccess('Registration successful! Welcome to the conference.');
        document.getElementById('registrationForm').reset();
    }
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}

function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    successDiv.style.opacity = '1';
    
    setTimeout(() => {
        successDiv.style.opacity = '0';
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 300);
    }, 3000);
}


