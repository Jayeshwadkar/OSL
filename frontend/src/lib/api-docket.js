import { DOCKET_BASE_PATH } from "./api-base-paths";
import axios from 'axios';






export const getFilesCount = () => {
  try {
    return axios.get(`${DOCKET_BASE_PATH}/get-receipt-count`);
  } catch (error) {
    console.error('Error fetching Files Count', error);
    throw error;
  }
};



export const updateDocketNumber = () => {
  try {
    return axios.get(`${DOCKET_BASE_PATH}/process-files`);
  } catch (error) {
    console.error('Error updating Docket Number', error);
    throw error;
  }
};