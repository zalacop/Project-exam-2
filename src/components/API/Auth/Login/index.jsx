import holidazeUrls from "../../../../utils/url";

async function LoginUser(email, password) {
  const response = await fetch(holidazeUrls.urlLogin, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }

  if (!response.ok) {
    throw new Error("Invalid email or password!");
  }

  return response.json();
}

export default LoginUser;
