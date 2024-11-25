const db = require("../config/dbConfig");
const fs = require('fs').promises;
const nodemailer = require('nodemailer');
const pdf = require("html-pdf");
const path = require("path");
const getallloadingshets = (req, res) => {
    console.log("hiii",req.params)
    const branch = req.params.branch;
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = page * pageSize;

    const query = 'CALL getallloadingshets(?)';
    
    try {
        db.query(query,branch,  (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            const formattedResults = results[0].map((dc) => {
                const dc_no_key = 'CONCAT((SELECT branch_abbreviation FROM branch WHERE branch_id=dm.branch),"-",dm.dc_no)';
                return {
                    id: dc.id,
                    dc_no: dc[dc_no_key],
                    vehicle_number:dc.vehicle_number,
                    bal_amt: dc.total,
                    hire:dc.hire,
                    from_loc: dc.from_loc,
                    to_loc: dc.to_loc,
                    dc_date: dc.dc_date,
                };
            });
            let dc = formattedResults;

            const total = dc.length;
            dc = dc.map(dc => ({
                ...dc,
                dc_no: dc.dc_no ? dc.dc_no.toUpperCase() : null,
                vehicle_number: dc.vehicle_number ? dc.vehicle_number.toUpperCase() : null,
                bal_amt: dc.bal_amt ? dc.bal_amt.toUpperCase() : null,
                hire: dc.hire ? dc.hire.toUpperCase() : null,
                from_loc: dc.from_loc ? dc.from_loc.toUpperCase() : null,
                to_loc: dc.to_loc ? dc.to_loc.toUpperCase() : null,
                dc_date: dc.dc_date ? dc.dc_date.toUpperCase() : null,
          
            }));

            const paginatedPlaces = dc.slice(offset, offset + pageSize);

          return  res.json({
            dc: paginatedPlaces,
                total: total
            });
        });
    } catch (err) {
       
       return res.status(500).send('Server error');
    }
};
const getallItssearch = (req, res) => {
    const branch = req.params.branch;
    const { in_memo_no, in_vehicle_id, start_index, counts } = req.query;

    const query = 'CALL lts_search(?, ?, ?, ?, ?)';

    try {
        db.query(query, [in_memo_no, in_vehicle_id,branch,  parseInt(start_index), parseInt(counts)], (err, results) => {
            if (err) {
              return res.status(500).send('Server error');    
            }
            if (results.length === 0 || results[0].length === 0) {
               return res.json([])
            }

            
            const formattedResults = results[0].map((dc) => {
                const dc_no_key = 'CONCAT((SELECT branch_abbreviation FROM branch WHERE branch_id=dm.branch),"-",dm.dc_no)';
                return {
                    id: dc.id,
                    dc_no: dc[dc_no_key],
                    dc_date: dc.dc_date,
                    vehicle_number: dc.vehicle_number,
                    from_loc: dc.from_loc,
                    to_loc: dc.to_loc,
                    hire: dc.hire,
                    bal_amt: dc.total,
                    '@tot_counts': dc['@tot_counts'], 
                    '@totc': dc['@totc'],
                    } 
            });
         return   res.json(formattedResults);
        });
    } catch (err) {
       return  res.status(500).send('Server error');
    }
};
const getlrforloadingsheetedit = (req, res) => {
    const branch = req.params.branch;
    const query = `SELECT lrm.id, 
       CONCAT(b.branch_abbreviation, '-', lrm.lr_no) AS lr_no, 
       lrm.lr_date
FROM lorry_reciept_master lrm
JOIN branch b ON lrm.branch = b.branch_id
WHERE lrm.branch = ?;
`;

    try {
        db.query(query, branch, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            // Format the results to include the desired concatenation
            const formattedResults = results.map((dc) => {
             
                return {
                    id: dc.id,
                    lr_no: dc.lr_no,
                
                    } 
            })

            return res.json(formattedResults);
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Server error');
    }
};
const getlrforloadingsheet = (req, res) => {
    const branch = req.params.branch;
    const query = 'CALL lorrymasterlistfordc(?)';

    try {
        db.query(query, branch, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            // Format the results to include the desired concatenation
            const formattedResults = results[0].map((dc) => {
                const dc_no_key = 'CONCAT((SELECT branch_abbreviation FROM branch WHERE branch_id=lm.branch),"-",lm.lr_no)';
                return {
                    id: dc.id,
                    lr_no: dc[dc_no_key],
                    
                    } 
            })

            return res.json(formattedResults);
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Server error');
    }
};

const getloadingsheetFreightbyid = (req, res) => {
    const id = req.params.id;
    console.log(id);

    const queryMaster = `SELECT * FROM dc_master WHERE id = ?`;
    const queryTransect = `SELECT * FROM dc_transactions WHERE dc_master_id = ?`;

    try {
        // First query to fetch from dc_master
        db.query(queryMaster, [id], (err, masterResults) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            if (masterResults.length === 0) {
                res.status(404).send('No record found');
                return;
            }

            // Extract the first result from dc_master
            const masterData = masterResults[0];

            // Second query to fetch from dc_transect
            db.query(queryTransect, [id], (err, transectResults) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).send('Server error');
                    return;
                }

                // Attach the transect results to the master data
                masterData.transectEntries = transectResults;

                // Send the combined result
                return res.json(masterData);
            });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};

const getloadingsheetbyid = (req, res) => {
    const id = req.params.id
    console.log(id)
    const query = `SELECT dm.id,dm.branch AS branchid , dm.dc_no, DATE_FORMAT(dm.dc_date, "%Y-%m-%d") AS dc_date, dm.vehicle_id, vo.vehical_owner_name, vt.vehicle_type, vo.address, vo.telephoneno, dm.driver_id,d.driver_name,
d.licenseno,d.mobileno, dm.from_loc, dm.to_loc, dm.total_packages, dm.total_wt,dm.hire,dm.extra_wt_ch,dm.hamali,dm.commission,dm.adv_amt 
,dm.diesel_ch,dm.petrol_pump,dm.total,dm.bal_amt,DATE_FORMAT(dm.bal_amt_date, "%Y-%m-%d") AS bal_amount ,dm.pay_mode,dm.user_id,dm.bank_name,
dm.cheque_rtgs,dm.cheque_rtgs_date,dm.payble_at,dm.remarks, dm.branch, dm.fileloc,
v.vehicleno AS vehicleno,
d.driver_name AS driver,
fplace.place_name AS froml,tplace.place_name AS tol,
b.branch_name AS branch,
dm.driver_charges,dm.total_pay_amount FROM dc_master dm 
LEFT JOIN vehicle v ON v.vehicle_id=dm.vehicle_id LEFT JOIN vehicle_owner_details vo ON vo.vod_id=v.vo_id 
LEFT JOIN vehicle_type vt ON vt.vt_id=v.vehicle_typeid 
LEFT JOIN driver d ON d.driver_id=dm.driver_id
LEFT JOIN place fplace ON fplace.place_id=dm.from_loc
LEFT JOIN place tplace ON tplace.place_id=dm.to_loc
LEFT JOIN branch b ON b.branch_id=dm.branch		

WHERE dm.id=?
`;
    
    try {
        db.query(query,id,  (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }
            return res.json(results[0]);
        });
    } catch (err) {
        console.error('Error:', err);
      return  res.status(500).send('Server error');
    }
};
const getlrdetailsforloadsheet = (req, res) => {
    // Extract selectedIds from req.params and format them as a comma-separated string
    const selectedIds = req.params.selectedIds.split(',').map(id => parseInt(id.trim())).join(',');
    const formattedIds = `(${selectedIds})`; // Format as a string within parentheses

    const query = 'CALL getlrdetailsforloadsheet(?)';

    try {
        db.query(query, [formattedIds], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
             return   res.status(500).send('Server error');
                return;
            }

         return   res.json(results[0]);
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};




const insertIntoLsPayDetails = (connection, insertedId, branchwisepaymentrows, callback) => {
    // Check if branchwisepaymentrows is empty
    if (branchwisepaymentrows.length === 0) {
        // If empty, return early or handle as needed
        return callback(null, { message: 'No payment details to insert.' });
    }

    // Prepare values for insertion
    const payDetailsValues = branchwisepaymentrows.map(row => [insertedId, row.lrid, row.branchid, row.amount]);
    
    // Query to insert into ls_pay_details
    const insertPayDetailsQuery = `
        INSERT INTO ls_pay_details (ls_master_id, lr_id, pay_branch_id, pay_amount)
        VALUES ?
    `;
    
    // Execute the insertion query
    connection.query(insertPayDetailsQuery, [payDetailsValues], (err, results) => {
        if (err) {
            return callback(err);
        }
        
        // Successful insertion
        callback(null, results);
    });
};

// Main function for adding dc_master record
const add_dc_master = (req, res) => {
    
    const {
        challanNo,
        date,
        truckNo,
        driverName,
        from,
        to,
        freightDetails,
        payableAt,
        totalPackages,
        remark,
        in_branch,
        in_user_id,
        in_lrtoshowamount,
        branchwisepaymentrows
    } = req.body;

    const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const formattedDate = date ? `${date} ${currentTime}` : currentTime;

    const in_dc_no = challanNo || null;
    const in_dc_date = formattedDate;
    const in_vehicle_id = truckNo;
    const in_driver_id = driverName;
    const in_from_loc = from;
    const in_to_loc = to;
    const in_hire = freightDetails.formState.totHireRs;
    const in_extra_wt_ch = freightDetails.formState.extraWtChar;
    const in_hamali = freightDetails.formState.hamali;
    const in_commission = freightDetails.formState.commission;
    const in_adv_amt = freightDetails.formState.advAmt;
    const in_diesel_ch = freightDetails.formState.dieselChar;
    const in_total = freightDetails.formState.total;
    const in_total_wt = freightDetails.formState.totalWeight;
    const in_payble_at = payableAt;
    const in_total_packages = freightDetails.formState.totalPackages;
    const in_remarks = remark;
    const in_fileloc = 'NULL';
    const in_driver_charges = freightDetails.formState.driverChar;

    db.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Server error');
        }

        connection.beginTransaction(err => {
            if (err) {
                connection.release();
                return res.status(500).send('Server error');
            }

            const getMaxDcNoQuery = `
                SELECT COALESCE(MAX(dc_no) + 1, '0001') as dc_number 
                FROM dc_master 
                WHERE branch = ? 
                AND (SELECT start_date_lts FROM year_setting) <= DATE_FORMAT(dc_date, "%Y-%m-%d")
            `;

            connection.query(getMaxDcNoQuery, [in_branch], (err, results) => {
                if (err) {
                    return connection.rollback(() => {
                        connection.release();
                        return res.status(500).send('Server error');
                    });
                }

                const dc_number = in_dc_no || results[0].dc_number;

                const checkIfExistsQuery = `
                    SELECT dc_no 
                    FROM dc_master 
                    WHERE dc_no = ? 
                    AND branch = ? 
                    AND (SELECT start_date_lts FROM year_setting) <= DATE_FORMAT(dc_date, "%Y-%m-%d")
                `;

                connection.query(checkIfExistsQuery, [dc_number, in_branch], (err, results) => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            return res.status(500).send('Server error');
                        });
                    }

                    if (results.length > 0) {
                        connection.rollback(() => {
                            connection.release();
                            return res.status(400).send(`LTS (${dc_number}) Already Exist!`);
                        });
                    } else {
                        const insertMasterQuery = `
                            INSERT INTO dc_master (
                                dc_no, dc_date, vehicle_id, driver_id, from_loc, to_loc, hire, extra_wt_ch, hamali, commission, adv_amt, diesel_ch, petrol_pump,
                                total, total_wt, bal_amt, bal_amt_date, pay_mode, bank_name, cheque_rtgs, cheque_rtgs_date, payble_at, total_packages,
                                remarks, branch, fileloc, user_id, total_pay_amount, driver_charges
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        `;

                        const fileloc = `/home/${new Date().getFullYear()}/dcs/`;

                        connection.query(insertMasterQuery, [
                            dc_number, in_dc_date, in_vehicle_id, in_driver_id, in_from_loc, in_to_loc, in_hire, in_extra_wt_ch, in_hamali, in_commission,
                            in_adv_amt, in_diesel_ch, null, in_total, in_total_wt, '0', null, 'Cash', 'NULL', 'NULL', 'NULL', in_payble_at, in_total_packages,
                            in_remarks, in_branch, fileloc, in_user_id, 'NULL', in_driver_charges
                        ], (err, results) => {
                            if (err) {
                                return connection.rollback(() => {
                                    connection.release();
                                    return res.status(500).send('Server error');
                                });
                            }

                            const insertedId = results.insertId;

                            const lrIds = freightDetails.rows.map(row => row.id);
                            const lrValues = lrIds.map(lr_id => [lr_id, 0, insertedId]);

                            const insertTransactionsQuery = `
                                INSERT INTO dc_transactions (lr_id, dc_status, dc_master_id)
                                VALUES ?
                            `;

                            connection.query(insertTransactionsQuery, [lrValues], (err, results) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        return res.status(500).send('Server error');
                                    });
                                }

                                const updateLorryReceiptQuery = `
                                    UPDATE lorry_reciept_master
                                    SET truck_tempo_number = (SELECT vehicleno FROM vehicle WHERE vehicle_id = ?)
                                    WHERE id IN (SELECT lr_id FROM dc_transactions WHERE dc_master_id = ?)
                                `;

                                connection.query(updateLorryReceiptQuery, [in_vehicle_id, insertedId], (err, results) => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            return res.status(500).send('Server error');
                                        });
                                    }

                                    const insertStatusQuery = `
                                        INSERT INTO dc_status (dc_id, status, dc_status, inward_status)
                                        VALUES (?, '1', 1, 0)
                                    `;

                                    connection.query(insertStatusQuery, [insertedId], (err, results) => {
                                        if (err) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                return res.status(500).send('Server error');
                                            });
                                        }

                                        const updateLrStatusQuery = `
                                            UPDATE lr_status 
                                            SET status = 2 
                                            WHERE lr_id IN (${lrIds.join(',')})
                                        `;

                                        connection.query(updateLrStatusQuery, (err, results) => {
                                            if (err) {
                                                return connection.rollback(() => {
                                                    connection.release();
                                                    return res.status(500).send('Server error');
                                                });
                                            }

                                            if (in_lrtoshowamount && in_lrtoshowamount.length > 0) {
                                                const updateShowAmountQuery = `
                                                    UPDATE dc_transactions
                                                    SET showamount_flag = 1
                                                    WHERE lr_id IN (${in_lrtoshowamount.join(',')})
                                                `;

                                                connection.query(updateShowAmountQuery, (err, results) => {
                                                    if (err) {
                                                        return connection.rollback(() => {
                                                            connection.release();
                                                            return res.status(500).send('Server error');
                                                        });
                                                    }

                                                    // Call the function to insert into ls_pay_details
                                                
                                                    insertIntoLsPayDetails(connection, insertedId, branchwisepaymentrows, (err, results) => {
                                                        if (err) {
                                                            return connection.rollback(() => {
                                                                connection.release();
                                                                return res.status(500).send('Error inserting into ls_pay_details');
                                                            });
                                                        }

                                                        // Commit the transaction if everything is successful
                                                        connection.commit(err => {
                                                            if (err) {
                                                                return connection.rollback(() => {
                                                                    connection.release();
                                                                    return res.status(500).send('Commit error');
                                                                });
                                                            }

                                                            connection.release();
                                                            return res.json({ message: `LTS (${dc_number}) Added Successfully`, inserted_id: insertedId });
                                                        });
                                                    }
                                                    )
                                                });
                                            } else {
                                                // Call the function to insert into ls_pay_details
                                                insertIntoLsPayDetails(connection, insertedId, branchwisepaymentrows, (err, results) => {
                                                    if (err) {
                                                        return connection.rollback(() => {
                                                            connection.release();
                                                            return res.status(500).send('Error inserting into ls_pay_details');
                                                        });
                                                    }

                                                    // Commit the transaction if everything is successful
                                                    connection.commit(err => {
                                                        if (err) {
                                                            return connection.rollback(() => {
                                                                connection.release();
                                                                return res.status(500).send('Commit error');
                                                            });
                                                        }

                                                        connection.release();
                                                        return res.json({ message: `LTS (${dc_number}) Added Successfully`, inserted_id: dc_number });
                                                    });
                                                });
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    }
                });
            });
        });
    });
};

