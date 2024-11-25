const db = require("../config/dbConfig");

const getMisRecords = async (req, res) => {
  const fromDate = String(req.query.fromDate || "");
  const toDate = String(req.query.toDate || "");
  const branchId = String(req.query.branchId || "");
  const customerId = String(req.query.customerId || "");
  const page = req.query.page ? parseInt(req.query.page) : null;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : null;
  const offset = page * pageSize;

  try {
    let results;

    if (branchId) {
      if (customerId) {
        [results] = await db.query(
          "CALL listmisrecordsbydatebranchcustomer(?, ?, ?, ?)",
          [fromDate, toDate, branchId, customerId]
        );
      } else {
        [results] = await db.query("CALL listmisrecordsbyBranch(?, ?, ?)", [
          fromDate,
          toDate,
          branchId,
        ]);
      }
    } else if (customerId) {
      [results] = await db.query("CALL listmisrecordsbyCust(?, ?, ?)", [
        fromDate,
        toDate,
        customerId,
      ]);
    } else {
      [results] = await db.query("CALL listmisrecords(?, ?)", [
        fromDate,
        toDate,
      ]);
    }

    // Assuming results[0] contains the actual data rows
    const records = results[0];

    // Structure the data
    const structuredData = records.map((record, index) => ({
      srNo: index + 1,
      id: record.id,
      lrNumber:
        record[
          'CONCAT((SELECT branch_abbreviation FROM branch WHERE branch_id=lorry_reciept_master.branch),"-",lorry_reciept_master.year,lorry_reciept_master.lr_no)'
        ],
      lrDate: record.lr_date,
      vehicleNo: record.vehicleno,
      consignor: record.consignor,
      consignee: record.consignee,
      lrFrom: record.lrFrom,
      lrTo: record.lrTo,
      lrBranch: record.lrbranch,
      invoiceNo: record.inv_no,
      invoiceDate: record.inv_date,
      description: record.description,
      quantity: record.quantity,
      numberOfArticles: record.no_of_articles,
      articles: record.articles,
      actualWeight: record.actual_wt,
      chargeWeight: record.char_wt,
      dcFrom: record.dcfrom,
      dcTo: record.dcto,
      dcNo: record.dcno,
      dcVehicleNumber: record.dcvehiclenumber,
      memoNo: record.memono,
      fmFrom: record.fmfrom,
      fmTo: record.fmto,
      inwardDate: record.inwarddate,
      lrStatus: record.LRStatus,
      dcDate: record.dcdate,
      dcStatus: record.dc_status,
      inwardStatus: record.inward_status,
      ewayNo: record.eway_no,
      ewayDate: record.eway_date,
      part: record.part,
      partNo: record.partno,
      cnPartNo: record.cnpartno,
      ewayExpDate: record.eway_exp_date,
      irBranch: record.irbranch,
      deliveryDate: record.deleverydate,
    }));
    let misReport = structuredData;
    const total = misReport.length;
    let paginatedData = structuredData;
    if (page !== null && pageSize !== null) {
      const offset = page * pageSize;
      paginatedData = structuredData.slice(offset, offset + pageSize);
    }

    return res.json({
      misReport: paginatedData,
      total: total,
    });
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching records." });
  }
};

