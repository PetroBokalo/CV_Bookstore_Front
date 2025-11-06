import { setToken } from "/js/utils/accessTokenHandler.js";

import { fromLoginPage } from "/js/api/api.js";

document.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash;
    if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("accessToken");

        if (accessToken) {
            setToken(accessToken);
            window.history.replaceState({}, document.title, window.location.pathname);
            console.log("Access token set from URL hash.");
        }
    }

    fromLoginPage();
});
