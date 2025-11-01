import { getBaseUrl } from "/js/api/api.js";

const baseUrl = getBaseUrl();

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("forgot-passwordForm");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const userURI = window.location.origin + "/pages/auth/reset-password.html";
        const email = document.getElementById("email").value;
        if (!email) {
            alert("Input your email address.");
            return;
        }

        try{

            const response = await fetch(`${baseUrl}/Auth/forgot-password`, {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({ email: email, UserURI: userURI })
            });

            const result = await response.json();

            if (response.ok) {
                console.log(result);
                sessionStorage.setItem("userEmail", email);

                window.location.href = "/pages/auth/forgot-passwordCheckEmail.html";

            }
            else {
                alert(result.message || "Verification failed");
                console.log(result);
            }


        }
        catch (error) {
            console.error("Error:", error);
            alert("Server error");
        }

    });




});