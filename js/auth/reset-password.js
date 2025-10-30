import { getBaseUrl } from "/js/api/api.js";
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
            alert("Passwords do not match.");
            return;
        }

        if (!email || !token) {
            console.error("Invalid password reset link.");
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/Auth/reset-password`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email, token, password })
            });

        
            if (response.ok) {
                alert("Password reset successfully!");
                console.log("Password reset successfully!");
                window.location.href = "reset-passwordClosePage.html";
            } else {
                const result = await response.json();
                alert(result.message || "Password reset failed");
                console.log(result);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server error");
        }
    });
});