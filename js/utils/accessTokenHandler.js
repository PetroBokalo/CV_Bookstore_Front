export function setToken(accessToken) {

    if(!accessToken) {
        console.warn("⚠️ Tried to set an empty token");
        return;
    }

    sessionStorage.setItem("accessToken", accessToken);
    console.log("✅ Token set");
}

export function getToken() {
    const accessToken = sessionStorage.getItem("accessToken");
    if(!accessToken) {
        console.warn("⚠️ No token found in sessionStorage");
    }
    return accessToken;
}

export function removeToken() {
    sessionStorage.removeItem("accessToken");
    console.log("✅ Token removed");
}