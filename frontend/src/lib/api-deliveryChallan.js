import { DC_BASE_PATH } from "./api-base-paths";
import axios from 'axios';


export const getInwardLrData = (controller) => {
    try {
      return axios.get(`${DC_BASE_PATH}/inwardlrdata`, {
        signal: controller?.signal
      });
    } catch (error) {
      console.error('Error fetching lr', error);
      throw error;
    }
  };




  export const getLrForDcUpdate = (id) => {
    try {
      return axios.get(`${DC_BASE_PATH}/getlrfordcupdate/${id}`);
    } catch (error) {
      console.error('Error fetching lr', error);
      throw error;
    }
  };



  export const getVehicleList = () => {
    try {
      return axios.get(`${DC_BASE_PATH}/vehiclelist`);
    } catch (error) {
      console.error('Error fetching Vehicle List', error);
      throw error;
    }
  };



  export const getDriversByBranchCode = (id) => {
    try {
      return axios.get(`${DC_BASE_PATH}/drivershortlist/${id}`);
    } catch (error) {
      console.error('Error fetching Driver List', error);
      throw error;
    }
  };


  export const getDcTableData = (id,data) => {
    try {
      return axios.put(`${DC_BASE_PATH}/dctabledata/${id}`,data);
    } catch (error) {
      console.error('Error fetching Driver List', error);
      throw error;
    }
  };