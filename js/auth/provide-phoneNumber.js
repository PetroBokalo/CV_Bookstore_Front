
import { apiFetch } from "../api.js";
import { setToken } from "../api.js";


document.addEventListener("DOMContentLoaded", () =>  {


    const hash = window.location.hash;
    if(hash){
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("accessToken");

        if(accessToken){
            setToken(accessToken);
            window.history.replaceState({}, document.title, window.location.pathname);
            console.log("Access token set from URL hash.");
        }

    }



    const phoneElement = document.getElementById("phoneNumberInput");
    const form = document.getElementById("phoneNumberForm");


    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const phoneNumber = phoneElement.value;

        if (!phoneNumber) {
            alert("Please enter your phone number.");
            return;
        }

        try{
            const response = await apiFetch("/Auth/provide-phoneNumber", {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phoneNumber: phoneNumber }),
                credentials: 'include' 
            });

            if (!response.ok) {
                const result = await response.json();
                console.error("Error Phone number providing:", result);
            }
            else {
                alert("Phone number provided successfully!");
                console.log("Phone number provided");

                window.location.href = "index.html";
            }

        }
        catch (error) {
            console.error("Error:", error);
            alert("Server error");
        }


    });

});
