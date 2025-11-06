
import { getToken } from "/js/utils/accessTokenHandler.js";
import { setToken } from "/js/utils/accessTokenHandler.js";
import { removeToken } from "/js/utils/accessTokenHandler.js";

import { setUserDestination } from "/js/utils/UserDestinationStorage.js";
import { getUserDestination } from "/js/utils/UserDestinationStorage.js";
import { removeUserDestination } from "/js/utils/UserDestinationStorage.js";



const API_BASE_URL = "https://localhost:7012/api";

export function getBaseUrl() {
    return API_BASE_URL;
}


export async function apiFetch (endpoint, options = {}) 
{
    const url = `${API_BASE_URL}${endpoint}`;
    let accessToken = getToken();

    if (!options.headers) options.headers = {};
    if (accessToken) 
    {
        options.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    try{
        let response = await fetch(url, options);

        if (response.status === 401 || response.status === 403){

            const refreshResponse = await fetch(`${API_BASE_URL}/Auth/refresh`, {
                method: "POST",
                credentials: 'include' // Додає кукі до запиту
            });

            const refreshData = await refreshResponse.json();

            if (refreshResponse.ok){

                console.log("✅ Token refreshed:", refreshData);
                setToken(refreshData.accessToken);
                accessToken = getToken();
                options.headers['Authorization'] = `Bearer ${accessToken}`;
                response = await fetch(url, options);
            } else if (refreshResponse.status === 401){
                console.warn("Refresh token invalid or expired");
                console.error(refreshData);
                removeToken();
            } else {
                console.warn("Server did not refresh token successfully");
                console.error(refreshData);

            }

        }
        
        return response;
    }
    catch (error){
        console.error("Fetch error:", error);
    }

    
}


export function toLoginPage(destination) 
{
    if(destination) {
        setUserDestination(destination);
    }

    window.location.replace("/pages/auth/login.html");
}

export function fromLoginPage()
{
    const destination = getUserDestination();
    if (destination) 
    {
        removeUserDestination();
        window.location.replace(destination);
    }
    else
    {
        window.location.replace("/index.html");
    }
    
}

export function toVerifyPage(destination) 
{
    setUserDestination(destination);

    window.location.replace("/pages/auth/verify.html");
}

export function fromVerifyPage()
{
    const destination = getUserDestination();
    if (destination) 
    {
        removeUserDestination();
        window.location.replace(destination);
    }
    else
    {
        window.location.replace("/index.html");
    }
    
}