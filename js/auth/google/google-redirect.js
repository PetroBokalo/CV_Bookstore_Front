import { getBaseUrl } from "../../api.js";

const baseUrl = getBaseUrl();

document.getElementById("googleSignInBtn").addEventListener("click", () => {
   window.location.href = `${baseUrl}/Auth/google`;
});

document.getElementById("googleSignUpBtn").addEventListener("click", () => {
   window.location.href = `${baseUrl}/Auth/google`;
});