const getStockRecords = async (req, res) => {
  const fromDate = String(req.query.fromDate || "");
  const toDate = String(req.query.toDate || "");
  const branchId = String(req.query.branchId || "");
  const customerId = String(req.query.customerId || "");
  const page = req.query.page ? parseInt(req.query.page) : null;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : null;
  const offset = page * pageSize;

  try {
    let results;

    if (branchId) {
      if (customerId) {
        [results] = await db.query(
          "CALL liststackreportsbycust_branch(?, ?, ?, ?)",
          [fromDate, toDate, branchId, customerId]
        );
      } else {
        [results] = await db.query("CALL liststackreportsbybranch(?, ?, ?)", [
          fromDate,
          toDate,
          branchId,
        ]);
      }
    } else if (customerId) {
      [results] = await db.query("CALL liststackreportsbycust(?, ?, ?)", [
        fromDate,
        toDate,
        customerId,
      ]);
    } else {
      [results] = await db.query("CALL liststackreports(?, ?)", [
        fromDate,
        toDate,
      ]);
    }

    const records = results[0];

    const structuredData = records.map((record, index) => ({
      srNo: index + 1,
      id: record.id,
      lrNumber:
        record[
          'CONCAT((SELECT branch_abbreviation FROM branch WHERE branch_id=lorry_reciept_master.branch),"-",lorry_reciept_master.year,lorry_reciept_master.lr_no)'
        ],
      lrDate: record.lr_date,
      vehicleNo: record.vehicleno,
      consignor: record.consignor,
      consignee: record.consignee,
      lrFrom: record.lrFrom,
      lrTo: record.lrTo,
      lrBranch: record.lrbranch,
      invoiceNo: record.inv_no,
      invoiceDate: record.inv_date,
      description: record.description,
      quantity: record.quantity,
      numberOfArticles: record.no_of_articles,
      articles: record.articles,
      actualWeight: record.actual_wt,
      chargeWeight: record.char_wt,
      dcFrom: record.dcfrom,
      dcTo: record.dcto,
      dcNo: record.dcno,
      dcVehicleNumber: record.dcvehiclenumber,
      memoNo: record.memono,
      fmFrom: record.fmfrom,
      fmTo: record.fmto,
      inwardDate: record.inwarddate,
      lrStatus: record.LRStatus,
      dcDate: record.dcdate,
      dcStatus: record.dc_status,
      inwardStatus: record.inward_status,
      ewayNo: record.eway_no,
      ewayDate: record.eway_date,
      part: record.part,
      partNo: record.partno,
      cnPartNo: record.cnpartno,
      ewayExpDate: record.eway_exp_date,
      irBranch: record.irbranch,
      deliveryDate: record.deleverydate,
    }));
    let misReport = structuredData;
    const total = misReport.length;
    let paginatedData = structuredData;
    if (page !== null && pageSize !== null) {
      const offset = page * pageSize;
      paginatedData = structuredData.slice(offset, offset + pageSize);
    }
    return res.json({
      stockReport: paginatedData,
      total: total,
    });
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching records." });
  }
};

const getConsignmentReports = async (req, res) => {
  const fromDate = String(req.query.fromDate || "");
  const toDate = String(req.query.toDate || "");
  const branchId = String(req.query.branchId || "");
  const customerId = String(req.query.customerId || "");
  const page = req.query.page ? parseInt(req.query.page) : null;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : null;
  const offset = page * pageSize;

  try {
    let results;

    if (branchId) {
      [results] = await db.query("CALL branchwiselr(?, ?, ?)", [
        fromDate,
        toDate,
        branchId,
      ]);
    } else if (customerId) {
      [results] = await db.query("CALL custwiselr(?, ?, ?)", [
        fromDate,
        toDate,
        customerId,
      ]);
    } else {
      [results] = await db.query("CALL datewiselr(?, ?)", [fromDate, toDate]);
    }
    const records = results[0];

    const structuredData = records.map((record, index) => ({
      srNo: index + 1,
      lrNumber: record['CONCAT(br.branch_abbreviation,"-",lr.year,lr.lr_no)'],
      vehicleNo: record.vehicleno,
      delivery_type: record.delivery_type,
      lr_date: record.lr_date,
      inv_no: record.inv_no,
      inv_date: record.inv_date,
      description: record.description,
      no_of_articles: record.no_of_articles,
      quantity: record.quantity,
      articles: record.articles,
      actual_wt: record.actual_wt,
      char_wt: record.char_wt,
      weight_type: record.weight_type,
      consigner: record.consigner,
      loc_from: record.loc_from,
      consignee: record.consignee,
      loc_to: record.loc_to,
      branch: record.branch,
      eway_no: record.eway_no,
      eway_date: record.eway_date,
      part: record.part,
      cftl_cftw_cfth: `${record.cftl} ${record.cftw} ${record.cfth}`,
      cft: record.cft,
      cft_kgs: record["10_12_20"],
      inv_amt: record.inv_amt,
      eway_exp_date: record.eway_exp_date,
      partno: record.partno,
      cnpartno: record.cnpartno,
      rate_per: record.rate_per,
      rate: record.rate,
      freight: record.freight,
    }));
    let ConsignmentReports = structuredData;
    const total = ConsignmentReports.length;
    let paginatedData = structuredData;
    if (page !== null && pageSize !== null) {
      const offset = page * pageSize;
      paginatedData = structuredData.slice(offset, offset + pageSize);
    }

    return res.json({
      ConsignmentReports: paginatedData,
      total: total,
    });
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching records." });
  }
};

