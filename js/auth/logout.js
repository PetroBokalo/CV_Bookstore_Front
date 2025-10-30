import { getBaseUrl } from "../api/api.js";
import { apiFetch } from "../api/api.js";
const baseUrl = getBaseUrl();

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
                sessionStorage.removeItem("accessToken");
                console.log("✅ Logged out successfully");
           } else {
               console.error("Logout failed");
           }
       } catch (error) {
           console.error("Error:", error);
       }
   });
});