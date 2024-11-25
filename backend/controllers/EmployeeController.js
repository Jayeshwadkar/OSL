const db = require("../config/dbConfig");

const getallEmployee = (req, res) => {
    const query = 'CALL getallemployee()';
    
    try {
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

   
          return  res.json(results[0]);
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};
const getallEmployees = (req, res) => {
    const searchTerm = req.query.search; 
    console.log(searchTerm)
    const query = 'CALL getallemployee()';
    
    try {
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }
            let employee = results[0];
            if (searchTerm) {
                employee = employee.filter(employee => 
                    (employee.employee_name && employee.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (employee.designation && employee.designation.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (employee.emailid && employee.emailid.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (employee.joining_date && employee.joining_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (employee.mobileno && employee.mobileno.toLowerCase().includes(searchTerm.toLowerCase())) 
                 
               
                );
            }

            employee.reverse(); 

            
            employee = employee.map(employee => ({
                ...employee,
                employee_name: employee.employee_name.toUpperCase(),
                designation: employee.designation ? employee.designation.toUpperCase() : null,
                emailid: employee.emailid ? employee.emailid.toUpperCase() : null,
                joining_date: employee.joining_date ? employee.joining_date.toUpperCase() : null,
                mobileno: employee.mobileno ? employee.mobileno.toUpperCase() : null,
            

            }));
          

          return  res.json({
                employee: employee,
               
            });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};
 const getEmployeebyid = (req, res) => {
    //const id = '9';
     const id = req.params.id.toString(); 

    const query = 'CALL getemployeebyid(?)';

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
       return res.status(500).send('Server error');
    }
};


const AddEmployee = (req, res) => {
   
    const {
        employeeName,
        correspAddress,
        permanentAddress,
        dateOfBirth,
        mobileNo,
        emailId,
        joiningDate,
        qualification,
        bloodGroup,
        designation,
        branch
    } = req.body;

    const query = `
        SET @message = '';
        CALL addemployee(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @message);
        SELECT @message as message;
    `;

    try {
        db.query(query, [
            employeeName,
            correspAddress,
            dateOfBirth,
            emailId,
            joiningDate,
            permanentAddress,
            qualification,
            mobileNo,
            bloodGroup,
            designation,
            branch
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



const UpdateEmployee = (req, res) => {
   

    const id = req.params.id.toString();
    const {
        employeeName,
        correspAddress,
        dateOfBirth,
        emailId,
        joiningDate,
        permanentAddress,
        qualification,
        mobileNo,
        bloodGroup,
        designation,
        branch
    } = req.body;

    const query = `
        SET @message = '';
        CALL updateemployee(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @message);
        SELECT @message as message;
    `;

    try {
        db.query(query, [
            id,
            employeeName,
            correspAddress,
            dateOfBirth,
            '',
            emailId,
            joiningDate,
            permanentAddress,
            qualification,
            mobileNo,
            bloodGroup,
            designation,
            branch
        ], (err, results) => {
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




const deleteemployee = (req, res) => {
    
    // const id = "10";
     const id = req.params.id.toString(); 

    const query = 'CALL deleteemployee(?, @message)';

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

               
              return  res.json({ message: result });
            });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};

  module.exports = {
    getallEmployee,
    getEmployeebyid,
    UpdateEmployee,
    deleteemployee,
    AddEmployee,
    getallEmployees
  };