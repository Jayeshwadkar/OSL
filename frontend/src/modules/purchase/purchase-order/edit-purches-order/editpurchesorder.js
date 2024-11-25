import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import FormLabel from "@mui/material/FormLabel";
import { DataGrid } from "@mui/x-data-grid";

import { makeStyles } from "@mui/styles";
import { styled } from "@mui/styles";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import { SelectBranch } from "../../../../lib/api-branch";
import { SelectCustomers, SelectPoCustomers, getpoCustomerById } from "../../../../lib/api-customer";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";
import { getVehicleTypes } from "../../../../lib/api-vehicle";
import { getAllStates, getAutoIncrementValue, getGstDataByStateCode } from "../../../../lib/api-Common";
import { getPurchaseOrderAndDetailsbyID, upsertPurchaseOrder } from "../../../../lib/api-purchase";
import CustomSnackbar from "../../../../components/ui/SnackbarComponent";
import { useNavigate, useParams } from 'react-router-dom';

const useStyles = makeStyles({
  blueHeader: {
    backgroundColor: "#004aad",
    color: "white",
  },
});
const ResizableTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    resize: "both",
    overflow: "auto",
  },
});
function EditPurchaseOrderReceipt() {
  const classes = useStyles();
  const [branchOptions, setBranchOptions] = useState([]);
  const [pocustomerOptions, setPoCustomerOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedpoCustomer, setSelectedPoCustomer] = useState(null);
  const [poDate, setPODate] = useState(dayjs());
  const [formData, setFormData] = useState({
    address: '',
    VendorCode: '',
    State: '',
    StateCode: '',
    CustomerGstNo: '',
    PAN: '',
    CINNo: '',
    SrNo: '',
    poNo: ''
  });
  const [billingFormData, setBillingFormData] = useState({
    billingAddress: '',
    BillingState: '',
    BillingStateCode: '',
    BillingGSTNO: '',
    BillingPAN: '',
    BillingCINNo: '',
    BillingVendorCode: '',
    creditperiod: '',
    RefNo: ''
  });
  const [transactionformData, setTransactionFormData] = useState({
    PO_Line_No: '',
    PartLoadRate: 0,
    FTLRate: 0,
    BoxBinRate: 0,
    PartNo: '',
    PartDesc: '',
    CFTwt: 0,
    CollCharTrip: 0,
    DelChargTrip: 0,
    PartLoadTT: 0,
    FTLTT: 0,
    LRCharge: 0,
    LoadingCharge: 0,
    UnloadingCharge: 0,
    WRCharge: 0,
    WHAreasqft: 0,
    Ratesqft: 0,
    ForkliftCharge: 0,
    Damragecharge: 0,
    Delaycharg: 0,
    OverHead: 0,
    OtherCharges1: 0,
    OtherCharges2: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [transactionsDetails, setTransactionsDetails] = useState([]);
  const [checkboxState, setCheckboxState] = useState(false);
  const [CustomerGSTDate, setCustomerGSTDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [vehicleTypeOptions, setVehicleTypeOptions] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [fromselectedCustomer, setFromSelectedCustomer] = useState(null);
  const [toselectedCustomer, setToSelectedCustomer] = useState(null);
  const [uomselectedOption, setUomSelectedOption] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [gstData, setGstData] = useState(null);
  const [selectedGstData, setSelectedGstData] = useState(null);
  const [poStartDate, setPOStartDate] = useState(null);
  const [poEndDate, setPOEndDate] = useState(null);
  const [permissionToExtendDate, setPermissionToExtendDate] = useState("No");
  const [unspecifiedPersonName, setUnspecifiedPersonName] = useState('');
  const [RefDate, setRefDate] = useState(null);
  const [billingGstDate, setBillingGstDate] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('green');
  const navigate = useNavigate();
  const { id } = useParams();

  const label = {
    inputProps: { "aria-label": "Billing Customer Details As Above" },
  };
  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      const response = await getPurchaseOrderAndDetailsbyID(id);
      const poMaster = response.data.purchaseOrder;
      const poDetails = response.data.details;
      if (poMaster) {
        setFormData(prevState => ({
          ...prevState,
          poNo: poMaster.po_no,
          SrNo: poMaster.sr_no,
          address: poMaster.billing_address,
          VendorCode: poMaster.vendorcode,
          State: poMaster.bgstate,
          StateCode: poMaster.bgstatecode,
          CustomerGstNo: poMaster.bggstno,
          PAN: poMaster.bgpan,
          CINNo: poMaster.bgcin
        }));
        setPODate(dayjs(poMaster.po_date));
        setPOStartDate(dayjs(poMaster.agr_start_date));
        setPOEndDate(dayjs(poMaster.agr_end_date));
        setPermissionToExtendDate(poMaster.extend_permission === '1' ? 'Yes' : 'No');
        setUnspecifiedPersonName(poMaster.entry_person_name);

        const selectedCustomer = pocustomerOptions.find(customer => customer.customer_id === poMaster.customer_id);
        setSelectedPoCustomer(selectedCustomer || null);

        // Set checkbox state and billingFormData
        const isChecked = poMaster.billing_address_flag === '1';
        setCheckboxState(isChecked);
        if (isChecked) {
          setBillingFormData({
            billingAddress: poMaster.billing_address,
            BillingState: poMaster.bgstate,
            BillingStateCode: poMaster.bgstatecode,
            BillingGSTNO: poMaster.bggstno,
            BillingPAN: poMaster.bgpan,
            BillingCINNo: poMaster.bgcin,
            BillingVendorCode: poMaster.vendorcode,
            RefNo: poMaster.refno,
            creditperiod: poMaster.creditperiod,
          });
        }
        setRefDate(poMaster.refdate ? dayjs(poMaster.refdate) : null);
        setBillingGstDate(poMaster.bggstdate ? dayjs(poMaster.bggstdate) : null);
        
        setTransactionsDetails(poDetails.map(detail => ({
          id: detail.id,
          PO_Line_No: detail.po_line_no,
          PL_FTL: detail.partload_ftl,
          VehicleType: detail.vehicle_type,
          vehicle_type_id:detail.vehicle_type_id,
          FromCustomerName: detail["GET_CUSTOMER_NAME(pd.from)"],
          ToCustomerName: detail["GET_CUSTOMER_NAME(pd.to)"],
          FromCustomer: detail.from,
          ToCustomer: detail.to,
          PartLoadRate: detail.partload_rate_kg,
          FTLRate: detail.ftl_rate,
          BoxBinRate: detail.box_bin_rate,
          PartNo: detail.part_no,
          PartDesc: detail.part_description,
          UOM: detail.measurement_unit,
          CFTwt: detail.cft_wt,
          CollCharTrip: detail.collection_charges,
          DelChargTrip: detail.delivery_charges,
          PartLoadTT: detail.partload_tt,
          FTLTT: detail.ftl_tt,
          LRCharge: detail.lr_charges,
          LoadingCharge: detail.loading_charges,
          UnloadingCharge: detail.unloading_charges,
          WRCharge: detail.warehouse_rent_charges,
          WHAreasqft: detail.warehouse_area_sqft,
          Ratesqft: detail.per_sqft_rate,
          ForkliftCharge: detail.forklift_charges,
          Damragecharge: detail.damrage_charges,
          Delaycharg: detail.delay_delivery_charges,
          OverHead: detail.overhead_charges,
          OtherCharges1: detail.other_charges1,
          OtherCharges2: detail.other_charges2,
          state: detail.state,
          statecode:detail.statecode,
          gstid:detail.gstid,
          gstName: detail.gstName,
          from:detail.from,
          to:detail.to
        })));
      } else {
    
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  console.log(transactionsDetails)
  const getCheckboxValue = () => {
    return checkboxState ? 1 : 0;
  };


  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id,pocustomerOptions]);
  const fetchBranches = async () => {
    setLoading(true);
    try {
      const response = await SelectBranch();
      const { data } = response;
      const branchList = data.map((branch) => ({
        branch_id: branch.branch_id,
        branch_name: branch.branch_name,
      }));
      setBranchOptions(branchList);
    } catch (error) {
      console.error("Error fetching branches:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchpoCustomers = async () => {
    setLoading(true);
    try {
      const response = await SelectPoCustomers();
      setPoCustomerOptions(response.data);
    } catch (error) {
      console.error("Failed to fetch customer options:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllStates = async () => {
    setLoading(true);
    try {
      const response = await getAllStates();
      setStates(response.data);
    } catch (error) {
      console.error("Failed to fetch customer options:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGstDataByStateCode = async (statecode) => {
    setLoading(true);
    try {
      const response = await getGstDataByStateCode(statecode);
      const filteredData = response.data.map(item => ({
        gstName: item.gstName,
        id: item.id
      }));
      localStorage.setItem('gstData', JSON.stringify(filteredData));
      setGstData(filteredData);
    } catch (error) {
      console.error("Failed to fetch GST data:", error);
    } finally {
      setLoading(false);
    }
  };




  const fetchAutoIncrementValue = async () => {
    setLoading(true);
    try {
      const response = await getAutoIncrementValue();
      setFormData(prevState => ({
        ...prevState,
        SrNo: response.data.AUTO_INCREMENT
      }));
    } catch (error) {
      console.error("Failed to fetch auto increment value:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await SelectCustomers();
      setCustomerOptions(response.data);
    } catch (error) {
      console.error("Failed to fetch customer options:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicleType = async (branch) => {

    setLoading(true);
    try {
      const response = await getVehicleTypes(branch.branch_id);
      const filteredData = response.data.filter(vehicle =>
        vehicle.vehicle_type && vehicle.vehicle_type.trim() !== "" && vehicle.vehicle_type !== "undefined"
      );

      setVehicleTypeOptions(filteredData);
    } catch (error) {
      console.error("Failed to fetch vehicle types:", error);
    } finally {
      setLoading(false);
    }
  };




  const fetchCustomerById = async (branch, id) => {

    if (branch && id) {
      setLoading(true);
      try {
        const response = await getpoCustomerById(branch.branch_id, id);

        const customerData = response.data[0];
        const gstDate = customerData.gstDate ? dayjs(customerData.gstDate) : null;
        setFormData((prevData) => ({
          ...prevData,
          address: customerData.address || '',
          VendorCode: customerData.vendor_code || '',
          State: customerData.state || '',
          StateCode: customerData.statecode || '',
          CustomerGstNo: customerData.gstno || '',
          PAN: customerData.panno || '',
          CINNo: customerData.cinno || ''

        }));
        setCustomerGSTDate(gstDate);
      } catch (error) {
        console.error("Error fetching customer by ID:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchpoCustomers()
    fetchCustomers()
    fetchAllStates()
    fetchAutoIncrementValue()
  }, []);

  useEffect(() => {
 
    if (selectedState && selectedState.statecode) {

      fetchGstDataByStateCode(selectedState.statecode);
    }
  }, [selectedState]);


  useEffect(() => {
    if (selectedBranch) {

      fetchVehicleType(selectedBranch);
    }
  }, [selectedBranch]);


  useEffect(() => {
    if (selectedBranch && selectedpoCustomer) {
      fetchCustomerById(selectedBranch, selectedpoCustomer.customer_id);
    }
  }, [selectedBranch, selectedpoCustomer]);

  const handleDateChange = (newValue) => {
    setCustomerGSTDate(newValue);
  };

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setCheckboxState(checked);

    if (checked) {
      setBillingFormData((prevData) => ({
        ...prevData,
        billingAddress: formData.address,
        BillingState: formData.State,
        BillingStateCode: formData.StateCode,
        BillingGSTNO: formData.CustomerGstNo,
        BillingPAN: formData.PAN,
        BillingCINNo: formData.CINNo,
        BillingVendorCode: formData.VendorCode
      }));
    } else {
      setBillingFormData((prevData) => ({
        ...prevData,
        billingAddress: '',
        BillingState: '',
        BillingStateCode: '',
        BillingGSTNO: '',
        BillingPAN: '',
        BillingCINNo: '',
        BillingVendorCode: ''
      }));
    }
  };


  const columns = [
    {
      field: "id",
      headerName: "SN",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "PO_Line_No",
      headerName: "Po Line No",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "PL_FTL",
      headerName: "PL/FTL	",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "VehicleType",
      headerName: "VehicleType",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "FromCustomerName",
      headerName: "From",
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "ToCustomerName",
      headerName: "To",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "PartLoadRate",
      headerName: "PL Rate/Kg	",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "FTLRate",
      headerName: "FTL Rate	",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "BoxBinRate",
      headerName: "Box/Bin Rate	",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "PartNo",
      headerName: "PartNo	",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "PartDesc",
      headerName: "Part Desc	",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "UOM",
      headerName: "UOM",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "CFTwt",
      headerName: "CFTwt",
      flex: 1,
      headerClassName: classes.blueHeader,
      renderCell: (params) => `₹${params.row.InvAmt}`,
    },
    {
      field: "CollCharTrip",
      headerName: "CollCharg",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "DelChargTrip",
      headerName: "DelCharg	",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "PartLoadTT",
      headerName: "PL TT	",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "FTLTT",
      headerName: "FTL TT	",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "LRCharge",
      headerName: "LR Charg		",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "LoadingCharge",
      headerName: "Loading Charg	",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "UnloadingCharge",
      headerName: "UnLoading Charg	",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "WRCharge",
      headerName: "WR Charg	",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "WHAreasqft",
      headerName: "WR Area(SQFT)		",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "Ratesqft",
      headerName: "PSQ-FT Rate		",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "ForkliftCharge",
      headerName: "Damrag Charge	",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "Damragecharge",
      headerName: "FL Charge	",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "Delaycharg",
      headerName: "Delay Charg	",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "OverHead",
      headerName: "Over Head		",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "OtherCharges1",
      headerName: "Other Charge1	",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "OtherCharges2",
      headerName: "Other Charge2	",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "state",
      headerName: "State",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "gstName",
      headerName: "GST Name	",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
    },
    {
      field: "Action",
      headerName: "Action",
      sortable: false,
      flex: 1,
      headerClassName: classes.blueHeader,
      renderCell: (params) => (
        <div>
          <IconButton
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },

  ];



  const handleDelete = (id) => {
    setTransactionsDetails((prevDetails) =>
      prevDetails.filter((row) => row.id !== id)
    );
  };

  const fixedHeight = {
    height: "40%",
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const BillinghandleChange = (event) => {
    const { name, value } = event.target;
    setBillingFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const TransactionhandleChange = (event) => {
    const { name, value } = event.target;
    setTransactionFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleVehicleTypeChange = (event, newValue) => {
 
    setSelectedVehicleType(newValue || null);
  };
  
  const handleFromselectedCustomer = (event, newValue) => {

    setFromSelectedCustomer(newValue || null);
  };
  const handleToselectedCustomer = (event, newValue) => {
   
    setToSelectedCustomer(newValue || null);
  };
  const handlestate = (event, newValue) => {

    setSelectedState(newValue || null);
  };

  const handleGstData = (event, newValue) => {

    setSelectedGstData(newValue || null);
  };
  const handleEdit = (row) => {

    setTransactionFormData({
      PO_Line_No: row.PO_Line_No || '',
      PartLoadRate: row.PartLoadRate || '',
      FTLRate: row.FTLRate || '',
      BoxBinRate: row.BoxBinRate || '',
      PartNo: row.PartNo || '',
      PartDesc: row.PartDesc || '',
      CFTwt: row.CFTwt || '',
      CollCharTrip: row.CollCharTrip || '',
      DelChargTrip: row.DelChargTrip || '',
      PartLoadTT: row.PartLoadTT || '',
      FTLTT: row.FTLTT || '',
      LRCharge: row.LRCharge || '',
      LoadingCharge: row.LoadingCharge || '',
      UnloadingCharge: row.UnloadingCharge || '',
      WRCharge: row.WRCharge || '',
      WHAreasqft: row.WHAreasqft || '',
      Ratesqft: row.Ratesqft || '',
      ForkliftCharge: row.ForkliftCharge || '',
      Damragecharge: row.Damragecharge || '',
      Delaycharg: row.Delaycharg || '',
      OverHead: row.OverHead || '',
      OtherCharges1: row.OtherCharges1 || '',
      OtherCharges2: row.OtherCharges2 || '',

    });
    setSelectedOption(row.PL_FTL);
    setUomSelectedOption(row.UOM)



    const vehicleType = vehicleTypeOptions.find(
      (option) => option.vehicle_type_id === row.vehicle_type_id
    );
 
    const FromCutsomer = customerOptions.find(
      (option) => option.customer_id == row.from
    );
   
    const ToCutsomer = customerOptions.find(
      (option) => option.customer_id == row.to
    );
  
    const state = states.find(
      (option) => option.statecode == row.statecode
    );
  

  const storedGstData = JSON.parse(localStorage.getItem('gstData')) || [];
  setGstData(storedGstData);

    const gstName = storedGstData.find(
        (option) => option.id == row.gstid
      );
   
    
    setSelectedVehicleType(vehicleType || null);
    setFromSelectedCustomer(FromCutsomer || null)
    setToSelectedCustomer(ToCutsomer || null)
    setSelectedState(state || null)
    setSelectedGstData(gstName || null)

    setIsEditing(true);
    setEditRowId(row.id);
  };

  console.log(transactionsDetails)


  const handleButtonClick = () => {
    if (!transactionformData.PO_Line_No) return;

    const vehicleType = selectedVehicleType ? selectedVehicleType.vehicle_type : null;
    const vehicleTypeId = selectedVehicleType ? selectedVehicleType.vehicle_type_id : null;
    const FromCustomer = fromselectedCustomer ? fromselectedCustomer.customer_name : null;
    const FromcustomerID = fromselectedCustomer ? fromselectedCustomer.customer_id : null;
    const ToCustomer = toselectedCustomer ? toselectedCustomer.customer_name : null;
    const TocustomerID = toselectedCustomer ? toselectedCustomer.customer_id : null;
    const state = selectedState ? selectedState.state : null;
    const statecode = selectedState ? selectedState.statecode : null;
    const gstName = selectedGstData ? selectedGstData.gstName : null;
    const gstId = selectedGstData ? selectedGstData.id : null;

    const newRow = {
      id: isEditing ? editRowId : transactionsDetails.length + 1,
      PO_Line_No: transactionformData.PO_Line_No,
      PL_FTL: selectedOption,
      VehicleType: vehicleType,
      VehicleTypeId: vehicleTypeId,
      FromCustomerName: FromCustomer,
      FromcustomerID: FromcustomerID,
      ToCustomerName: ToCustomer,
      TocustomerID: TocustomerID,
      PartLoadRate: transactionformData.PartLoadRate,
      FTLRate: transactionformData.FTLRate,
      BoxBinRate: transactionformData.BoxBinRate,
      PartNo: transactionformData.PartNo,
      PartDesc: transactionformData.PartDesc,
      UOM: uomselectedOption,
      CFTwt: transactionformData.CFTwt,
      CollCharTrip: transactionformData.CollCharTrip,
      DelChargTrip: transactionformData.DelChargTrip,
      PartLoadTT: transactionformData.PartLoadTT,
      FTLTT: transactionformData.FTLTT,
      LRCharge: transactionformData.LRCharge,
      LoadingCharge: transactionformData.LoadingCharge,
      UnloadingCharge: transactionformData.UnloadingCharge,
      WRCharge: transactionformData.WRCharge,
      WHAreasqft: transactionformData.WHAreasqft,
      Ratesqft: transactionformData.Ratesqft,
      ForkliftCharge: transactionformData.ForkliftCharge,
      Damragecharge: transactionformData.Damragecharge,
      Delaycharg: transactionformData.Delaycharg,
      OverHead: transactionformData.OverHead,
      OtherCharges1: transactionformData.OtherCharges1,
      OtherCharges2: transactionformData.OtherCharges2,
      state: state,
      statecode: statecode,
      gstName: gstName,
      gstId: gstId
    };

    if (isEditing) {
      setTransactionsDetails((prevDetails) =>
        prevDetails.map((row) =>
          row.id === editRowId ? newRow : row
        )
      );
      setIsEditing(false);
      setEditRowId(null);
    } else {
      setTransactionsDetails((prevDetails) => [...prevDetails, newRow]);
    }
    setTransactionFormData({
      PO_Line_No: '',
      PartLoadRate: '',
      FTLRate: '',
      BoxBinRate: '',
      PartNo: '',
      PartDesc: '',
      CFTwt: '',
      CollCharTrip: '',
      DelChargTrip: '',
      PartLoadTT: '',
      FTLTT: '',
      LRCharge: '',
      LoadingCharge: '',
      UnloadingCharge: '',
      WRCharge: '',
      WHAreasqft: '',
      Ratesqft: '',
      ForkliftCharge: '',
      Damragecharge: '',
      Delaycharg: '',
      OverHead: '',
      OtherCharges1: '',
      OtherCharges2: ''
    });
    setSelectedOption('');
    setSelectedVehicleType(null);
    setUomSelectedOption('');
    setFromSelectedCustomer(null);
    setToSelectedCustomer(null);
    setSelectedState(null)
    setSelectedGstData(null)
  };





  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSelectUom = (event) => {
    setUomSelectedOption(event.target.value);
  };


  const handleTextFieldChange = (event) => {
    setUnspecifiedPersonName(event.target.value);
  };
  const handleSave = () => {
    const customerId = selectedpoCustomer ? selectedpoCustomer.customer_id : null;
    const permissionValue = permissionToExtendDate === "Yes" ? 1 : 0;

    const formattedPoDate = poDate ? poDate.format('YYYY-MM-DD') : null;
    const formattedAgrStartDate = poStartDate ? poStartDate.format('YYYY-MM-DD') : null;
    const formattedAgrEndDate = poEndDate ? poEndDate.format('YYYY-MM-DD') : null;
    const formattedRefDate = RefDate ? RefDate.format('YYYY-MM-DD') : null;
    const formattedBillingGstDate = billingGstDate ? billingGstDate.format('YYYY-MM-DD') : null;

    const dataToSend = {
      id, 
      ...formData,
      po_date: formattedPoDate,
      customer_id: customerId,
      agr_start_date: formattedAgrStartDate,
      agr_end_date: formattedAgrEndDate,
      branch: selectedBranch ? selectedBranch.branch_id : null,
      extend_permission: permissionValue,
      billing_address: billingFormData.billingAddress || '',
      credit_period: billingFormData.creditperiod || '',
      RefDate: formattedRefDate,
      BillingGstDate: formattedBillingGstDate,
      RefNo: billingFormData.RefNo || '',
      entry_person_name: unspecifiedPersonName || '',
      details: transactionsDetails || [],
      BillingVendorCode:billingFormData.BillingVendorCode,
      BillingCINNo:billingFormData.BillingCINNo,
      billingAddressFlag: getCheckboxValue(),
    };

    upsertPurchaseOrder(dataToSend)
      .then(response => {
        const { message, res_code } = response.data;

        // Set Snackbar message and color
        setSnackbarMessage(message || 'Operation completed');
        setSnackbarColor(res_code ? 'green' : 'red'); // Adjust color based on response
        setSnackbarOpen(true);

        // Delay navigation to ensure Snackbar is shown
        setTimeout(() => {
          // Navigate to a different page
          if (res_code) {
            navigate('/view-purchase-order-receipt'); // Replace with actual success page
          } else {
            navigate('/view-purchase-order-receipt'); // Replace with actual error page
          }
        }, 2000); // Adjust delay as needed to match Snackbar duration
      })
      .catch(error => {
        console.error('Error saving order:', error);
        setSnackbarMessage('Error saving order!');
        setSnackbarColor('red');
        setSnackbarOpen(true);

        // Optionally delay navigation on error
        setTimeout(() => {
          // navigate('/view-purchase-order-receipt'); // Replace with your actual error page
        }, 3000); // Adjust delay if needed
      });
  };



  const handleRadioChange = (event) => {
    setPermissionToExtendDate(event.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  const isTextFieldDisabled = permissionToExtendDate === "No";
  return (
    <>
      {loading && <LoadingSpinner />}
      <Grid container>
        <Grid item xs={6} md={2}>
          <Autocomplete
            options={branchOptions}
            getOptionLabel={(option) => option.branch_name || ""}
            onChange={(event, newValue) => setSelectedBranch(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Branch"
                variant="outlined"
                fullWidth
                size="small"
                name="branch"
              />
            )}
          />
        </Grid>
        <Grid item xs={6} md={2} sx={{ float: "center" }}></Grid>
        <Grid item xs={6} md={2} ml={16} sx={{ float: "center" }}>
          <Typography
            sx={{
              fontFamily: "poppins",
              fontSize: "1.75rem",
              marginBottom: 2,
              marginLeft: 2,
            }}
          >
            PURCHASE ORDER
          </Typography>
        </Grid>
      </Grid>

      <Divider
        style={{ backgroundColor: "black", marginBottom: "2%" }}
      ></Divider>

      <Grid container spacing={1}>
        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="SrNo"
            label="Sr No"
            fullWidth
            variant="outlined"
            size="small"
            value={formData.SrNo}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="poNo"
            label="PO No"
            fullWidth
            variant="outlined"
            value={formData.poNo}
            onChange={handleChange}
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <Box style={fixedHeight}>
            <FormControl fullWidth size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="To"
                  format="MM-DD-YYYY"
                  label="Po Date"
                  value={poDate}
                  onChange={(date) => setPODate(date)}
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={2.4}>
          <Autocomplete
            id="consignor-autocomplete"
            options={pocustomerOptions}
            getOptionLabel={(option) => option.customer_name}
            value={selectedpoCustomer} // Set value to the selected customer
            onChange={(event, newValue) => setSelectedPoCustomer(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Customer"
                fullWidth
                size="small"
              />
            )}
          />

        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="address"
            label="Customer Address"
            value={formData.address}
            onChange={handleChange}
            multiline
            maxRows={4}
            size="small"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="VendorCode"
            value={formData.VendorCode}
            onChange={handleChange}
            label="Vendor Code"
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>



        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="State"
            value={formData.State}
            onChange={handleChange}
            label="State"
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="StateCode"
            value={formData.StateCode}
            onChange={handleChange}
            label="State Code"
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="CustomerGstNo"
            value={formData.CustomerGstNo}
            onChange={handleChange}
            label="Customer GST NO"
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <Box style={fixedHeight}>
            <FormControl fullWidth size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="CustomerGSTDate"
                  value={CustomerGSTDate}
                  onChange={handleDateChange}
                  format="MM-DD-YYYY"
                  label="Customer GST Date"
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="PAN"
            value={formData.PAN}
            onChange={handleChange}
            label="PAN"
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="CINNo"
            value={formData.CINNo}
            onChange={handleChange}
            label="CIN No"
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <Box style={fixedHeight}>
            <FormControl fullWidth size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="POStartDate"
                  format="MM-DD-YYYY"
                  label="PO Start Date"
                  value={poStartDate}
                  onChange={(date) => setPOStartDate(date)}
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={2.4}>
          <Box style={fixedHeight}>
            <FormControl fullWidth size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="POEndDate"
                  format="MM-DD-YYYY"
                  label="PO End Date"
                  value={poEndDate}
                  onChange={(date) => setPOEndDate(date)}
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={2.4}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Permission To Extend Date:
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={permissionToExtendDate}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="UnspecifiedPersonName"
            label="Unspecified Person Name"
            fullWidth
            variant="outlined"
            size="small"
            disabled={isTextFieldDisabled}
            value={unspecifiedPersonName}
            onChange={handleTextFieldChange}
          />
        </Grid>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          justifyContent: "left",
          alignItems: "flex-start",
          display: "flex",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxState}
              onChange={handleCheckboxChange}
            />
          }
          label="Billing Customer Details As Above:"
        />
      </Grid>

      <Divider
        style={{ backgroundColor: "black", marginBottom: "2%" }}
      ></Divider>

      <Grid container spacing={1} sx={{ marginTop: "2px", marginBottom: "2%" }}>
        <Grid item xs={2.4}>
          <ResizableTextField
            id="outlined-multiline-flexible"
            label="Billing Address:"
            name="billingAddress"
            multiline
            maxRows={4}
            size="small"
            fullWidth
            value={billingFormData.billingAddress}
            onChange={BillinghandleChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="BillingState "
            label="Billing State "
            fullWidth
            value={billingFormData.BillingState}
            onChange={BillinghandleChange}
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="BillingStateCode"
            label="Billing State Code"
            fullWidth
            value={billingFormData.BillingStateCode}
            onChange={BillinghandleChange}
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="BillingGSTNO"
            label="Billing GST NO"
            fullWidth
            value={billingFormData.BillingGSTNO}
            onChange={BillinghandleChange}
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <Box style={fixedHeight}>
            <FormControl fullWidth size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="BillingGSTDate:"
                  format="MM-DD-YYYY"
                  label="Billing GST Date"
                  value={billingGstDate}
                  onChange={(date) => setBillingGstDate(date)}
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="BillingPAN"
            label="Billing PAN"
            fullWidth
            value={billingFormData.BillingPAN}
            onChange={BillinghandleChange}
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="BillingCINNo"
            label="Billing CIN No"
            fullWidth
            variant="outlined"
            value={billingFormData.BillingCINNo}
            onChange={BillinghandleChange}
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="creditperiod"
            label="Credit Period"
            value={billingFormData.creditperiod}
            onChange={BillinghandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="RefNo"
            label="Ref No"
            value={billingFormData.RefNo}
            onChange={BillinghandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <Box style={fixedHeight}>
            <FormControl fullWidth size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="RefDate:"
                  format="MM-DD-YYYY"
                  label="Ref Date"
                  value={RefDate}
                  onChange={(date) => setRefDate(date)}
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="BillingVendorCode"
            label="Vendor Code"
            value={billingFormData.BillingVendorCode}
            onChange={BillinghandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>

      <Divider
        style={{ backgroundColor: "black", marginBottom: "2%" }}
      ></Divider>

      <Grid
        container
        spacing={2}
        style={{
          marginLeft: "0.1%",
          fontSize: "20px",
          fontFamily: "Poppins",
          marginBottom: "1.5%",
        }}
      >
        Transactions Details
      </Grid>

      <Divider
        style={{ backgroundColor: "black", marginBottom: "2%" }}
      ></Divider>

      <Grid container spacing={1} sx={{ marginTop: "2px", marginBottom: "2%" }}>
        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="PO_Line_No"
            label="PO Line No"
            value={transactionformData.PO_Line_No}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <FormControl fullWidth size="small">
            <InputLabel id="select-label">Part Load/FTL</InputLabel>
            <Select
              labelId="select-label"
              value={selectedOption}
              onChange={handleSelect}
              variant="outlined"
            >
              <MenuItem value="PartLoad">PartLoad</MenuItem>
              <MenuItem value="FTL">FTL</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={2.4}>
          <Autocomplete
            options={vehicleTypeOptions || []}
            getOptionLabel={(option) => option.vehicle_type || ""}
            value={selectedVehicleType || null}
            onChange={handleVehicleTypeChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Vehicle Type"
                variant="outlined"
                fullWidth
                size="small"
                name="assignedCrew"
              />
            )}
          />
        </Grid>


        <Grid item xs={2.4}>
          <Autocomplete
            id="consignor-autocomplete"
            options={customerOptions || []}
            getOptionLabel={(option) => option.customer_name || ""}
            value={fromselectedCustomer || null}
            onChange={handleFromselectedCustomer}
            renderInput={(params) => (
              <TextField
                {...params}
                label="From"
                fullWidth
                size="small"
              />
            )}
          />
        </Grid>

        <Grid item xs={2.4}>

          <Autocomplete
            id="consignor-autocomplete"
            options={customerOptions}
            getOptionLabel={(option) => option.customer_name}
            value={toselectedCustomer || null}
            onChange={handleToselectedCustomer}
            renderInput={(params) => (
              <TextField
                {...params}
                label="To"
                fullWidth
                size="small"
              />
            )}
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="PartLoadRate"
            label="PartLoad Rate/KG"
            value={transactionformData.PartLoadRate}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />

        </Grid>


        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="FTLRate"
            label="FTL Rate"
            value={transactionformData.FTLRate}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="BoxBinRate"
            label="Box/Bin Rate"
            value={transactionformData.BoxBinRate}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="PartNo"
            label="Part No."
            value={transactionformData.PartNo}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="PartDesc"
            label="Part Desc."
            value={transactionformData.PartDesc}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <FormControl fullWidth size="small">
            <InputLabel id="select-label">UOM</InputLabel>
            <Select
              labelId="select-label"
              value={uomselectedOption}
              onChange={handleSelectUom}
              variant="outlined"
            >
              <MenuItem value="Kgs">Kgs</MenuItem>
              <MenuItem value="Numbers">Numbers</MenuItem>
              <MenuItem value="FLTs">FLTs</MenuItem>
              <MenuItem value="Sets">Sets</MenuItem>
              <MenuItem value="PerBox">Per Box</MenuItem>
              <MenuItem value="PerPallet">Per Pallet</MenuItem>
              <MenuItem value="PerPallet">Per Pallet</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="CFTwt"
            label="CFT wt"
            value={transactionformData.CFTwt}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="CollCharTrip"
            label="Coll Char/Trip"
            value={transactionformData.CollCharTrip}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="DelChargTrip"
            label="Del Charg/Trip"
            value={transactionformData.DelChargTrip}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="PartLoadTT"
            label="PartLoad TT"
            value={transactionformData.PartLoadTT}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="FTLTT"
            label="FTL TT"
            value={transactionformData.FTLTT}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="LRCharge"
            label="LR Charge"
            value={transactionformData.LRCharge}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="LoadingCharge"
            label="Loading Charge"
            value={transactionformData.LoadingCharge}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>


        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="UnloadingCharge"
            label="Unloading Charge"
            value={transactionformData.UnloadingCharge}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>


        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="WRCharge"
            label="WR Charge"
            value={transactionformData.WRCharge}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>


        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="WHAreasqft"
            label="WH Area(sqft)"
            value={transactionformData.WHAreasqft}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>


        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="Ratesqft"
            label="Rate/sqft"
            value={transactionformData.Ratesqft}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>


        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="ForkliftCharge"
            label="Forklift Charge"
            value={transactionformData.ForkliftCharge}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>


        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="Damragecharge"
            label="Damrage charge"
            value={transactionformData.Damragecharge}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="Delaycharg"
            label="Delay charg"
            value={transactionformData.Delaycharg}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="OverHead"
            label="Over Head"
            value={transactionformData.OverHead}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="OtherCharges1"
            label="Other Charges 1"
            value={transactionformData.OtherCharges1}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={2.4}>
          <TextField
            className="customTextField"
            name="OtherCharges2"
            label="Other Charges 2"
            value={transactionformData.OtherCharges2}
            onChange={TransactionhandleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>


        <Grid item xs={2.4}>
          <Autocomplete
            options={states}
            getOptionLabel={(option) => option.state}
            value={selectedState || null}
            onChange={handlestate}
            renderInput={(params) => (
              <TextField
                {...params}
                label="State: "
                variant="outlined"
                fullWidth
                size="small"
                name="assignedCrew"
              />
            )}
          />
        </Grid>

        <Grid item xs={2.4} mb={2}>
          <Autocomplete
            options={gstData || []}
            getOptionLabel={(option) => option.gstName}
            value={selectedGstData || null}
            onChange={handleGstData}
            renderInput={(params) => (
              <TextField
                {...params}
                label="GST Name: "
                variant="outlined"
                fullWidth
                size="small"
                name="assignedCrew"
              />
            )}
          />
        </Grid>

        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "2%",
          }}
        >
          <Grid item>
            <Button
              variant="contained"
              color="success"
              style={{ padding: "5px 50px" }}
              onClick={handleButtonClick}
            >
              {isEditing ? 'Update' : 'Add'}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Divider
        style={{ backgroundColor: "black", marginBottom: "2%" }}
      ></Divider>

      <Grid>
        <DataGrid
          autoHeight
          density="compact"
          rows={transactionsDetails}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Grid>



      <Grid container spacing={0} sx={{ margin: "0px auto" }}>
        <Grid item xs={4.0} mt={1} mb={1}></Grid>
        <Grid item xs={1.2} mt={5} mb={2}>
          <Button variant="contained" sx={{ backgroundColor: "#6573c3" }} onClick={handleSave}>
            Save
          </Button>
        </Grid>
        <Grid item xs={1.5} mt={5} mb={2}>
          <Button variant="contained" sx={{ backgroundColor: "#002360" }}>
            Orignal Print
          </Button>
        </Grid>
        <Grid item xs={1.2} mt={5} mb={2}>
          <Button variant="contained" sx={{ backgroundColor: "#D92445" }}>
            cancel
          </Button>
        </Grid>
      </Grid>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
        color={snackbarColor}
      />
    </>
  );
}

export default EditPurchaseOrderReceipt;
