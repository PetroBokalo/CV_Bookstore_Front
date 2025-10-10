let accessToken = null;

export function setToken(access) {
  accessToken = access;

   console.log("✅ Token set:", { accessToken });
}

export function getToken() {
    return accessToken;
}

export async function apiFetch (url, options = {}) 
{
    if (!options.headers) options.headers = {};
    if (accessToken) 
    {
        options.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    let response = await fetch(url, options);

    if(response.status === 401){
        const refreshResponse = await fetch("https://localhost:7012/api/Auth/refresh", {
            method: "POST",
            credentials: 'include' // Додає кукі до запиту
    });

    const refreshData = await refreshResponse.json();

    if(refreshResponse.ok){
        console.log("✅ Token refreshed:", refreshData);
        setToken(refreshData.accessToken);
        options.headers['Authorization'] = `Bearer ${accessToken}`;
        response = await fetch(url, options);
    }
    else{
        console.warn("Refresh token invalid or expired");
        console.error(refreshData);
    }

    }
    
    return response;
}