import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Part_no from "../modules/master/part-no/Part_no";


const UserPermission = lazy(() => import('../modules/users/user-permissions/UserPermission'));
const UserRegistration = lazy(() => import('../modules/users/user-registration/UserRegistration'));
const AddBillreceipt = lazy(() => import('../modules/bills/LR-bill-receipt/add-LR-bill-receipt/AddBillreceipt'));
const ViewBillreceipt = lazy(() => import('../modules/bills/LR-bill-receipt/view-LR-bill-receipt/ViewBillreceipt'));
const AddRegularBill = lazy(() => import('../modules/bills/regular-bill/add-regular-bill/AddRegularBill'));
const ViewRegularBill = lazy(() => import('../modules/bills/regular-bill/view-regular-bill/ViewRegularBill'));
const AddTransporterBill = lazy(() => import('../modules/bills/transporter-bill/add-transporter-bill/AddTransporterBill'));
const ViewTransporterBill = lazy(() => import('../modules/bills/transporter-bill/view-transporter-bill/ViewTransporterBill'));
const AddPurchaseOrderReceipt = lazy(() => import('../modules/purchase/purchase-order/add-purchase-order-receipt/AddPurchaseOrderReceipt'));
const ViewPurchaseOrderReceipt = lazy(() => import('../modules/purchase/purchase-order/view-purchase-order-receipt/ViewPurchaseOrderReceipt'));
const AddSalesInvoice = lazy(() => import('../modules/purchase/sales-invoice/add-sales-invoice/AddSalesInvoice'));
const EditSalesInvoice = lazy(() => import('../modules/purchase/sales-invoice/Edit-sales-Invoice/EditSalesInvoice'));
const ViewSalesInvoiceList = lazy(() => import('../modules/purchase/sales-invoice/view-sales-invoice-list/ViewSalesInvoiceList'));
const AddSalesInvoice2 = lazy(() => import('../modules/purchase/sales-invoice-II/add-sales-invoice-II/AddSalesInvoice2'));
const ViewSalesInvoiceList2 = lazy(() => import('../modules/purchase/sales-invoice-II/view-sales-invoice-list-II/ViewSalesInvoiceList2'));
const Articles = lazy(() => import('../modules/master/articles/Articles'));
const Branches = lazy(() => import('../modules/master/branches/Branches'));
const Customers = lazy(() => import('../modules/master/customers/Customers'));
const Drivers = lazy(() => import('../modules/master/drivers/Drivers'));
const Vehicle = lazy(() => import('../modules/master/vehicle/Vehicle'));
const Vehicle_owner = lazy(() => import('../modules/master/vehicle-owner/Vehicle_owner'));
const Vehicle_type = lazy(() => import('../modules/master/vehicle-type/Vehicle_type'));
const Po_customers = lazy(() => import('../modules/master/po-customers/Po_customers'));
const Employees = lazy(() => import('../modules/master/employees/Employees'));
const Places = lazy(() => import('../modules/master/places/Places'));
const Blank = lazy(() => import('../modules/settings/blank-LR-list/Blank'));
const Range = lazy(() => import('../modules/settings/LR-range-list/Range'));
const Setting = lazy(() => import('../modules/settings/LR-settings/Setting'));
const Add_memo = lazy(() => import('../modules/transactions/collection-freight-memo/add-memo/Add_memo'));
const View_memo = lazy(() => import('../modules/transactions/collection-freight-memo/view-memo/View_memo'));
const AddDeliveryChallan = lazy(() => import('../modules/transactions/delivery-challan/add-delivery-challan/AddDeliveryChallan'));
const ViewDeliveryChallan = lazy(() => import('../modules/transactions/delivery-challan/view-delivery-challan/ViewDeliveryChallan'));
const AddInwardRegister = lazy(() => import('../modules/transactions/inward-register/add-inward-register/AddInwardRegister'));
const ViewInwardRegister = lazy(() => import('../modules/transactions/inward-register/view-inward-register/ViewInwardRegister'));
const Add_memo2 = lazy(() => import('../modules/transactions/line-freight-memo/add-memo/Add_memo2'));
const View_memo2 = lazy(() => import('../modules/transactions/line-freight-memo/view-memos/View_memo2'));
const AddLorryReceipt = lazy(() => import('../modules/transactions/lorry-receipt/add-lorry-receipt/AddLorryReceipt'));
const ViewLorryReceipt = lazy(() => import('../modules/transactions/lorry-receipt/view-lorry-receipt/ViewLorryReceipt'));
const AddPodReceipt = lazy(() => import('../modules/transactions/POD-receipt/add-POD-receipt/AddPodReceipt'));
const ViewPodReceipt = lazy(() => import('../modules/transactions/POD-receipt/view-POD-receipt/ViewPodReceipt'));
const AddPodUpload = lazy(() => import('../modules/transactions/POD-upload/add-POD-upload/AddPodUpload'));
const ViewPodUpload = lazy(() => import('../modules/transactions/POD-upload/view-POD-upload/ViewPodUpload'));
const Add_memo4 = lazy(() => import('../modules/transactions/touching-freight-memo/add-memo/Add_memo4'));
const View_memo4 = lazy(() => import('../modules/transactions/touching-freight-memo/view-memos/View_memo4'));
const Add_memo5 = lazy(() => import('../modules/transactions/customer-end-freight-memo/add-memo/Add_memo5'));
const View_memo5 = lazy(() => import('../modules/transactions/customer-end-freight-memo/view-memos/View_memo5'));
const Registration = lazy(() => import('../modules/users/user-registration/Registration'));
const Dashboard = lazy(() => import('../modules/dashboard/Dashboard'));
const MisReport = lazy(() => import('../modules/reports/mis-report/MisReport'));
const StockReport = lazy(() => import('../modules/reports/stock-report/StockReport'));
const DateWiseReport = lazy(() => import('../modules/reports/lorry-receipt-reports/date-wise-report/DateWiseReport'));
const BranchWiseReportReport = lazy(() => import('../modules/reports/lorry-receipt-reports/branch-wise-report/BranchWiseReportReport'));
const CustomerWiseReport = lazy(() => import('../modules/reports/lorry-receipt-reports/customer-wise-report/CustomerWiseReport'));
const DateWiseReportt = lazy(() => import('../modules/reports/delievery-challan-reports/date-wise-report/DateWiseReportt'));
const BranchWiseReportt = lazy(() => import('../modules/reports/delievery-challan-reports/date-wise-report/DateWiseReportt'));
const CollectionFreightReport = lazy(() => import('../modules/reports/freight-memo-reports/collection-freight-report/CollectionFreightReport'));
const LineFreightReport = lazy(() => import('../modules/reports/freight-memo-reports/line-freight-report/LineFreightReport'));
const CustomerEndFreightReport = lazy(() => import('../modules/reports/freight-memo-reports/customer-end-freight-report/CustomerEndFreightReport'));
const TouchingFreightReport = lazy(() => import('../modules/reports/freight-memo-reports/touching-freight-report/TouchingFreightReport'));
const TransporterBillReport = lazy(() => import('../modules/reports/transporter-bill-report/TransporterBillReport'));
const TransporterBillReporttally = lazy(() => import('../modules/reports/transporter-bill-report(tally)/TransporterBillReporttally'));
const PODReceiptReport = lazy(() => import('../modules/reports/POD-receipt-report/PODReceiptReport'));
const LRBillReport = lazy(() => import('../modules/reports/LR-bill-report/LRBillReport'));
const Purchaseorderreports = lazy(() => import('../modules/reports/Purchase-Order-Reports/Purchaseorderreports'));
const SaleInvoiceReport = lazy(() => import('../modules/reports/sale-invoice-report/SaleInvoiceReport'));
const SaleInvoiceReportII = lazy(() => import('../modules/reports/sale-invoice-report/SaleInvoiceReportII'));
const Add_Articles = lazy(() => import('../modules/master/articles/add articles/Add_Articles'));
const Add_Places = lazy(() => import('../modules/master/places/add Places/Add_Places'));
const Add_Branches = lazy(() => import('../modules/master/branches/add branches/Add_Branches'));
const Add_Customer = lazy(() => import('../modules/master/customers/add customer/Add_Customer'));
const Add_Drivers = lazy(() => import('../modules/master/drivers/add drivers/Add_Drivers'));
const Add_Employees = lazy(() => import('../modules/master/employees/add employees/Add_Employees'));
const Add_Vehicle = lazy(() => import('../modules/master/vehicle/add vehicle/Add_Vehicle'));
const AddOwner = lazy(() => import('../modules/master/vehicle-owner/add owner/AddOwner'));
const Add_Vehicle_Type = lazy(() => import('../modules/master/vehicle-type/add vehicle type/Add_Vehicle_Type'));
const Add_Customer1 = lazy(() => import('../modules/master/po-customers/add customer/Add_Customer1'));
const Add_Part_No = lazy(() => import('../modules/master/part-no/add part no/Add_Part_No'));
const GST_master = lazy(() => import('../modules/master/GST-master/GST_master'));
const Add_GST_No = lazy(() => import('../modules/master/GST-master/add gst no/Add_GST_No'));
const TDS_Master = lazy(() => import('../modules/master/tds master/TDS_Master'));
const Add_TDS_Master = lazy(() => import('../modules/master/tds master/add tds/Add_TDS_Master'));
const Add_Consignment_Entry = lazy(() => import('../modules/transactions/consignee/add-consignment-entry/Add_Consignment_Entry'));
const View_Consignment_List = lazy(() => import('../modules/transactions/consignee/view-consignment-list/View_Consignment_List'));
const View_FTL = lazy(() => import('../modules/transactions/ftl-direct-delivery/view_ftl/View_FTL'));
const Add_FTL = lazy(() => import('../modules/transactions/ftl-direct-delivery/add-ftl/Add_FTL'));

