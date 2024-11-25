import { MASTERS_BASE_PATH } from "./api-base-paths";
import axios from "axios";


// For Article
export const getArticleList = (id,page,pageSize,search) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/articlelist/${id}`,
            {
                params: {
                  page,
                  pageSize,
                  search
                },
              }
        )
    } catch (error) {
        console.log("Error fetching article list", error);
        throw error
    }
}
export const getallArticleList = () => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getallArticleList`
        )
    } catch (error) {
        console.log("Error fetching article list", error);
        throw error
    }
}

export const addArticle = async (articleName) => {
    try {
        return await axios.post(`${MASTERS_BASE_PATH}/addarticle`, { ...articleName })
    } catch (error) {
        console.log("Error in add article", error);
        throw error
    }
}

export const deleteArticle = async (id) => {
    try {
        return await axios.post(`${MASTERS_BASE_PATH}/deletearticle`, id)
    } catch (error) {
        console.log("Error in delete article", error);
        throw error
    }
}

export const findArticleById = async (id) => {
    try {
        return await axios.get(`${MASTERS_BASE_PATH}/findarticlebyid/${id}`)
    } catch (error) {
        console.log("Error in edit article", error);
        throw error
    }
}

export const updateArticle = async (updateData) => {
    try {
        return await axios.post(`${MASTERS_BASE_PATH}/updatearticle`, { ...updateData })
    } catch (error) {
        console.log("Error in update article", error);
        throw error
    }
}

// For Places

export const getAllPlacesList = () => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getAllPlacesList`
            
        )
    } catch (error) {
        console.log("Error fetching place list", error);
        throw error
    }
}
export const getPlacesList = (page,pageSize,search) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/placelist`,
            {
                params: {
                  page,
                  pageSize,
                  search
                },
              }
        )
    } catch (error) {
        console.log("Error fetching place list", error);
        throw error
    }
}

export const getCustomersList = () => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getcustomers`)
    } catch (error) {
        console.log("Error fetching customer list", error);
        throw error
    }
}

export const addPlaces = (placedata) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/addplaces`, { ...placedata })
    } catch (error) {
        console.log("Error adding places data", error);
        throw error
    }
}

export const deletePlace = (placeid) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/deleteplace`, placeid)
    } catch (error) {
        console.log("Error adding places data", error);
        throw error
    }
}

export const findPlaceById = (placeid) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/findplacebyid/${placeid}`)
    } catch (error) {
        console.log("Error adding places data", error);
        throw error
    }
}

export const updatePlace = (placedata) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/updateplace`, { ...placedata })
    } catch (error) {
        console.log("Error updating places data", error);
        throw error
    }
}

// For Branches

export const getAllBranchesList = () => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getAllBranchesList`
            
        )
    } catch (error) {
        console.log("Error fetching place list", error);
        throw error
    }
}
export const getBranchesList = (page,pageSize,search) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/brancheslist`,{
            params: {
                page,
                pageSize,
                search
              },
        })
    } catch (error) {
        console.log("Error fetching branch data", error);
        throw error
    }
}

export const addBranch = (branchdata) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/addbranch`, { ...branchdata })
    } catch (error) {
        console.log("Error while add branch data", error);
        throw error
    }
}

export const findBranchById = (branchid) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/findbranchbyid/${branchid}`)
    } catch (error) {
        console.log("Error fetching branch data by id", error);
        throw error
    }
}

export const updateBranch = (branchdata) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/updatebranch`, { ...branchdata })
    } catch (error) {
        console.log("Error while update branch data", error);
        throw error
    }
}

export const deleteBranch = (branchid) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/deletebranch`, branchid)
    } catch (error) {
        console.log("Error while update branch data", error);
        throw error
    }
}

// For Customers

export const getCustomerListByPage = (page,pageSize,search) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/customerlistbypage`,{
            params: {
                page,
                pageSize,
                search
              },
        })
    } catch (error) {
        console.log("Error fetching customer list by page", error);
        throw error
    }
}
export const getCustomerListBySerach = (page,pageSize,search) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getCustomerListBySerach`,{
            params: {
                page,
                pageSize,
                search
              },
        })
    } catch (error) {
        console.log("Error fetching customer list by page", error);
        throw error
    }
}

export const getAllCustomerList = () => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getAllCustomerList`)
    } catch (error) {
        console.log("Error fetching customer list by page", error);
        throw error
    }
}

