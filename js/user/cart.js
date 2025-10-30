import { apiFetch } from "../api/api.js";
import { getToken } from "../api/api.js";


document.addEventListener("DOMContentLoaded", () =>  {

document.getElementById("loadCart").addEventListener("click", async function () {

    try {

        const token = getToken();
        const response = await apiFetch("/Cart/temp", {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();  
            console.log("Backend sends email:", data);

            sessionStorage.setItem("userEmail", data.email); // зберігаємо в sessionStorage
            console.log("Loggined at:", data.email);

            console.log("Redirecting to cart.html in 2 seconds...");
            
            setTimeout(() => {
                window.location.href = "pages/user/cart.html"; // перенаправляємо в новому вікні
            }, 2000); // затримка 2 секунди

        } else if (response.status === 401) {
            alert("Unauthorized. Please log in.");
        }
        else {
            const err = await response.text();
            alert("Error: " + err);
            console.error(err);
        }

    }
    catch (error) {
        console.error("Error:", error);
        alert("Server error");
    }
});

});

