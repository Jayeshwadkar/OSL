import { LRBILLRECEIPT_BASE_PATH } from "./api-base-paths";
import axios from 'axios';




export const getLrBillReports = (page, pageSize,branchId) => {
    console.log(page, pageSize);
    return axios.get(`${LRBILLRECEIPT_BASE_PATH}/getLrBillReports`, {
      params: {
        page,
        pageSize,
        branchId
      },
    });
  };



  export const deleteLrBillReports = async (id) => {
    console.log(id);
    try {
   
      return await axios.delete(`${LRBILLRECEIPT_BASE_PATH}/deleteLrBillReports/${id}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };


  export const getLrNumberPodReceipts = (branchId) => {
console.log(branchId)
    return axios.get(`${LRBILLRECEIPT_BASE_PATH}/getLrNumberPodReceipts`, {
      params: {
        branchId
      },
    });
  };



  export const addLrBillReport = (data) => {
    console.log("hiii", data);
    return axios.post(`${LRBILLRECEIPT_BASE_PATH}/addLrBillReport`, data);
  };
  
