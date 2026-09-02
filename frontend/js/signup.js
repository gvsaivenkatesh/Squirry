document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const fullName = document.getElementById("fullName");
    const mobile = document.getElementById("mobile");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const terms = document.getElementById("terms");
    const submitButton = signupForm.querySelector('button[type="submit"]');
    const signupStatus = document.getElementById("signupStatus");

    document.querySelectorAll(".password-toggle").forEach((button) => {
        button.addEventListener("click", () => {
            const input = button.previousElementSibling;
            const isPassword = input.type === "password";
            input.type = isPassword ? "text" : "password";
            button.textContent = isPassword ? "🙈" : "👁";
            button.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
        });
    });

    mobile.addEventListener("input", () => {
        mobile.value = mobile.value.replace(/\D/g, "").slice(0, 10);
    });

    function showStatus(message, type) {
        signupStatus.textContent = message;
        signupStatus.className = `form-status ${type}`;
    }

    function validatePassword(value) {
        return value.length >= 8 && /[A-Z]/.test(value) && /[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value);
    }

    // Temporary mock for POST /api/register. No password is stored locally.
    function mockRegister({ email: emailAddress }) {
        return new Promise((resolve) => {
            window.setTimeout(() => {
                const registeredEmails = JSON.parse(localStorage.getItem("squirryRegisteredEmails") || "[]");
                const normalizedEmail = emailAddress.toLowerCase();

                if (registeredEmails.includes(normalizedEmail)) {
                    resolve({ ok: false, message: "An account with this email already exists." });
                    return;
                }

                registeredEmails.push(normalizedEmail);
                localStorage.setItem("squirryRegisteredEmails", JSON.stringify(registeredEmails));
                resolve({ ok: true, message: "Account created successfully! Redirecting to login..." });
            }, 650);
        });
    }

    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const nameValue = fullName.value.trim();
        const mobileValue = mobile.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value;

        if (!nameValue) return fullName.focus(), alert("Please enter your full name.");
        if (!/^[6-9]\d{9}$/.test(mobileValue)) return mobile.focus(), alert("Please enter a valid 10-digit Indian mobile number.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) return email.focus(), alert("Please enter a valid email address.");
        if (!validatePassword(passwordValue)) return password.focus(), alert("Password must contain at least 8 characters, one uppercase letter, one number, and one special character.");
        if (passwordValue !== confirmPassword.value) return confirmPassword.focus(), alert("Passwords do not match.");
        if (!terms.checked) return terms.focus(), alert("Please agree to the Terms & Conditions and Privacy Policy.");

        try {
            submitButton.disabled = true;
            showStatus("Creating your account...", "is-pending");
            const data = await mockRegister({ fullName: nameValue, mobile: mobileValue, email: emailValue, password: passwordValue });

            if (!data.ok) {
                showStatus(data.message || "Unable to create account.", "is-error");
                return;
            }

            showStatus(data.message, "is-success");
            signupForm.reset();
            window.setTimeout(() => { window.location.href = "./login.html"; }, 900);
        } catch (error) {
            console.error("Signup Error:", error);
            showStatus("Something went wrong. Please try again.", "is-error");
        } finally {
            submitButton.disabled = false;
        }
    });
});
