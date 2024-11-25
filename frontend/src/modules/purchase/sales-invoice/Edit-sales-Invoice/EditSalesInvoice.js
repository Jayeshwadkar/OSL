import { Autocomplete, Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, MenuItem, Paper, Radio, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { memo, useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import { getPOByCustomer, SelectCustomers, SelectPoCustomers } from '../../../../lib/api-customer';
import { FixedSizeList as List } from 'react-window';
import { getGstNos } from '../../../../lib/api-Common';
import dayjs from 'dayjs';
import {getGSTNumberAndState, getLorryReceiptById, getLorryReceiptList, getlrbylridandinvid, getPODetailsByPOID, getSalesInvoiceMasterById, updateSaleInvoice } from '../../../../lib/api-salesInvoice1';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import CustomSnackbar from '../../../../components/ui/SnackbarComponent';

const useStyles = makeStyles({
    blueHeader: {
        backgroundColor: '#004aad',
        color: 'white',
    },
    header: {
        fontWeight: 'bold',
        backgroundColor: '#004aad',

    },
    cell: {
        padding: 8,

    },
    textField: {
        width: '100px',
    },
    radio: {
        padding: '0',
        marginLeft: '8px',
        transform: 'scale(0.8)',
    },
});

const scrollableBoxStyle = {
    maxHeight: '300px',
    overflowY: 'auto'
};

const Row = memo(({ index, style, data }) => {
    const { lrNumbers, selectedLrIds, handleCheckboxChange } = data;


    const checkboxesPerRow = 5;


    const startIndex = index * checkboxesPerRow;
    const endIndex = Math.min(startIndex + checkboxesPerRow, lrNumbers.length);


    const rowItems = lrNumbers.slice(startIndex, endIndex);

    return (
        <div style={style}>
            <Grid container spacing={1}>
                {rowItems.map((lr) => (
                    <Grid item xs={12 / checkboxesPerRow} key={lr.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedLrIds.includes(lr.id)}
                                    onChange={handleCheckboxChange(lr.id)}
                                />
                            }
                            label={lr.lrno}
                            sx={{ display: 'block', textAlign: 'center' }}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
});
const sacCodeOptions = [
    { code: '996511', label: '996511' },
    { code: '996531', label: '996531' },
    { code: '996729', label: '996729' },
    { code: '998311', label: '998311' },
    { code: '997311', label: '997311' },
];

function EditSalesInvoice() {
    const navigate = useNavigate();
    const { id } = useParams();
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [customerOptions, setCustomerOptions] = useState([]);
    const [poCustomerOptions, setPoCustomerOptions] = useState([]);
    const [poLineOptions, setPoLineOptions] = useState([]);
    const [GstNos, setGstNos] = useState([]);
    const [selectedpoCustomer, setSelectedPoCustomer] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedConsignee, setSelectedConsignee] = useState(null);
    const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
    const [selectedGstNos, setSelectedGstNos] = useState(null);
    const [selectedCollectionFrom, setSelectedCollectionFrom] = useState(null);
    const [selectedCollectionTo, setSelectedCollectionTo] = useState(null)
    const [selectedLocalCustomer, setSelectedLocalCustomer] = useState(null)
    const [selectedDeliveryFrom, setSelectedDeliveryFrom] = useState(null)
    const [selectedDeliveryTo, setSelectedDeliveryTo] = useState(null)
    const [billDate, setBillDate] = useState(dayjs());
    const [poNo, setPoNo] = useState(null);
    const [selectedSACCode, setSelectedSACCode] = useState('');
    const [selectedpoNo, setSelectedPoNo] = useState(null)
    const [selectedpoLine, setSelectedPoLine] = useState(null)
    const [lrNumbers, setLrNumbers] = useState([]);
    const [selectedLrIds, setSelectedLrIds] = useState([]);
    const [gstState, setGstState] = useState('');
    const [tableData, setTableData] = useState([]);
    const [totalCft, setTotalCft] = useState(0);
    const [lrCount, setLRCount] = useState(0);
    const [poDate, setPoDate] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState('');
    const [textFieldValues, setTextFieldValues] = useState({
        loadingChargesQuantity: '',
        loadingChargesAmount: '',
        load909Quantity: '',
        load909Amount: '',
        detentionChargesQuantity: '',
        detentionChargesAmount: '',
        pickUpQuantity: '',
        pickUpAmount: '',
        unloadingChargesQuantity: '',
        unloadingChargesAmount: '',
        load407Quantity: '',
        load407Amount: '',
        otherChargesQuantity: '',
        otherChargesAmount: '',
        twoWheelerQuantity: '',
        twoWheelerAmount: '',
        multiAxle32FeetQuantity: '',
        multiAxle32FeetAmount: '',
        tataAceQuantity: '',
        tataAceAmount: '',
        mathadiQuantity: '',
        mathadiAmount: '',
        feet32Quantity: '',
        feet32Amount: '',
        threeWheelerQuantity: '',
        threeWheelerAmount: '',
        load1109Quantity: '',
        load1109Amount: '',
    });
    const [formData, setFormData] = useState({
        year: '',
        BillNo: '',
        collectionTrip: '',
        CollectionRate: '',
        DelieveryTrip: '',
        DelieveryRate: '',
        Rate: '',
        CGST: '',
        sgst: '',
        IGST: '',
        ExemptedDescription: '',
        Quantity: '',
        ExamptedRate: '',
        ExemptedAmount: '',
        LRCharge: '',
        Remarks: ''
    });
    const [fieldsVisibility, setFieldsVisibility] = useState({
        loadingCharges: false,
        load909: false,
        detentionCharges: false,
        pickUp: false,
        unloadingCharges: false,
        load407: false,
        otherCharges: false,
        twoWheeler: false,
        multiAxle32Feet: false,
        tataAce: false,
        mathadi: false,
        feet32: false,
        threeWheeler: false,
        load1109: false,
    });
    const [selectedRadio, setSelectedRadio] = useState(null);


    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getSalesInvoiceMasterById(id);

            const data = response.data.record;
            console.log(data)
            setFormData({
                BillNo: data.billno || '',
                collectionTrip: data.collectiontrip || '',
                CollectionRate: data.collectioncharges || '',
                DelieveryTrip: data.deleverytrip || '',
                DelieveryRate: data.deliverycharges || '',
                Rate: data.rate || '',
                CGST: data.cgst || '',
                sgst: data.sgst || '',
                IGST: data.igst || '',
                ExemptedDescription: data.exempteddesc || '',
                Quantity: data.exempted || '',
                Remarks:data.remarks || '',
                LRCharge:data.lrcharges || '',
                year:data.abbbill ||''
            });
            setBillDate(dayjs(data.billdate));
            setSelectedLrIds([data.lrids])
            setPoDate(dayjs(data.po_date))
            setSelectedSACCode(data.saccode || '');
            const consigner = customerOptions.find(cust => cust.customer_id == data.consigner);
            setSelectedCustomer(consigner || null);
            const consignee = customerOptions.find(cust => cust.customer_id == data.consignee);
            setSelectedConsignee(consignee || null)
            const pocustomer = poCustomerOptions.find(cust => cust.customer_id == data.po_id);
            setSelectedPoCustomer(pocustomer || null)
            const poNos = poNo.find(cust => cust.po_no == data.po_no);
            setSelectedPoNo(poNos || null)
            const poline = poLineOptions.find(cust => cust.id == data.po_line_id);
            setSelectedPoLine(poline || null)
            const gstno = GstNos.find(cust => cust.id == data.oslgstno);
            setSelectedGstNos(gstno || null)
            const consignerFrom = customerOptions.find(cust => cust.customer_id == data.collconsignor);
            setSelectedCollectionFrom(consignerFrom || null)
            const collconsigneeto = customerOptions.find(cust => cust.customer_id == data.collconsignee);
            setSelectedCollectionTo(collconsigneeto || null)
            const Localcustomer = customerOptions.find(cust => cust.customer_id == data.loccustomer);
            setSelectedLocalCustomer(Localcustomer || null)
            const delconsigner = customerOptions.find(cust => cust.customer_id == data.delconsignor);
            setSelectedDeliveryFrom(delconsigner || null)
            const delconsignee = customerOptions.find(cust => cust.customer_id == data.delconsignee);
            setSelectedDeliveryTo(delconsignee || null)

            setLRCount(data.lrcount)
            setGstState(data.oslgststate)

            setFieldsVisibility({
                loadingCharges: data.loadingcharges ? true : false,
                loadingCharges: data.loadingchargesqty ? true : false,
                unloadingCharges: data.unloadingcharges ? true : false,
                unloadingCharges: data.unloadingchargesqty ? true : false,
                load407: data.load407 ? true : false,
                load407: data.load407qty ? true : false,
                load1109:data.load1109 ? true :false,
                load1109:data.load1109qty ? true : false,
                load909:data.load909 ? true : false,
                load909:data.load909qty ? true : false,
                tataAce:data.tataaceload ? true : false,
                tataAce:data.tataaceqty ? true : false,
                threeWheeler:data.load3wheeler ? true :false,
                threeWheeler:data.load3wheelerqty ? true :false,
                twoWheeler:data.load2wheeler ? true : false,
                twoWheeler:data.load2wheelerqty ? true : false,
                otherCharges:data.othercharges ? true : false,
                otherCharges:data.otherchargesqty ? true : false,
                mathadi:data.mathadi ? true : false,
                mathadi:data.mathadiqty ? true : false,
                detentionCharges:data.detentioncharges ? true : false,
                detentionCharges:data.detentionchargesqty ? true : false,
                feet32:data.feet32 ? true : false,
                feet32:data.feetqty ? true : false,
            });

            setTextFieldValues({
                loadingChargesQuantity: data.loadingchargesqty || '',
                loadingChargesAmount: data.loadingcharges || '',
                unloadingChargesAmount: data.unloadingcharges || '',
                unloadingChargesQuantity: data.unloadingchargesqty || '',
                load407Quantity: data.load407 || '',
                load407Amount: data.load407qty || '',
                load1109Quantity: data.load1109qty || '',
                load1109Amount: data.load1109 || '',
                load909Quantity: data.load909qty || '',
                load909Amount: data.load909 || '' ,
                tataAceQuantity: data.tataaceload || '',
                tataAceAmount: data.tataaceqty || '' ,
                threeWheelerQuantity:  data.load3wheelerqty || '',
                threeWheelerAmount: data.load3wheeler || '' ,
                twoWheelerQuantity: data.load2wheelerqty || '',
                twoWheelerAmount: data.load2wheeler || '',
                otherChargesQuantity: data.otherchargesqty || '',
                otherChargesAmount: data.othercharges || '',
                mathadiQuantity:data.mathadiqty || '',
                mathadiAmount:data.mathadi || '',
                detentionChargesQuantity:data.detentionchargesqty ||  '',
                detentionChargesAmount:data.detentioncharges || '',
                feet32Quantity: data.feetqty || '',
                feet32Amount: data.feet32 || '',
            });

        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };



    const fetchAndUpdateData = async () => {
        if (selectedLrIds.length === 0) return;
    
        try {
            const response = await getlrbylridandinvid(selectedLrIds,id);
            const newData = response.data.records || [];
            if (Array.isArray(newData)) {
                setTableData(() => [...newData]);
            } else {
                console.error('Unexpected data format:', response);
            }
            
            setSelectedLrIds([]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
        useEffect(() => {
        fetchAndUpdateData();
    }, [selectedLrIds]);
console.log("while fetch",selectedLrIds)
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

    const fetchGstNos = async () => {
        setLoading(true);
        try {
            const response = await getGstNos();
            const gstNosData = response.data;
            const filteredGstNos = gstNosData.map(({ gstno, id }) => ({
                gstno,
                id
            }));
            setGstNos(filteredGstNos);
        } catch (error) {
            console.error("Failed to fetch gstno options:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPOByCustomer = async (customer_id) => {
        setLoading(true);

        try {
            const response = await getPOByCustomer(customer_id);

            const transformedData = response.data.map(({ id, po_no }) => ({ id, po_no })) || [];
            setPoNo(transformedData);
        } catch (err) {
            console.error('Error fetching purchase orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchLorryReceiptList = async (customer_id) => {
        setLoading(true);

        try {
            const response = await getLorryReceiptList(customer_id);
            const transformedData = response.data.records.map(({ id, lrno }) => ({ id, lrno })) || [];
            setLrNumbers(transformedData);
        } catch (err) {
            console.error('Error fetching lorry receipts:', err);
        } finally {
            setLoading(false);
        }
    };


    const fetchGSTNumberAndState = async (id) => {
        setLoading(true);
        try {
            const response = await getGSTNumberAndState(id);

            const gstState = response.data.record.gststate;
            setGstState(gstState);
        } catch (err) {
            console.error('Error fetching GST number and state:', err);
        } finally {
            setLoading(false);
        }
    };


    const fetchPODetailsByPOID = async (id) => {
        setLoading(true);
        try {
            const response = await getPODetailsByPOID(id);
            const poLines = response.data.records.map(record => ({
                id: record.id,
                po_line_no: record.po_line_no,
                warehouse_rent_charges: record.warehouse_rent_charges,
                warehouse_area_sqft: record.warehouse_area_sqft,
                unloading_charges: record.unloading_charges,
                statecode: record.statecode,
                state: record.state,
                sqst: record.sqst,
                sgst: record.sgst,
                sacCode: record.sacCode,
                po_date: record.po_date,
                per_sqft_rate: record.per_sqft_rate,
                partload_tt: record.partload_tt,
                partload_rate_kg: record.partload_rate_kg,
                partload_ftl: record.partload_ftl,
                part_no: record.part_no,
                part_description: record.part_description,
                overhead_charges: record.overhead_charges,
                other_charges2: record.other_charges2,
                other_charges1: record.other_charges1,
                no_tax: record.no_tax,
                measurement_unit: record.measurement_unit,
                lr_charges: record.lr_charges,
                loading_charges: record.loading_charges,
                igst: record.igst,
                gstid: record.gstid,
                gstName: record.gstName,
                ftl_tt: record.ftl_tt,
                ftl_rate: record.ftl_rate,
                forklift_charges: record.forklift_charges,
                delivery_charges: record.delivery_charges,
                delay_delivery_charges: record.delay_delivery_charges,
                damrage_charges: record.damrage_charges,
                collection_charges: record.collection_charges,
                cgst: record.cgst,
                cft_wt: record.cft_wt,
                box_bin_rate: record.box_bin_rate
            }));
            setPoLineOptions(poLines);

        } catch (err) {
            console.error('Error fetching PO details:', err);
        } finally {
            setLoading(false);
        }
    };




    useEffect(() => {
        fetchpoCustomers();
        fetchCustomers();
        fetchGstNos();
    }, []);



    useEffect(() => {
        if (selectedpoCustomer) {
            fetchPOByCustomer(selectedpoCustomer.customer_id);
            fetchLorryReceiptList(selectedpoCustomer.customer_id)
        }
    }, [selectedpoCustomer]);

    useEffect(() => {
        if (selectedGstNos) {
            fetchGSTNumberAndState(selectedGstNos.id)
        }
    }, [selectedGstNos]);

    useEffect(() => {
        if (selectedpoNo) {
            fetchPODetailsByPOID(selectedpoNo.id)
        }
    }, [selectedpoNo]);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        setFormData((prevData) => ({
            ...prevData,
            year: currentYear,
        }));
    }, []);

    


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleCheckboxChange = (id) => (event) => {
        setSelectedLrIds((prev) =>
            event.target.checked
                ? [...prev, id]
                : prev.filter((item) => item !== id)
        );
    };




    const handleRadioChange = (field) => (event) => {
        const selectedValue = event.target.value;
        setSelectedRadio(selectedValue);
        setTableData(prevData =>
            prevData.map(row => {
                let value = 0;
                if (selectedValue === 'no_of_articles') {
                    value = row.no_of_articles * row.Rate;
                } else if (selectedValue === 'quantity') {
                    value = row.quantity * row.Rate;
                } else if (selectedValue === 'cft') {
                    value = row.cft * row.Rate;
                } else if (selectedValue === 'actual_wt') {
                    value = row.actual_wt * row.Rate;
                }
                return { ...row, Value: value };
            })
        );
    };

    const handleInputChange = (field, id) => (event) => {
        const newValue = event.target.value;
        setTableData(prevData =>
            prevData.map(row =>
                row.id === id ? { ...row, [field]: newValue } : row
            )
        );
    };

    const handleCheckboxChanges = (event) => {
        setFieldsVisibility({
            ...fieldsVisibility,
            [event.target.name]: event.target.checked,
        });
    };

    const handleTextFieldChange = (event) => {
        setTextFieldValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    useEffect(() => {
        const total = tableData.reduce((sum, row) => {
            return sum + (parseFloat(row.cft) || 0);
        }, 0);
        setTotalCft(total);
    }, [tableData]);


    const handleLrCountChange = (event) => {
        setLRCount(event.target.value);
    };


    const handleCancel = () => {
        navigate('/view-sales-invoice-list');
    };


    const handleDateChange = (date) => {
        setBillDate(date);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


    const columns = [
        { field: 'id', headerName: 'SN' },
        { field: 'lrNo', headerName: 'LRNo' },
        { field: 'lrdate', headerName: 'LRDate' },
        { field: 'consigner', headerName: 'Consignor Name' },
        { field: 'loc_from', headerName: 'From' },
        { field: 'consignee', headerName: 'Consignee Name' },
        { field: 'dc_last_date', headerName: 'Last DC Date' },
        { field: 'dc_no_vehicle', headerName: 'DC Vehicle No' },
        { field: 'loc_to', headerName: 'To' },
        { field: 'inv_no', headerName: 'InvNo' },
        { field: 'description', headerName: 'Description' },
        { field: 'partno', headerName: 'Part No' },
        { field: 'articles', headerName: 'Articles' },
        { field: 'no_of_articles', headerName: 'No.Articles' },
        { field: 'quantity', headerName: 'Qty' },
        { field: 'cft', headerName: 'CFT' },
        { field: 'actual_wt', headerName: 'Weight' },
        { field: 'Rate', headerName: 'Rate' },
        { field: 'Value', headerName: 'Value' },
    ];


    const handleRateChange = (event) => {
        const { value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            Rate: value
        }));


        setTableData((prevData) =>
            prevData.map(row => ({
                ...row,
                Rate: value
            }))
        );
    };


    const fixedHeight = {
        height: '40%'
    };


    const handleAddButtonClick = async () => {
        try {
          const requests = selectedLrIds.map((id) => getLorryReceiptById(id));
          const responses = await Promise.all(requests);
          const newData = responses.flatMap((response) => response.data.records || []);
          const dataWithSelectedIds = newData.map(record => ({
            ...record,
            selectedLrIds 
          }));
          setTableData((prevTableData) => [...prevTableData, ...dataWithSelectedIds]);
          setLRCount(prevCount => prevCount + selectedLrIds.length);
          setSelectedLrIds([]);
        } catch (error) {
          console.error('Error:', error);
        }
      };
    const classes1 = useStyles();

    const columns1 = [
        { field: 'sr No', headerName: 'sr No', flex: 1, headerClassName: classes1.blueHeader },
        { field: 'Bill No', headerName: 'Bill No', flex: 1, headerClassName: classes1.blueHeader },
        { field: 'bill Date	', headerName: 'bill Date', flex: 1, headerClassName: classes1.blueHeader },
        { field: 'Bill Amount', headerName: 'Bill Amount', flex: 1, headerClassName: classes1.blueHeader },
        { field: 'Customer Name', headerName: 'Customer Name', flex: 1, headerClassName: classes1.blueHeader },
        { field: 'PO NO	', headerName: 'PO NO', flex: 1, headerClassName: classes1.blueHeader },
        {
            field: 'action', headerAlign: 'center', headerName: 'Action', flex: 1, headerClassName: classes.blueHeader, renderCell: (params) => (
                <div style={{ display: 'flex', gap: '4px', justifyContent: 'left' }}>
                    <Tooltip title="Edit">
                        <IconButton style={{ color: 'black' }}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="View">
                        <IconButton style={{ color: 'black' }}>
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Print">
                        <IconButton style={{ color: 'black' }}>
                            <PrintIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Block">
                        <IconButton style={{ color: 'black' }}>
                            <BlockIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Mail">
                        <IconButton style={{ color: 'black' }}>
                            <MailOutlineIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            )
        },

    ];



    const columnss = [
        { field: 'sr No', headerName: 'sr No', flex: 1, headerClassName: classes.blueHeader },
        { field: 'Description', headerName: 'Description	', flex: 1, headerClassName: classes.blueHeader },
        { field: 'Service Number', headerName: 'Service Number', flex: 1, headerClassName: classes.blueHeader },
        { field: 'Quantity	', headerName: 'Quantity', flex: 1, headerClassName: classes.blueHeader },
        { field: 'Rate	', headerName: 'Rate', flex: 1, headerClassName: classes.blueHeader },
        { field: 'Amount', headerName: 'Amount', flex: 1, headerClassName: classes.blueHeader },
        {
            field: 'action', headerAlign: 'center', headerName: 'Action', flex: 1, headerClassName: classes.blueHeader, renderCell: (params) => (
                <div style={{ display: 'flex', gap: '4px', justifyContent: 'left' }}>
                    <Tooltip title="Edit">
                        <IconButton style={{ color: 'black' }}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="View">
                        <IconButton style={{ color: 'black' }}>
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Print">
                        <IconButton style={{ color: 'black' }}>
                            <PrintIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Block">
                        <IconButton style={{ color: 'black' }}>
                            <BlockIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Mail">
                        <IconButton style={{ color: 'black' }}>
                            <MailOutlineIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton style={{ color: 'black' }} >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>

            )
        },

    ];

    const rowss = [
        {
            id: 1,
            sn: 1,

        }
    ];
    const handleSaccodeChange = (event) => {
        setSelectedSACCode(event.target.value);
    };


    const handleSubmit = async () => {
        const dataToSend = {
            id,
            ...formData,
            SACCode: selectedSACCode,
            BillDate: billDate,
            ConsignorID: selectedCustomer ? selectedCustomer.customer_id : '',
            ConsigneeID: selectedConsignee ? selectedConsignee.customer_id : '',
            BillingAddress: selectedBillingAddress ? selectedBillingAddress.customer_id : '',
            PoCustomerId: selectedpoCustomer ? selectedpoCustomer.customer_id : '',
            PoNoid: selectedpoNo ? selectedpoNo.id : '',
            PoNo: selectedpoNo ? selectedpoNo.po_no : '',
            PoLineID: selectedpoLine ? selectedpoLine.id : '',
            PoDate: poDate ,
            GSTno: selectedGstNos ? selectedGstNos.id : '',
            State: gstState,
            LocalCustomerId: selectedLocalCustomer ? selectedLocalCustomer.customer_id : '',
            CollectionFromId: selectedCollectionFrom ? selectedCollectionFrom.customer_id : '',
            CollectionToId: selectedCollectionTo ? selectedCollectionTo.customer_id : '',
            DeliveryFromId: selectedDeliveryFrom ? selectedDeliveryFrom.customer_id : '',
            DeliveryToId: selectedDeliveryTo ? selectedDeliveryTo.customer_id : '',
            details: tableData,
            TotalInvoiceWeight: totalCft,
            lrCount: lrCount,
            ...textFieldValues


        };
        try {
            const response = await updateSaleInvoice(dataToSend);
            console.log('API Response:', response.data);

            setSnackbarMessage(response.data.message || 'Invoice submitted successfully!');
            setSnackbarColor('green');
            setTimeout(() => {
                navigate('/view-sales-invoice-list');
            }, 2000);
        } catch (error) {
            console.error('API Error:', error.response ? error.response.data : error.message);
            const errorMessage = error.response?.data?.message || 'Failed to submit invoice.';
            setSnackbarMessage(errorMessage);
            setSnackbarColor('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id, customerOptions, poCustomerOptions, poNo, poLineOptions, GstNos]);

    return (
        <>
            {loading && <LoadingSpinner />}
            <Grid container  >
                <Grid item xs={6} md={2}>
                    <TextField
                        className="customTextField"
                        name="User Name :"

                        label="User Name :"
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={6} md={2} sx={{ float: 'center' }}>
                </Grid>
                <Grid item xs={6} md={2} ml={16} sx={{ float: 'center' }}>
                    <Typography
                        sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, marginLeft: 2 }}
                    >
                        SALES INVOICE
                    </Typography>
                </Grid>
            </Grid>


            <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

            <Grid container spacing={2} style={{ marginLeft: '0.1%', fontSize: '20px', fontFamily: 'Poppins', marginBottom: '1.5%' }}>Bill Details</Grid>

            <Grid container spacing={1} sx={{ marginTop: '2px', marginBottom: '2%' }}>
                <Grid item xs={2.4}>
                    <TextField
                        className="customTextField"
                        name="year"
                        label="Year"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={formData.year}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <TextField
                        className="customTextField"
                        name="BillNo"
                        label="Bill No:"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={formData.BillNo}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <Box style={fixedHeight}>
                        <FormControl fullWidth size="small">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    name="Bill Date:"
                                    format="MM-DD-YYYY"
                                    label="Bill Date:"
                                    value={billDate}
                                    onChange={handleDateChange}
                                    slotProps={{ textField: { size: "small" } }}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Box>
                </Grid>

                <Grid item xs={2.4}>
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel id="sac-code-label">SAC Code</InputLabel>
                        <Select
                            labelId="sac-code-label"
                            value={selectedSACCode}
                            onChange={handleSaccodeChange}
                            label="SAC Code"
                            className="customSelect"
                        >
                            {sacCodeOptions.map((option) => (
                                <MenuItem key={option.code} value={option.code}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={2.4}>
                    <Autocomplete
                        id="consignor-autocomplete"
                        options={customerOptions}
                        getOptionLabel={(option) => option.customer_name}
                        value={selectedCustomer}
                        onChange={(event, newValue) => setSelectedCustomer(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Consignor Name:"
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
                        value={selectedConsignee}
                        onChange={(event, newValue) => setSelectedConsignee(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Consignee Name:"
                                fullWidth
                                size="small"
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <Autocomplete
                        id="consignor-autocomplete"
                        options={poCustomerOptions}
                        getOptionLabel={(option) => option.customer_name}
                        onChange={(event, newValue) => setSelectedBillingAddress(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Billing Address:"
                                fullWidth
                                size="small"
                            />
                        )}
                    />
                </Grid>
            </Grid>

            <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

            <Grid container spacing={2} style={{ marginLeft: '0.1%', fontSize: '20px', fontFamily: 'Poppins', marginBottom: '1.5%' }}>PO Details</Grid>

            <Grid container spacing={1} sx={{ marginTop: '2px', marginBottom: '2%' }}>
                <Grid item xs={2.4}>
                    <Autocomplete
                        id="consignor-autocomplete"
                        options={poCustomerOptions}
                        getOptionLabel={(option) => option.customer_name}
                        value={selectedpoCustomer}
                        onChange={(event, newValue) => setSelectedPoCustomer(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Po Customer Name:"
                                fullWidth
                                size="small"
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <Autocomplete
                        id="consignor-autocomplete"
                        options={poNo || []}
                        getOptionLabel={(option) => option.po_no}
                        value={selectedpoNo}
                        onChange={(event, newValue) => setSelectedPoNo(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Po No:"
                                fullWidth
                                size="small"
                            />
                        )}
                    />
                </Grid>



                <Grid item xs={2.4}>
                    <TextField
                        className="customTextField"
                        name="PoNo"
                        label="Po No:"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={selectedpoNo ? selectedpoNo.po_no : ''}
                    />
                </Grid>



                <Grid item xs={2.4}>
                    <Autocomplete
                        id="consignor-autocomplete"
                        options={poLineOptions || []}
                        getOptionLabel={(option) => option.po_line_no}
                        value={selectedpoLine}
                        onChange={(event, newValue) => setSelectedPoLine(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Po Line:"
                                fullWidth
                                size="small"
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <Box style={fixedHeight}>
                        <FormControl fullWidth size="small">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    name="Po Date:"
                                    format="MM-DD-YYYY"
                                    label="Po Date:"
                                    value={poDate}
                                    onChange={(date) => setPoDate(date)}
                                    slotProps={{ textField: { size: 'small' } }}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Box>
                </Grid>

                <Grid item xs={2.4}>
                    <Autocomplete
                        id="consignor-autocomplete"
                        options={GstNos}
                        getOptionLabel={(option) => option.gstno}
                        value={selectedGstNos}
                        onChange={(event, newValue) => setSelectedGstNos(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="GST No:"
                                fullWidth
                                size="small"
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <TextField
                        className="customTextField"
                        name="State"
                        label="State:"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={gstState}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>

            </Grid>


            <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

            <Grid container spacing={2} style={{ marginLeft: '0.1%', fontSize: '20px', fontFamily: 'Poppins', marginBottom: '1.5%' }}>Local Customer Details</Grid>

            <Grid container spacing={1} sx={{ marginTop: '2px', marginBottom: '2%' }}>
                <Grid item xs={2.4}>
                    <Autocomplete
                        id="consignor-autocomplete"
                        options={customerOptions}
                        getOptionLabel={(option) => option.customer_name}
                        onChange={(event, newValue) => setSelectedConsignee(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Local Customer:"
                                fullWidth
                                size="small"
                            />
                        )}
                    />
                </Grid>
            </Grid>

            <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

            <Grid container spacing={2} style={{ marginLeft: '0.1%', fontSize: '20px', fontFamily: 'Poppins', marginBottom: '1.5%' }}>Collection Details</Grid>

            <Grid container spacing={1} sx={{ marginTop: '2px', marginBottom: '2%' }}>
                <Grid item xs={2.4}>
                    <TextField
                        className="customTextField"
                        name="collectionTrip"
                        label=" Collection Trip:"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={formData.collectionTrip}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <TextField
                        className="customTextField"
                        name="CollectionRate"
                        label=" Collection Rate:"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={formData.CollectionRate}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    &#8377;
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <Autocomplete
                        id="consignor-autocomplete"
                        options={customerOptions}
                        getOptionLabel={(option) => option.customer_name}
                        value={selectedCollectionFrom}
                        onChange={(event, newValue) => setSelectedCollectionFrom(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Collection From:"
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
                        value={selectedCollectionTo}
                        onChange={(event, newValue) => setSelectedCollectionTo(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Collection To:"
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
                        value={selectedLocalCustomer}
                        onChange={(event, newValue) => setSelectedLocalCustomer(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Local Customer:"
                                fullWidth
                                size="small"
                            />
                        )}
                    />
                </Grid>
            </Grid>

            <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

            <Grid container spacing={2} style={{ marginLeft: '0.1%', fontSize: '20px', fontFamily: 'Poppins', marginBottom: '1.5%' }}>Delivery Details</Grid>

            <Grid container spacing={1} sx={{ marginTop: '2px', marginBottom: '2%' }}>
                <Grid item xs={2.4}>
                    <TextField
                        className="customTextField"
                        name="DelieveryTrip"
                        label=" Delievery Trip"
                        fullWidth
                        value={formData.DelieveryTrip}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <TextField
                        className="customTextField"
                        name="DelieveryRate"
                        label=" Delievery Rate:"
                        fullWidth
                        value={formData.DelieveryRate}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    &#8377;
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <Autocomplete
                        id="consignor-autocomplete"
                        options={customerOptions}
                        getOptionLabel={(option) => option.customer_name}
                        value={selectedDeliveryFrom}
                        onChange={(event, newValue) => setSelectedDeliveryFrom(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Delievery From:"
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
                        value={selectedDeliveryTo}
                        onChange={(event, newValue) => setSelectedDeliveryTo(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Delievery To:"
                                fullWidth
                                size="small"
                            />
                        )}
                    />
                </Grid>
            </Grid>

            <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

            <Grid container spacing={2} style={{ marginLeft: '0.1%', fontSize: '20px', fontFamily: 'Poppins', marginBottom: '1.5%' }}>Rate Details</Grid>

            <Grid container spacing={1} sx={{ marginTop: '2px', marginBottom: '2%' }}>
                <Grid item xs={2.4}>
                    <TextField
                        className="customTextField"
                        name="Rate"
                        label=" Rate"
                        value={formData.Rate}
                        onChange={handleRateChange}
                        fullWidth
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    &#8377;
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>



                <Grid item xs={2.4}>
                    <TextField
                        className="customTextField"
                        name="CGST"
                        label=" CGST%"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={formData.CGST}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <TextField
                        className="customTextField"
                        name="sgst"
                        label="SGST%"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={formData.sgst}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <TextField
                        className="customTextField"
                        name="IGST"
                        label=" IGST%"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={formData.IGST}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <Autocomplete
                        options={[]}
                        //getOptionLabel={(option) => option.label}
                        //onChange={(event, value) => formik.setFieldValue('assignedCrew', value || null)}
                        //value={formik.values.assignedCrew}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="UOM"
                                variant="outlined"
                                fullWidth
                                size='small'
                                name="assignedCrew"
                            //error={formik.errors.assignedCrew && formik.touched.assignedCrew}
                            //helperText={formik.touched.assignedCrew ? formik.errors.assignedCrew : ''}
                            //onBlur={formik.handleBlur}

                            />
                        )}
                    />
                </Grid>
            </Grid>

            <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

            <Grid container spacing={2} style={{ marginLeft: '0.1%', fontSize: '20px', fontFamily: 'Poppins', marginBottom: '1.5%' }}>Exempted Details</Grid>

            <Grid container spacing={1} sx={{ marginTop: '2px', marginBottom: '2%' }}>
                <Grid item xs={2.4}>
                    <TextField
                        className="customTextField"
                        name="ExemptedDescription"
                        label=" Exempted Description"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={formData.ExemptedDescription}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <TextField
                        className="customTextField"
                        name="Quantity"
                        label="Quantity"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={formData.Quantity}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <TextField
                        className="customTextField"
                        name="ExamptedRate"
                        label=" Rate"
                        fullWidth
                        value={formData.ExamptedRate}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    &#8377;
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <TextField
                        className="customTextField"
                        name="ExemptedAmount"
                        label="  Exempted Amount"
                        fullWidth
                        value={formData.ExemptedAmount}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    &#8377;
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

            </Grid>

            <Grid container sx={{ justifyContent: 'center', alignItems: 'center', marginBottom: '2%' }}>
                <Grid item>
                    <Button variant="contained" color="success" style={{ padding: '5px 50px' }}>+Add</Button>
                </Grid>
            </Grid>

            <Box sx={{ height: 290, width: "100%" }}>
                <DataGrid
                    rows={rowss}
                    columns={columnss}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </Box>

            <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

            <Grid item xs={6} md={2} ml={16} sx={{ float: 'center' }}>
                <Typography
                    sx={{ fontFamily: 'poppins', fontSize: '1.75rem', marginBottom: 2, marginLeft: 2 }}
                >
                    Load Type

                </Typography>
            </Grid>



            <Grid container spacing={3} style={{ padding: '10px', marginBottom: '2%' }}>
                <Grid container item xs={3} direction="column" spacing={2} justifyContent="left" alignItems="flex-start" textAlign="left">
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="loadingCharges"
                                    onChange={handleCheckboxChanges}
                                    checked={fieldsVisibility.loadingCharges}
                                />
                            }
                            label="Loading Charges"
                        />
                        {fieldsVisibility.loadingCharges && (
                            <Grid container direction="row" spacing={2}>
                                <Grid item>
                                    <TextField
                                        label="Quantity"
                                        variant="outlined"
                                        name='loadingChargesQuantity'
                                        size="small"
                                        value={textFieldValues.loadingChargesQuantity}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Amount"
                                        variant="outlined"
                                        name='loadingChargesAmount'
                                        size="small"
                                        value={textFieldValues.loadingChargesAmount}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="load909"
                                    onChange={handleCheckboxChanges}
                                    checked={fieldsVisibility.load909}
                                />
                            }
                            label="909 Load"
                        />
                        {fieldsVisibility.load909 && (
                            <Grid container direction="row" spacing={2}>
                                <Grid item>
                                    <TextField
                                        label="Quantity"
                                        variant="outlined"
                                        name='load909Quantity'
                                        size="small"
                                        value={textFieldValues.load909Quantity}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Amount"
                                        variant="outlined"
                                        name='load909Amount'
                                        size="small"
                                        value={textFieldValues.load909Amount}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="detentionCharges"
                                    onChange={handleCheckboxChanges}
                                    checked={fieldsVisibility.detentionCharges}
                                />
                            }
                            label="Detention Charges"
                        />
                        {fieldsVisibility.detentionCharges && (
                            <Grid container direction="row" spacing={2}>
                                <Grid item>
                                    <TextField
                                        label="Quantity"
                                        variant="outlined"
                                        name='detentionChargesQuantity'
                                        size="small"
                                        value={textFieldValues.detentionChargesQuantity}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Amount"
                                        variant="outlined"
                                        name='detentionChargesAmount'
                                        size="small"
                                        value={textFieldValues.detentionChargesAmount}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="pickUp"
                                    onChange={handleCheckboxChanges}
                                    checked={fieldsVisibility.pickUp}
                                />
                            }
                            label="Pick Up"
                        />
                        {fieldsVisibility.pickUp && (
                            <Grid container direction="row" spacing={2}>
                                <Grid item>
                                    <TextField
                                        label="Quantity"
                                        variant="outlined"
                                        name='pickUpQuantity'
                                        size="small"
                                        value={textFieldValues.pickUpQuantity}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Amount"
                                        variant="outlined"
                                        name='pickUpAmount'
                                        size="small"
                                        value={textFieldValues.pickUpAmount}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>

                {/* Column 2 */}
                <Grid container item xs={3} direction="column" spacing={2} justifyContent="left" alignItems="flex-start" textAlign="left">
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="unloadingCharges"
                                    onChange={handleCheckboxChanges}
                                    checked={fieldsVisibility.unloadingCharges}
                                />
                            }
                            label="Unloading Charges"
                        />
                        {fieldsVisibility.unloadingCharges && (
                            <Grid container direction="row" spacing={2}>
                                <Grid item>
                                    <TextField
                                        label="Quantity"
                                        variant="outlined"
                                        name='unloadingChargesQuantity'
                                        size="small"
                                        value={textFieldValues.unloadingChargesQuantity}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Amount"
                                        variant="outlined"
                                        name='unloadingChargesAmount'
                                        size="small"
                                        value={textFieldValues.unloadingChargesAmount}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="load407"
                                    onChange={handleCheckboxChanges}
                                    checked={fieldsVisibility.load407}
                                />
                            }
                            label="407 Load"
                        />
                        {fieldsVisibility.load407 && (
                            <Grid container direction="row" spacing={2}>
                                <Grid item>
                                    <TextField
                                        label="Quantity"
                                        variant="outlined"
                                        name='load407Quantity'
                                        size="small"
                                        value={textFieldValues.load407Quantity}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Amount"
                                        variant="outlined"
                                        name='load407Amount'
                                        size="small"
                                        value={textFieldValues.load407Amount}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="otherCharges"
                                    onChange={handleCheckboxChanges}
                                    checked={fieldsVisibility.otherCharges}
                                />
                            }
                            label="Other Charges"
                        />
                        {fieldsVisibility.otherCharges && (
                            <Grid container direction="row" spacing={2}>
                                <Grid item>
                                    <TextField
                                        label="Quantity"
                                        variant="outlined"
                                        name='otherChargesQuantity'
                                        size="small"
                                        value={textFieldValues.otherChargesQuantity}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Amount"
                                        variant="outlined"
                                        name='otherChargesAmount'
                                        size="small"
                                        value={textFieldValues.otherChargesAmount}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="twoWheeler"
                                    onChange={handleCheckboxChanges}
                                    checked={fieldsVisibility.twoWheeler}
                                />
                            }
                            label="2 Wheeler"
                        />
                        {fieldsVisibility.twoWheeler && (
                            <Grid container direction="row" spacing={2}>
                                <Grid item>
                                    <TextField
                                        label="Quantity"
                                        variant="outlined"
                                        name='twoWheelerQuantity'
                                        size="small"
                                        value={textFieldValues.twoWheelerQuantity}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Amount"
                                        variant="outlined"
                                        name='twoWheelerAmount'
                                        size="small"
                                        value={textFieldValues.twoWheelerAmount}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                <Grid container item xs={3} direction="column" spacing={2} justifyContent="left" alignItems="flex-start" textAlign="left">
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="multiAxle32Feet"
                                    onChange={handleCheckboxChanges}
                                    checked={fieldsVisibility.multiAxle32Feet}
                                />
                            }
                            label="32 Feet Multi Axle"
                        />
                        {fieldsVisibility.multiAxle32Feet && (
                            <Grid container direction="row" spacing={2}>
                                <Grid item>
                                    <TextField
                                        label="Quantity"
                                        variant="outlined"
                                        name='multiAxle32FeetQuantity'
                                        size="small"
                                        value={textFieldValues.multiAxle32FeetQuantity}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Amount"
                                        variant="outlined"
                                        name='multiAxle32FeetAmount'
                                        size="small"
                                        value={textFieldValues.multiAxle32FeetAmount}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="tataAce"
                                    onChange={handleCheckboxChanges}
                                    checked={fieldsVisibility.tataAce}
                                />
                            }
                            label="Tata Ace"
                        />
                        {fieldsVisibility.tataAce && (
                            <Grid container direction="row" spacing={2}>
                                <Grid item>
                                    <TextField
                                        label="Quantity"
                                        variant="outlined"
                                        name='tataAceQuantity'
                                        size="small"
                                        value={textFieldValues.tataAceQuantity}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Amount"
                                        variant="outlined"
                                        name='tataAceAmount'
                                        size="small"
                                        value={textFieldValues.tataAceAmount}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="mathadi"
                                    onChange={handleCheckboxChanges}
                                    checked={fieldsVisibility.mathadi}
                                />
                            }
                            label="Mathadi"
                        />
                        {fieldsVisibility.mathadi && (
                            <Grid container direction="row" spacing={2}>
                                <Grid item>
                                    <TextField
                                        label="Quantity"
                                        variant="outlined"
                                        name='mathadiQuantity'
                                        size="small"
                                        value={textFieldValues.mathadiQuantity}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Amount"
                                        variant="outlined"
                                        name='mathadiAmount'
                                        size="small"
                                        value={textFieldValues.mathadiAmount}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                <Grid container item xs={3} direction="column" spacing={2} justifyContent="left" alignItems="flex-start" textAlign="left">
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="feet32"
                                    onChange={handleCheckboxChanges}
                                    checked={fieldsVisibility.feet32}
                                />
                            }
                            label="32 Feet"
                        />
                        {fieldsVisibility.feet32 && (
                            <Grid container direction="row" spacing={2}>
                                <Grid item>
                                    <TextField
                                        label="Quantity"
                                        variant="outlined"
                                        name='feet32Quantity'
                                        size="small"
                                        value={textFieldValues.feet32Quantity}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Amount"
                                        variant="outlined"
                                        name='feet32Amount'
                                        size="small"
                                        value={textFieldValues.feet32Amount}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="threeWheeler"
                                    onChange={handleCheckboxChanges}
                                    checked={fieldsVisibility.threeWheeler}
                                />
                            }
                            label="3 Wheeler"
                        />
                        {fieldsVisibility.threeWheeler && (
                            <Grid container direction="row" spacing={2}>
                                <Grid item>
                                    <TextField
                                        label="Quantity"
                                        variant="outlined"
                                        name='threeWheelerQuantity'
                                        size="small"
                                        value={textFieldValues.threeWheelerQuantity}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Amount"
                                        variant="outlined"
                                        name='threeWheelerAmount'
                                        size="small"
                                        value={textFieldValues.threeWheelerAmount}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="load1109"
                                    onChange={handleCheckboxChanges}
                                    checked={fieldsVisibility.load1109}
                                />
                            }
                            label="1109 Load"
                        />
                        {fieldsVisibility.load1109 && (
                            <Grid container direction="row" spacing={2}>
                                <Grid item>
                                    <TextField
                                        label="Quantity"
                                        variant="outlined"
                                        name='load1109Quantity'
                                        size="small"
                                        value={textFieldValues.load1109Quantity}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Amount"
                                        variant="outlined"
                                        name='load1109Amount'
                                        size="small"
                                        value={textFieldValues.load1109Amount}
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>

            <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

            <Grid container spacing={2} style={{ marginLeft: '0.1%', fontSize: '20px', fontFamily: 'Poppins', marginBottom: '1.5%' }}>LR Details</Grid>
            <Grid item xs={12} mt={1} mb={1}>
                <Box style={scrollableBoxStyle}>
                    {lrNumbers.length > 0 ? (
                        <List
                            height={300}
                            itemCount={Math.ceil(lrNumbers.length / 5)}
                            itemSize={30}
                            width="100%"
                            itemData={{ lrNumbers, selectedLrIds, handleCheckboxChange }}
                        >
                            {Row}
                        </List>
                    ) : (
                        <Typography></Typography>
                    )}
                </Box>
            </Grid>

            <Grid container sx={{ justifyContent: 'center', alignItems: 'center', marginBottom: '2%' }}>
                <Grid item>
                    <Button variant="contained" color="success" style={{ padding: '5px 50px' }} onClick={handleAddButtonClick}>add</Button>
                </Grid>
            </Grid>

            <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

            <Grid marginBottom={2}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow className={classes.header}>
                                {columns.map(col => (
                                    <TableCell key={col.field} className={classes.cell}>
                                        {col.field === 'no_of_articles' ? (
                                            <>
                                                No.Articles
                                                <Radio
                                                    checked={selectedRadio === 'no_of_articles'}
                                                    onChange={handleRadioChange('no_of_articles')}
                                                    value="no_of_articles"
                                                    name="noOfArticlesRadio"
                                                    inputProps={{ 'aria-label': 'no of articles radio' }}
                                                    className={classes.radio}
                                                />
                                            </>
                                        ) : col.field === 'quantity' ? (
                                            <>
                                                Qty
                                                <Radio
                                                    checked={selectedRadio === 'quantity'}
                                                    onChange={handleRadioChange('quantity')}
                                                    value="quantity"
                                                    name="quantityRadio"
                                                    inputProps={{ 'aria-label': 'quantity radio' }}
                                                    className={classes.radio}
                                                />
                                            </>
                                        ) : col.field === 'cft' ? (
                                            <>
                                                CFT
                                                <Radio
                                                    checked={selectedRadio === 'cft'}
                                                    onChange={handleRadioChange('cft')}
                                                    value="cft"
                                                    name="cftRadio"
                                                    inputProps={{ 'aria-label': 'cft radio' }}
                                                    className={classes.radio}
                                                />
                                            </>
                                        ) : col.field === 'actual_wt' ? (
                                            <>
                                                Weight
                                                <Radio
                                                    checked={selectedRadio === 'actual_wt'}
                                                    onChange={handleRadioChange('actual_wt')}
                                                    value="actual_wt"
                                                    name="weightRadio"
                                                    inputProps={{ 'aria-label': 'weight radio' }}
                                                    className={classes.radio}
                                                />
                                            </>
                                        ) : (
                                            col.headerName
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map(row => (
                                <TableRow key={row.id}>
                                    {columns.map(col => (
                                        <TableCell key={col.field} className={classes.cell}>
                                            {col.field === 'no_of_articles' ? (
                                                <TextField
                                                    value={row[col.field] || ''}
                                                    onChange={handleInputChange('no_of_articles', row.id)}
                                                    fullWidth
                                                    size='small'
                                                    className={classes.textField}
                                                />
                                            ) : col.field === 'quantity' ? (
                                                <TextField
                                                    value={row[col.field] || ''}
                                                    onChange={handleInputChange('quantity', row.id)}
                                                    fullWidth
                                                    size='small'
                                                    className={classes.textField}
                                                />
                                            ) : col.field === 'cft' ? (
                                                <TextField
                                                    value={row[col.field] || ''}
                                                    onChange={handleInputChange('cft', row.id)}
                                                    fullWidth
                                                    size='small'
                                                    className={classes.textField}
                                                />
                                            ) : col.field === 'actual_wt' ? (
                                                <TextField
                                                    value={row[col.field] || ''}
                                                    onChange={handleInputChange('actual_wt', row.id)}
                                                    fullWidth
                                                    size='small'
                                                    className={classes.textField}
                                                />
                                            ) : (
                                                row[col.field] || ''
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>
            <Grid container spacing={1} sx={{ marginTop: '2px', marginBottom: '2%' }}>
                <Grid item xs={2.4}>
                    <TextField
                        className="customTextField"
                        name="Total Invoice Weight:"
                        value={totalCft}
                        label="Total Invoice Weight:"
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <TextField
                        className="customTextField"
                        name="LRCount"
                        label="LR Count:"
                        value={lrCount}
                        onChange={handleLrCountChange}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <TextField
                        className="customTextField"
                        name="LRCharge"
                        label="LR Charge:"
                        value={formData.LRCharge}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    &#8377;
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>

            <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

            <Grid container spacing={1} sx={{ marginTop: '2px', marginBottom: '2%' }}>
                <Grid item xs={12}>
                    <TextField
                        className="customTextField"
                        name="Remarks"
                        label="Remarks:"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={formData.Remarks}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>

            <Divider style={{ backgroundColor: 'black', marginBottom: '2%' }}></Divider>

            <Grid container spacing={2} sx={{ margin: '0px auto', justifyContent: 'center', alignItems: 'center', marginBottom: '2%' }}>
                <Grid item xs={2}>
                    <Button variant="contained" sx={{ backgroundColor: '#6573c3' }} onClick={handleSubmit} >
                        Update & Original Print
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" sx={{ backgroundColor: '#a881af' }}>
                        Duplicate Print
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" sx={{ backgroundColor: '#dd7973' }}>
                        Extra Print
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" sx={{ backgroundColor: '#002366' }}>
                        Export to Excel
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" sx={{ backgroundColor: '#D92445' }} onClick={handleCancel}>
                        Cancel
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

export default EditSalesInvoice