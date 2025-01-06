import axios from "axios";

const API_URL = process.env.REACT_APP_SPOTIFY_API_URL;
const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
});

export const apiRequest = async ({ url, data, method, authFlow }) => {
  try {
    let accessToken = "";
    if (authFlow) {
      const tokenResponse = await axios.get(`${BACKEND_API_URL}/auth/token`);
      accessToken = tokenResponse.data.access_token;
    } else {
      const tokenResponse = await axios.get(`${BACKEND_API_URL}/token`);
      accessToken = tokenResponse.data.access_token;
    }

    console.log(accessToken);
    const result = await API(url, {
      method: method || "GET",
      data: data,
      headers: {
        "content-type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    });

    return result?.data;
  } catch (error) {
    const err = error.response.data;
    return { status: err.success, message: err.message };
  }
};
