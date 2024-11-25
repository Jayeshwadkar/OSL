const db = require("../config/dbConfig");

const getAllBanks = (req, res) => {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const offset = page * pageSize;
    const searchTerm = req.query.search; 
    const query = 'CALL getallbank()';
    
    try {
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            let banklist = results[0];

            if (searchTerm) {
                banklist = banklist.filter(banklist => 
                    (banklist.bank_name && banklist.bank_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (banklist.address && banklist.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (banklist.ifsc_code && banklist.ifsc_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (banklist.micr_code && banklist.micr_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (banklist.telephone && banklist.telephone.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (banklist.emailid && banklist.emailid.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (banklist.branch_code && banklist.branch_code.toLowerCase().includes(searchTerm.toLowerCase())) || 
                    (banklist.branch_name && banklist.branch_name.toLowerCase().includes(searchTerm.toLowerCase()))
                );
            }

            banklist.reverse(); 

            const total = banklist.length;
            banklist = banklist.map(banklist => ({
                ...banklist,
                bank_name: banklist.bank_name.toUpperCase(),
                branch_name: banklist.branch_name ? banklist.branch_name.toUpperCase() : null,
                address: banklist.address ? banklist.address.toUpperCase() : null,
                ifsc_code: banklist.ifsc_code ? banklist.ifsc_code.toUpperCase() : null,
                micr_code: banklist.micr_code ? banklist.micr_code.toUpperCase() : null,
                telephone: banklist.telephone ? banklist.telephone.toUpperCase() : null,
                emailid: banklist.emailid ? banklist.emailid.toUpperCase() : null,
                branch_code: banklist.branch_code ? banklist.branch_code.toUpperCase() : null,

            }));
            const paginatedPlaces = banklist.slice(offset, offset + pageSize);

          return  res.json({
                banklist: paginatedPlaces,
                total: total
            });
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};

 const getBankbyid = (req, res) => {
    
     const id = req.params.id; 

    const query = 'CALL getbankbyid(?)';

    try {
        db.query(query, id, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }
            
            return     res.json(results[0]);
        });
    } catch (err) {
        console.error('Error:', err);
        return   res.status(500).send('Server error');
    }
};

const AddBank = (req, res) => {
    
     const {  
        bankName,
        branch,
        branchCode,
     address,
     ifscCode,
     micrCode,
     telephone,
     email
    } = req.body;

    const query = 'CALL addbank( ?,?,?,?,?,?,?,?, @message)';
    
    try {
        db.query(query, [ bankName, branch,branchCode,address,ifscCode,micrCode,telephone,email], (err, results) => {
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

              return  res.json({ message: result[0].message });
            });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};
const UpadteBank = (req, res) => {
    
    const { bank_id, bank_name, branch_name, branch_code, address, ifsc_code, micr_code, telephone, emailid } = req.body; 

    const query = 'CALL updatebank(?,?,?,?,?,?,?,?,?, @message)';

    try {
        db.query(query, [bank_id, bank_name, branch_name, branch_code, address, ifsc_code, micr_code, telephone, emailid], (err, results) => {
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

              return  res.json({ message: result[0].message });
            });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};

  
  

const deletebank = (req, res) => {
    
    //const id = "2";
    const id = req.params.id.toString(); 

    const query = 'CALL deletebank(?, @message)';

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
      return  res.status(500).send('Server error');
    }
};


const SelectBank= (req, res) => {
    const query = 'CALL getallbank()';
    
    try {
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            let banklist = results[0];
        return    res.json({
                banklist: banklist
            });
        });
    } catch (err) {
        console.error('Error:', err);
      return  res.status(500).send('Server error');
    }
};


  module.exports = {
    getAllBanks,
    getBankbyid,
    UpadteBank,
    deletebank,
    SelectBank,
    AddBank
  };