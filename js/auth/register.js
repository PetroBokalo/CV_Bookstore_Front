
import { setToken } from "/js/utils/accessTokenHandler.js";
import { getBaseUrl } from "/js/api/api.js";

import { showError, hideError } from "/js/utils/errorHandler.js";

const baseUrl = getBaseUrl();

document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // блокує стандартне оновлення сторінки

    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;

    if (password !== confirmPassword) {
        showError("confirmPasswordError", "Passwords do not match.");
        showError("passwordError", "Passwords do not match.");
        return;
    }

    const data = {
        userFirstName: document.getElementById("signupFirstName").value,
        userLastName: document.getElementById("signupLastName").value,
        email: document.getElementById("signupEmail").value,
        phoneNumber: document.getElementById("signupPhone").value,
        password: password
    };

    try {

        hideError("emailError");
        hideError("passwordError");
        hideError("confirmPasswordError");

        const response = await fetch(`${baseUrl}/Auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: 'include' 
        });
 
        const result = await response.json();

               
        if (response.ok) {

            setToken(result.accessToken);
            console.log(result);
            sessionStorage.setItem("email", result.userEmail);

           window.location.href = "/pages/auth/verify.html";

        } else if (response.status === 400) {

            showError("emailError", result?.message || "User with this email already exists");
            console.error(result);

        } else if (response.status === 500) {

            console.error(result);
            window.location.replace("/pages/server-error.html");

        } else {

            alert(result.message);
            console.error(result);

        }
    } catch (error) {

        console.error("Error:", error);
        window.location.replace("/pages/server-error.html");

    }
});

document.getElementById("toLogin").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.replace("/pages/auth/login.html");
});
