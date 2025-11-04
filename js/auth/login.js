import { setToken } from "/js/utils/accessTokenHandler.js";
import { getBaseUrl } from "/js/api/api.js";

import { fromLoginPage } from "/js/api/api.js";
import { toVerifyPage } from "/js/api/api.js";

import { showError, hideError } from "/js/utils/errorHandler.js";

const baseUrl = getBaseUrl();


document.getElementById("signinForm").addEventListener("submit", async function (event) 
{
    event.preventDefault(); // блокує стандартне оновлення сторінки


    const data = {
        email: document.getElementById("signinEmail").value,
        password: document.getElementById("signinPassword").value,
    };


    try {

        hideError("signinError");

        const response = await fetch(`${baseUrl}/Auth/login`,{
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data),
            credentials: 'include' // Додає кукі до запиту
        });

        const result = await response.json();

        if (response.ok){          
            console.log(result);
            setToken(result.accessToken);

            fromLoginPage();

        }else if (response.status === 403){
            console.log(result);
            sessionStorage.setItem("email", result.data.email);
            setToken(result.data.accessToken);

            toVerifyPage();
        }else if (response.status === 401){

            console.log(result);

            showError("signinError", result?.message || "Invalid email or password.");


        }else if (response.status === 500){
            console.log(result);
            window.location.replace("/pages/server-error.html");
        }
        else {
            console.log(result);
            alert("An unexpected error occurred. Please try again later.");
        }


    }
    catch (error) {
        console.error("Error:", error);
        window.location.replace("/pages/server-error.html");
    }

});

document.getElementById("toRegister").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.replace("/pages/auth/register.html");
});

document.getElementById("toForget-password").addEventListener("click", function (event) {
    event.preventDefault();
    
    window.location.replace("/pages/auth/forgot-password.html");
});