const getDeliverchallanReport = async (req, res) => {
  const fromDate = String(req.query.fromDate || "");
  const toDate = String(req.query.toDate || "");
  const branchId = String(req.query.branchId || "");
  const vehicleId = String(req.query.vehicleId || "");
  const page = req.query.page ? parseInt(req.query.page) : null;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : null;
  const offset = page * pageSize;

  try {
    let results;

    if (branchId) {
      [results] = await db.query("CALL branchwisedc(?, ?, ?)", [
        fromDate,
        toDate,
        branchId,
      ]);
    } else if (vehicleId) {
      [results] = await db.query("CALL vehiclewisedc(?, ?, ?)", [
        fromDate,
        toDate,
        vehicleId,
      ]);
    } else {
      [results] = await db.query("CALL datewisedc(?, ?)", [fromDate, toDate]);
    }
    console.log(results);
    const records = results[0];

    // Structure the data
    const structuredData = records.map((record, index) => ({
      srNo: index + 1,
      lrNumber: record['CONCAT(br.branch_abbreviation,"-",lr.year,lr.lr_no)'],
      dc_no: record.dc_no,
      dc_date: record.dc_date,
      from_loc: record.from_loc,
      inv_id: record.inv_id,
      quantity: record.quantity,
      to_loc: record.to_loc,
      lrNumber:
        record[
          'CONCAT((SELECT branch_abbreviation FROM branch WHERE branch_id=l.branch),"-",l.year,l.lr_no)'
        ],
      lr_date: record.lr_date,
      consigner: record.consigner,
      consignee: record.consignee,
      transport_mode: record.transport_mode,
      vehicle_number: record.vehicle_number,
      driver_name: record.driver_name,
      mobile_no: record.mobile_no,
      license_name: record.license_name,
      delivery_type: record.delivery_type,
      total_packages: record.total_packages,
      total_weight: record.total_weight,
      ir_date: record.ir_date,
      inward_branch: record.inward_branch,
      inv_date: record.inv_date,
      inv_amt: record.inv_amt,
      eway_no: record.eway_no,
      eway_date: record.eway_date,
      eway_exp_date: record.eway_exp_date,
      articles: record.articles,
      no_of_articles: record.no_of_articles,
      partno: record.partno,
      description: record.description,
      cnpartno: record.cnpartno,
    }));
    let DeliverchallanReport = structuredData;
    const total = DeliverchallanReport.length;
    let paginatedData = structuredData;
    if (page !== null && pageSize !== null) {
      const offset = page * pageSize;
      paginatedData = structuredData.slice(offset, offset + pageSize);
    }


    return res.json({
      DeliverchallanReport: paginatedData,
      total: total,
    });
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching records." });
  }
};

