document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");

    const fullName = document.getElementById("fullName");
    const mobile = document.getElementById("mobile");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const terms = document.getElementById("terms");

    const passwordToggles = document.querySelectorAll(".password-toggle");

    // Show / Hide Password
    passwordToggles.forEach((button) => {
        button.addEventListener("click", () => {
            const input = button.previousElementSibling;

            if (!input) return;

            if (input.type === "password") {
                input.type = "text";
                button.textContent = "🙈";
                button.setAttribute("aria-label", "Hide password");
            } else {
                input.type = "password";
                button.textContent = "👁";
                button.setAttribute("aria-label", "Show password");
            }
        });
    });


    // Only numbers in mobile field
    mobile.addEventListener("input", () => {
        mobile.value = mobile.value
            .replace(/\D/g, "")
            .slice(0, 10);
    });


    // Password Validation
    function validatePassword(value) {
        const minLength = value.length >= 8;
        const uppercase = /[A-Z]/.test(value);
        const number = /[0-9]/.test(value);
        const specialCharacter = /[^A-Za-z0-9]/.test(value);

        return (
            minLength &&
            uppercase &&
            number &&
            specialCharacter
        );
    }


    // Sign Up Submit
    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nameValue = fullName.value.trim();
        const mobileValue = mobile.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value;
        const confirmPasswordValue = confirmPassword.value;


        // Full Name
        if (nameValue === "") {
            alert("Please enter your full name.");
            fullName.focus();
            return;
        }


        // Mobile Number
        if (!/^[6-9]\d{9}$/.test(mobileValue)) {
            alert("Please enter a valid 10-digit Indian mobile number.");
            mobile.focus();
            return;
        }


        // Email
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {
            alert("Please enter a valid email address.");
            email.focus();
            return;
        }


        // Password
        if (!validatePassword(passwordValue)) {
            alert(
                "Password must contain at least 8 characters, one uppercase letter, one number, and one special character."
            );

            password.focus();
            return;
        }


        // Confirm Password
        if (passwordValue !== confirmPasswordValue) {
            alert("Passwords do not match.");
            confirmPassword.focus();
            return;
        }


        // Terms
        if (!terms.checked) {
            alert(
                "Please agree to the Terms & Conditions and Privacy Policy."
            );
            terms.focus();
            return;
        }


        // User Data
        const signupData = {
            fullName: nameValue,
            mobile: mobileValue,
            email: emailValue,
            password: passwordValue
        };


        console.log("Signup Data:", signupData);


        /*
        ==========================================
        NODE.JS BACKEND API

        Later your backend can use:

        POST /api/register
        ==========================================
        */

        try {
            const response = await fetch("/api/register", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(signupData)
            });


            const data = await response.json();


            if (!response.ok) {
                alert(
                    data.message ||
                    "Unable to create account."
                );

                return;
            }


            alert(
                data.message ||
                "Account created successfully!"
            );


            signupForm.reset();


            // Go to login page
            window.location.href = "./login.html";


        } catch (error) {
            console.error(
                "Signup Error:",
                error
            );

            /*
            Temporary message while backend
            is not connected.
            */

            alert(
                "Unable to connect to the server. Please make sure your Node.js backend is running."
            );
        }
    });
});