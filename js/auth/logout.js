
import { apiFetch } from "/js/api/api.js";
import { removeToken } from "/js/utils/accessTokenHandler.js";

document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("icon-facebook");
   logoutButton.addEventListener("click", async () => {
       try {
           const response = await apiFetch("/auth/logout", {
               method: "POST",
               headers: { "content-type": "application/json" },
               credentials: "include"
           });
           if (response.ok) {
               //window.location.href = "../../index.html";
                removeToken();
                console.log("✅ Logged out successfully");
           } 
           else {
               removeToken();
               console.error("Logout failed");
           }
       } 
       catch (error) {
           console.error("Error:", error);
       }
   });
});