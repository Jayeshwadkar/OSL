const db = require("../config/dbConfig");



const getLrBillReports = async (req, res) => {
      const startIndex = parseInt(req.query.page) || 0
    const pageSize = parseInt(req.query.pageSize, 10) || 20;
    const branchId = parseInt(req.query.branchId, 10);
    
    if (isNaN(branchId)) {
        return res.status(400).json({ error: 'Invalid branch ID' });
    }

    try {
        const query = `CALL getlrbillreportspage(?, ?, ?)`;
        const [results] = await db.query(query, [branchId, startIndex, pageSize]);
        let lrbillReports = results[0];

        lrbillReports = lrbillReports.map(record => {
            return {
                id: record.id,
                lrNo: record.lr_no,
                lrDate: record.lr_date,
                consigner: record.consigner,
                locFrom: record.loc_from,
                consignee: record.consignee,
                locTo: record.loc_to,
                paybill: record.paybill,
                total: parseFloat(record.total),
                fileLoc: record.fileloc,
                rowNumber: record.row_number,
                totalCounts: record['@tot_counts'],
                totalCount: record['@totc'],
                billDate: record.bill_date,
                billNumber: record.bill_number,
                billAmount: parseFloat(record.bill_amount)
            };
        });

        res.json({
            records: lrbillReports,
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Unexpected error', details: err.message });
    }
};

const deleteLrBillReports = async (req, res) => {
    const id = req.params.id; 
    try {
        const callQuery = 'CALL deletelrbillreport(?, @message)';
        await db.query(callQuery, [id]);
        const [messageResults] = await db.query('SELECT @message AS message');
        if (Array.isArray(messageResults) && messageResults.length > 0) {
            const message = messageResults[0].message;
            if (message) {
                return res.json({ message });
            } else {
                console.error('Message is null or undefined');
                return res.status(500).send('Server error: No message returned');
            }
        } else {
            console.error('No results returned from the message query');
            return res.status(500).send('Server error: No message result');
        }
    } catch (err) {
        console.error('Error executing stored procedure:', err);
        return res.status(500).send('Server error');
    }
};

const getLrNumberPodReceipts = async (req, res) => {
    const branchId = parseInt(req.query.branchId, 10); 
    const type = req.query.type ? parseInt(req.query.type, 10) : null; 
    const fromDate = req.query.fromDate || null; 
    const toDate = req.query.toDate || null; 

    try {
        const [results] = await db.query('CALL lr_number_pod_receipt(?, ?, ?, ?)', [branchId, type, fromDate, toDate]);
        if (!results[0] || results[0].length === 0) {
            return res.status(404).json({ error: 'No data found' });
        }

        const lrNumberPodReceipts = results[0];
        const formattedResults = lrNumberPodReceipts.map(record => ({
            id: record.id,
            lrNo: record['CONCAT((SELECT branch_abbreviation FROM branch WHERE branch_id=lm.branch),"-",lm.year,lm.lr_no)']
        }));
        res.json({ records: formattedResults });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Unexpected error', details: err.message });
    }
};



const addLrBillReport = async (req, res) => {
    const { billNumber, billDate, billAmount, lrIds } = req.body;
    if (!billNumber || !billDate || !billAmount || !lrIds) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const lrsArray = lrIds; 
    const checkExistingLrsQuery = 'SELECT lr_id FROM lr_bill_report_details WHERE lr_id = ?';
    const connection = await db.getConnection();

    try {
        const existingLrResults = await Promise.all(
            lrsArray.map(lr => connection.query(checkExistingLrsQuery, [lr]))
        );
        const existingLrIds = existingLrResults.flat().map(result => {
            if (result.length > 0 && result[0].lr_id) {
                return result[0].lr_id;
            } else {
                return null;
            }
        }).filter(id => id !== null); 

        const anyExistingLrs = lrsArray.some(lrId => existingLrIds.includes(lrId));

        if (anyExistingLrs) {
            return res.status(400).json({ message: 'One or more LR IDs already exist' });
        }
        const callProcedureQuery = 'CALL addlrbillreport(?, ?, ?, @inserted_id, @message)';
        await connection.query(callProcedureQuery, [billNumber, billDate, billAmount]);
        const [messageResults] = await connection.query('SELECT @inserted_id AS inserted_id, @message AS message');
        const { inserted_id, message } = messageResults[0];

        if (inserted_id === -1) {
            return res.status(400).json({ message });
        }
        const insertDetailsQuery = 'INSERT INTO lr_bill_report_details (lr_bill_id, lr_id) VALUES (?, ?)';
        await Promise.all(
            lrsArray.map(lr => connection.query(insertDetailsQuery, [inserted_id, lr]))
        );
        const updateReceiptsQuery = 'UPDATE lorry_reciept_master SET isBilled = ? WHERE id = ?';
        await Promise.all(
            lrsArray.map(lr => connection.query(updateReceiptsQuery, ['1', lr]))
        );

        res.json({ message });
    } catch (error) {
        console.error('Error adding LR bill report:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    } finally {
        if (connection) {
            connection.release();
        }
    }
};






module.exports = {
    getLrBillReports,
    deleteLrBillReports,
    getLrNumberPodReceipts,
    addLrBillReport
  };