const getlrdetailsbybranchwise=(req,res)=>{
    
    const id = req.params.id;
    const query = `

    SELECT 
    ls_pay_details.*,
    CONCAT(branch.branch_abbreviation, '-', lorry_reciept_master.lr_no) AS lr_no_with_abbr,
     branch.branch_name
FROM 
    ls_pay_details
JOIN 
    lorry_reciept_master ON ls_pay_details.lr_id = lorry_reciept_master.id
JOIN 
    branch ON lorry_reciept_master.branch = branch.branch_id
WHERE 
    ls_pay_details.ls_master_id = ?

`;

    try {
        db.query(query, id, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

           
            return res.json(results);
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};

const Updatedcmaster = (req, res) => {
    const id=req.params.id

    const {
        challanNo,
        date,
        truckNo,
        driverName,
        from,
        to,
        freightDetails,
        payableAt,
       // totalPackages,
        remark,
        branch,
        userId,
        in_lrtoshowamount,
        branchwisepaymentrows
    } = req.body;

    const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    const formattedDate = date ? `${date} ${currentTime}` : currentTime;
    const dcDate = formattedDate;
    const vehicleId = truckNo;
    const driverId = driverName;
    const fromLoc = from;
    const toLoc = to;
    const hire = freightDetails.formState.totHireRs;
    const extraWtCh = freightDetails.formState.extraWtChar;
    const hamali = freightDetails.formState.hamali;
    const commission = freightDetails.formState.commission;
    const advAmt = freightDetails.formState.advAmt;
    const dieselCh = freightDetails.formState.dieselChar;
    const total = freightDetails.formState.total;
    const totalWt = freightDetails.formState.totalWeight;
    const paybleAt = payableAt;
    const totalPackages = freightDetails.formState.totalPackages;
    const remarks = remark;
    const totalPayAmount = freightDetails.formState.total;
    const driverCharges = freightDetails.formState.driverChar;

    db.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Server error');
        }

        connection.beginTransaction(err => {
            if (err) {
                connection.release();
                return res.status(500).send('Server error');
            }

            const updateDcMasterQuery = `
                UPDATE dc_master 
                SET vehicle_id = ?, driver_id = ?, from_loc = ?, to_loc = ?, hire = ?, extra_wt_ch = ?, hamali = ?, commission = ?, adv_amt = ?, 
                    diesel_ch = ?, petrol_pump = ?, total = ?, total_wt = ?, bal_amt = '0', bal_amt_date = NULL, pay_mode = 'Cash', bank_name = 'NULL', 
                    cheque_rtgs = 'NULL', cheque_rtgs_date = 'NULL', payble_at = ?, total_packages = ?, remarks = ?, total_pay_amount = ?, 
                    driver_charges = ? 
                WHERE id = ?
            `;

            connection.query(updateDcMasterQuery, [
                vehicleId, driverId, fromLoc, toLoc, hire, extraWtCh, hamali, commission, advAmt, dieselCh, null, total, totalWt,
                paybleAt, totalPackages, remarks, totalPayAmount, driverCharges, id
            ], (err, results) => {
                if (err) {
                    return connection.rollback(() => {
                        connection.release();
                        return res.status(500).send('Server error');
                    });
                }

                const lrIds = freightDetails.rows.map(row => row.id);
                const lrValues = lrIds.map(lr_id => [lr_id, 0, id]);
                const lrData = `(${lrValues.map(lr => lr.join(',')).join('),(')})`;

                const deleteDcTransactionsQuery = `
                    DELETE FROM dc_transactions 
                    WHERE dc_master_id = ?
                `;

                connection.query(deleteDcTransactionsQuery, [id], (err, results) => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            return res.status(500).send('Server error');
                        });
                    }

                    const insertDcTransactionsQuery = `
                        INSERT INTO dc_transactions (lr_id, dc_status, dc_master_id)
                        VALUES ${lrData}
                    `;

                    connection.query(insertDcTransactionsQuery, (err, results) => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                return res.status(500).send('Server error');
                            });
                        }

                        const updateLorryReceiptQuery = `
                            UPDATE lorry_reciept_master 
                            SET truck_tempo_number = (SELECT vehicleno FROM vehicle WHERE vehicle_id = ?)
                            WHERE id IN (SELECT lr_id FROM dc_transactions WHERE dc_master_id = ?)
                        `;

                        connection.query(updateLorryReceiptQuery, [vehicleId, id], (err, results) => {
                            if (err) {
                                return connection.rollback(() => {
                                    connection.release();
                                    return res.status(500).send('Server error');
                                });
                            }

                            const updateLrStatusQuery = `
                                UPDATE lr_status 
                                SET status = 2 
                                WHERE lr_id IN (${lrIds.join(',')})
                            `;

                            connection.query(updateLrStatusQuery, (err, results) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        return res.status(500).send('Server error');
                                    });
                                }

                                const deleteLsPayDetailsQuery = `
                                    DELETE FROM ls_pay_details 
                                    WHERE ls_master_id = ?
                                `;

                                connection.query(deleteLsPayDetailsQuery, [id], (err, results) => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            return res.status(500).send('Server error');
                                        });
                                    }

                                    if (in_lrtoshowamount && in_lrtoshowamount.length > 0) {
                                        const updateShowAmountQuery = `
                                            UPDATE dc_transactions
                                            SET showamount_flag = 1
                                            WHERE lr_id IN (${in_lrtoshowamount.join(',')})
                                        `;

                                        connection.query(updateShowAmountQuery, (err, results) => {
                                            if (err) {
                                                return connection.rollback(() => {
                                                    connection.release();
                                                    return res.status(500).send('Server error');
                                                });
                                            }

                                        
                                            insertIntoLsPayDetails(connection, id, branchwisepaymentrows, (err, results) => {
                                                if (err) {
                                                    return connection.rollback(() => {
                                                        connection.release();
                                                        return res.status(500).send('Error inserting into ls_pay_details');
                                                    });
                                                }

                                                // Commit the transaction if everything is successful
                                                connection.commit(err => {
                                                    if (err) {
                                                        return connection.rollback(() => {
                                                            connection.release();
                                                            return res.status(500).send('Commit error');
                                                        });
                                                    }

                                                    connection.release();
                                                    return res.json({ message: `LTS (${challanNo}) Added Successfully`, inserted_id: id });
                                                });
                                            }
                                            )
                                        });
                                    } else {
                                        insertIntoLsPayDetails(connection, id, branchwisepaymentrows, (err, results) => {
                                            if (err) {
                                                return connection.rollback(() => {
                                                    connection.release();
                                                    return res.status(500).send('Error inserting into ls_pay_details');
                                                });
                                            }

                                            // Commit the transaction if everything is successful
                                            connection.commit(err => {
                                                if (err) {
                                                    return connection.rollback(() => {
                                                        connection.release();
                                                        return res.status(500).send('Commit error');
                                                    });
                                                }

                                                connection.release();
                                                return res.json({ message: `LTS (${challanNo}) Updated Successfully`, inserted_id: challanNo });
                                            });
                                        })
                                    }
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};

