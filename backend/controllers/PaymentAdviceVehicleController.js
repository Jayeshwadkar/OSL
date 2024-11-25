const db = require("../config/dbConfig");



const addpayadvice = (req, res) => {
    // Example input values; these should come from req.body or other sources
    const in_recordnumber = "17";
    const in_transporterid = "7679";
    const in_vehicleid = "123456";
    const in_advicedate = "2024-06-04 07:39:23";
    const in_outstanding = "1000";
    const in_paid = "800";
    const in_hamali = "20";
    const in_othercharges = "30";
    const in_paymode = "Cash";
    const in_bankname = "Bank of Example";
    const in_transnumber = "123456";
    const in_transdate = "2024-06-04";
    const in_userid = "1";
    const in_branch = "10";
    const in_accno = "Account Number";

    const query = `
        CALL addpayadvice(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @message, @inserted_id, ?);
        SELECT @message as message, @inserted_id as inserted_id;
    `;

    try {
        db.query(query, [
            in_recordnumber,
            in_transporterid,
            in_vehicleid,
            in_advicedate,
            in_outstanding,
            in_paid,
            in_hamali,
            in_othercharges,
            in_paymode,
            in_bankname,
            in_transnumber,
            in_transdate,
            in_userid,
            in_branch,
            in_accno
        ], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            // Extract the message and inserted_id from the results
            const message = results[1][0].message;
            const inserted_id = results[1][0].inserted_id;
            console.log(`Message: ${message}, Inserted ID: ${inserted_id}`);
            res.json({ message, inserted_id });
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Server error');
    }
};
const addpayadvicedetails = (req, res) => {
    // Example input values; these should come from req.body or other sources
    const in_master_id = "17";
    const in_lsid = "7679";
    const in_totalamount = "123456";
    const in_paid = "2024-06-04 07:39:23";
    const in_hamali = "20";
    const in_othercharges = "30";
    const in_ls_no = "Cash";

    const query = `
        CALL addpayadvicedetails(?, ?, ?, ?, ?, ?, ?);
    `;

    try {
        db.query(query, [
            in_master_id,
            in_lsid,
            in_totalamount,
            in_paid,
            in_hamali,
            in_othercharges,
            in_ls_no
        ], (err) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            console.log('Pay advice details added successfully');
            res.json({ message: 'Pay advice details added successfully' });
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Server error');
    }
};



  module.exports = {
    addpayadvice,
    addpayadvicedetails
  };