import axios from "axios";
import { LR_BASE_PATH } from "./api-base-paths";


export const getallmasterforlr = () => {
    return axios.get(`${LR_BASE_PATH}/getallmasterforlr`);
};
export const Addlr = (data) => {
    console.log("data",data)
    return axios.post(`${LR_BASE_PATH}/addlrmaster`, data);
};