export const getCustomerById = (custid) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/findcustomerbyid/${custid}`)
    } catch (error) {
        console.log("Error fetching customer by Id", error);
        throw error
    }
}

export const addCustomer = (custData) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/addcustomer`, custData)
    } catch (error) {
        console.log("Error while add driver data", error);
        throw error
    }
}

export const updateCustomer = (custData) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/updatecustomer`, custData)
    } catch (error) {
        console.log("Error while update customer data", error);
        throw error
    }
}

export const deleteCustomer = (id) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/deletecustomer`, id)
    } catch (error) {
        console.log("Error while delete customer data", error);
        throw error
    }
}


// For drivers

export const getDriversList = (page,pageSize,search) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/driverlist`,{
            params: {
                page,
                pageSize,
                search
              },
        })
    } catch (error) {
        console.log("Error fetching driver list", error);
        throw error
    }
}
export const getAllDriversserach = (page,pageSize,search) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getAllDriversserach`,{
            params: {
                page,
                pageSize,
                search
              },
        })
    } catch (error) {
        console.log("Error fetching driver list", error);
        throw error
    }
}
export const getAllDrivers = () => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getAllDrivers`
        )
    } catch (error) {
        console.log("Error fetching driver list", error);
        throw error
    }
}
export const getDriverById = (driverid) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/driverlist/${driverid}`)
    } catch (error) {
        console.log("Error fetching driver by Id", error);
        throw error
    }
}

export const addDriver = (driverData) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/adddriver`, { ...driverData })
    } catch (error) {
        console.log("Error while add driver data", error);
        throw error
    }
}

export const updateDriver = (driverData) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/updatedriver`, { ...driverData })
    } catch (error) {
        console.log("Error while update driver data", error);
        throw error
    }
}

export const deleteDriver = (id) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/deletedriver`, id)
    } catch (error) {
        console.log("Error while delete driver data", error);
        throw error
    }
}


// for employee
export const getEmployeeList = (page,pageSize,search) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/employeelist`,{
            params: {
                page,
                pageSize,
                search
              },
        })
    } catch (error) {
        console.log("Error fetching employee data", error);
        throw error
    }
}
export const getAllEmployeeList = () => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getAllEmployeeList`)
    } catch (error) {
        console.log("Error fetching employee data", error);
        throw error
    }
}
export const getEmployeeById = (id) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/employeelist/${id}`)
    } catch (error) {
        console.log("Error fetching employee by id data", error);
        throw error
    }
}

export const addEmployee = (empData) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/addemployee`, { ...empData })
    } catch (error) {
        console.log("Error while add employee data", error);
        throw error
    }
}

export const updateEmployee = (empData) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/updateemployee`, { ...empData })
    } catch (error) {
        console.log("Error while update employee data", error);
        throw error
    }
}

export const deleteEmployee = (id) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/deleteemployee`, { id })
    } catch (error) {
        console.log("Error while delete employee data", error);
        throw error
    }
}

// For vehicle

export const getVehicleList = (page,pageSize,search) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getVehiclelist`,{
            params: {
                page,
                pageSize,
                search
              },
        })
    } catch (error) {
        console.log("Error while get vehicle data", error);
        throw error
    }
}

export const getTransporterData = () => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getTransporterlist`)
    } catch (error) {
        console.log("Error while get transporter data", error);
        throw error
    }
}
export const getAllVehicleserach = (page,pageSize,search) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getAllVehicleserach`,{
            params: {
                page,
                pageSize,
                search
              },
        })
    } catch (error) {
        console.log("Error while get transporter data", error);
        throw error
    }
}
export const getALLVehicleList = (search) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getALLVehicleList`)
    } catch (error) {
        console.log("Error while get transporter data", error);
        throw error
    }
}

export const getVehicleById = (vehicleid) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getVehicleDataById/${vehicleid}`)
    } catch (error) {
        console.log("Error while get vehicle data by id", error);
        throw error
    }
}

