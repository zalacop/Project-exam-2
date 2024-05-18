import holidazeUrls from "../../../utils/url";
import CreateApiKey from "../ApiKey";

async function putProfile(updateData) {
  try {
    const apiKeyData = await CreateApiKey();
    const apiKey = apiKeyData.data.key;
    const username = localStorage.getItem("name");
    const accessToken = localStorage.getItem("accessToken");
    const url = `${holidazeUrls.urlProfile}/${username}`;

    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify(updateData),
    };

    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error("Failed to update profile data!");
    }

    return responseData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default putProfile;
