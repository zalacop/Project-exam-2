import holidazeUrls from "../../../utils/url";
import CreateApiKey from "../ApiKey";

async function deleteVenue(id) {
    try {
      const apiKeyData = await CreateApiKey();
      const apiKey = apiKeyData.data.key;
      const accessToken = localStorage.getItem("accessToken");
      const url = `${holidazeUrls.urlVenues}/${id}`;
  
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Noroff-API-Key": apiKey,
        },
      };
  
      const response = await fetch(url, options);
  
      if (!response.ok) {
        console.error("Failed to delete venue!");
        throw new Error("Failed to delete venue!");
      }
  
      return {};
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  export default deleteVenue;
  
  
