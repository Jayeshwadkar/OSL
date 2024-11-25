import { VEHICLE_BASE_PATH, VEHICLE_OWNER_BASE_PATH } from "./api-base-paths";
import axios from "axios";



export const Selectvehicle = () => {
    return axios.get(`${VEHICLE_BASE_PATH}/getallVehicle`);
};

export const Selectvehicleowner = () => {
    return axios.get(`${VEHICLE_OWNER_BASE_PATH}/getallVehicleOwener`);
};

export const getVehicleTypes = (branch) => {
    console.log(branch)
    return axios.get(`${VEHICLE_BASE_PATH}/getVehicleTypes`, {
        params: { branch}
    });
};


