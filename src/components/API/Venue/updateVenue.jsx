import holidazeUrls from "../../../utils/url";
import CreateApiKey from "../ApiKey";

async function putVenue(id, newData) {
  try {
    const apiKeyData = await CreateApiKey();
    const apiKey = apiKeyData.data.key;
    const accessToken = localStorage.getItem("accessToken");
    const url = `${holidazeUrls.urlVenues}/${id}`;

    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify(newData),
    };

    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      console.error("Failed to update the venue!");
      throw new Error("Failed to update the venue!");
    }

    return responseData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default putVenue;
