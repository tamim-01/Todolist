import config from "../config/index.js";

export async function signinApi(data) {
  try {
    const response = await fetch(`${config.apiBaseUrl}/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const dataFromApi = await response.json();

    if (response.ok) {
      console.log("Sign in success");
    } else {
      return dataFromApi.message;
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function signupApi(data) {
  try {
    const response = await fetch(`${config.apiBaseUrl}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const dataFromApi = await response.json();

    if (response.ok) {
      console.log("Sign up success");
    } else {
      return dataFromApi.message;
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function updateUserDataApi(data) {
  try {
    const response = await fetch(`${config.apiBaseUrl}/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const dataFromApi = await response.json();

    if (response.ok) {
      console.log("User data updated successfully");
    } else {
      return dataFromApi.message;
    }
  } catch (error) {
    console.log("Error:", error);
  }
}
