import holidazeUrls from "../../../utils/url";
import CreateApiKey from "../ApiKey";

async function getProfile() {
    try {
        const apiKeyData = await CreateApiKey();
        const apiKey = apiKeyData.data.key;
        const username = localStorage.getItem("name");
        const accessToken = localStorage.getItem("accessToken");
        const url = `${holidazeUrls.urlProfile}/${username}?_bookings=true&_venues=true`;

        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                "X-Noroff-API-Key": apiKey,
            },
        };

        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Failed to fetch profile data");
        };
        
        return response.json(); 
    } catch (error) {
        console.log("Error:", error);
        throw error;
    }
}

export default getProfile;