export const addvehicle = (vdata) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/addvehicle`, { vdata })
    } catch (error) {
        console.log("Error while add vehicle data", error);
        throw error
    }
}

export const updateVehicle = (vdata) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/updatevehicle`, { vdata })
    } catch (error) {
        console.log("Error while add vehicle data", error);
        throw error
    }
}

export const deleteVehicle = (id) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/deletevehicle`, id)
    } catch (error) {
        console.log("Error while delete vehicle data", error);
        throw error
    }
}

// For transporter

export const getTransporterList = (page,pageSize,search) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/transporterlist`,{
            params: {
                page,
                pageSize,
                search
              },
        })
    } catch (error) {
        console.log("Error fetching transporter data", error);
        throw error
    }
}

export const getAllTransporterList = () => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getAllTransporterList`)
    } catch (error) {
        console.log("Error fetching transporter data", error);
        throw error
    }
}

export const findTransporterById = (transpid) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/findtransporterbyid/${transpid}`)
    } catch (error) {
        console.log("Error fetching transporter by id data", error);
        throw error
    }
}

export const addTransporter = (tdata) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/addtransporter`, tdata)
    } catch (error) {
        console.log("Error while add transporter data", error);
        throw error
    }
}

export const updateTransporter = (tdata) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/updatetransporter`, tdata)
    } catch (error) {
        console.log("Error while update transporter data", error);
        throw error
    }
}

export const deleteTransporter = (id) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/deletetransporter`, id)
    } catch (error) {
        console.log("Error while delete transporter data", error);
        throw error
    }
}



// For vehicle type
export const getVehicleTypeList = (page,pageSize,search) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/vehicletypelist`,{
            params: {
                page,
                pageSize,
                search
              },
        })
    } catch (error) {
        console.log("Error fetching branch data", error);
        throw error
    }
}
export const getAllVehicleTypeList = () => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getAllVehicleTypeList`)
    } catch (error) {
        console.log("Error fetching branch data", error);
        throw error
    }
}

export const addvehicletype = (vtdata) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/addvehicletype`, vtdata)
    } catch (error) {
        console.log("Error while add vehicle type data", error);
        throw error
    }
}

export const findVehicleTypeById = (vtid) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/findvehicletypebyid/${vtid}`)
    } catch (error) {
        console.log("Error fetching vehicle type by id data", error);
        throw error
    }
}

export const updateVehicleType = (vtdata) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/updatevehicletype`, vtdata)
    } catch (error) {
        console.log("Error while update vehicle type data", error);
        throw error
    }
}

export const deleteVehicleType = (id) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/deletevehicletype`, id)
    } catch (error) {
        console.log("Error while delete vehicle type data", error);
        throw error
    }
}


// For PO Customer

export const getPoCustomersList = (page,pageSize,search) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getpocustomerslist`,{
            params: {
                page,
                pageSize,
                search
              },
        })
    } catch (error) {
        console.log("Error fetching po customer data", error);
        throw error
    }
}
export const getPoCustomerListBySerach = (page,pageSize,search) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getPoCustomerListBySerach`,{
            params: {
                page,
                pageSize,
                search
              },
        })
    } catch (error) {
        console.log("Error fetching po customer data", error);
        throw error
    }
}
export const getAllPoCustomerList = () => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getAllPoCustomerList`)
    } catch (error) {
        console.log("Error fetching po customer data", error);
        throw error
    }
}

export const addPoCustomer = (pocustData) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/addpocustomer`, pocustData)
    } catch (error) {
        console.log("Error while add po customer data", error);
        throw error
    }
}

export const findPoCustomerById = (pocustid) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/findpocustomerbyid/${pocustid}`)
    } catch (error) {
        console.log("Error fetching po customer by id data", error);
        throw error
    }
}

