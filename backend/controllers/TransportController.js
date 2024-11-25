const db = require('../config/dbConfig');



const getLrByBranchId = async (req, res) => {
    const id = req.params.id; 
    const query1 = 'CALL list_ir_master_dctable(?)';    
    const query2 = 'CALL getlrfordcupdate(?,"")';
    try {
        const [results1, results2] = await Promise.all([
            db.query(query1, [id]),
            db.query(query2, [id])
          ]);
      
          if (results1[0].length > 0 || results2[0].length > 0) {
            results2[0][0].forEach(item => {
                const processedItem = {
                lrid: item.lr_master_id,
                lrno: item.lr_no
                };
              results1[0][0].push(processedItem);
            });
      
            return res.status(200).send(results1[0][0]); 
          } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
          }
    } catch (err) {
      console.error('Error getting LR Data', err);
      return res.status(500).send({ message: 'Error getting LR Data', error: err.message });
    }
  };




const getVehicleList = async(req, res) => {
     
   const query1 = 'call allvehiclelist()';
   const query2 = 'call findplace()';

   try {
    const [results1, results2] = await Promise.all([
        db.query(query1),
        db.query(query2)
      ]);
  
      if (results1[0].length > 0 || results2[0].length > 0) {
        const finalObject = {
            vehicleData: results1[0][0],
            placeData: results2[0][0]
        }
        return res.status(200).send(finalObject); 
      } else {
        console.log('No data found');
        return res.status(404).send({ message: 'No data found' });
      }
   } catch (err) {
       console.error('Error getting vehicle List and Place List', err);
      return res.status(500).send({message: 'Error getting vehicle List and Place List', Error: err.message});
   }
};



const getDriversListByBranchCode = async(req, res) => {
    const id = req.params.id; 
    const query = 'call listdriver(?)';    
    try {
        const [results] = await db.query(query, [id])
        return res.status(200).send(results[0]); 
    } catch (err) {
      console.error('Error getting Drivers Data', err);
      return res.status(500).send({ message: 'Error getting Drivers Data', error: err.message });
    }
  };


  const getDcDataByLrId = async(req, res) => {
    const id = req.params.id; 
    const lrIds = req.body
    const query = 'call list_dc_master_lrtable(?,?)';    
    try {
        const promises = lrIds.map(lrId => db.query(query, [lrId, id]));

        const results = await Promise.all(promises);

        const finalResults = results.flatMap(([rows]) => 
          rows.flatMap(innerRow => 
            Array.isArray(innerRow) ? innerRow.filter(row => row.inv_no && row.id) : []
          )
        );
    
        return res.status(200).send(finalResults);  
    } catch (err) {
      console.error('Error getting Drivers Data', err);
      return res.status(500).send({ message: 'Error getting Drivers Data', error: err.message });
    }
  };




module.exports = {
    getLrByBranchId,
    getVehicleList,
    getDriversListByBranchCode,
    getDcDataByLrId
}