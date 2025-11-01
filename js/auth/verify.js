
import { apiFetch } from "/js/api/api.js";

document.addEventListener("DOMContentLoaded", () =>  {

    const emailElement = document.getElementById("userEmail");
    const form = document.getElementById("verifyForm");
    const resendLink = document.getElementById("resendCode");

    const userEmail = sessionStorage.getItem("email");

    if (!userEmail) {
        emailElement.textContent = "(No email found)";
        console.warn("No email found in sessionStorage.");
    }

    emailElement.textContent = userEmail;


    let cooldown = 60; // seconds
    let timer = null;
    

    const startCooldown = (seconds) => {
        resendLink.style.pointerEvents = 'none';
        resendLink.style.color = 'gray';

        let timeLeft = seconds;    
        resendLink.textContent = `Resent again in ${timeLeft}s`;

        const timerExpiry = Date.now() + timeLeft * 1000;
        sessionStorage.setItem("cooldownExpiry", timerExpiry);


        timer = setInterval(() => {

            const remainingTime = Math.round((timerExpiry - Date.now()) / 1000);

            if (remainingTime > 0) {
                timeLeft = remainingTime;
                resendLink.textContent = `Resent again in ${timeLeft}s`;
            }
               
            else {
                clearInterval(timer);
                sessionStorage.removeItem("cooldownExpiry");
                resendLink.textContent = "Resend";
                resendLink.style.pointerEvents = "auto";
                resendLink.style.color = "";
            }
            

        }, 1000);
    };

    const savedExpiry = sessionStorage.getItem("cooldownExpiry");
    if (savedExpiry && Date.now() < savedExpiry) {
        const remaining = Math.round((savedExpiry - Date.now()) / 1000);    
        if (remaining > 0) {
            startCooldown(remaining);
        }
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // блокує стандартне оновлення сторінки

        const code = document.getElementById("code").value;

        if (!code) {
            alert("Please enter the verification code.");
            return;
        }

        try {

            const response = await apiFetch("/Auth/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: code }),
                credentials: 'include' // Додає кукі до запиту
            });


            if (response.ok) {           
                alert("Email verified successfully!");
                console.log(response);

                sessionStorage.removeItem("id");
                sessionStorage.removeItem("email");

                window.location.href = "/index.html";
            } else if (response.status === 401 ) {

                console.warn("Unauthorized access - need login.");

                window.location.href = "/pages/auth/login.html";
            }
            else {
                const result = await response.json();
                alert(result.message || "Verification failed");
                console.log(result);
            }
        }
        catch (error) {
            console.error("Error:", error);
            alert("Server error");
        }

    });


    resendLink.addEventListener("click", async (event) => {
        event.preventDefault();

        if (resendLink.style.pointerEvents === 'none') return;

        try {
            const response = await apiFetch("/Auth/resend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include' // Додає кукі до запиту
            });

            if (response.status === 204) {
                alert("Verification code resent.");
                startCooldown(cooldown);
                return;
            } else {
                const result = await response.json();
                alert(result.message || "Failed to resend code.");
                console.log(result);
            }


        } 
        catch (error) {
            console.error("Error:", error);
            alert("Server error");
        }
    });



});