const getunlodingreport = async (req, res) => {
  const fromDate = String(req.query.fromDate || "");
  const toDate = String(req.query.toDate || "");
  const branchId = String(req.query.branchId || "");
  const vehicleId = String(req.query.vehicleId || "");
  const Memoid = String(req.query.memoid || "");
  const in_type = String(req.query.in_type || 1);
  const page = req.query.page ? parseInt(req.query.page) : null;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : null;
  console.log(Memoid);

  try {
    let results;
    if (branchId) {
      if (vehicleId) {
        [results] = await db.query(
          "CALL dateBranchVehiclewisefm(?, ?, ?, ?, ?)",
          [fromDate, toDate, in_type, branchId, vehicleId]
        );
      } else {
        [results] = await db.query("CALL dateAndBranchwisefm(?, ?, ?, ?)", [
          fromDate,
          toDate,
          in_type,
          branchId,
        ]);
      }
    } else if (vehicleId) {
      [results] = await db.query("CALL dateAndVehiclewisefm(?, ?, ?, ?)", [
        fromDate,
        toDate,
        in_type,
        vehicleId,
      ]);
    } else {
      [results] = await db.query("CALL datewisefm(?, ?, ?)", [
        fromDate,
        toDate,
        in_type,
      ]);
    }
    console.log(results)
    const records = results[0];
    const structuredData = records.map((record, index) => ({
      srNo: index + 1,
      memo_no: record.memo_no,
      dc_no: record.dc_no,
      dc_date: record.dc_date,
      from_loc: record.from_loc,
      inv_no: record.inv_no,
      quantity: record.quantity,
      to_loc: record.to_loc,
      lr_no:
        record[
          `CONCAT((SELECT branch_abbreviation FROM branch WHERE branch_id=l.branch),"-",l.year,l.lr_no)`
        ],
      lr_date: record.lr_date,
      consigner: record.consigner,
      consignee: record.consignee,
      transport_mode: record.transport_mode,
      vehicle_number: record.vehicle_number,
      driver_name: record.driver_name,
      mobile_no: record.mobile_no,
      license_name: record.license_name,
      delivery_type: record.delivery_type,
      total_packages: record.total_packages,
      total_weight: record.total_weight,
      total_freight: record.total_freight,
      advance_amount: record.advance_amount,
      balance_amount: record.balance_amount,
      vehicle_pass: record.vehicle_pass,
      parking_charges: record.parking_charges,
      diesel: record.diesel,
      other_charges: record.other_charges,
      delivery_charges: record.delivery_charges,
      mathadi: record.mathadi,
      seal: record.seal,
      advance_ref: record.advance_ref,
      remarks: record.remarks,
      articles: record.articles,
      description: record.description,
      no_of_articles: record.no_of_articles,
      part: record.part,
      memo_date: record.memo_date,
      memo_status: record.memo_status,
      billno: record.billno,
      billdate: record.billdate,
      trbillno: record.trbillno,
      date: record.date,
      vehical_owner_name: record.vehical_owner_name,
      lrfrom: record.lrfrom,
      lrto: record.lrto,
      inv_date: record.inv_date,
      partno: record.partno,
      cnpartno: record.cnpartno,
      char_wt: record.char_wt,
    }));

    const total = structuredData.length;
    let paginatedData = structuredData;
    if (page !== null && pageSize !== null) {
      const offset = page * pageSize;
      paginatedData = structuredData.slice(offset, offset + pageSize);
    }

    return res.json({
      unlodingreport: paginatedData,
      total: total,
    });
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching records." });
  }
};

const getTransportbillreport = async (req, res) => {
  const fromDate = String(req.query.fromDate || "");
  const toDate = String(req.query.toDate || "");
  const branchId = String(req.query.branchId || "");
  const vehicleId = String(req.query.vehicleId || "");
  const owner_id = String(req.query.owner_id || "");
  const page = req.query.page ? parseInt(req.query.page) : null;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : null;
  const offset = page * pageSize;

  try {
    let results;

    if (vehicleId) {
      if (owner_id) {
        [results] = await db.query(
          "CALL dateVhicleOwnerwiseTransBill(?, ?, ?, ?)",
          [fromDate, toDate, vehicleId, owner_id]
        );
      } else {
        [results] = await db.query("CALL dateVhiclewiseTransBill(?, ?, ?)", [
          fromDate,
          toDate,
          vehicleId,
        ]);
      }
    } else if (owner_id) {
      [results] = await db.query("CALL dateOwnerwiseTransBill(?, ?, ?)", [
        fromDate,
        toDate,
        owner_id,
      ]);
    } else {
      [results] = await db.query("CALL datewiseTransBill (?, ?)", [
        fromDate,
        toDate,
      ]);
    }
    // Assuming results[0] contains the actual data rows
    const records = results[0];

    // Structure the data
    const structuredData = records.map((record, index) => ({
      srNo: index + 1,
      billno: record.billno,
      trbilldate: record.trbilldate,
      trbillno: record.trbillno,
      vehical_owner_name: record.vehical_owner_name,
      vehicleno: record.vehicleno,
      vehicletype: record.vehicletype,
      telephoneno: record.telephoneno,
      address: record.address,
      memo_no: record.memo_no,
      from_loc: record.from_loc,
      to_loc: record.to_loc,
      total_freight: record.total_freight,
      advance_amount: record.advance_amount,
      balance_amount: record.balance_amount,
      total: record.total,
      cgst: record.cgst,
      sgst: record.sgst,
      igst: record.igst,
      bank: record.bank,
      accountname: record.accountname,
      accountnumber: record.accountnumber,
      ifsccode: record.ifsccode,
      checkno: record.checkno,
      date: record.date,
      actual_freight: record.actual_freight,
      deduction: record.deduction,
      add_amt: record.add_amt,
      remark: record.remark,
      tds: record.tds,
      oslbilldate: record.oslbilldate,
      totalpay: record.totalpay,
      tdsval: record.tdsval,
      amountwithgst: record.amountwithgst,
      subtotal: record.subtotal,
      cgstval: record.cgstval,
      sgstval: record.sgstval,
      igstval: record.igstval,
      city: record.city,
      oslgstno: record.oslgstno,
      oslstatecode: record.oslstatecode,
      oslstatename: record.oslstatename,
      HSNcode: record.HSNcode,
      vendorgstno: record.vendorgstno,
      memo_date: record.memo_date,
    }));
    let TransportBillReport = structuredData;
    const total = TransportBillReport.length;
    let paginatedData = structuredData;
    if (page !== null && pageSize !== null) {
      const offset = page * pageSize;
      paginatedData = structuredData.slice(offset, offset + pageSize);
    }

    return res.json({
      TransportBillReport: paginatedData,
      total: total,
    });
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching records." });
  }
};

