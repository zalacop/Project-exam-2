const base = "https://v2.api.noroff.dev";
const holidazeEndpoints = "/holidaze";

const holidazeBaseUrl = base + holidazeEndpoints;

const holidazeUrls = {
  urlVenues: `${holidazeBaseUrl}/venues`,
  urlRegister: `${base}/auth/register`,
  urlLogin: `${base}/auth/login`,
  urlApiKey: `${base}/auth/create-api-key`,
  urlProfile: `${holidazeBaseUrl}/profiles`,
  urlBookings: `${holidazeBaseUrl}/bookings`,
};

export default holidazeUrls;
