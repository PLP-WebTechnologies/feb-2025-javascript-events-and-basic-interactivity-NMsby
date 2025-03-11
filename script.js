// Wait for the DOM to fully load before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // FORM VALIDATION
    // ==========================================
    
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const messageError = document.getElementById('message-error');
    
    const formSuccess = document.getElementById('form-success');
    
    // Form submission event
    contactForm.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();
        
        // Reset previous error messages
        hideAllErrors();
        
        // Validate form fields
        let isValid = true;
        
        // Validate name (minimum 2 characters)
        if (nameInput.value.trim().length < 2) {
            showError(nameError);
            isValid = false;
        }
        
        // Validate email using regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            showError(emailError);
            isValid = false;
        }
        
        // Validate phone number (simple check for minimum length)
        if (phoneInput.value.trim().length < 10) {
            showError(phoneError);
            isValid = false;
        }
        
        // Validate message (not empty)
        if (messageInput.value.trim() === '') {
            showError(messageError);
            isValid = false;
        }
        
        // If all validations pass
        if (isValid) {
            // Show success message
            formSuccess.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                formSuccess.style.display = 'none';
            }, 5000);
        }
    });
    
    // Helper function to show error
    function showError(errorElement) {
        errorElement.style.display = 'block';
    }
    
    // Helper function to hide all errors
    function hideAllErrors() {
        nameError.style.display = 'none';
        emailError.style.display = 'none';
        phoneError.style.display = 'none';
        messageError.style.display = 'none';
    }
    
    // Add input event listeners to validate in real-time and hide errors when corrected
    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim().length >= 2) {
            nameError.style.display = 'none';
        }
    });
    
    emailInput.addEventListener('input', function() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(emailInput.value)) {
            emailError.style.display = 'none';
        }
    });
    
    phoneInput.addEventListener('input', function() {
        if (phoneInput.value.trim().length >= 10) {
            phoneError.style.display = 'none';
        }
    });
    
    messageInput.addEventListener('input', function() {
        if (messageInput.value.trim() !== '') {
            messageError.style.display = 'none';
        }
    });
    
    
    // ==========================================
    // TOGGLE VISIBILITY
    // ==========================================
    
    const toggleBtn = document.getElementById('toggle-btn');
    const toggleContent = document.getElementById('toggle-content');
    
    // Toggle button click event
    toggleBtn.addEventListener('click', function() {
        // Check if content is currently visible
        const isVisible = toggleContent.style.display === 'block';
        
        // Toggle visibility
        if (isVisible) {
            toggleContent.style.display = 'none';
            toggleBtn.textContent = 'Show Content';
        } else {
            toggleContent.style.display = 'block';
            toggleBtn.textContent = 'Hide Content';
        }
    });
    
    
    // ==========================================
    // INTERACTIVE COUNTER
    // ==========================================
    
    const counterDisplay = document.getElementById('counter-display');
    const decrementBtn = document.getElementById('decrement-btn');
    const resetBtn = document.getElementById('reset-btn');
    const incrementBtn = document.getElementById('increment-btn');
    
    // Initialize counter value
    let count = 0;
    
    // Update counter display
    function updateCounter() {
        counterDisplay.textContent = count;
        
        // Change color based on value
        if (count < 0) {
            counterDisplay.style.color = '#e74c3c'; // Red for negative
        } else if (count > 0) {
            counterDisplay.style.color = '#2ecc71'; // Green for positive
        } else {
            counterDisplay.style.color = '#6c5ce7'; // Purple for zero
        }
    }
    
    // Increment button click event
    incrementBtn.addEventListener('click', function() {
        count++;
        updateCounter();
    });
    
    // Decrement button click event
    decrementBtn.addEventListener('click', function() {
        count--;
        updateCounter();
    });
    
    // Reset button click event
    resetBtn.addEventListener('click', function() {
        count = 0;
        updateCounter();
        
        // Add animation effect
        counterDisplay.style.transform = 'scale(1.2)';
        setTimeout(function() {
            counterDisplay.style.transform = 'scale(1)';
        }, 200);
    });
    
    
    // ==========================================
    // COLOR CLICK GAME
    // ==========================================
    
    const colorBoxes = document.querySelectorAll('.color-box');
    
    // Array of colors for random selection
    const colors = [
        '#e74c3c', '#3498db', '#2ecc71', '#f39c12', 
        '#9b59b6', '#1abc9c', '#34495e', '#e67e22',
        '#fd79a8', '#6c5ce7', '#00cec9', '#d63031',
        '#a29bfe', '#636e72', '#55efc4', '#ff7675'
    ];
    
    // Add click event to each color box
    colorBoxes.forEach(function(box, index) {
        // Store original color
        const originalColor = box.style.backgroundColor;
        
        box.addEventListener('click', function() {
            // Get a random color (different from current)
            let newColor;
            do {
                newColor = colors[Math.floor(Math.random() * colors.length)];
            } while (newColor === box.style.backgroundColor);
            
            // Apply new color
            box.style.backgroundColor = newColor;
            
            // Update box text with the color number
            box.textContent = `Box ${index + 1}`;
            
            // Apply animation
            box.style.transform = 'scale(1.1)';
            setTimeout(function() {
                box.style.transform = 'scale(1)';
            }, 200);
        });
        
        // Add double-click to reset to original color
        box.addEventListener('dblclick', function() {
            box.style.backgroundColor = originalColor;
        });
    });
    
    
    // ==========================================
    // KEYBOARD EVENTS FOR COUNTER
    // ==========================================
    
    // Add keyboard controls for the counter
    document.addEventListener('keydown', function(event) {
        // Arrow up or plus key to increment
        if (event.key === 'ArrowUp' || event.key === '+') {
            count++;
            updateCounter();
        }
        // Arrow down or minus key to decrement
        else if (event.key === 'ArrowDown' || event.key === '-') {
            count--;
            updateCounter();
        }
        // R key to reset
        else if (event.key === 'r' || event.key === 'R') {
            count = 0;
            updateCounter();
        }
    });
});