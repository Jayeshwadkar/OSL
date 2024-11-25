const db = require("../config/dbConfig");

const getsrnofordeliverystatus = (req, res) => {
    const branch = '10';
    
    const query = 'CALL getsrnofordeliverystatus(?, @sr_no)';
    
    try {
        db.query(query, [branch], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            console.log(results);
            db.query('SELECT @sr_no AS sr_no', (err, rows) => {
                if (err) {
                    console.error('Error retrieving sr_no:', err);
                    res.status(500).send('Server error');
                    return;
                }
               return res.json(rows[0]);
            });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};

const getpendinglrlistfordeliverystatus = (req, res) => {
    
    const query = 'CALL getpendinglrlistfordeliverystatus()';
    
    try {
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

       
            db.query('SELECT @sr_no AS sr_no', (err, rows) => {
                if (err) {
                    console.error('Error retrieving sr_no:', err);
                    res.status(500).send('Server error');
                    return;
                }
              return  res.json(rows[0]);
            });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};
const getpendinglrlistfordeliverystatusbydate = (req, res) => {
    const fromdate = '2018-07-01'; // Static from date
    const todate = '2018-07-05'; // Static to date
    
    const query = 'CALL getpendinglrlistfordeliverystatusbydate(?, ?)';
    
    try {
        db.query(query, [fromdate, todate], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            console.log(results);
         return   res.json(results[0]);
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};




const addbillmaster = (req, res) => {
    // Example input values; these should come from req.body or other sources
    const in_bill_no = "174215";
    const in_bill_date = "2024-05-25 07:39:23";
    const in_bill_type = "Type"; // Adjust as necessary
    const in_customer_id = "7679";
    const in_tot_freight = "1000";
    const in_tot_hamali = "20";
    const in_service_ch = "50";
    const in_delivery_ch = "200";
    const in_other_ch = "30";
    const in_demurage = "10";
    const in_tds = "5";
    const in_tot_tax = "180";
    const in_tot_amount = "1810";
    const in_remarks = "Remarks";
    const in_fileloc = "File Location";
    const in_branch = "10";
    const in_user_id = "User ID";

    const query = `
        SET @message = '';
        SET @inserted_id = 0;
        CALL add_bill_master(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @message, @inserted_id);
        SELECT @message as message, @inserted_id as inserted_id;
    `;

    try {
        db.query(query, [
            in_bill_no,
            in_bill_date,
            in_bill_type,
            in_customer_id,
            in_tot_freight,
            in_tot_hamali,
            in_service_ch,
            in_delivery_ch,
            in_other_ch,
            in_demurage,
            in_tds,
            in_tot_tax,
            in_tot_amount,
            in_remarks,
            in_fileloc,
            in_branch,
            in_user_id
        ], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            // Extract the message and inserted_id from the results
            const message = results[2][0].message;
            const inserted_id = results[2][0].inserted_id;
            console.log(`Message: ${message}, Inserted ID: ${inserted_id}`);
           return res.json({ message, inserted_id });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};






const deletebills = (req, res) => {
    const id = "3423"; 

    const query = `
        CALL deletebills(?, @message);
        SELECT @message as message;
    `;

    try {
        db.query(query, [id], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            // Extract the message from the results
            const message = results[2][0].message;
            console.log(`Message: ${message}`);
           return res.json({ message });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};

  module.exports = {
    getsrnofordeliverystatus,
    getpendinglrlistfordeliverystatus,
    getpendinglrlistfordeliverystatusbydate,
    deletebills,
    addbillmaster
  };