export const updatePoCustomer = (pocustData) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/updatepocustomer`, pocustData)
    } catch (error) {
        console.log("Error while update po customer data", error);
        throw error
    }
}

export const deletePoCustomer = (id) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/deletepocustomer`, id)
    } catch (error) {
        console.log("Error while delete po customer data", error);
        throw error
    }
}


// For Part No

export const getPartNoList = (page,pageSize,search) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getpartnolist`,{
            params: {
                page,
                pageSize,
                search
              },
        })
    } catch (error) {
        console.log("Error fetching part no data", error);
        throw error
    }
}

export const getPartNoListBySerach = (page,pageSize,search) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getPartNoListBySerach`,{
            params: {
                page,
                pageSize,
                search
              }, 
        })
    } catch (error) {
        console.log("Error fetching part no data", error);
        throw error
    }
}
export const getAllPartNoList = () => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getAllPartNoList`)
    } catch (error) {
        console.log("Error fetching part no data", error);
        throw error
    }
}

export const addPartNo = (partnoData) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/addpartno`, partnoData)
    } catch (error) {
        console.log("Error while add gst master data", error);
        throw error
    }
}

export const findPartNoById = (partnoid) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/findpartnobyid/${partnoid}`)
    } catch (error) {
        console.log("Error fetching part no by id data", error);
        throw error
    }
}

export const updatePartNo = (partnoData) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/updatepartno`, partnoData)
    } catch (error) {
        console.log("Error while update gst master data", error);
        throw error
    }
}

export const deletePartNo = (id) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/deletepartno`, id)
    } catch (error) {
        console.log("Error while delete part no data", error);
        throw error
    }
}


// For GST master

export const getGSTmasterList = (page,pageSize,search) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getgstmasterlist`,{
            params: {
                page,
                pageSize,
                search
              },
        })
    } catch (error) {
        console.log("Error fetching gst master data", error);
        throw error
    }
}

export const getAllgstmaster = () => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getAllgstmaster`)
    } catch (error) {
        console.log("Error fetching gst master data", error);
        throw error
    }
}

export const addGSTmaster = (gstData) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/addgstmaster`, gstData)
    } catch (error) {
        console.log("Error while add gst master data", error);
        throw error
    }
}

export const findGSTmasterbyid = (gstmid) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/findgstmasterbyid/${gstmid}`)
    } catch (error) {
        console.log("Error fetching gst master by id data", error);
        throw error
    }
}

export const updateGSTmaster = (gstData) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/updategstmaster`, gstData)
    } catch (error) {
        console.log("Error while update gst master data", error);
        throw error
    }
}

export const deleteGSTmaster = (id) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/deletegstmaster`, id)
    } catch (error) {
        console.log("Error while delete gst master data", error);
        throw error
    }
}

// For TDS master

export const getTDSmasterList = (page,pageSize,search) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/gettdsmasterlist`,{
            params: {
                page,
                pageSize,
                search
              },
        })
    } catch (error) {
        console.log("Error fetching tds master data", error);
        throw error
    }
}

export const getAllTDSmasterList = () => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/getAllTDSmasterList`)
    } catch (error) {
        console.log("Error fetching tds master data", error);
        throw error
    }
}

export const addTDSmaster = (tdsData) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/addtdsmaster`, { tdsData })
    } catch (error) {
        console.log("Error while add tds master data", error);
        throw error
    }
}

export const findTDSmasterbyid = (tdsmid) => {
    try {
        return axios.get(`${MASTERS_BASE_PATH}/findtdsmasterbyid/${tdsmid}`)
    } catch (error) {
        console.log("Error fetching tds master by id data", error);
        throw error
    }
}

export const updateTDSmaster = (tdsData) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/updatetdsmaster`, { tdsData })
    } catch (error) {
        console.log("Error while update tds master data", error);
        throw error
    }
}

export const deleteTDSmaster = (id) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/deletetdsmaster`, id)
    } catch (error) {
        console.log("Error while delete tds master data", error);
        throw error
    }
}

// For update flag status

export const updateFlagStatus = (data) => {
    try {
        return axios.post(`${MASTERS_BASE_PATH}/updateflagstatus`, data)
    } catch (error) {
        console.log("Error while update flag status", error);
        throw error
    }
}