const Vehicle_Hire = lazy(() => import('../modules/reports/vehicle-hire/Vehicle_Hire'));

const Unloading_Report = lazy(() => import('../modules/reports/unloading-report/Unloading_Report'));
const EditPurchaseOrderReceipt=lazy(() => import('../modules/purchase/purchase-order/edit-purches-order/editpurchesorder'));
const CustomRoutes = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route exact path="/index" element={<Dashboard />} />
          <Route exact path="/user-permission" element={<UserPermission />} />
          <Route exact path="/user-permission/:username" element={<UserPermission />} />
          <Route exact path="/user-registration" element={<UserRegistration />} />
          <Route exact path="/Registration" element={<Registration />} />
          <Route exact path="/Edit_user/:username" element={<Registration />} />
          <Route exact path="/Add_Places" element={<Add_Places />} />
          <Route exact path="/Add_Branches" element={<Add_Branches />} />
          <Route exact path="/Add_Customer" element={<Add_Customer />} />
          <Route exact path="/Add_Drivers" element={<Add_Drivers />} />
          <Route exact path="/Add_Employees" element={<Add_Employees />} />
          <Route exact path="/Add_Vehicle" element={<Add_Vehicle />} />
          <Route exact path="/AddOwner" element={<AddOwner />} />
          <Route exact path="/Add_Vehicle_Type" element={<Add_Vehicle_Type />} />
          <Route exact path="/Add_Customer1" element={<Add_Customer1 />} />
          <Route exact path="/Add_Part_No" element={<Add_Part_No />} />
          <Route exact path="/GST_master" element={<GST_master />} />
          <Route exact path="/Edit_GST_master/:gstmid" element={<Add_GST_No />} />
          <Route exact path="/EditSalesInvoice/:id" element={<EditSalesInvoice />} />
          <Route exact path="/Add_GST_No" element={<Add_GST_No />} />
          <Route exact path="/Add_TDS_Master" element={<Add_TDS_Master />} />

          <Route exact path="/Add_Articles" element={<Add_Articles />} />
          <Route exact path="/Edit_Articles/:articleId" element={<Add_Articles />} />
          <Route exact path="/add-LR-bill-receipt" element={<AddBillreceipt />} />
          <Route exact path="/view-LR-bill-receipt" element={<ViewBillreceipt />} />
          <Route exact path="/add-regular-bill" element={<AddRegularBill />} />
          <Route exact path="/view-regular-bill" element={<ViewRegularBill />} />
          <Route exact path="/add-transporter-bill" element={<AddTransporterBill />} />
          <Route exact path="/view-transporter-bill" element={<ViewTransporterBill />} />

          <Route exact path="/add-purchase-order-receipt" element={<AddPurchaseOrderReceipt />} />
          <Route exact path="view-purchase-order-receipt" element={<ViewPurchaseOrderReceipt />} />
          <Route exact path="add-sales-invoice" element={<AddSalesInvoice />} />
          <Route exact path="view-sales-invoice-list" element={<ViewSalesInvoiceList />} />
          <Route exact path="add-sales-invoice2" element={<AddSalesInvoice2 />} />
          <Route exact path="view-sales-invoice-list2" element={<ViewSalesInvoiceList2 />} />

          <Route exact path="/articles" element={<Articles />} />
          <Route exact path="/places" element={<Places />} />
          <Route exact path="/Edit_places/:placeid" element={<Add_Places />} />
          <Route exact path="/branches" element={<Branches />} />
          <Route exact path="/Edit_branches/:branchid" element={<Add_Branches />} />
          <Route exact path="/customers" element={<Customers />} />
          <Route exact path="/Edit_customer/:custid" element={<Add_Customer />} />
          <Route exact path="/drivers" element={<Drivers />} />
          <Route exact path="/Edit_driver/:driverid" element={<Add_Drivers />} />
          <Route exact path="/employees" element={<Employees />} />
          <Route exact path="/Edit_employee/:empid" element={<Add_Employees />} />
          <Route exact path="/vehicle" element={<Vehicle />} />
          <Route exact path="/Edit_vehicle/:vehicleid" element={<Add_Vehicle />} />
          <Route exact path="/vehicle-owner" element={<Vehicle_owner />} />
          <Route exact path="/Edit_vehicle-owner/:transpid" element={<AddOwner />} />
          <Route exact path="/vehicle-type" element={<Vehicle_type />} />
          <Route exact path="/Edit_vehicle-type/:vehicletid" element={<Add_Vehicle_Type />} />
          <Route exact path="/po-customers" element={<Po_customers />} />
          <Route exact path="/Edit_po-customers/:pocustid" element={<Add_Customer1 />} />
          <Route exact path="/Part_no" element={<Part_no />} />
          <Route exact path="/Edit_Part_no/:partnoid" element={<Add_Part_No />} />
          <Route exact path="/TDS_Master" element={<TDS_Master />} />
          <Route exact path="/Edit_TDS_Master/:tdsmid" element={<Add_TDS_Master />} />


          <Route exact path="/blank-LR-list" element={<Blank />} />
          <Route exact path="/LR-range-list" element={<Range />} />
          <Route exact path="/LR-settings" element={<Setting />} />


          <Route exact path="/add-memo" element={<Add_memo />} />
          <Route exact path="/view-memo" element={<View_memo />} />
          <Route exact path="/add-memo5" element={<Add_memo5 />} />
          <Route exact path="/view-memo5" element={<View_memo5 />} />


          <Route exact path="/add-delivery-challan" element={<AddDeliveryChallan />} />
          <Route exact path="/view-delivery-challan" element={<ViewDeliveryChallan />} />
          <Route exact path="/add-inward-register" element={<AddInwardRegister />} />
          <Route exact path="/view-inward-register" element={<ViewInwardRegister />} />
          <Route exact path="/add-memo2" element={<Add_memo2 />} />
          <Route exact path="/view-memos" element={<View_memo2 />} />
          <Route exact path="/add-lorry-receipt" element={<AddLorryReceipt />} />
          <Route exact path="/view-lorry-receipt" element={<ViewLorryReceipt />} />
          <Route exact path="/add-POD-receipt" element={<AddPodReceipt />} />
          <Route exact path="/view-POD-receipt" element={<ViewPodReceipt />} />
          <Route exact path="/add-POD-upload" element={<AddPodUpload />} />
          <Route exact path="/view-POD-upload" element={<ViewPodUpload />} />
          <Route exact path="/add-memo4" element={<Add_memo4 />} />
          <Route exact path="/view-memo4" element={<View_memo4 />} />


          <Route exact path="/MisReport" element={<MisReport />} />
          <Route exact path="/StockReport" element={<StockReport />} />
          <Route exact path="/DateWiseReport" element={<DateWiseReport />} />
          <Route exact path="/BranchWiseReportReport" element={<BranchWiseReportReport />} />
          <Route exact path="/CustomerWiseReport" element={<CustomerWiseReport />} />
          <Route exact path="/DateWiseReportt" element={<DateWiseReportt />} />
          <Route exact path="/BranchWiseReportt" element={<BranchWiseReportt />} />
          {/* <Route exact path="/VehiclehWiseReport" element={<VehiclehWiseReport />} /> */}

          <Route exact path="/CollectionFreightReport" element={<CollectionFreightReport />} />
          <Route exact path="/LineFreightReport" element={<LineFreightReport />} />
          <Route exact path="/CustomerEndFreightReport" element={<CustomerEndFreightReport />} />
          <Route exact path="/TouchingFreightReport" element={<TouchingFreightReport />} />

          <Route exact path="/TransporterBillReport" element={<TransporterBillReport />} />
          <Route exact path="/TransporterBillReporttally" element={<TransporterBillReporttally />} />
          <Route exact path="/PODReceiptReport" element={<PODReceiptReport />} />
          <Route exact path="/LRBillReport" element={<LRBillReport />} />
          <Route exact path="/Purchaseorderreports" element={<Purchaseorderreports />} />
          <Route exact path="/SaleInvoiceReport" element={<SaleInvoiceReport />} />
          <Route exact path="/SaleInvoiceReportII" element={<SaleInvoiceReportII />} />

          <Route exact path="/Add_Consignment_Entry" element={<Add_Consignment_Entry />} />
          <Route exact path="/View_Consignment_List" element={<View_Consignment_List />} />

          <Route exact path="/View_FTL" element={<View_FTL />} />
          <Route exact path="/Add_FTL" element={<Add_FTL />} />

          <Route exact path="/Vehicle_Hire" element={<Vehicle_Hire />} />
          <Route exact path="/Unloading_Report" element={<Unloading_Report />} />
          <Route exact path="/Edit_purches-order-recipt/:id" element={<EditPurchaseOrderReceipt />} />

        </Routes>
      </Suspense>
    </>
  )
}

export default CustomRoutes