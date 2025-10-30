import { getToken } from "/js/utils/accessTokenHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  const accountBtn = document.getElementById("accountButton");

  if (!accountBtn) return;

  const token = getToken();

  accountBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (token) {
      // ✅ користувач автентифікований
      window.location.href = "/pages/auth/login.html"; 
      // або можна показати offcanvas / modal з даними користувача
    } else {
      // 🚫 користувач не ввійшов
      //window.location.href = "/pages/auth/login.html";

      window.location.href = "/pages/auth/login.html"; 

    }
  });
});
