const db = require("../config/dbConfig");



const adddeliverystatus = (req, res) => {
    // Example input values; these should come from req.body or other sources
    const in_srno = "04149";
    const in_lrid = "7679";
    const in_remark = "Some remarks";
    const in_deliverydate = "2024-06-04";
    const in_userid = "1";
    const in_branchid = "10";

    const query = `
        CALL adddeliverystatus(?, ?, ?, ?, ?, ?, @message, @inserted_id);
        SELECT @message as message, @inserted_id as inserted_id;
    `;

    try {
        db.query(query, [
            in_srno,
            in_lrid,
            in_remark,
            in_deliverydate,
            in_userid,
            in_branchid
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



  module.exports = {
    adddeliverystatus,
      };