const getPODReceiptReport = async (req, res) => {
  const fromDate = String(req.query.fromDate || "");
  const toDate = String(req.query.toDate || "");
  const branchId = String(req.query.branchId || "");
  const Customer_id = String(req.query.Customer_id || "");
  const page = req.query.page ? parseInt(req.query.page) : null;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : null;
  console.log(Customer_id);
  try {
    const [results] = await db.query("CALL report_pod_receipt(?, ?, ?, ?)", [
      fromDate,
      toDate,
      branchId,
      Customer_id,
    ]);
    console.log(results);
    const records = results[0];
    const structuredData = records.map((record, index) => ({
      srNo: index + 1,
      id: record.id,
      lr_no:
        record[
          `CONCAT((SELECT branch_abbreviation FROM branch WHERE branch_id=l.branch),"-",l.year,l.lr_no)`
        ],
      lr_date: record.lr_date,
      consigner: record.consigner,
      loc_from: record.loc_from,
      consignee: record.consignee,
      loc_to: record.loc_to,
      paybill: record.paybill,
      total: record.total,
      status: record.status,
      fileloc: record.fileloc,
      pod_date: record.pod_date,
    }));

    const total = structuredData.length;
    let paginatedData = structuredData;
    if (page !== null && pageSize !== null) {
      const offset = page * pageSize;
      paginatedData = structuredData.slice(offset, offset + pageSize);
    }

    return res.json({
      PODReceiptReport: paginatedData,
      total: total,
    });
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching records." });
  }
};


const getUploadReport = async (req, res) => {
  const fromDate = String(req.query.fromDate || "");
  const toDate = String(req.query.toDate || "");
  const branchId = String(req.query.branchId || "");
  const page = req.query.page ? parseInt(req.query.page) : null; // Default to 0 if page is null
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : null; // Default to 10 if pageSize is null

  const start_index = page * pageSize;
  const counts = pageSize;

  try {
    const [results] = await db.query("CALL poduploadlistpagereport(?, ?, ?, ?, ?)", [
      branchId,
      fromDate,
      toDate,
      start_index,
      counts
    ]);
    const records = results[0];
    const structuredData = records.map((record, index) => ({
      srNo: start_index + index + 1,
      id: record.id,
      podno: record.podno,
      poddate: record.poddate,
      lrid: record.lrid,
      upload: record.upload,
      branch_name: record.branch_name,
      lrno: record.lrno,
      fileloc: record.fileloc
    }));

    const total = structuredData.length;
    let paginatedData = structuredData;
    if (page !== null && pageSize !== null) {
      const offset = page * pageSize;
      paginatedData = structuredData.slice(offset, offset + pageSize);
    }

    return res.json({
      UploadReport: paginatedData,
      total: total,
    });
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json({ error: "An error occurred while fetching records." });
  }
};




module.exports = {
  getMisRecords,
  getStockRecords,
  getConsignmentReports,
  getDeliverchallanReport,
  getunlodingreport,
  getTransportbillreport,
  getPODReceiptReport,
  getUploadReport
};
