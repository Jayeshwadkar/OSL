import { SALESINVOICE1_BASE_PATH} from "./api-base-paths";
import axios from "axios";



export const getSalesInvoiceMasterList = (page, pageSize, search, branchid) => {
    console.log(page, pageSize, search, branchid);
    return axios.get(`${SALESINVOICE1_BASE_PATH}/getSalesInvoiceMasterList`, {
      params: {
        page,
        pageSize,
        search,
        branchid,
      },
    });
  };


  export const deleteSalesInvoice = async (id) => {
    console.log(id);
    try {
   
      return await axios.delete(`${SALESINVOICE1_BASE_PATH}/deleteSalesInvoice/${id}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };


  
export const getLorryReceiptList = (pocustomerId,branchid,locpocustomerId) => {
  console.log(branchid,pocustomerId,locpocustomerId);
  return axios.get(`${SALESINVOICE1_BASE_PATH}/getLorryReceiptList`, {
    params: {
      pocustomerId,branchid,locpocustomerId
    },
  });
};

export const getGSTNumberAndState = (gstid) => {
  console.log(gstid);
  return axios.get(`${SALESINVOICE1_BASE_PATH}/getGSTNumberAndState`, {
    params: {
      gstid
    },
  });
};


export const getPODetailsByPOID = (poid) => {
  console.log(poid);
  return axios.get(`${SALESINVOICE1_BASE_PATH}/getPODetailsByPOID`, {
    params: {
      poid
    },
  });
};

export const getLorryReceiptById = (lrid) => {
  console.log(lrid);
  return axios.get(`${SALESINVOICE1_BASE_PATH}/getLorryReceiptById`, {
    params: {
      lrid
    },
  });
};


export const addSaleInvoice = (data) => {
  console.log("hiii", data);
  return axios.post(`${SALESINVOICE1_BASE_PATH}/addSaleInvoice`, data);
};



export const getSalesInvoiceMasterById = (id) => {
  console.log(id);
  return axios.get(`${SALESINVOICE1_BASE_PATH}/getSalesInvoiceMasterById`, {
    params: {
      id
    },
  });
};


export const updateSaleInvoice = async (data) => {
  try {
    return await axios.put(`${SALESINVOICE1_BASE_PATH}/updateSaleInvoice`,data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getlrbylridandinvid = (lrid,invoiceid) => {
  return axios.get(`${SALESINVOICE1_BASE_PATH}/getlrbylridandinvid`, {
    params: {
      lrid,invoiceid
    },
  });
};


