import { setToken } from "/js/utils/accessTokenHandler.js";
import { getBaseUrl } from "/js/api/api.js";

const baseUrl = getBaseUrl();

document.getElementById("signinForm").addEventListener("submit", async function (event) 
{
    event.preventDefault(); // блокує стандартне оновлення сторінки


    const data = {
        email: document.getElementById("signinEmail").value,
        password: document.getElementById("signinPassword").value,
    };


    try {

        const response = await fetch(`${baseUrl}/Auth/login`,{
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data),
            credentials: 'include' // Додає кукі до запиту
        });

        const result = await response.json();

        if (response.ok){          
            alert("Login successful");
            console.log(result);
            setToken(result.accessToken);

            // TODO:return to previous page
            window.location.href = "/index.html";

        }else if (response.status === 403){
            console.log(result);
            sessionStorage.setItem("email", result.data.email);

            window.location.href = "/pages/auth/verify.html";
        }
        else{
            alert("Login failed");
            console.log(result);
        }


    }
    catch (error) {
        console.error("Error:", error);
        alert("Server error");
    }

});