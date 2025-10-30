import { getBaseUrl } from "../../api/api.js";

document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = getBaseUrl();

  const googleSignInBtn = document.getElementById("googleSignInBtn");
  const googleSignUpBtn = document.getElementById("googleSignUpBtn");

  if (googleSignInBtn) {
    googleSignInBtn.addEventListener("click", () => {
      window.location.href = `${baseUrl}/Auth/google`;
    });
  }

  if (googleSignUpBtn) {
    googleSignUpBtn.addEventListener("click", () => {
      window.location.href = `${baseUrl}/Auth/google`;
    });
  }
});
