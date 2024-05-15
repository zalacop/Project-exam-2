import holidazeUrls from "../../../../utils/url";

async function RegisterUser(registerObject) {
  try {
    const userRegisterData = {
      name: registerObject.name,
      email: registerObject.email,
      password: registerObject.password,
      venueManager: registerObject.venueManager || false,
    };

    const response = await fetch(holidazeUrls.urlRegister, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRegisterData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const responseBody = await response.json();
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    throw new Error("Something went wrong!");
  }
}

export default RegisterUser;
