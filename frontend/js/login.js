document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const mobileInput = document.getElementById('mobile');
    const passwordInput = document.getElementById('password');

    if (loginForm) {
        // Format mobile number input
        mobileInput.addEventListener('input', (e) => {
            // Remove non-digits
            let value = e.target.value.replace(/\D/g, '');
            // Limit to 10 digits
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            e.target.value = value;
        });

        // Handle form submission
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const mobile = mobileInput.value.trim();
            const password = passwordInput.value.trim();

            // Validation
            if (!mobile || mobile.length !== 10) {
                showAlert('Please enter a valid 10-digit mobile number');
                return;
            }

            if (!password || password.length < 6) {
                showAlert('Password must be at least 6 characters');
                return;
            }

            // Simulate login
            const loginBtn = loginForm.querySelector('.login-btn');
            const originalText = loginBtn.textContent;
            loginBtn.textContent = 'Logging in...';
            loginBtn.disabled = true;

            setTimeout(() => {
                loginBtn.textContent = originalText;
                loginBtn.disabled = false;
                showAlert('Login successful! (Demo)', 'success');
                // In a real app, redirect to dashboard
                // window.location.href = '/dashboard';
            }, 1500);
        });
    }

    const signupButton = document.querySelector('.signup-btn');
    if (signupButton) {
        signupButton.addEventListener('click', () => {
            window.location.href = 'signup.html';
        });
    }

    // Alert helper
    function showAlert(message, type = 'error') {
        const alert = document.createElement('div');
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? '#4caf50' : '#ff6b6b'};
            color: white;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        alert.textContent = message;
        document.body.appendChild(alert);

        setTimeout(() => {
            alert.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => alert.remove(), 300);
        }, 3000);
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
