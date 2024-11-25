const db = require("../config/dbConfig");

const getSalesInvoiceMasterList = async (req, res) => {
    const branchId = parseInt(req.query.branchid) || null;
    const startIndex = parseInt(req.query.page) || 0;
    const counts = parseInt(req.query.pageSize) || 20;
    const searchValue = req.query.search || '';
    const type = req.query.in_type || 1;
    try {
        const query = 'CALL sales_Invoice_master_list(?, ?, ?, ?, ?)';
        const [results] = await db.query(query, [branchId, startIndex, counts, searchValue, type]);
        const salesInvoiceMasterList = results[0];

        res.json({
            records: salesInvoiceMasterList
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({
            error: 'Unexpected error',
            details: err.message
        });
    }
};

const deleteSalesInvoice = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            error: 'No ID provided'
        });
    }

    try {
        const query = 'CALL delete_salesinvoice(?, @message)';
        await db.query(query, [id]);
        const [[messageResult]] = await db.query('SELECT @message AS message');
        const message = messageResult.message;

        res.json({
            message: message || 'Operation completed successfully'
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({
            error: 'Unexpected error',
            details: err.message
        });
    }
};


const getLorryReceiptList = async (req, res) => {
    const branch = req.query.branch || null;
    const pocustomerId = req.query.pocustomerId || null;
    const locpocustomerId = req.query.locpocustomer_id || null;


    try {
        const query = 'CALL getlrbyids(?, ?, ?)';
        const [results] = await db.query(query, [branch, pocustomerId, locpocustomerId]);
        const lorryReceiptList = results[0];
        res.json({
            records: lorryReceiptList
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({
            error: 'Unexpected error',
            details: err.message
        });
    }
};


const getGSTNumberAndState = async (req, res) => {
    const id = parseInt(req.query.gstid);

    if (!id) {
        return res.status(400).json({
            error: 'No ID provided'
        });
    }

    try {
        const query = 'SELECT gstno, gststate FROM osl_gstnos WHERE id = ?';
        const [results] = await db.query(query, [id]);

        if (results.length === 0) {
            return res.status(404).json({
                error: 'No data found for the provided ID'
            });
        }
        const gstNumberAndState = results[0];

        res.json({
            record: gstNumberAndState
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({
            error: 'Unexpected error',
            details: err.message
        });
    }
};


const getPODetailsByPOID = async (req, res) => {
    const poid = parseInt(req.query.poid);

    if (!poid) {
        return res.status(400).json({
            error: 'No PO ID provided'
        });
    }

    try {
        const query = 'CALL getpodetailsbypoid(?)';
        const [results] = await db.query(query, [poid]);

        if (results[0].length === 0) {
            return res.status(404).json({
                error: 'No data found for the provided PO ID'
            });
        }

        const poDetails = results[0];

        res.json({
            records: poDetails
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({
            error: 'Unexpected error',
            details: err.message
        });
    }
};


const getLorryReceiptById = async (req, res) => {
    const lrId = req.query.lrid;

    if (!lrId) {
        return res.status(400).json({
            error: 'No Lorry Receipt ID provided'
        });
    }

    try {
        const query = 'CALL getlrbylrid(?)';
        const [results] = await db.query(query, [lrId]);


        if (results[0].length === 0) {
            return res.status(404).json({
                error: 'No data found for the provided Lorry Receipt ID'
            });
        }


        const formattedData = results[0].map(record => {
            const lrNo = `${record['GET_BRANCH_ABBR(lm.branch)']}-${record.year}-${record.lr_no}`;
            const [dcLastDate, dcNoVehicle] = record.dcno_vehicle ? record.dcno_vehicle.split('||') : [null, null];
            return {
                id: record.id,
                lrNo,
                lrdate: record.lrdate,
                inv_no: record.inv_no,
                inv_date: record.inv_date,
                description: record.description,
                articles: record.articles,
                no_of_articles: record.no_of_articles,
                quantity: record.quantity,
                inv_amt: record.inv_amt,
                consigner: record.consigner,
                consignee: record.consignee,
                loc_from: record.loc_from,
                loc_to: record.loc_to,
                actual_wt: record.actual_wt,
                partno: record.partno,
                cft: record.cft,
                dc_last_date: dcLastDate,
                dc_no_vehicle: dcNoVehicle
            };
        });

        res.json({
            records: formattedData
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({
            error: 'Unexpected error',
            details: err.message
        });
    }
};




const getlrbylridandinvid = async (req, res) => {
    const lrId = req.query.lrid;
    const invoiceid=req.query.invoiceid

    try {
        const query = 'call getlrbylridandinvid(?,?)';
        const [results] = await db.query(query, [lrId,invoiceid]);
        const formattedData = results[0].map(record => {
            const lrNo = `${record['GET_BRANCH_ABBR(lm.branch)']}-${record.year}-${record.lr_no}`;
            const [dcLastDate, dcNoVehicle] = record.dcno_vehicle ? record.dcno_vehicle.split('||') : [null, null];
            return {
                id: record.id,
                lrNo,
                lrdate: record.lrdate,
                inv_no: record.inv_no,
                inv_date: record.inv_date,
                description: record.description,
                articles: record.articles,
                no_of_articles: record.no_of_articles,
                quantity: record.quantity,
                inv_amt: record.inv_amt,
                consigner: record.consigner,
                consignee: record.consignee,
                loc_from: record.loc_from,
                loc_to: record.loc_to,
                actual_wt: record.actual_wt,
                partno: record.partno,
                cft: record.cft,
                dc_last_date: dcLastDate,
                dc_no_vehicle: dcNoVehicle
            };
        });

        res.json({
            records: formattedData
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({
            error: 'Unexpected error',
            details: err.message
        });
    }
};





const addSaleInvoice = async (req, res) => {
    const {
        BillNo, BillDate, BillType, ConsignorID, ConsigneeID, ThirdPartyID, ThirdPartyAdd,
        PoNo, PoDate, SACCode, DelieveryTrip, DelieveryRate, DeliveryFromId, DeliveryToId,
        GSTno, State, collectionTrip, CollectionRate, CollectionFromId, CollectionToId,
        Rate, CGST, SGST, IGST, Feet, FeetQty, load909Amount, load909Quantity, LoadLCV, LoadLCVQty,
        load407Amount, load407Quantity, LoadFT, LoadFTQty, load1109Amount, load1109Quantity, loadingChargesAmount,
        loadingChargesQuantity, unloadingChargesAmount, unloadingChargesQuantity, mathadiAmount, mathadiQuantity,
        TotalInvoiceWeight, LRCharge, lrCount, LRData, Branch, UserID, FileLoc, TotalAmt, LocalCustomerId,
        LogoCityID, CGSTAmount, SGSTAmount, IGSTAmount, year, MUnit, PoLineID, PoCustomerId,
        tataAceAmount, threeWheelerAmount, twoWheelerAmount, detentionChargesAmount, otherChargesAmount,
        tataAceQuantity, threeWheelerQuantity, twoWheelerQuantity, detentionChargesQuantity, otherChargesQuantity,
        ExemptedAmount, ExemptedDescription, CalcFactor, NormalConsigner, TransactionValue,
        Exempted2, ExemptedDesc2, Exempted3, ExemptedDesc3, Exempted4, ExemptedDesc4,
        Exempted5, ExemptedDesc5, Remarks, details
    } = req.body;
   
    const parseToFloat = value => parseFloat(value) || 0;
    const v1 = parseToFloat(TotalInvoiceWeight) * parseToFloat(Rate);
    const v2 = parseToFloat(DelieveryTrip) * parseToFloat(DelieveryRate);
    const v3 = parseToFloat(collectionTrip) * parseToFloat(CollectionRate);
    const v4 = parseToFloat(FeetQty) * parseToFloat(Feet);
    const v5 = parseToFloat(LoadFTQty) * parseToFloat(LoadFT);
    const v6 = parseToFloat(loadingChargesQuantity) * parseToFloat(loadingChargesAmount);
    const v7 = parseToFloat(unloadingChargesQuantity) * parseToFloat(unloadingChargesAmount);
    const v8 = parseToFloat(load1109Quantity) * parseToFloat(load1109Amount);
    const v9 = parseToFloat(load407Quantity) * parseToFloat(load407Amount);
    const v10 = parseToFloat(load909Quantity) * parseToFloat(load909Amount);
    const v11 = parseToFloat(mathadiQuantity) * parseToFloat(mathadiAmount);
    const v12 = parseToFloat(LoadLCVQty) * parseToFloat(LoadLCV);
    const v13 = parseToFloat(lrCount) * parseToFloat(LRCharge);
    const v14 = parseToFloat(tataAceQuantity) * parseToFloat(tataAceAmount);
    const v15 = parseToFloat(threeWheelerQuantity) * parseToFloat(threeWheelerAmount);
    const v16 = parseToFloat(twoWheelerQuantity) * parseToFloat(twoWheelerAmount);
    const v17 = parseToFloat(detentionChargesQuantity) * parseToFloat(detentionChargesAmount);
    const v18 = parseToFloat(otherChargesQuantity) * parseToFloat(otherChargesAmount);
    const totalTransaction = v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8 + v9 + v10 + v11 + v12 + v13 + v14 + v15 + v16 + v17 + v18;
    const sgstval = parseToFloat(SGST) ? totalTransaction * parseToFloat(SGST) / 100 : 0;
    const cgstval = parseToFloat(CGST) ? totalTransaction * parseToFloat(CGST) / 100 : 0;
    const igstval = parseToFloat(IGST) ? totalTransaction * parseToFloat(IGST) / 100 : 0;
    const gt = totalTransaction + sgstval + cgstval + igstval;
    const params = [
        BillNo || null, BillDate || null, BillType || 'ACK', ConsignorID || null,
        ConsigneeID || null, ThirdPartyID || null, ThirdPartyAdd || null, PoNo || null,
        PoDate || null, SACCode || null, DelieveryTrip || null, DelieveryRate || null,
        DeliveryFromId || null, DeliveryToId || null, GSTno || null, State || null,
        collectionTrip || null, CollectionRate || null, CollectionFromId || null, CollectionToId || null,
        Rate || null, CGST || null, SGST || null, IGST || null, Feet || null, FeetQty || null,
        load909Amount || null, load909Quantity || null, LoadLCV || null, LoadLCVQty || null, load407Amount || null,
        load407Quantity || null, LoadFT || null, LoadFTQty || null, load1109Amount || null, load1109Quantity || null,
        loadingChargesAmount || null, loadingChargesQuantity || null, unloadingChargesAmount || null, unloadingChargesQuantity || null,
        mathadiAmount || null, mathadiQuantity || null, TotalInvoiceWeight || null, LRCharge || null, lrCount || null,
        LRData || null, Branch || null, UserID || 1, FileLoc || null,
        gt, LocalCustomerId || null, LogoCityID || null, cgstval, sgstval, igstval, year || null, MUnit || null,
        PoLineID || null, PoCustomerId || null, tataAceAmount || null, threeWheelerAmount || null, twoWheelerAmount || null,
        detentionChargesAmount || null, otherChargesAmount || null, tataAceQuantity || null, threeWheelerQuantity || null, twoWheelerQuantity || null,
        detentionChargesQuantity || null, otherChargesQuantity || null, ExemptedAmount || null, ExemptedDescription || null,
        CalcFactor || null, NormalConsigner || null, TransactionValue || null, Exempted2 || null,
        ExemptedDesc2 || null, Exempted3 || null, ExemptedDesc3 || null, Exempted4 || null,
        ExemptedDesc4 || null, Exempted5 || null, ExemptedDesc5 || null, Remarks || null, null, null
    ];

    const query = `CALL addSaleInvoice(
        ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@message,@inserted_id,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
    );`;

    try {
        const [results] = await db.query(query, params);
        const [[messageResult]] = await db.query('SELECT @message AS message');
        const message = messageResult.message;
        const [[idResult]] = await db.query('SELECT @inserted_id AS inserted_id');
        const inserted_id = idResult.inserted_id;

        if (message.includes('Successfully')) {
            if (details && details.length > 0) {
              
                const detailInsertPromises = details.flatMap(detail => {
                   
                    return (detail.selectedLrIds || []).map(lrId => {
                        const detailParams = [
                            lrId || null, 
                            detail.quantity || null,
                            detail.cft || null,
                            detail.actual_wt || null,
                            detail.value || 0,
                            detail.no_of_articles || null,
                            detail.id || null,
                            inserted_id || null 
                        ];

                        return db.query(
                            'INSERT INTO sale_invoice_details (lrid, qty, cft, weight, value, no_of_articles, lr_inv_id, saleinvoiceid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                            detailParams
                        );
                    });
                });
                await Promise.all(detailInsertPromises.flat());
            }

            res.json({ message, inserted_id });
        } else {
            res.status(400).json({ message });
        }
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Unexpected error', details: err.message });
    }
};

const getSalesInvoiceMasterById = async (req, res) => {
    const id = parseInt(req.query.id);

    if (!id) {
        return res.status(400).json({
            error: 'No ID provided'
        });
    }

    try {
        const query = 'CALL sales_Invoice_Master_list_byId(?)';
        const [results] = await db.query(query, [id]);

        if (results[0].length === 0) {
            return res.status(404).json({
                error: 'No data found for the provided ID'
            });
        }

        const salesInvoiceMaster = results[0][0];  
        res.json({
            record: salesInvoiceMaster
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({
            error: 'Unexpected error',
            details: err.message
        });
    }
};


const updateSaleInvoice = async (req, res) => {
    const {
        id,BillNo, BillDate, BillType, ConsignorID, ConsigneeID, ThirdPartyID, ThirdPartyAdd,
        PoNo, PoDate, SACCode, DelieveryTrip, DelieveryRate, DeliveryFromId, DeliveryToId,
        GSTno, State, collectionTrip, CollectionRate, CollectionFromId, CollectionToId,
        Rate, CGST, SGST, IGST, Feet, FeetQty, load909Amount, load909Quantity, LoadLCV, LoadLCVQty,
        load407Amount, load407Quantity, LoadFT, LoadFTQty, load1109Amount, load1109Quantity, loadingChargesAmount,
        loadingChargesQuantity, unloadingChargesAmount, unloadingChargesQuantity, mathadiAmount, mathadiQuantity,
        TotalInvoiceWeight, LRCharge, lrCount, LRData, Branch, UserID, TotalAmt, LocalCustomerId,
        LogoCityID, CGSTAmount, SGSTAmount, IGSTAmount, year, MUnit, PoLineID, PoCustomerId,
        tataAceAmount, threeWheelerAmount, twoWheelerAmount, detentionChargesAmount, otherChargesAmount,
        tataAceQuantity, threeWheelerQuantity, twoWheelerQuantity, detentionChargesQuantity, otherChargesQuantity,
        ExemptedAmount, ExemptedDescription, CalcFactor, NormalConsigner, TransactionValue,
        Exempted2, ExemptedDesc2, Exempted3, ExemptedDesc3, Exempted4, ExemptedDesc4,
        Exempted5, ExemptedDesc5, Remarks, details
    } = req.body;
console.log(req.body)
    const parseToFloat = value => parseFloat(value) || 0;
    const parseToInt = value => parseInt(value, 10) || 0;
    const idInt = parseToInt(id);

    // Calculate the values
    const v1 = parseToFloat(TotalInvoiceWeight) * parseToFloat(Rate);
    const v2 = parseToFloat(DelieveryTrip) * parseToFloat(DelieveryRate);
    const v3 = parseToFloat(collectionTrip) * parseToFloat(CollectionRate);
    const v4 = parseToFloat(FeetQty) * parseToFloat(Feet);
    const v5 = parseToFloat(LoadFTQty) * parseToFloat(LoadFT);
    const v6 = parseToFloat(loadingChargesQuantity) * parseToFloat(loadingChargesAmount);
    const v7 = parseToFloat(unloadingChargesQuantity) * parseToFloat(unloadingChargesAmount);
    const v8 = parseToFloat(load1109Quantity) * parseToFloat(load1109Amount);
    const v9 = parseToFloat(load407Quantity) * parseToFloat(load407Amount);
    const v10 = parseToFloat(load909Quantity) * parseToFloat(load909Amount);
    const v11 = parseToFloat(mathadiQuantity) * parseToFloat(mathadiAmount);
    const v12 = parseToFloat(LoadLCVQty) * parseToFloat(LoadLCV);
    const v13 = parseToFloat(lrCount) * parseToFloat(LRCharge);
    const v14 = parseToFloat(tataAceQuantity) * parseToFloat(tataAceAmount);
    const v15 = parseToFloat(threeWheelerQuantity) * parseToFloat(threeWheelerAmount);
    const v16 = parseToFloat(twoWheelerQuantity) * parseToFloat(twoWheelerAmount);
    const v17 = parseToFloat(detentionChargesQuantity) * parseToFloat(detentionChargesAmount);
    const v18 = parseToFloat(otherChargesQuantity) * parseToFloat(otherChargesAmount);

    const totalTransaction = v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8 + v9 + v10 + v11 + v12 + v13 + v14 + v15 + v16 + v17 + v18;
    const sgstval = parseToFloat(SGST) ? totalTransaction * parseToFloat(SGST) / 100 : 0;
    const cgstval = parseToFloat(CGST) ? totalTransaction * parseToFloat(CGST) / 100 : 0;
    const igstval = parseToFloat(IGST) ? totalTransaction * parseToFloat(IGST) / 100 : 0;
    const gt = totalTransaction + sgstval + cgstval + igstval;

    // Parameters for the stored procedure
    const params = [
        idInt || null, BillNo || null, BillDate || null, BillType || 'ACK', ConsignorID || null,
        ConsigneeID || null, ThirdPartyID || null, ThirdPartyAdd || null, PoNo || null,
        PoDate || null, SACCode || null, DelieveryTrip || null, DelieveryRate || null,
        DeliveryFromId || null, DeliveryToId || null, GSTno || null, State || null,
        collectionTrip || null, CollectionRate || null, CollectionFromId || null, CollectionToId || null,
        Rate || null, CGST || null, SGST || null, IGST || null, Feet || null, FeetQty || null,
        load909Amount || null, load909Quantity || null, LoadLCV || null, LoadLCVQty || null, load407Amount || null,
        load407Quantity || null, LoadFT || null, LoadFTQty || null, load1109Amount || null, load1109Quantity || null,
        loadingChargesAmount || null, loadingChargesQuantity || null, unloadingChargesAmount || null, unloadingChargesQuantity || null,
        mathadiAmount || null, mathadiQuantity || null, TotalInvoiceWeight || null, LRCharge || null, lrCount || null,
        LRData ? JSON.stringify(LRData) : null, Branch || null, UserID || 1,
        gt, LocalCustomerId || null, LogoCityID || null, cgstval, sgstval, igstval, year || null, MUnit || null,
        PoLineID || null, PoCustomerId || null, tataAceAmount || null, threeWheelerAmount || null, twoWheelerAmount || null,
        detentionChargesAmount || null, otherChargesAmount || null, tataAceQuantity || null, threeWheelerQuantity || null, twoWheelerQuantity || null,
        detentionChargesQuantity || null, otherChargesQuantity || null, ExemptedAmount || null, ExemptedDescription || null,
        CalcFactor || null, NormalConsigner || null, TransactionValue || null, Exempted2 || null,
        ExemptedDesc2 || null, Exempted3 || null, ExemptedDesc3 || null, Exempted4 || null,
        ExemptedDesc4 || null, Exempted5 || null, ExemptedDesc5 || null, Remarks || null, 
    ];

    // Query to call the stored procedure
    const updateInvoiceQuery = `CALL updateSaleInvoice(
        ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@message,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
    );`;
    

    try {
        // Execute the stored procedure
        const [results] = await db.query(updateInvoiceQuery, params);
const message =results[0][0].message;
        if (message.includes('Successfully')) {
            if (details && details.length > 0) {
                // Insert details into the `sale_invoice_details` table
                const detailInsertPromises = details.flatMap(detail => {
                    return (detail.selectedLrIds || []).map(lrId => {
                        const detailParams = [
                            lrId || null,
                            detail.quantity || null,
                            detail.cft || null,
                            detail.actual_wt || null,
                            detail.value || 0,
                            detail.no_of_articles || null,
                            detail.id || null,
                            idInt || null
                        ];

                        return db.query(
                            'INSERT INTO sale_invoice_details (lrid, qty, cft, weight, value, no_of_articles, lr_inv_id, saleinvoiceid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                            detailParams
                        );
                    });
                });
                await Promise.all(detailInsertPromises.flat());
            }

            res.json({ message });
        } else {
            res.status(400).json({ message });
        }
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Unexpected error', details: err.message });
    }
};



module.exports = {
    getSalesInvoiceMasterList,
    deleteSalesInvoice,
    getLorryReceiptList,
    getGSTNumberAndState,
    getPODetailsByPOID,
    getLorryReceiptById,
    addSaleInvoice,
    getSalesInvoiceMasterById,
    updateSaleInvoice,
    getlrbylridandinvid
};
