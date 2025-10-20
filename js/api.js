
const API_BASE_URL = "https://localhost:7012/api";

export function getBaseUrl() {
    return API_BASE_URL;
}

let accessToken = null;

export function setToken(access) {

    sessionStorage.setItem("accessToken", access);
    accessToken = access;

    console.log("✅ Token set:", { accessToken });
}

export function getToken() {
    accessToken = sessionStorage.getItem("accessToken");
    return accessToken;
}

export async function apiFetch (endpoint, options = {}) 
{
    const url = `${API_BASE_URL}${endpoint}`;

    if (!options.headers) options.headers = {};
    if (!accessToken) accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) 
    {
        options.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    let response = await fetch(url, options);

    if(response.status === 401){
        const refreshResponse = await fetch(`${API_BASE_URL}/Auth/refresh`, {
            method: "POST",
            credentials: 'include' // Додає кукі до запиту
    });

    const refreshData = await refreshResponse.json();

    if(refreshResponse.ok){
        console.log("✅ Token refreshed:", refreshData);
        setToken(refreshData.accessToken);
        accessToken = refreshData.accessToken;
        options.headers['Authorization'] = `Bearer ${accessToken}`;
        response = await fetch(url, options);
    }
    else{
        console.warn("Refresh token invalid or expired");
        console.error(refreshData);
        sessionStorage.removeItem("accessToken");
    }

    }
    
    return response;
}