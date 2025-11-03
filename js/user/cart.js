import { apiFetch } from "/js/api/api.js";

import { toLoginPage } from "/js/api/api.js";
import { toVerifyPage } from "/js/api/api.js";

async function loadCartData() {
    const container = document.getElementById("cartData");
    container.style.display = "none"; // приховуємо до завантаження


    try {
        const response = await apiFetch("/Cart/temp", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Backend sends email:", data);
            container.textContent = `User email: ${data.email}`;
            container.style.display = "block"; // показуємо лише після успішного завантаження
        } else if (response.status === 401) {
            toLoginPage("/pages/user/cart.html");
        } else if (response.status === 403) {
            toVerifyPage("/pages/user/cart.html");
        } else {
            const err = await response.text();
            container.textContent = "Error: " + err;
            console.error(err);
        }

    } catch (error) {
        container.textContent = "Server error";
        console.error("Error:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadCartData(); // виконуємо одразу при завантаженні сторінки
});