const getLoadingTripByIdPdfedit = async (req, res) => {
    try {
        const { id } = req.params;

        // Query to fetch DC details
        const query1 = `
            SELECT 
                dc_master.*, 
                DATE_FORMAT(dc_master.dc_date, '%d-%m-%Y') AS dc_date,
                vehicle.vehicleno, 
                vehicle_owner_details.vehical_owner_name,
                vehicle_owner_details.telephoneno,
                vehicle_owner_details.address,
                place.place_name AS fromplace,
                place2.place_name AS toplace,
                driver.driver_name,
                CONCAT(branch.branch_abbreviation, '-', dc_master.dc_no) AS lts_no,
                driver.licenseno,
                driver.mobileno
            FROM 
                dc_master 
            JOIN 
                vehicle ON dc_master.vehicle_id = vehicle.vehicle_id 
            JOIN 
                vehicle_owner_details ON vehicle.vo_id = vehicle_owner_details.vod_id
            JOIN 
                place ON dc_master.from_loc = place.place_id
            JOIN 
                place AS place2 ON dc_master.to_loc = place2.place_id 
            JOIN 
                driver ON dc_master.driver_id = driver.driver_id 
            JOIN 
                branch ON dc_master.branch = branch.branch_id  
            JOIN 
                dc_transactions ON dc_master.id = dc_transactions.dc_master_id  
            WHERE 
                dc_master.id = ?
        `;

        // Execute query1 to fetch DC details
        db.query(query1, id, async (err, results1) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Server error');
            }

            if (results1.length === 0) {
                return res.status(404).send('DC not found');
            }

            const Data = results1[0];

            // Query to fetch LR IDs associated with the DC
            const query4 = `
                SELECT lr_id FROM dc_transactions WHERE dc_master_id = ?;
            `;

            // Execute query4 to fetch LR IDs
            db.query(query4, id, async (err, results4) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Server error');
                }

                const lrIds = results4.map(item => item.lr_id);

                if (lrIds.length === 0) {
                    const finalResult = {
                        Data: Data,
                        lrData: []
                    };
                    return sendPdf(finalResult, res); // Assuming sendPdf function is used for PDF generation
                }

                // Fetch LR details for each LR ID
                const lrData = [];
                for (const lrId of lrIds) {
                    const query2 = `
                        SELECT 
                            lm.lr_no,
                            lm.pay_type,
                            CONCAT(branch.branch_abbreviation, '-', lm.lr_no) AS lrnumber,
                            branch.branch_abbreviation,
                            DATE_FORMAT(lm.lr_date, '%d-%m-%Y') AS lr_date,
                            cust1.customer_name AS consigner,
                            cust2.customer_name AS consignee,
                            fplace.place_name AS from_loc,
                            tplace.place_name AS to_loc,
                            SUM(lt.no_of_articles) AS noofarticles,
                            SUM(lt.char_wt) AS weight,
                            lm.total,
                            lm.id 
                        FROM 
                            lorry_reciept_master lm 
                        INNER JOIN 
                            transactions_lr lt ON lm.id = lt.lr_master_id 
                        LEFT JOIN 
                            customer cust1 ON cust1.customer_id = lm.consigner 
                        LEFT JOIN 
                            customer cust2 ON cust2.customer_id = lm.consignee 
                        LEFT JOIN 
                            place fplace ON fplace.place_id = lm.loc_from 
                        LEFT JOIN 
                            place tplace ON tplace.place_id = lm.loc_to
                        LEFT JOIN 
                            branch ON branch.branch_id = lm.branch 
                        WHERE 
                            lm.id = ?
                        GROUP BY 
                            lm.id;
                    `;

                    // Execute query2 to fetch LR details
                    db.query(query2, lrId, (err, lrResult) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).send('Server error');
                        }

                        if (lrResult.length > 0) {
                            lrData.push(lrResult[0]);
                        }

                        // If all LR details fetched, proceed to fetch payment details
                        if (lrData.length === lrIds.length) {
                            // Query to fetch payment details
                            const query3 = `
                                SELECT 
                                    lpd.*, 
                                    b1.branch_name,
                                    CONCAT(b.branch_abbreviation, '-', lm.lr_no) AS lrnumber,
                                    DATE_FORMAT(lm.lr_date, '%d-%m-%Y') AS lr_date
                                FROM 
                                    ls_pay_details lpd
                                JOIN 
                                    lorry_reciept_master lm ON lpd.lr_id = lm.id
                                JOIN 
                                    branch b ON lm.branch = b.branch_id
                                JOIN 
                                    branch b1 ON lpd.pay_branch_id = b1.branch_id
                                WHERE 
                                    lpd.ls_master_id = ?;
                            `;

                            // Execute query3 to fetch payment details
                            db.query(query3, id, async (err, results3) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(500).send('Server error');
                                }

                                const finalResult = {
                                    Data: Data,
                                    lrData: lrData,
                                    paymentData: results3
                                };

                                // Calculate total number of articles and total sum
                                const totalNoOfArticles = lrData.reduce((sum, item) => sum + item.noofarticles, 0);
                                const totalsum = lrData.reduce((sum, item) => sum + parseInt(item.total), 0);

                                try {
                                    // Read HTML template for PDF generation
                                    const templatePath = path.join(__dirname, '../LoadingTrippdf/loadingtrip.html');
                                    const templateContent = await fs.readFile(templatePath, 'utf8');

                                    // Replace placeholders in HTML template with fetched data
                                    let renderedHTML = templateContent
                                        .replace('{{totalNoOfArticles}}', totalNoOfArticles)
                                        .replace('{{totalsum}}', totalsum)
                                        .replace('{{Data.lts_no}}', Data.lts_no)
                                        .replace('{{Data.vehicleno}}', Data.vehicleno)
                                        .replace('{{Data.fromplace}}', Data.fromplace)
                                        .replace('{{Data.toplace}}', Data.toplace)
                                        .replace('{{Data.dc_date}}', Data.dc_date)
                                        .replace('{{Data.vehical_owner_name}}', Data.vehical_owner_name)
                                        .replace('{{Data.address}}', Data.address)
                                        .replace('{{Data.telephoneno}}', Data.telephoneno)
                                        .replace('{{Data.driver_name}}', Data.driver_name)
                                        .replace('{{Data.licenseno}}', Data.licenseno || '')
                                        .replace('{{Data.mobileno}}', Data.mobileno || '')
                                        .replace('{{Data.hire}}', Data.hire || '')
                                        .replace('{{Data.hamali}}', Data.hamali || '')
                                        .replace('{{Data.commission}}', Data.commission || '')
                                        .replace('{{Data.extra_wt_ch}}', Data.extra_wt_ch || '')
                                        .replace('{{Data.diesel_ch}}', Data.diesel_ch || '')
                                        .replace('{{Data.adv_amt}}', Data.adv_amt || '')
                                        .replace('{{Data.driver_charges}}', Data.driver_charges || '')
                                        .replace('{{Data.total}}', Data.total);

                                    // Prepare HTML for LR details
                                    let itemSummariesHTML = '';
                                    lrData.forEach(item => {
                                        const breakConsigner = (text, targetLength) => {
                                            const currentLength = text.length;
                                            if (currentLength >= targetLength) {
                                                return text;
                                            } else {
                                                const spacesToAdd = targetLength - currentLength;
                                                const spaces = ' '.repeat(spacesToAdd);
                                                return text + spaces;
                                            }
                                        };

                                        let consignerBreak = breakConsigner(item.consigner, 41);

                                        itemSummariesHTML += `
                                            <tr style="height:12pt">
                                                <td style="width:100pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                    <p className="s4">${item.lrnumber}</p>
                                                </td>
                                                <td style="width:55pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                    <p className="s4">${item.to_loc}</p>
                                                </td>
                                                <td style="width:100pt; max-width:100pt; border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                    <span className="s7">${consignerBreak}</span>
                                                </td>
                                                <td style="width:118pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                    <p className="s4">${item.consignee}</p>
                                                </td>
                                                <td style="width:59pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                    <p className="s4">${item.noofarticles}</p>
                                                </td>
                                                <td style="width:59pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                    <p className="s4">${item.pay_type}</p>
                                                </td>
                                                <td style="width:49pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                    <p className="s4">${item.total}</p>
                                                </td>
                                            </tr>
                                        `;
                                    });

                                    // Prepare HTML for payment details
                                    let itemSummariesHTML2 = '';
                                    results3.forEach(item => {
                                        itemSummariesHTML2 += `
                                            <tr style="height:18pt">
                                                <td style="width:157pt;border-style:solid;border-width:1pt">
                                                    <p className="s4">${item.lrnumber}</p>
                                                </td>
                                                <td style="width:118pt;border-style:solid;border-width:1pt">
                                                    <p className="s4">${item.branch_name}</p>
                                                </td>
                                                <td style="width:118pt;border-style:solid;border-width:1pt">
                                                    <p className="s4">${item.pay_amount}</p>
                                                </td>
                                                <td style="width:177pt;border-style:solid;border-width:1pt">
                                                    <p className="s4">0.00</p>
                                                </td>
                                            </tr>
                                        `;
                                    });

                                    // Placeholder HTML for empty row
                                    const itemSummariesHTML1 = `
                                        <tr style="height:12pt">
                                            <td style="width:100pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                <p className="s4"></p>
                                            </td>
                                            <td style="width:55pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                <p className="s4">&nbsp;</p>
                                            </td>
                                            <td style="width:100pt; max-width:100pt; border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                <span className="s7">&nbsp;</span>
                                            </td>
                                            <td style="width:118pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                <p className="s4">&nbsp;</p>
                                            </td>
                                            <td style="width:59pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                <p className="s4">&nbsp;</p>
                                            </td>
                                            <td style="width:59pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                <p className="s4">&nbsp;</p>
                                            </td>
                                            <td style="width:49pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                <p className="s4">&nbsp;</p>
                                            </td>
                                        </tr>
                                    `;

                                    // Replace placeholders in HTML template with item summaries
                                    renderedHTML = renderedHTML
                                        .replace('{{itemSummaries}}', itemSummariesHTML)
                                        .replace('{{itemSummariesHTML1}}', itemSummariesHTML1)
                                        .replace('{{itemSummariesHTML2}}', itemSummariesHTML2);

                                    // PDF generation options
                                    const options = {
                                        format: 'A4',
                                        orientation: 'portrait',
                                        border: {
                                            top: '10mm',
                                            right: '10mm',
                                            bottom: '10mm',
                                            left: '10mm'
                                        },
                                    };

                                    // Final path and file name for PDF
                                    const finalPath = path.join(__dirname, '../LoadingTrippdf/');
                                    const fileName = Data.lts_no;
                                    const returnpath = `LoadingTrippdf/${fileName}.pdf`;

                                    // Generate PDF using rendered HTML
                                    pdf.create(renderedHTML, options).toFile(
                                        path.join(finalPath, `${fileName}.pdf`),
                                        (pdfErr, result) => {
                                            if (pdfErr) {
                                                console.log(pdfErr);
                                                return res.status(500).json({ error: true, message: 'Error creating PDF' });
                                            }

                                            const fileToSend = result.filename;
                                            return res.json({ returnpath });
                                        }
                                    );

                                } catch (readFileErr) {
                                    console.log(readFileErr);
                                    return res.status(500).json({ error: true, message: 'Error reading HTML template' });
                                }
                            });
                        }
                    });
                }
            });
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
};

