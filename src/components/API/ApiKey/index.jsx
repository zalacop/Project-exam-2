import holidazeUrls from "../../../utils/url";

async function CreateApiKey(name) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(holidazeUrls.urlApiKey, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to create API key");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default CreateApiKey;
