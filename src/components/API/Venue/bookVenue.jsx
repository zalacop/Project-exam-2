import holidazeUrls from "../../../utils/url";
import CreateApiKey from "../ApiKey";

async function bookVenue(formData) {
  try {
    const apiKeyData = await CreateApiKey();
    const apiKey = apiKeyData.data.key;
    const accessToken = localStorage.getItem("accessToken");
    const url = holidazeUrls.urlBookings;

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
      console.error(error);
      throw new Error("Failed to book venue!");
    }

    return responseData;
  } catch (error) {
    console.error("Booking failed:", error);
    throw error;
  }
}

export default bookVenue;
