import { PURCHASE_BASE_PATH } from "./api-base-paths";
import axios from "axios";

export const getpomaster = (page, pageSize) => {
  console.log(page, pageSize);
  return axios.get(`${PURCHASE_BASE_PATH}/getpomaster`, {
    params: {
      page,
      pageSize,
    },
  });
};

export const getpomasterWithSearch = (page, pageSize, search, customerId) => {
  console.log(page, pageSize, search, customerId);
  return axios.get(`${PURCHASE_BASE_PATH}/getpomasterWithSearch`, {
    params: {
      page,
      pageSize,
      search,
      customerId,
    },
  });
};

export const addPurchaseOrder = (data) => {
  console.log("hiii", data);
  return axios.post(`${PURCHASE_BASE_PATH}/addPurchaseOrder`, data);
};


export const deletePoMaster = async (id) => {
  console.log(id);
  try {
 
    return await axios.delete(`${PURCHASE_BASE_PATH}/deletePoMaster/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPurchaseOrderAndDetailsbyID = async (id) => {
  console.log(id); 
  try {
 
    return await axios.get(`${PURCHASE_BASE_PATH}/getPurchaseOrderAndDetails/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const upsertPurchaseOrder = async (data) => {

  try {
 
    return await axios.put(`${PURCHASE_BASE_PATH}/upsertPurchaseOrder`,data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

