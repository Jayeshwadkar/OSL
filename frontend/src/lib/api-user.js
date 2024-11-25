import { USERS_BASE_PATH } from "./api-base-paths";
import axios from "axios";


export const getBranchesData = () => {
    try {
        return axios.get(`${USERS_BASE_PATH}/getbranches`)
    } catch (error) {
        console.log("Error fetching branch list", error);
        throw error
    }
}

export const getUserList = (branchid) => {
    try {
        return axios.get(`${USERS_BASE_PATH}/getuserlist/${branchid}`)
    } catch (error) {
        console.log("Error fetching branch list", error);
        throw error
    }
}

export const getEmployeeList = (branchid) => {
    try {
        return axios.get(`${USERS_BASE_PATH}/getemployee/${branchid}`)
    } catch (error) {
        console.log("Error fetching employee list", error);
        throw error
    }
}

export const RegisterUser = (userData) => {
    try {
        return axios.post(`${USERS_BASE_PATH}/registeruser`, userData)
    } catch (error) {
        console.log("Error while user regstration", error);
        throw error
    }
}

export const getUserDetails = (username) => {
    try {
        return axios.get(`${USERS_BASE_PATH}/getuserdetails/${username}`)
    } catch (error) {
        console.log("Error fetching user details", error);
        throw error
    }
}

export const updateUserDetails = (userData) => {
    try {
        return axios.post(`${USERS_BASE_PATH}/updateuser`, userData)
    } catch (error) {
        console.log("Error while update user", error);
        throw error
    }
}

export const ActivateDeactivateUser = (userid) => {
    try {
        return axios.get(`${USERS_BASE_PATH}/activateuser/${userid}`)
    } catch (error) {
        console.log("Error fetching user id", error);
        throw error
    }
}

export const DeleteUser = (userid) => {
    try {
        return axios.get(`${USERS_BASE_PATH}/deleteuser/${userid}`)
    } catch (error) {
        console.log("Error fetching user id", error);
        throw error
    }
}

// For user permissions
export const getUserPermissions = (userid) => {
    try {
        return axios.get(`${USERS_BASE_PATH}/getUserpermissions/${userid}`)
    } catch (error) {
        console.log("Error fetching user permissions by id", error);
        throw error
    }
}

export const updateUserPermission = (data) => {
    try {
        return axios.post(`${USERS_BASE_PATH}/updateUserpermissions`, data)
    } catch (error) {
        console.log("Error while update user permissions", error);
        throw error
    }
}