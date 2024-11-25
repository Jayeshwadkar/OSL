import { CUSTOMER_BASE_PATH } from "./api-base-paths";
import axios from "axios";


export const SelectCustomers = () => {
    return axios.get(`${CUSTOMER_BASE_PATH}/getAllCustomers`);
};


export const SelectPoCustomers = () => {
    return axios.get(`${CUSTOMER_BASE_PATH}/getPoCustomers`);
};


export const getpoCustomerById = (branch, customer_id) => {
    return axios.get(`${CUSTOMER_BASE_PATH}/getpoCustomerById`, {
        params: { branch, customer_id }
    });
};


export const getPOByCustomer = (customer_id) => {
    return axios.get(`${CUSTOMER_BASE_PATH}/getPOByCustomer`, {
        params: {customer_id }
    });
};





