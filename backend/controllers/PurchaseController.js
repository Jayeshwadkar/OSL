const db = require("../config/dbConfig");

const getpomaster = async (req, res) => {
    const startIndex = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 20;

    try {
        const query = `CALL getpomasterpage(?, ?)`;
        const [results] = await db.query(query, [startIndex, pageSize]);
        const today = new Date().toISOString().split('T')[0]; 

        let poMasterRecords = results[0];

        poMasterRecords = poMasterRecords.map(record => {
            const agrEndDate = new Date(record.agr_end_date);
            const todayDate = new Date(today);
            const poStatus = agrEndDate < todayDate ? 'Expired' : 'Active';

            return {
                customer_id: record.customer_id,
                customer_name: record['GET_POCUSTOMER_NAME(pm.customer_id)'] ? record['GET_POCUSTOMER_NAME(pm.customer_id)'].toUpperCase() : '',
                sr_no: record.sr_no,
                id: record.id,
                po_no: record.po_no.toUpperCase(),
                po_date: record.po_date,
                agr_start_date: record.agr_start_date,
                agr_end_date: record.agr_end_date,
                fileloc: record.fileloc,
                row_number: record.row_number,
                tot_counts: record['@tot_counts'],
                totc: record['@totc'],
                poline: record.poline,
                poStatus // Add the PO Status to the result
            };
        });

        res.json({
            records: poMasterRecords,
            total: poMasterRecords.length
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Unexpected error', details: err.message });
    }
};


const getpomasterWithSearch = async (req, res) => {
    const startIndex = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 20;
    const searchTerm = req.query.search || '';
    const customerId = req.query.customerId || '';

    console.debug("Calling stored procedure getpomastersearchpage with StartIndex:", startIndex, "PageSize:", pageSize, "SearchTerm:", searchTerm, "CustomerId:", customerId);

    try {

        const query = `CALL getpomastersearchpage(?, ?, ?, ?)`;
        const [results] = await db.query(query, [startIndex, pageSize, searchTerm, customerId]);

        let poMasterRecords = results[0];


        poMasterRecords = poMasterRecords.map(record => ({
            customer_id: record.customer_id,
            customer_name: record['GET_POCUSTOMER_NAME(pm.customer_id)'] ? record['GET_POCUSTOMER_NAME(pm.customer_id)'].toUpperCase() : '',
            sr_no: record.sr_no,
            id: record.id,
            po_no: record.po_no.toUpperCase(),
            po_date: record.po_date,
            agr_start_date: record.agr_start_date,
            agr_end_date: record.agr_end_date,
            fileloc: record.fileloc,
            row_number: record.row_number,
            tot_counts: record['@tot_counts'],
            totc: record['@totc'],
            poline: record.poline
        }));

        res.json({
            records: poMasterRecords,
            total: poMasterRecords.length
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Unexpected error', details: err.message });
    }
};
const addPurchaseOrder = async (req, res) => {
    try {
        const purchaseOrder = req.body;
        const {
            VendorCode,
            State,
            StateCode,
            CustomerGstNo,
            PAN,
            CINNo,
            SrNo,
            poNo,
            po_date,
            customer_id,
            agr_start_date,
            agr_end_date,
            branch,
            extend_permission,
            billing_address,
            entry_person_name,
            credit_period,
            RefDate,
            RefNo,
            BillingGstDate,
            billingAddressFlag,
            details
        } = purchaseOrder;
        console.log(details)
        const formattedFileLoc = null;
        const [results] = await db.query(`
            CALL insertpomaster(
                ?, ?, ?, ?, ?, ?, ?, ?, @message, @inserted_id, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?
            );
        `, [
            SrNo || '',                      // in_sr_no
            poNo || '',                             // in_po_no
            customer_id || '',               // in_customer_id
            po_date || '',                   // in_podate
            agr_start_date || '',            // in_agr_start_date
            agr_end_date || '',              // in_agr_end_date
            extend_permission || 0,         // in_extend_permission
            entry_person_name || '',         // in_entry_person_name
            formattedFileLoc || '',          // in_fileloc (can be null)
            branch || '',                    // in_branch
            1,                             // in_user_id (assuming it needs to be passed as empty string or default value)
            billing_address || '',           // in_Billing_address
            State || '',                     // in_bgstate
            StateCode || '',                 // in_bgstatecode
            CustomerGstNo || '',             // in_bggstno
            BillingGstDate || null,          // in_bggstdate (can be empty string)
            PAN || '',                       // in_bgpan
            CINNo || '',                     // in_bgcin
            credit_period || '',             // in_creditperiod (can be empty string)
            RefNo || '',                     // in_refno (can be empty string)
            RefDate || null,                 // in_refdate (can be empty string)
            VendorCode || '',                // in_vendorcode
            billingAddressFlag || 0          // in_billing_address_flag
        ]);
        const message = results[0][0]?.message || 'No message';
        const inserted_id = results[1][0]?.inserted_id || null;
        if (details && details.length > 0) {
            const detailQuery = `
                CALL insertPoDetails(
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?
                );
            `;
            const detailPromises = details.map(detail => {
                return db.query(
                    detailQuery,
                    [
                        inserted_id,                          // in_po_id
                        detail.PO_Line_No || '',              // in_po_line_no
                        detail.PL_FTL || '',                  // in_partload_ftl
                        detail.VehicleType || '',             // in_vehicle_type
                        detail.FromcustomerID || '',            // in_from
                        detail.TocustomerID || '',              // in_to
                        detail.PartLoadRate || 0,            // in_partload_rate_kg
                        detail.FTLRate || 0,                 // in_ftl_rate
                        detail.BoxBinRate || 0,              // in_box_bin_rate
                        detail.PartNo || '',                  // in_part_no
                        detail.PartDesc || '',                // in_part_description
                        detail.UOM || '',                    // in_measurement_unit
                        detail.CFTwt || 0,                  // in_cft_wt
                        detail.CollCharTrip || 0,            // in_collection_charges
                        detail.DelChargTrip || 0,            // in_delivery_charges
                        detail.PartLoadTT || '',              // in_partload_tt
                        detail.FTLTT || '',                  // in_ftl_tt
                        detail.LRCharge || 0,               // in_lr_charges
                        detail.LoadingCharge || 0,           // in_loading_charges
                        detail.UnloadingCharge || 0,         // in_unloading_charges
                        detail.WRCharge || 0,                // in_warehouse_rent_charges
                        detail.WHAreasqft || 0,              // in_warehouse_area_sqft
                        detail.Ratesqft || '',               // in_per_sqft_rate
                        detail.ForkliftCharge || 0,          // in_forklift_charges
                        detail.Damragecharge || 0,           // in_damrage_charges
                        detail.Delaycharg || 0,             // in_delay_delivery_charges
                        detail.OverHead || 0,               // in_overhead_charges
                        0, // in_sqst (assuming it’s optional or can be empty)
                        0, // in_cgst (assuming it’s optional or can be empty)
                        0, // in_igst (assuming it’s optional or can be empty)
                        null, // in_no_tax (assuming it’s optional or can be empty)
                        detail.OtherCharges1 || 0,           // in_other_charges1
                        detail.OtherCharges2 || 0,          // in_other_charges2
                        detail.statecode || null,               // in_statecode
                        detail.gstId || null                   // in_gstid
                    ]
                );
            });
            await Promise.all(detailPromises);
            await db.query(
                `INSERT INTO po_history (po_id, updated_date, changes, user_id) VALUES (?, CURDATE(), ?, ?)`,
                [inserted_id, 'Added New Purchase Order', 1]
            );
            return res.json({ message, res_code: inserted_id });
        } else {
            return res.json({ message, res_code: inserted_id });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

const deletePoMaster = async (req, res) => {
    const id = req.params.id.toString();
    try {
        const query = 'CALL deletepomaster(?, @message)';
        const [results] = await db.query(query, [id]);
        const messageResult = results[0];
        if (messageResult.length > 0 && messageResult[0].message) {
           return res.json({ message: messageResult[0].message });
        } else {
            console.error('No message returned or message is empty');
            res.status(500).send('Server error');
        }
    } catch (err) {
        console.error('Error executing stored procedure:', err);
        res.status(500).send('Server error');
    }
};


const getPurchaseOrderAndDetails = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
       
        const poQuery = `CALL getpobyid(?)`;
        const [poResults] = await db.query(poQuery, [id]);
        const purchaseOrder = poResults[0][0];

        if (!purchaseOrder) {
            return res.status(404).json({ message: 'Purchase Order not found' });
        }

      
        const detailsQuery = `CALL getpodetailsbypoid(?)`;
        const [detailsResults] = await db.query(detailsQuery, [id]);
        const purchaseOrderDetails = detailsResults[0];

    
        const response = {
            purchaseOrder,
            details: purchaseOrderDetails
        };

       return res.json(response);

    } catch (err) {
        console.error('Error executing stored procedures:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};


const upsertPurchaseOrder = async (req, res) => {
    try {
        const purchaseOrder = req.body;
        
        const {
            VendorCode,
            State,
            StateCode,
            CustomerGstNo,
            PAN,
            CINNo,
            SrNo,
            poNo,
            po_date,
            customer_id,
            agr_start_date,
            agr_end_date,
            branch,
            extend_permission,
            billing_address,
            entry_person_name,
            credit_period,
            RefDate,
            RefNo,
            BillingGstDate,
            billingAddressFlag,
            details,
            id, // Handle updates
            branch1,
            user_id,
            deldetailsid,
            BillingVendorCode,
            BillingCINNo
        } = purchaseOrder;
        console.log(details);
        const formattedFileLoc = null;
        console.log(id)

        let message;

        // Update existing purchase order
            const [results] = await db.query(`
                CALL updatepomaster(
                    ?, ?, ?, ?, ?, ?, ?, ?, @message,
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                );
            `, [
                SrNo || '',                            // in_sr_no
                poNo || '',                            // in_po_no
                customer_id || '',                     // in_customer_id
                po_date || '',                         // in_podate
                agr_start_date || '',                  // in_agr_start_date
                agr_end_date || '',                    // in_agr_end_date
                extend_permission || 0,               // in_extend_permission
                entry_person_name || '',               // in_entry_person_name
                branch || '',                          // in_branch
                id || '',                           // in_id
                branch1 || '',                         // in_branch1
                user_id || 1,                         // in_user_id
                billing_address || '',                 // in_Billing_address
                State || '',                           // in_bgstate
                StateCode || '',                       // in_bgstatecode
                CustomerGstNo || '',                   // in_bggstno
                BillingGstDate || null,                // in_bggstdate
                PAN || '',                             // in_bgpan
                BillingCINNo || '',                           // in_bgcin
                credit_period || '',                   // in_creditperiod
                RefNo || '',                           // in_refno
                RefDate || null,                       // in_refdate
                BillingVendorCode || '',                      // in_vendorcode
                billingAddressFlag || '',              // in_billing_address_flag
                deldetailsid || ''                     // in_deldetailsid
            ]);
console.log(results)
            // Retrieve the message from the OUT parameter
            const [messageResult] = await db.query('SELECT @message AS message');
            message = messageResult[0].message;
console.log('message',messageResult)
            // Update or insert PO details
            if (details && details.length > 0) {
                const updatePoDetailsQuery = `
                CALL updatePoDetails(
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                );
            `;
            
            const detailPromises = details.map(detail => {
                return db.query(
                    updatePoDetailsQuery,
                    [
                        id || '',                          // in_po_id
                        detail.PO_Line_No || '',           // in_po_line_no
                        detail.PL_FTL || '',               // in_partload_ftl
                        detail.VehicleType || '',          // in_vehicle_type
                        detail.FromcustomerID || '',       // in_from
                        detail.TocustomerID || '',         // in_to
                        detail.PartLoadRate || '',         // in_partload_rate_kg
                        detail.FTLRate || '',              // in_ftl_rate
                        detail.BoxBinRate || '',           // in_box_bin_rate
                        detail.PartNo || '',               // in_part_no
                        detail.PartDesc || '',             // in_part_description
                        detail.UOM || '',                  // in_measurement_unit
                        detail.CFTwt || '',                // in_cft_wt
                        detail.CollCharTrip || '',         // in_collection_charges
                        detail.DelChargTrip || '',         // in_delivery_charges
                        detail.PartLoadTT || '',           // in_partload_tt
                        detail.FTLTT || '',               // in_ftl_tt
                        detail.LRCharge || '',             // in_lr_charges
                        detail.LoadingCharge || '',        // in_loading_charges
                        detail.UnloadingCharge || '',      // in_unloading_charges
                        detail.WRCharge || '',             // in_warehouse_rent_charges
                        detail.WHAreasqft || '',           // in_warehouse_area_sqft
                        detail.Ratesqft || '',             // in_per_sqft_rate
                        detail.ForkliftCharge || '',       // in_forklift_charges
                        detail.Damragecharge || '',        // in_damrage_charges
                        detail.Delaycharg || '',           // in_delay_delivery_charges
                        detail.OverHead || '',             // in_overhead_charges
                        detail.sqst || '',                 // in_sqst
                        detail.cgst || '',                 // in_cgst
                        detail.igst || '',                 // in_igst
                        detail.no_tax || '',               // in_no_tax
                        detail.OtherCharges1 || '',        // in_other_charges1
                        detail.OtherCharges2 || '',        // in_other_charges2
                        detail.statecode || '',            // in_statecode
                        detail.gstId || '',                // in_gstid
                        detail.id || "",                   // in_id
                    ]
                );
            });
            
             
                // Execute all detail queries
                try {
                    await Promise.all(detailPromises);
                } catch (error) {
                    console.error('Error executing detail queries:', error);
                }
            }

            // Log the update
            await db.query(
                `INSERT INTO po_history (po_id, updated_date, changes, user_id) VALUES (?, CURDATE(), ?, ?)`,
                [id, 'Updated Purchase Order', user_id]
            );

            return res.json({ message, res_code: id });
        
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};






module.exports = {
    getpomaster,
    getpomasterWithSearch,
    addPurchaseOrder,
    deletePoMaster,
    getPurchaseOrderAndDetails,
    upsertPurchaseOrder
};
