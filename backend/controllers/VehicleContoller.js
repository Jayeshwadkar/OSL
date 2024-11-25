const db = require("../config/dbConfig");



const getallVehicle = async (req, res) => {
    const query = 'CALL vehiclelist(?)';
    const  in_branch  = null // Assuming branch is passed as a query parameter

    try {
        // Execute the stored procedure with the provided branch
        const [results] = await db.query(query, [in_branch]);

        // Extract the vehicle data from the results
        const vehicles = results[0];

        // Map the vehicle data to a more readable format
        const formattedVehicles = vehicles.map(vehicle => ({
            vehicle_id: vehicle.vehicle_id,
            vehicle_number: vehicle.vehicleno,
            description: vehicle.description,
            owner_name: vehicle.vehical_owner_name,
            vehicle_type: vehicle.vehicle_type,
        }));

        // Send the formatted vehicle data as a JSON response
        return res.json(formattedVehicles);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};


const getallVehicles = (req, res) => {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const offset = page * pageSize;
    const searchTerm = req.query.search; 
const branch=req.query.branch

    const query = 'CALL getallvehicles(?)';
    
    try {
        db.query(query,branch, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            let vehicle = results[0];

            if (searchTerm) {
                vehicle = employee.filter(vehicle => 
                    (vehicle.vehicleno && vehicle.vehicleno.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (vehicle.vehical_owner_name && vehicle.vehical_owner_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (vehicle.address && vehicle.address.toLowerCase().includes(searchTerm.toLowerCase())) 
                    
                );
            }

            vehicle.reverse(); 

            const total = vehicle.length;
            vehicle = vehicle.map(vehicle => ({
                ...vehicle,
                vehicleno: vehicle.vehicleno.toUpperCase(),
                vehical_owner_name: vehicle.vehical_owner_name ? vehicle.vehical_owner_name.toUpperCase() : null,
                address: vehicle.address ? vehicle.address.toUpperCase() : null,
            

            }));
            const paginatedPlaces = vehicle.slice(offset, offset + pageSize);

           return res.json({
                vehicle: paginatedPlaces,
                total: total
            });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};
 const getVehiclebyid = (req, res) => {
   // const id = '4250';
     const id = req.params.id.toString(); 

    const query = 'CALL getvehiclebyid(?)';

    try {
        db.query(query, id, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

          return  res.json(results[0]);
        });
    } catch (err) {
        console.error('Error:', err);
      return  res.status(500).send('Server error');
    }
};


const AddVehicle = (req, res) => {
  

    const {
        vehicleOwnerName,
        vehicleType,
        vehicleNo,
        capacity,
        make,
        description,
        regDate,
        expDate,
        engineNo,
        chasisNo,
        pucNo,
        pucExpDate,
        body,
        remark,
        branch
    } = req.body;

    const query = `
        SET @message = '';
        CALL insertvehicledetails(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @message);
        SELECT @message as message;
    `;

    try {
        db.query(query, [
            vehicleOwnerName, 
            vehicleNo,        
            make,             
            regDate,          
            engineNo,         
            vehicleType,      
            capacity,         
            chasisNo,         
            description,      
            '',          
            '',   
            '',   
            '',       
            '',       
            '',         
            remark,           
            branch,           
            expDate,          
            pucNo,            
            pucExpDate,       
            body              
        ], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            const message = results[1][0].message;
            console.log(`Message: ${message}`);
           return res.json({ message });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};




const UpdateVehicle = (req, res) => {

    const branchid=req.params.branch

   const id=req.params.id
    const {
        vehicleOwnerName,
        vehicleType,
        vehicleNo,
        capacity,
        make,
        description,
        regDate,
        expDate,
        engineNo,
        chasisNo,
        pucNo,
        pucExpDate,
        body,
        remark,
        
    } = req.body;

    const query = `
        SET @message = '';
        CALL updatevehicle(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @message);
        SELECT @message as message;
    `;

    try {
        db.query(query, [
            id,
            vehicleOwnerName, 
            vehicleNo,        
            make,             
            regDate,          
            engineNo,         
            vehicleType,      
            capacity,         
            chasisNo,         
            description,      
            '',          
            '',   
            '',   
            '',       
            '',       
            '',         
            remark,           
            branchid,           
            expDate,          
            pucNo,            
            pucExpDate,       
            body              
        ], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            // Extract the message from the results
            const message = results[2][0].message;
            console.log(`Message: ${message}`);
          return  res.json({ message });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};



const deletevehicle = (req, res) => {
    //const id = "4755"; // Example vehicle ID for testing, replace with req.body.id in production
    const id=req.params.id.toString()

    const query = `
        SET @message = '';
        CALL deletevehicle(?, @message);
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
          return  res.json({ message });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};


const getVehicleTypes = async (req, res) => {

    const { branch } = req.query; 
  

    if (!branch) {
        return res.status(400).send('Branch parameter is required');
    }

  
    const query = 'CALL vehicletypelist(?)';

    try {
    
        const [results] = await db.query(query, [branch]);

   
        const vehicleTypes = results[0];

      
        const filteredVehicleTypes = vehicleTypes.map(vehicleType => ({
            vehicle_type_id: vehicleType.vt_id,
            vehicle_type: vehicleType.vehicle_type
        }));


        return res.json(filteredVehicleTypes);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};


  module.exports = {
    getallVehicle,
    getVehiclebyid,
    UpdateVehicle,
    deletevehicle,
    AddVehicle,
    getallVehicles,
    getVehicleTypes
  };