const getLoadingTripByIdPdfmail = async (req, res) => {
    try {
      const { id } = req.params;
      
      const query1 = `  SELECT 
    dc_master.*, 
    DATE_FORMAT(dc_master.dc_date, '%d-%m-%Y') AS dc_date,
    vehicle.vehicleno, 
    vehicle_owner_details.vehical_owner_name,
    vehicle_owner_details.telephoneno,
    vehicle_owner_details.address,
    place.place_name AS fromplace,
    place2.place_name AS toplace,
    driver.driver_name,
    CONCAT(branch.branch_abbreviation, '-', dc_master.dc_no) AS lts_no,
    driver.licenseno,
    driver.mobileno,
     GROUP_CONCAT(dc_transactions.lr_id) AS lr_ids
FROM 
    dc_master 
JOIN 
    vehicle 
ON 
    dc_master.vehicle_id = vehicle.vehicle_id 
JOIN 
    vehicle_owner_details 
ON 
    vehicle.vo_id = vehicle_owner_details.vod_id
JOIN 
    place 
ON 
    dc_master.from_loc = place.place_id
JOIN 
    place AS place2
ON 
    dc_master.to_loc = place2.place_id 
JOIN 
    driver 
ON 
    dc_master.driver_id = driver.driver_id 
JOIN 
    branch 
ON 
    dc_master.branch = branch.branch_id  
JOIN 
    dc_transactions 
ON 
    dc_master.id = dc_transactions.dc_master_id  
WHERE 
    dc_master.id = ?
GROUP BY
    dc_master.id;
  `;
      db.query(query1, id, async (err, results1) => {
        if (err) {
            console.log(err)
          return res.status(500).send('Server error');
        }
    const query4 = ` 
SELECT lr_id FROM dc_transactions WHERE dc_master_id=?;
  `;
  db.query(query4, id, async (err, results4) => {
        if (err) {
        console.log(err)
          return res.status(500).send('Server error');
        }
       const Data = results1[0];
  console.log(results4)
 
const ids = results4.map(item => item.lr_id);

let formattedSelectedIds;
if (ids.length > 1) {
    formattedSelectedIds = `(${ids.join(',')})`;
} else {
    formattedSelectedIds = `(${ids[0]})`;
}

console.log('formattedSelectedIds',formattedSelectedIds);
  

  
        const query2 = ` SELECT 
    lm.lr_no,
    lm.pay_type,
    CONCAT(branch.branch_abbreviation, '-', lm.lr_no) AS lrnumber,
    branch.branch_abbreviation,
    DATE_FORMAT(lm.lr_date, '%d-%m-%Y') AS lr_date,
    cust1.customer_name AS consigner,
    cust2.customer_name AS consignee,
    fplace.place_name AS from_loc,
    tplace.place_name AS to_loc,
    SUM(lt.no_of_articles) AS noofarticles,
    SUM(lt.char_wt) AS weight,
    lm.total,
    lm.id 
  FROM 
    lorry_reciept_master lm 
  INNER JOIN 
    transactions_lr lt 
  ON 
    lm.id = lt.lr_master_id 
  LEFT JOIN 
    customer cust1 
  ON 
    cust1.customer_id = lm.consigner 
  LEFT JOIN 
    customer cust2 
  ON 
    cust2.customer_id = lm.consignee 
  LEFT JOIN 
    place fplace 
  ON 
    fplace.place_id = lm.loc_from 
  LEFT JOIN 
    place tplace 
  ON 
    tplace.place_id = lm.loc_to
   LEFT JOIN 
    branch  
  ON 
    branch.branch_id = lm.branch 
  WHERE 
    lm.id IN (${formattedSelectedIds}) 
  GROUP BY 
    lm.id;
`;
db.query(query2, async(err, results2) => {
          if (err) {
            
            return res.status(500).send('Server error');
          }
          const query3= ` 
         SELECT lpd.*,b1.branch_name,
CONCAT(b.branch_abbreviation, '-', lm.lr_no) AS lrnumber,
 (CAST(lm.total AS SIGNED) - CAST(lpd.pay_amount AS SIGNED)) AS remaining_amount,
DATE_FORMAT(lm.lr_date, '%d-%m-%Y') AS lr_date
FROM ls_pay_details lpd
JOIN lorry_reciept_master lm ON lpd.lr_id = lm.id
JOIN branch b ON lm.branch = b.branch_id
JOIN branch b1 ON lpd.pay_branch_id = b1.branch_id
WHERE lpd.ls_master_id = ?;


      `;
          db.query(query3, id,async(err, results3) => {
            if (err) {
              console.log(err)
              return res.status(500).send('Server error');
            }
    
          const finalResult = {
            Data: Data, 
            lrData: results2
          };
          const totalNoOfArticles = results2.reduce((sum, item) => sum + item.noofarticles, 0)
          const totalsum = results2.reduce((sum, item) => sum + parseInt(item.total), 0)
          try {
        
            const templatePath = path.join(__dirname, '../LoadingTrippdf/loadingtrip.html');
            const templateContent = await fs.readFile(templatePath, 'utf8');
            const mobileno = Data.mobileno == null ? '' : Data.mobileno;
            const licenseno = Data.licenseno == null ? '' : Data.licenseno;
            let renderedHTML = templateContent
            .replace('{{totalNoOfArticles}}',totalNoOfArticles)
            .replace('{{totalsum}}',totalsum)
            .replace('{{Data.lts_no}}', Data.lts_no)
            .replace('{{Data.vehicleno}}', Data.vehicleno)
            .replace('{{Data.fromplace}}', Data.fromplace)
            .replace('{{Data.toplace}}', Data.toplace)
            .replace('{{Data.dc_date}}', Data.dc_date)
            .replace('{{Data.vehical_owner_name}}', Data.vehical_owner_name)
            .replace('{{Data.address}}', Data.address)
            .replace('{{Data.telephoneno}}', Data.telephoneno)
            .replace('{{Data.driver_name}}', Data.driver_name)
            .replace('{{licenseno}}', licenseno)
            .replace('{{mobileno}}', mobileno)
            .replace('{{Data.hire}}', Data.hire)
            .replace('{{Data.hamali}}', Data.hamali)
            .replace('{{Data.commission}}', Data.commission)
            .replace('{{Data.extra_wt_ch}}', Data.extra_wt_ch)
            .replace('{{Data.diesel_ch}}', Data.diesel_ch)
            .replace('{{Data.adv_amt}}', Data.adv_amt)
            .replace('{{Data.driver_charges}}', Data.driver_charges)
            .replace('{{Data.total}}', Data.total)
             let itemSummariesHTML = '';
             let itemSummariesHTML1 = '';
             let itemSummariesHTML2 = '';
             
             results2.forEach((item, index) => {
                const breakConsigner = (text, targetLength) => {
                    const currentLength = text.length;
                    if (currentLength >= targetLength) {
                        return text;
                    } else {
                        const spacesToAdd = targetLength - currentLength;
                        const spaces = ' '.repeat(spacesToAdd);
                        return text + spaces;
                    }
                };
                
                let consignerBreak =  breakConsigner(item.consigner, 41);
               // console.log(`Consigner Value: ${item.consigner}Consigner Length: ${item.consigner.length}`);


                itemSummariesHTML += `
                  <tr style="height:12pt">
                <td style="width:100pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p className="s4" style="padding-top: 2pt;">${item.lrnumber}</p>
                </td>
                <td style="width:55pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p className="s4" style="padding-top: 2pt;padding-left: 2pt;text-indent: 0pt;">${item.to_loc}</p>
                </td>
     <td style="width: 100pt; max-width: 100pt; border-left-style: solid; border-left-width: 1pt; border-right-style: solid; border-right-width: 1pt;">
    <span className="s7" style="width: 70pt;padding-top: 3pt; padding-left: 2pt; padding-right: 6pt; text-align: left; word-wrap: break-word; margin: 0;">${item.consigner}</span>

    </td>


                <td style="width:118pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p className="s4" style="padding-top: 2pt;padding-left: 2pt;text-indent: 0pt;text-align: left;">${item.consignee}</p>
                </td>
                <td style="width:59pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p className="s4" style="padding-top: 2pt;text-indent: 0pt;text-align: center;">${item.noofarticles}</p>
                </td>
                <td style="width:59pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p className="s4" style="padding-top: 2pt;text-indent: 0pt;text-align: center;">${item.pay_type}</p>
                </td>
                <td style="width:49pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p className="s4" style="padding-top: 2pt;text-indent: 0pt;text-align: center;">${item.total}</p>
                </td>
            </tr>
            `
              });
              
             results3.forEach((item, index) => {
                

                itemSummariesHTML2 += `
                  <tr style="height:18pt">
        <td style="width:157pt;border-style:solid;border-width:1pt">
         <p className="s4" style="padding-top: 2pt;padding-left: 2pt;text-indent: 0pt;text-align: center;">${item.lrnumber}</p>
         </td>
        <td style="width:118pt;border-style:solid;border-width:1pt">
        <p className="s4" style="padding-top: 2pt;padding-left: 2pt;text-indent: 0pt;text-align: center;">${item.branch_name}</p>
        </td>
        <td style="width:118pt;border-style:solid;border-width:1pt">
        <p className="s4" style="padding-top: 2pt;padding-left: 2pt;text-indent: 0pt;text-align: center;">${item.pay_amount}
        </p>
        </td>
        <td style="width:177pt;border-style:solid;border-width:1pt"> 
        <p className="s4" style="padding-top: 2pt;padding-left: 2pt;text-indent: 0pt;text-align: center;">${item.remaining_amount}
        </p></td>
    </tr>
            `
              });
              itemSummariesHTML1 += `
              <tr style="height:12pt">
                <td style="width:100pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                  <p className="s4" >;</p>
                </td>
                <td style="width:55pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                  <p className="s4" style="padding-left: 2pt;text-indent: 0pt;">&nbsp;</p>
                </td>
                <td style="width: 100pt; max-width: 100pt; border-left-style: solid; border-left-width: 1pt; border-right-style: solid; border-right-width: 1pt;">
                  <span className="s7" style="width: 70pt; padding-left: 2pt; padding-right: 6pt; text-align: left; word-wrap: break-word; margin: 0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </td>
                <td style="width:118pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                  <p className="s4" style="padding-left: 2pt;text-indent: 0pt;text-align: left;">&nbsp;</p>
                </td>
                <td style="width:59pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                  <p className="s4" style="text-indent: 0pt;text-align: center;">&nbsp;</p>
                </td>
                <td style="width:59pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                  <p className="s4" style="text-indent: 0pt;text-align: center;">&nbsp;</p>
                </td>
                <td style="width:49pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt">
                  <p className="s4" style="text-indent: 0pt;text-align: center;">&nbsp;</p>
                </td>
              </tr>
            `;
            renderedHTML = renderedHTML.replace('{{itemSummaries}}', itemSummariesHTML);
            renderedHTML = renderedHTML.replace('{{itemSummariesHTML1}}', itemSummariesHTML1);
            renderedHTML = renderedHTML.replace('{{itemSummariesHTML2}}', itemSummariesHTML2);
            const options = {
              format: 'A4',
              orientation: 'portrait',
              border: {
                top: '10mm',
                right: '10mm',
                bottom: '10mm',
                left: '10mm'
              },
            };
  
            const finalPath = path.join(__dirname, '../LoadingTrippdf/');
            const fileName = Data.lts_no;
            const returnpath =`LoadingTrippdf/${fileName}.pdf`;
  
            pdf.create(renderedHTML, options).toFile(
              path.join(finalPath, `${fileName}.pdf`),
              (pdfErr, result) => {
                if (pdfErr) {
            
                  return res.status(500).json({ error: true, message: 'Error creating PDF' });
                }
  
                const fileToSend = result.filename;
          
                return res.json({ returnpath });
              }
            );
          } catch (readFileErr) {
    console.log(readFileErr)
            return res.status(500).json({ error: true, message: 'Error reading HTML template' });
          }
        });
     });
    });
    });
    } catch (e) {
      
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  }
  const transporter = nodemailer.createTransport({
    host: 'rajeshtransportservices.com',
    port: 587,
    secure: false, 
    auth: {
      user: 'support@rajeshtransportservices.com', 
      pass: 'support@4321' 
    },
    tls: {
      rejectUnauthorized: false 
    },
    
  });
  
    const sendMail = async (req, res) => {
     
      const { pdfpathfile, emailForm: { toEmail, message } } = req.body;
      const mailOptions = {
        from: '"Rajesh Transport" <support@rajeshtransportservices.com>',
        to: toEmail,
        subject: 'Regarding DC',
        text: message,
        attachments: [
          {
            filename: 'print.pdf',
            path: `./${pdfpathfile}`
          }
        ]
      };
    
      try {
        let info = await transporter.sendMail(mailOptions);
      
        return res.status(200).send('Email sent successfully');
      } catch (error) {
        
        return res.status(500).send('Error sending email: ' + error.message);
      }
    }
    
    const delete_dc_master = (req, res) => {
        const { id } = req.params;
        console.log(id)
        const query = `
            CALL delete_dc_master(?, @message);
            SELECT @message as message;
        `;
      
        db.query(query, [id], (err, results) => {
            if (err) {
                return res.status(500).send('Server error');
                console.log(err)
            }
      
            const message = results[2][0].message;
            console.log(message)
          return   res.json({ message });
        });
      };
      const saveloadingtripprint =(req,res)=>{
        const { id } = req.params;

        const query1 = `
          SELECT id, dc_no 
          FROM dc_master 
          WHERE dc_no = ?;
        `;
      
        db.query(query1, [id], (err, results1) => {
          if (err) {
      
            return res.status(500).send('Server error');
          }
      
          if (results1.length === 0) {
            return res.status(404).send('Record not found');
          }
      
          const record = results1[0];
          const recordId = record.id;
      
          const query2 = `
            SELECT MAX(id) as maxId 
            FROM dc_master;
          `;
      
          db.query(query2, (err, results2) => {
            if (err) {
          
              return res.status(500).send('Server error');
            }
      
            const maxId = results2[0].maxId;
      
            if (recordId === maxId) {
              return res.status(200).send({ id: recordId });
            } else {
              return res.status(400).send('Something went wrong');
            }
          });
        });
      };
  module.exports = {
    saveloadingtripprint,
    delete_dc_master,
    sendMail,
    Updatedcmaster,
    getlrdetailsbybranchwise,
    getallloadingshets,
    add_dc_master,
    getloadingsheetbyid,
    getallItssearch,
    getlrforloadingsheet,
    getlrdetailsforloadsheet,
    getloadingsheetFreightbyid,
    getLoadingTripByIdPdfmail,
    getLoadingTripByIdPdfedit,
    getlrforloadingsheetedit
  };