// ===============================
// Show / Hide Password
// ===============================

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.textContent = "🙈";

    } else {

        passwordInput.type = "password";
        togglePassword.textContent = "👁️";

    }

});


// ===============================
// Login Validation
// ===============================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value.trim();

    const errorMessage = document.getElementById("errorMessage");

    if (username === "admin" && password === "1234") {

        alert("Login Successful ✅");

        window.location.href = "dashboard.html";

    }

    else {

        errorMessage.textContent = "Invalid Username or Password";

    }

});