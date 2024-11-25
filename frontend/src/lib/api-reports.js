import { REPORTS_BASE_PATH} from "./api-base-paths";
import axios from "axios";


export const getmisreports = (fromDate, toDate, branchId, customerId,page,pageSize,) => {
    return axios.get(`${REPORTS_BASE_PATH}/getmisreport`, {
      params: {
        fromDate,
        toDate,
        branchId,
        customerId,
        page,
        pageSize,
      },
    });
  };

  export const getstockreport = (fromDate, toDate, branchId, customerId,page, pageSize,) => {
    return axios.get(`${REPORTS_BASE_PATH}/getstockreport`, {
      params: {
        fromDate,
        toDate,
        branchId,
        customerId,
        page,
        pageSize,
      },
    });
  };

  export const getConsignmentReports = (fromDate, toDate, branchId, customerId,page, pageSize,) => {
    return axios.get(`${REPORTS_BASE_PATH}/getConsignmentReports`, {
      params: {
        fromDate,
        toDate,
        branchId,
        customerId,
        page,
        pageSize,
      },
    });
  };


  export const getDeliverchallanReport = (fromDate, toDate, branchId, vehicleId,page, pageSize) => {
    console.log(fromDate, toDate, branchId, vehicleId,page, pageSize)
    return axios.get(`${REPORTS_BASE_PATH}/getDeliverchallanReport`, {
      params: {
        fromDate,
        toDate,
        branchId,
        vehicleId,
        page,
        pageSize,
      },
    });
  };

  export const getunlodingreport = (fromDate, toDate, branchId, vehicleId,customer_id, memoid,page, pageSize) => {
    console.log(fromDate, toDate, branchId, vehicleId,customer_id,page, pageSize)
    return axios.get(`${REPORTS_BASE_PATH}/getunlodingreport`, {
      params: {
        fromDate,
        toDate,
        branchId,
        vehicleId,
        customer_id,
        memoid,
        page,
        pageSize,
      },
    });
  };


  export const getTransportbillreport = (fromDate, toDate, branchId, vehicleId,owner_id,page, pageSize) => {
    console.log(fromDate, toDate, branchId, vehicleId,owner_id,page, pageSize)
    return axios.get(`${REPORTS_BASE_PATH}/getTransportbillreport`, {
      params: {
        fromDate,
        toDate,
        branchId,
        vehicleId,
        owner_id,
        page,
        pageSize,
      },
    });
  };


  export const getPODReceiptReport = (fromDate, toDate, branchId,Customer_id,page, pageSize) => {
    console.log(fromDate, toDate, branchId,Customer_id,page, pageSize)
    return axios.get(`${REPORTS_BASE_PATH}/getPODReceiptReport`, {
      params: {
        fromDate,
        toDate,
        branchId,
        Customer_id,
        page,
        pageSize,
      },
    });
  };


  export const getUploadReport = (fromDate, toDate, branchId,Customer_id,page, pageSize) => {
    console.log(fromDate, toDate, branchId,Customer_id,page, pageSize)
    return axios.get(`${REPORTS_BASE_PATH}/getUploadReport`, {
      params: {
        fromDate,
        toDate,
        branchId,
        Customer_id,
        page,
        pageSize,
      },
    });
  };