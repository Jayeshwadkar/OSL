const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./config/dbConfig')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// const corsOptions = {
//     origin: ['http://127.0.0.1:5173', 'http://localhost:3000', 'https://erp.omsairamlogistics.in'],
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
// };
app.use(cors());
//app.use(cors(corsOptions));
 app.options('*', cors());
const login = require('./routes/login');
const user = require('./routes/user');
const branch = require('./routes/Branch');
const artical = require('./routes/artical');
const place = require('./routes/place');
const banks = require('./routes/banks');
const bankacc = require('./routes/bankacc');
const customer = require('./routes/customer');
const driver = require('./routes/driver');
const employee = require('./routes/employee');
const vehicle = require('./routes/vehicle');
const ratemasterlist = require('./routes/ratemasterlist');
const vehicleowener = require('./routes/vehicleowener');
const vehicletype = require('./routes/vehicletype');
const tyresupplier = require('./routes/tyresupplier');
const petrolpump = require('./routes/petrolpump');
const lr = require('./routes/lr');
const loadingtrip = require('./routes/loadingtrip');
const bills = require('./routes/bills');
const deliverystatus = require('./routes/deliverystatus');
const pendinglr = require('./routes/pendinglr');
const lorryreceiptregister = require('./routes/lorryreceiptregister')
const loadingtripregister = require('./routes/loadingtripregister')
const billregister = require('./routes/billregister')
const notbilllorryreceiptstatus = require('./routes/notbilllorryreceiptstatus')
const deliverystatusreport = require('./routes/deliverystatusreport')
const vehiclepayadvicereport = require('./routes/vehiclepayadvicereport')
const PaymentAdviceVehicle = require('./routes/PaymentAdviceVehicle')
const DeliveryUpdateStatus = require("./routes/DeliveryUpdateStatus")
const Transport = require("./routes/transport")
const Reports = require('./routes/Reports')
const Purchase = require('./routes/Purchase')
const Common = require('./routes/Common')
const Master = require('./routes/master')
const LRbillreceipt = require('./routes/LRbillreceipt')
const salesInvoice1 = require('./routes/salesInvoice1')

app.use('/Lrprint', express.static('Lrprint'));
app.use('/LrPDF', express.static('LrPDF'));
app.use('/LRwithoutvalue', express.static('LRwithoutvalue'));
app.use('/Billpdf', express.static('Billpdf'));
app.use('/LoadingTrippdf', express.static('LoadingTrippdf'));
app.use('/api/login', login);
app.use('/api/user', user);
app.use('/api/branch', branch);
app.use('/api/artical', artical);
app.use('/api/place', place);
app.use('/api/banks', banks);
app.use('/api/bankacc', bankacc);
app.use('/api/customer', customer);
app.use('/api/driver', driver);
app.use('/api/employee', employee);
app.use('/api/vehicle', vehicle);
app.use('/api/ratemasterlist', ratemasterlist);
app.use('/api/vehicleowener', vehicleowener);
app.use('/api/vehicletype', vehicletype);
app.use('/api/tyresupplier', tyresupplier);
app.use('/api/petrolpump', petrolpump);
app.use('/api/lr', lr);
app.use('/api/loadingtrip', loadingtrip);
app.use('/api/bills', bills);
app.use('/api/deliverystatus', deliverystatus);
app.use('/api/pendinglr', pendinglr);
app.use('/api/lorryreceiptregister', lorryreceiptregister);
app.use('/api/loadingtripregister', loadingtripregister);
app.use('/api/billregister', billregister);
app.use('/api/notbilllorryreceiptstatus', notbilllorryreceiptstatus);
app.use('/api/deliverystatusreport', deliverystatusreport);
app.use('/api/vehiclepayadvicereport', vehiclepayadvicereport);
app.use('/api/PaymentAdviceVehicle', PaymentAdviceVehicle);
app.use('/api/DeliveryUpdateStatus', DeliveryUpdateStatus);
app.use('/api/transport', Transport);
app.use('/api/purchase', Purchase);
app.use('/api/Reports', Reports);
app.use("/api/Common", Common)
app.use("/api/master", Master)
app.use("/api/LRbillreceipt", LRbillreceipt)
app.use("/api/salesInvoice1", salesInvoice1)
app.get('/', (req, res) => {
    res.json({ message: 'server is working' });
});


const PORT = process.env.PORT || 5300;


app.listen(PORT, () => {
    console.log(`server is running port ${PORT}`);
});
