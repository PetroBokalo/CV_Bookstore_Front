import { getBaseUrl } from "/js/api/api.js";

import { showError, hideError } from "/js/utils/errorHandler.js";

const baseUrl = getBaseUrl();


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reset-passwordForm");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const email = new URLSearchParams(window.location.search).get("email");
        const token = new URLSearchParams(window.location.search).get("token");

        if (!password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {

            showError("passwordError","Passwords do not match.");
            showError("confirmPasswordError","Passwords do not match.");
            return;
        }

        if (!email || !token) {
            console.error("Invalid password reset link.");
            return;
        }

        try {

            hideError("passwordError");
            hideError("confirmPasswordError");

            const response = await fetch(`${baseUrl}/Auth/reset-password`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email, token, password })
            });
        
            if (response.ok) {
               
                console.log("Password reset successfully!");
                window.location.replace("/pages/auth//reset-passwordClosePage.html");

            } else if (response.status === 500){

                const result = await response.json();               
                console.log(result);
                window.location.replace("/pages/server-error.html");

            } else {

                const result = await response.json();               
                console.log(result);
                window.location.replace("/pages/auth/reset-passwordExpiredClosePage.html");
            }
            
        } catch (error) {

            console.error("Error:", error);
            window.location.replace("/pages/server-error.html");

        }
    });
});