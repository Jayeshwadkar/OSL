import { BRANCH_BASE_PATH } from "./api-base-paths";
import axios from "axios";


export const SelectBranch = () => {
    return axios.get(`${BRANCH_BASE_PATH}/SelectBranch`);
};

