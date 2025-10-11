import { setToken } from "../api.js";

document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // блокує стандартне оновлення сторінки

    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
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
        const response = await fetch("https://localhost:7012/api/Auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: 'include' // Додає кукі до запиту
        });
 
        const result = await response.json();

               
        if (response.ok) {
            alert("Registration successful!");
            console.log(result);
            setToken(result.accessToken);

        } else {
            alert(result.message);
            console.error(result);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Server error");
    }
});
