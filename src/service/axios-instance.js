import axios from "axios";
import { API_BASE } from "../constans/constans";

export let instance = axios.create({
    baseURL : API_BASE,
    timeout : 3000,
    
})