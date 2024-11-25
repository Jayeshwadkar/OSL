const db = require("../config/dbConfig");

const getAllDrivers = (req, res) => {
    const query = 'CALL getalldrivers()';

    try {
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            // Assuming results[0] contains the driver data
            const drivers = results[0];

            // Mapping the data to extract necessary fields
            const mappedDrivers = drivers.map(driver => ({
                driver_id: driver.driver_id,
                driver_name: driver.driver_name,
                licenseno: driver.licenseno,
                mobileno: driver.mobileno,
            }));

            return    res.json(mappedDrivers); // Send the mapped data as response
        });
    } catch (err) {
        console.error('Error:', err);
        return  res.status(500).send('Server error');
    }
};


const getAllDriver = (req, res) => {
    
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const offset = page * pageSize;
    const searchTerm = req.query.search; 
    const query = 'CALL getalldrivers()';
    
    try {
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            let driver = results[0];

            if (searchTerm) {
                driver = driver.filter(driver => 
                    (driver.driver_name && driver.driver_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (driver.date_of_birth && driver.date_of_birth.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (driver.mobileno && driver.mobileno.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (driver.licenseno && driver.licenseno.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (driver.license_type && driver.license_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (driver.qualification && driver.qualification.toLowerCase().includes(searchTerm.toLowerCase())) 
               
                );
            }

            driver.reverse(); 

            const total = driver.length;
            driver = driver.map(driver => ({
                ...driver,
                driver_name: driver.driver_name.toUpperCase(),
                mobileno: driver.mobileno ? driver.mobileno.toUpperCase() : null,
                licenseno: driver.licenseno ? driver.licenseno.toUpperCase() : null,
                license_type: driver.license_type ? driver.license_type.toUpperCase() : null,
                qualification: driver.qualification ? driver.qualification.toUpperCase() : null,
            

            }));
            const paginatedPlaces = driver.slice(offset, offset + pageSize);

         return   res.json({
                driver: paginatedPlaces,
                total: total
            });
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Server error');
    }
};
 const getDriverbyid = (req, res) => {
    // const id = '2217';
     const id = req.params.id; 

    const query = 'CALL getdriverbyid(?)';

    try {
        db.query(query, id, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }
            console.log(results[0]);
            return    res.json(results[0]);
        });
    } catch (err) {
        console.error('Error:', err);
        return  res.status(500).send('Server error');
    }
};

const Adddriver = (req, res) => {
  
    const { 
        name, 
        address, 
        dateOfBirth, 
        telephone, 
        fatherName, 
        referencedBy, 
        eyesight, 
        licenseNo, 
        licenseType, 
        remark, 
        permanentAddress, 
        qualification, 
        mobileno, 
        joiningDate, 
        bloodGroup, 
        renewDate, 
        expiryDate, 
        branch 
    } = req.body;

    const query = `
        SET @message = '';
        CALL adddriver(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @message);
        SELECT @message as message;
    `;

    try {
        db.query(query, [
            name, 
            address, 
            dateOfBirth, 
            telephone, 
            fatherName, 
            referencedBy, 
            eyesight, 
            licenseNo, 
            licenseType, 
            remark, 
            permanentAddress, 
            qualification, 
            mobileno, 
            joiningDate, 
            bloodGroup, 
            renewDate, 
            expiryDate, 
            branch 
        ], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            // Extract the message from the results
            const message = results[1][0].message;
           
           
            return  res.json({ message });
        });
    } catch (err) {
        console.error('Error:', err);
        return  res.status(500).send('Server error');
    }
};


const UpdateDriver = (req, res) => {
  const id= parseInt(req.params.id)
  
    const {
        
        driver_name,
        corresp_address,
        date_of_birth,
        telephoneno,
        father_name,
        referenceby,
        eyesight,
        licenseno,
        license_type,
        remarks,
        permanat_address,
        qualification,
        mobileno,
        joining_date,
        blood_group,
        renewdate,
        expiry,
        branch
    } = req.body;

    const query = `
        SET @message = '';
        CALL updatedriver(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @message);
        SELECT @message as message;
    `;

    try {
        db.query(query, [
            id,
            driver_name,
            corresp_address,
            date_of_birth,
            telephoneno,
            father_name,
            referenceby,
            eyesight,
            licenseno,
            license_type,
            remarks,
            permanat_address,
            qualification,
            mobileno,
            joining_date,
            blood_group,
            renewdate,
            expiry,
            branch
        ], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            // Extract the message from the results
            const message = results[2][0].message

            return  res.json({ message });
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};





const deletedriver = (req, res) => {
   
    const id = req.params.id.toString(); 

    const query = 'CALL deletedriver(?, @message)';

    try {
        db.query(query, [id], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            db.query('SELECT @message as message', (err, result) => {
                if (err) {
                    console.error('Error retrieving message:', err);
                    res.status(500).send('Server error');
                    return;
                }

            return    res.json({ message: result });
            });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};

  module.exports = {
    getAllDrivers,
    getAllDriver,
    getDriverbyid,
    UpdateDriver,
    deletedriver,
    Adddriver
  };