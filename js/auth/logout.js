
import { apiFetch } from "/js/api/api.js";
import { removeToken } from "/js/utils/accessTokenHandler.js";

document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout");
   logoutButton.addEventListener("click", async () => {
       try {
           const response = await apiFetch("/auth/logout", {
               method: "POST",
               headers: { "content-type": "application/json" },
               credentials: "include"
           });
           if (response.ok) {

                removeToken();
                console.log("✅ Logged out successfully");
                window.location.reload();
           } 
           else {
               removeToken();
               console.error("Logout failed");
           }
       } 
       catch (error) {

           console.error("Error:", error);
           window.location.replace("/pages/server-error.html");
       }
   });
});