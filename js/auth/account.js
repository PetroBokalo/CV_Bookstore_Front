import { apiFetch } from "/js/api/api.js";

import { toLoginPage } from "/js/api/api.js";
import { toVerifyPage } from "/js/api/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const accountBtn = document.getElementById("accountButton");
  const panel = document.getElementById("accountPanel");

  if (!accountBtn || !panel) return;

  let userData = null;
  let responseStatus = null;

  try {

    const response = await apiFetch("/account/me", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    responseStatus = response.status;

    if (response.ok)
    {
      userData = await response.json();
      accountBtn.querySelector("span").textContent = `Hi, ${userData.firstName}`

    }
      
    
  } catch (error) {
    
    console.error(error);
    responseStatus = 500;

  }


  accountBtn.addEventListener("click", (e) => {
    e.preventDefault();

    
   switch (responseStatus) {
    case 200:
      const offcanvas = new bootstrap.Offcanvas(panel);
      offcanvas.show();
      break;

    case 403:
      toVerifyPage();
      break;

    case 500:
      window.location.replace("/pages/server-error.html");
      break;
    
    default:
      toLoginPage();
      break;
   }




  });
});
