const db = require("../config/dbConfig");


const getAllStates = async (req, res) => {
    const query = 'SELECT DISTINCT state, statecode FROM gstmaster;';

    try {
     
        const [results] = await db.query(query);

        
        res.json(results);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Server error');
    }
};


const getAutoIncrementValue = async (req, res) => {
   
    const query = "SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'po_master';";

    try {
        
        const [results] = await db.query(query);
        
      
        if (results.length > 0) {
           
            res.json(results[0]);
        } else {
      
            res.status(404).send('No data found');
        }
    } catch (err) {
       
        console.error('Error executing query:', err);
        res.status(500).send('Server error');
    }
};


const getGstDataByStateCode = async (req, res) => {
    
    const { stateCode } = req.query; 

    if (!stateCode) {
        return res.status(400).send('State code is required');
    }

    
    const query = `
        SELECT id, state, stateCode, gstName, effectiveDate, endDate, taxRate, gstCategory, 
               gstRateCategory, sacCode, gstmaster.type, igst, cgst, sgst 
        FROM gstmaster 
        WHERE stateCode = ?
    `;

    try {
     
        const [results] = await db.query(query, [stateCode]);

        if (results.length > 0) {
       
            res.json(results);
        } else {
           
            res.status(404).send('No data found');
        }
    } catch (err) {
     
        console.error('Error executing query:', err);
        res.status(500).send('Server error');
    }
};
const getGstNos = async (req, res) => {
    const query = 'SELECT id, gstno, gststate, statecode FROM osl_gstnos;';

    try {
       
        const [results] = await db.query(query);

       
        res.json(results);
    } catch (err) {
       
        console.error('Error executing query:', err);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getAllStates,
    getAutoIncrementValue,
    getGstDataByStateCode,
    getGstNos
  };

