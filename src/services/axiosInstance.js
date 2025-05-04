import { API_BASE_URL } from "../constants/constants.js";
import axios from "axios";

export const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 6000
  });