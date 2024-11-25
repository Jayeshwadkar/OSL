const db = require("../config/dbConfig");

const getdeliverystatuslistforreportbydate = (req, res) => {
    const branch = '10';
    const formdate="2021-04-01"
    const todate="2024-06-03"
    const query = 'CALL getdeliverystatuslistforreportbydate(?,?,?)';
    
    try {
        db.query(query, [branch,formdate,todate], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            // Log the results for debugging purposes
            console.log(results);

            // The stored procedure should return the required data directly
          return  res.json(results[0]);
        });
    } catch (err) {
        console.error('Error:', err);
      return  res.status(500).send('Server error');
    }
};


  module.exports = {
    getdeliverystatuslistforreportbydate,
  };