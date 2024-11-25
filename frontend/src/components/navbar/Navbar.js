import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
<div style={{backgroundColor: '#19232f',}}>
<marquee direction="right" style={{  margin: 0, padding: 0 }}>
    <div style={{ color: '#fff', fontFamily: 'Poppins', margin: 0, padding: 0 }}>
        Help Line / IT Support &nbsp;
        Contact No: +919112293931 / +919209054594 &nbsp;
        Email: - it@omsairamlogistics.com
    </div>
</marquee>
</div>

      <nav
        class="navbar navbar-expand-lg"
        style={{ backgroundColor: "#63ac1e" }}
        id="fontfamily"
      >
        <div class="container-fluid">
          {/* Navbar Toggler Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <NavLink className="nav-link" to="/index">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Users
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/user-registration">
                      User Registration
                    </NavLink>
                  </li>

                  <NavLink className="dropdown-item" to="/user-permission">
                    User Permissions
                  </NavLink>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Master
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/articles">
                      Articles
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/places">
                      Places
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/branches">
                      Branches
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/customers">
                      Customers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/drivers">
                      Drivers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/employees">
                      Employees
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/vehicle">
                      Vehicle
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/vehicle-owner">
                      Transporter
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/vehicle-type">
                      Vehicle Type
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/po-customers">
                      PO Customers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/Part_no">
                      Part No.
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/GST_master">
                      GST Master
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/TDS_Master">
                      TDS Master
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Operations
                </a>
                <ul
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li className="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">
                      Consignment
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/Add_Consignment_Entry"
                        >
                          {" "}
                          Add Consignment{" "}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/View_Consignment_List"
                        >
                          {" "}
                          View Consignment{" "}
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  {/* <li className='dropdown-submenu'>
                    <a className="dropdown-item dropdown-toggle" href="#">Lorry Receipt</a>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to="/add-lorry-receipt"> Add Lorry Receipt</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/view-lorry-receipt"> View Lorry Receipt</NavLink></li>
                    </ul>
                  </li> */}
                  <li className="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">
                      Delivery Challan
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/add-delivery-challan"
                        >
                          {" "}
                          Add Delivery Challan
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/view-delivery-challan"
                        >
                          {" "}
                          View Delivery Challan
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  <li className="dropdown-submenu">
                    <a className="dropdown-item dropdown-toggle" href="#">
                      Vehicle Hire
                    </a>
                    <ul className="dropdown-menu">
                      <li className="dropdown-submenu">
                        <a className="dropdown-item dropdown-toggle" href="#">
                          Collection
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <NavLink className="dropdown-item" to="/add-memo">
                              Add Collection
                            </NavLink>
                          </li>
                          <li>
                            <NavLink className="dropdown-item" to="/view-memo">
                              View Collection
                            </NavLink>
                          </li>
                        </ul>
                      </li>

                      <li className="dropdown-submenu">
                        <a class="dropdown-item dropdown-toggle" href="#">
                          Line
                        </a>
                        <ul class="dropdown-menu">
                          <li>
                            <NavLink className="dropdown-item" to="/add-memo2">
                              Add Line
                            </NavLink>
                          </li>
                          <li>
                            <NavLink className="dropdown-item" to="/view-memos">
                              View Line{" "}
                            </NavLink>
                          </li>
                        </ul>
                      </li>

                      <li className="dropdown-submenu">
                        <a class="dropdown-item dropdown-toggle" href="#">
                          Customer End
                        </a>
                        <ul class="dropdown-menu">
                          <li>
                            <NavLink className="dropdown-item" to="/add-memo5">
                              {" "}
                              Add Customer End
                            </NavLink>
                          </li>
                          <li>
                            <NavLink className="dropdown-item" to="/view-memo5">
                              {" "}
                              View Customer End
                            </NavLink>
                          </li>
                        </ul>
                      </li>

                      <li className="dropdown-submenu">
                        <a class="dropdown-item dropdown-toggle" href="#">
                          Touching
                        </a>
                        <ul class="dropdown-menu">
                          <li>
                            <NavLink className="dropdown-item" to="/add-memo4">
                              {" "}
                              Add Touching
                            </NavLink>
                          </li>
                          <li>
                            <NavLink className="dropdown-item" to="/view-memo4">
                              {" "}
                              View Touching
                            </NavLink>
                          </li>
                        </ul>
                      </li>

                      <li className="dropdown-submenu">
                        <a class="dropdown-item dropdown-toggle" href="#">
                          FTL-(Direct Delivery)
                        </a>
                        <ul class="dropdown-menu">
                          <li>
                            <NavLink className="dropdown-item" to="/Add_FTL">
                              {" "}
                              Add FTL-(Direct Delivery)
                            </NavLink>
                          </li>
                          <li>
                            <NavLink className="dropdown-item" to="/View_FTL">
                              {" "}
                              View FTL-(Direct Delivery)
                            </NavLink>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>

                  <li className="dropdown-submenu">
                    <a className="dropdown-item dropdown-toggle" href="#">
                      Unloading Operations
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/add-inward-register"
                        >
                          {" "}
                          Add Inward Register
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/view-inward-register"
                        >
                          {" "}
                          View Inward Register
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  <li className="dropdown-submenu">
                    <a className="dropdown-item dropdown-toggle" href="#">
                      Proof of Delivery Operations
                    </a>
                    <ul className="dropdown-menu">
                      <li className="dropdown-submenu">
                        <a class="dropdown-item dropdown-toggle" href="#">
                          {" "}
                          Upload
                        </a>
                        <ul class="dropdown-menu">
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/add-POD-upload"
                            >
                              Add POD Upload
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/view-POD-upload"
                            >
                              {" "}
                              View POD Upload
                            </NavLink>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown-submenu">
                        <a class="dropdown-item dropdown-toggle" href="#">
                          {" "}
                          Receipt
                        </a>
                        <ul class="dropdown-menu">
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/add-POD-receipt"
                            >
                              {" "}
                              Add POD Receipt
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/view-POD-receipt"
                            >
                              {" "}
                              View POD Receipt
                            </NavLink>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>

                  {/* <li className='dropdown-submenu'>
                    <a className="dropdown-item dropdown-toggle" href="#">Collection Freight Memo</a>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to="/add-memo"> Add Memo</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/view-memo">View Memos</NavLink></li>
                    </ul>
                  </li>
                  <li className='dropdown-submenu'>
                    <a className="dropdown-item dropdown-toggle" href="#">Line Freight Memo</a>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to="/add-memo2">Add Memo</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/view-memos">View Memos </NavLink></li>
                    </ul>
                  </li>
                  <li className='dropdown-submenu'>
                    <a className="dropdown-item dropdown-toggle" href="#">Customer End Freight Memo</a>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to="/add-memo5"> Add Memo</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/view-memo5"> View Memos</NavLink></li>
                    </ul>
                  </li>
                  <li className='dropdown-submenu'>
                    <a className="dropdown-item dropdown-toggle" href="#">Touching Freight Memo</a>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to="/add-memo4"> Add Memo</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/view-memo4"> View Memos</NavLink></li>
                    </ul>
                  </li>
                  <li className='dropdown-submenu'>
                    <a className="dropdown-item dropdown-toggle" href="#">Inward Register</a>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to="/add-inward-register"> Add Inward Register</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/view-inward-register"> View Inward Register</NavLink></li>
                    </ul>
                  </li> */}
                  {/* <li className='dropdown-submenu'>
                    <a className="dropdown-item dropdown-toggle" href="#">POD Upload</a>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to="/add-POD-upload">Add POD Upload</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/view-POD-upload"> View POD Upload</NavLink></li>
                    </ul>
                  </li>
                  <li className='dropdown-submenu'>
                    <a className="dropdown-item dropdown-toggle" href="#">POD Receipt</a>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to="/add-POD-receipt"> Add POD Receipt</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/view-POD-receipt"> View POD Receipt</NavLink></li>
                    </ul>
                  </li> */}
                </ul>
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </a>
                <ul
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li className="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">
                      Transporter Bill
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/add-transporter-bill"
                        >
                          Add Transporter Bill
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/view-transporter-bill"
                        >
                          View Transporter Bill
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  {/* <li className="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">
                      Vehicle Vise
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/Add_Vehicle_Vise"
                        >
                          Add Vehicle Vise
                        </NavLink>
                      </li> */}
                      {/* <li>
                        <NavLink
                          className="dropdown-item"
                          to="/view-transporter-bill"
                        >
                          View Transporter Bill
                        </NavLink>
                      </li> */}
                    {/* </ul>
                  </li> */}
                </ul>
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sales
                </a>
                <ul
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li className="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">
                      Purchase Order
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/add-purchase-order-receipt"
                        >
                          Add Purchase Order Receipt
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/view-purchase-order-receipt"
                        >
                          View Purchase Order Receipt
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  {/* <li className='dropdown-submenu'>
      <a class="dropdown-item dropdown-toggle" href="#">Sales Invoice</a>
      <ul class="dropdown-menu">
        <li><NavLink className="dropdown-item" to="/add-sales-invoice">
          Add Sales Invoice
        </NavLink></li>
        <li><NavLink className="dropdown-item" to="/view-sales-invoice-list">
          View Sales Invoice List
        </NavLink></li>
      </ul>
    </li>

    <li className='dropdown-submenu'>
      <a className="dropdown-item dropdown-toggle" href="#">Sales Invoice II</a>
      <ul className="dropdown-menu">
        <li><NavLink className="dropdown-item" to="/add-sales-invoice2">
          Add Sales Invoice II
        </NavLink></li>
        <li><NavLink className="dropdown-item" to="/view-sales-invoice-list2">
          View Sales Invoice II List
        </NavLink></li>
      </ul>
    </li> */}

                  <li className="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">
                      Sales Invoice
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/add-sales-invoice"
                        >
                          Sales Invoice
                        </NavLink>
                      </li>
                      <li><NavLink className="dropdown-item" to="/add-sales-invoice2">
          Sales Invoice II
        </NavLink></li>
                      <li><NavLink className="dropdown-item" to="/view-sales-invoice-list">
          View Sales Invoice 
        </NavLink></li>
                  
        {/* <li><NavLink className="dropdown-item" to="/view-sales-invoice-list2">
          View Sales Invoice II List
        </NavLink></li> */}
                    </ul>
                  </li>

                  <li className="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">
                      LR Bill Receipt
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/add-LR-bill-receipt"
                        >
                          Add Lr Bill Receipt
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/view-LR-bill-receipt"
                        >
                          View Lr Bill Receipt
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Bills
                </a>
                <ul className="dropdown-menu" aria-labelledby='navbarDropdownMenuLink'>
                  <li className='dropdown-submenu'>
                    <a className="dropdown-item dropdown-toggle" href="#">Regular Bill</a>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to="/add-regular-bill">
                      Add Regular Bill
                  </NavLink></li>
                  <li><NavLink className="dropdown-item" to="/view-regular-bill">
                      View Regular Bill
                  </NavLink></li>
                    </ul>
                  </li>
                  <li className='dropdown-submenu'>
                    <a className="dropdown-item dropdown-toggle" href="#">Transporter Bill</a>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to="/add-transporter-bill">
                      Add Transporter Bill
                  </NavLink></li>
                      <li><NavLink className="dropdown-item" to="/view-transporter-bill">
                      View Transporter Bill
                  </NavLink></li>
                    </ul>
                  </li>
                  <li className='dropdown-submenu'>
                    <a className="dropdown-item dropdown-toggle" href="#">LR Bill Receipt</a>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to="/add-LR-bill-receipt">
                      Add Lr Bill Receipt
                  </NavLink></li>
                      <li><NavLink className="dropdown-item" to="/view-LR-bill-receipt">
                      View Lr Bill Receipt
                  </NavLink></li>
                    </ul>
                  </li>
                </ul>
              </li> */}

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Reports
                </a>
                <ul class="dropdown-menu">
                  <li>
                    {" "}
                    <NavLink
                      className="dropdown-item "
                      to="/MisReport"
                      href="#"
                    >
                      MIS Report
                    </NavLink>{" "}
                  </li>
                  <li>
                    {" "}
                    <NavLink
                      className="dropdown-item "
                      to="/StockReport"
                      href="#"
                    >
                      Stock Report
                    </NavLink>{" "}
                  </li>

                  <li className="dropdown-submenu">
                    <a className="dropdown-item dropdown-toggle" href="#">
                      Operation Report
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item "
                          to="/DateWiseReport"
                          href="#"
                        >
                          Consignment Report
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item "
                          to="DateWiseReportt"
                          href="#"
                        >
                          Delivery Challan Report
                        </NavLink>
                      </li>
                      <li>
                      <NavLink
                          className="dropdown-item "
                          to="Unloading_Report"
                          href="#"
                        >
                          Unloading report
                        </NavLink>
                      </li>
                      <li>

                          <NavLink
                          className="dropdown-item "
                          to="/Vehicle_Hire"
                          href="#"
                        >
                          Vehicle Hire Report
                        </NavLink>
                      
                      </li>
                    </ul>
                  </li>

                  <li className="dropdown-submenu">
                    <a className="dropdown-item dropdown-toggle" href="#">
                      Proof Of Delivery Report
                    </a>

                    <ul class="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item "
                          to="CollectionFreightReport"
                          href="#"
                        >
                          {" "}
                          Upload Report
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="LineFreightReport"
                          href="#"
                        >
                          {" "}
                          Pending Upload Report
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item "
                          to="CustomerEndFreightReport"
                          href="#"
                        >
                          Receipt Report
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="TouchingFreightReport"
                          href="#"
                        >
                          {" "}
                          Pending Receipt Report
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  <li className="dropdown-submenu">
                    <a className="dropdown-item dropdown-toggle" href="#">
                      Account Report
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="TransporterBillReport"
                          href="#"
                        >
                          {" "}
                          Transporter Bill{" "}
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="TransporterBillReporttally"
                          href="#"
                        >
                          {" "}
                          Transporter Bill (Tally)
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  <li className="dropdown-submenu">
                    <a className="dropdown-item dropdown-toggle" href="#">
                      Sales Report
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="PODReceiptReport"
                          href="#"
                        >
                          Purchase order Report
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item "
                          to="SaleInvoiceReport"
                          href="#"
                        >
                          {" "}
                          Sales invoice Billed Report
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="SaleInvoiceReportII"
                          href="#"
                        >
                          Sales invoice Pending Report
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  <li className="dropdown-submenu">
                    <a className="dropdown-item dropdown-toggle" href="#">
                      Master Report
                    </a>
                  </li>

                  {/* <li className='dropdown-submenu'>
                    <a className="dropdown-item dropdown-toggle" href="#">Lorry Receipt Reports</a>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item " to="/DateWiseReport" href="#"> Date Wise Report</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/BranchWiseReportReport" href="#">  Branch Wise Report</NavLink></li>
                      <li><NavLink className="dropdown-item" to="/CustomerWiseReport" href="#">  Customer Wise Report</NavLink></li>
                    </ul>
                  </li> */}
                  {/* <li className='dropdown-submenu'>
                    <a className="dropdown-item dropdown-toggle" href="#">Delievery Challan Reports</a>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item " to="DateWiseReportt" href="#">Date Wise Report</NavLink></li>
                      <li><NavLink className="dropdown-item" to="BranchWiseReportt" href="#"> Branch Wise Report</NavLink></li>
                      <li><NavLink className="dropdown-item" to="VehiclehWiseReport" href="#"> Vehicle Wise Report</NavLink></li>
                    </ul>
                  </li> */}
                  {/* <li className='dropdown-submenu'>
                    <a className="dropdown-item dropdown-toggle" href="#">Freight Memo Reports</a>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item " to="CollectionFreightReport" href="#"> Collection Freight Report</NavLink></li>
                      <li><NavLink className="dropdown-item" to="LineFreightReport" href="#"> Line Freight Report</NavLink></li>
                      <li><NavLink className="dropdown-item " to="CustomerEndFreightReport" href="#"> Customer End Freight Report</NavLink></li>
                      <li><NavLink className="dropdown-item" to="TouchingFreightReport" href="#"> Touching Freight Report</NavLink></li>
                    </ul>
                  </li> */}
                  {/* <li><NavLink className="dropdown-item" to="TransporterBillReport" href="#"> Transporter Bill Reports</NavLink></li>
                  <li><NavLink className="dropdown-item" to="TransporterBillReporttally" href="#"> Transporter Bill Reports (Tally)</NavLink></li>
                  <li><NavLink className="dropdown-item" to="PODReceiptReport" href="#"> POD Receipt Reports</NavLink></li>
                  <li><NavLink className="dropdown-item" to="LRBillReport" href="#"> LR  Bill Report</NavLink></li>
                  <li><NavLink className="dropdown-item" to="Purchaseorderreports" href="#"> Purchase Order Reports</NavLink></li>
                  <li className='dropdown-submenu'>
                    <a className="dropdown-item dropdown-toggle" href="#">Sales Invoice Reports</a>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item " to="SaleInvoiceReport" href="#"> Sales Invoice Reports I</NavLink></li>
                      <li><NavLink className="dropdown-item" to="SaleInvoiceReportII" href="#">Sales Invoice Reports II</NavLink></li>
                    </ul>
                  </li> */}
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Consignment Settings
                </a>
                <ul class="dropdown-menu">
                <li>
                    <NavLink className="dropdown-item" to="/LR-settings">
                      Add Consignment Range
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/LR-range-list">
                      Consignment Range List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/blank-LR-list">
                      Blank Consignment List
                    </NavLink>
                  </li>
                 
              
                </ul>
              </li>

              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Purchase
                </a>
                <ul className="dropdown-menu" aria-labelledby='navbarDropdownMenuLink'>
                  <li className='dropdown-submenu'>
                    <a className="dropdown-item dropdown-toggle" href="#">Purchase Order</a>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to="/add-purchase-order-receipt">
                      Add Purchase Order Receipt
                  </NavLink></li> 
                      <li><NavLink className="dropdown-item" to="/view-purchase-order-receipt">
                      View Purchase Order Receipt
                  </NavLink></li> 
                    </ul>
                  </li>
                  <li className='dropdown-submenu'>
                    <a className="dropdown-item dropdown-toggle" href="#">Sales Invoice</a>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to="/add-sales-invoice">
                      Add Sales Invoice
                  </NavLink></li>
                      <li><NavLink className="dropdown-item" to="/view-sales-invoice-list">
                      View Sales Invoice List
                  </NavLink></li>
                    </ul>
                  </li>

                  <li className='dropdown-submenu'>
                    <a className="dropdown-item dropdown-toggle" href="#">Sales Invoice II</a>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to="/add-sales-invoice2">
                      Add Sales Invoice II
                  </NavLink></li>
                      <li><NavLink className="dropdown-item" to="/view-sales-invoice-list2">
                      View Sales Invoice II List
                  </NavLink></li>
                    </ul>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
