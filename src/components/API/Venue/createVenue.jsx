import holidazeUrls from "../../../utils/url";
import CreateApiKey from "../ApiKey";

async function postVenue(formData) {
  try {
    const apiKeyData = await CreateApiKey();
    const apiKey = apiKeyData.data.key;
    const accessToken = localStorage.getItem("accessToken");
    const url = holidazeUrls.urlVenues;

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      console.error("Failed to create a venue!");
      throw new Error("Failed to create venue!");
    }

    return responseData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default postVenue;
