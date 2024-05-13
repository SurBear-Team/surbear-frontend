import axios, { AxiosInstance } from "axios";

const config = {
  backend: {
    baseURL: "https://bizapi.giftishow.com/bizApi",
  },
};

const server = config.backend.baseURL;

const giftishow: AxiosInstance = axios.create({
  baseURL: server,
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export default giftishow;
