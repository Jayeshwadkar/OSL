import axios from "axios";
import { COMMON_BASE_PATH } from "./api-base-paths";


export const getAllStates = () => {
    return axios.get(`${COMMON_BASE_PATH}/getAllStates`);
};


export const getAutoIncrementValue = () => {
    return axios.get(`${COMMON_BASE_PATH}/getAutoIncrementValue`);
};

export const getGstDataByStateCode = (stateCode) => {
    return axios.get(`${COMMON_BASE_PATH}/getGstDataByStateCode`, { params: { stateCode } });
};

export const getGstNos = () => {
    return axios.get(`${COMMON_BASE_PATH}/getGstNos`);
};

