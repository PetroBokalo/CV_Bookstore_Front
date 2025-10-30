
import { getToken } from "/js/utils/accessTokenHandler.js";
import { setToken } from "/js/utils/accessTokenHandler.js";
import { removeToken } from "/js/utils/accessTokenHandler.js";


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

        if (response.status === 401){

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
            }
            else{
                
                console.warn("Refresh token invalid or expired");
                console.error(refreshData);
                removeToken();
            }

        }
        
        return response;
    }
    catch (error){
        console.error("Fetch error:", error);
    }

    
}
