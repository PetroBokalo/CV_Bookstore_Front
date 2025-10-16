import { setToken } from "../api.js";
import { getBaseUrl } from "../api.js";

const baseUrl = getBaseUrl();

document.addEventListener("DOMContentLoaded", () =>  {

    const emailElement = document.getElementById("userEmail");
    const form = document.getElementById("verifyForm");
    const resendLink = document.getElementById("resendCode");

    const userId = sessionStorage.getItem("id");
    const userEmail = sessionStorage.getItem("email");

    if (!userEmail) {
        emailElement.textContent = "(Пошти не знайдено)"
    }

    emailElement.textContent = userEmail;


    let cooldown = 60; // seconds
    let timer = null;
    

    const startCooldown = (seconds) => {
        resendLink.style.pointerEvents = 'none';
        resendLink.style.color = 'gray';

        let timeLeft = seconds;    
        resendLink.textContent = `Повторно можна через ${timeLeft}c`;

        const timerExpiry = Date.now() + timeLeft * 1000;
        sessionStorage.setItem("cooldownExpiry", timerExpiry);


        timer = setInterval(() => {

            const remainingTime = Math.round((timerExpiry - Date.now()) / 1000);

            if (remainingTime > 0) {
                timeLeft = remainingTime;
                resendLink.textContent = `Повторно можна через ${timeLeft}c`;
            }
               
            else {
                clearInterval(timer);
                sessionStorage.removeItem("cooldownExpiry");
                resendLink.textContent = "Надіслати ще раз";
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
            alert("Будь ласка, введіть код підтвердження.");
            return;
        }

        try {

            const response = await fetch(`${baseUrl}/Auth/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ UserId: userId, code: code }),
                credentials: 'include' // Додає кукі до запиту
            });

            const result = await response.json();

            if (response.ok) {           
                alert("Email verified successfully!");
                console.log(result);
                setToken(result.accessToken);

                sessionStorage.removeItem("id");
                sessionStorage.removeItem("email");

                window.location.href = "index.html";
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


    resendLink.addEventListener("click", async (event) => {
        event.preventDefault();

        if(resendLink.style.pointerEvents === 'none') return;

        try {
            const response = await fetch(`${baseUrl}/Auth/resend`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ UserId: parseInt(userId) }),
                credentials: 'include' // Додає кукі до запиту
            });

            const result = await response.json();

            if (response.ok) {
                alert("Код підтвердження надіслано повторно.");
                console.log(result);
                 //emailElement.textContent = userId + "-" + result.code;
                startCooldown(cooldown);
            } else {
                alert(result.message || "Не вдалося надіслати код.");
                console.log(result);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server error");
        }
    });



});

