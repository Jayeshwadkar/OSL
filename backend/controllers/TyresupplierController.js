const db = require("../config/dbConfig");

const getalltyresuppliers = (req, res) => {
    
    const query = 'CALL getalltyresuppliers()';
    
    try {
        db.query(query,  (err, results) => {
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
const getalltyresupplierss = (req, res) => {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const offset = page * pageSize;
    const searchTerm = req.query.search; 
    const query = 'CALL getalltyresuppliers()';
    
    try {
        db.query(query,  (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }
            let tyresupplier = results[0];

            if (searchTerm) {
                tyresupplier = tyresupplier.filter(tyresupplier => 
                    (tyresupplier.supplier_name && tyresupplier.supplier_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (tyresupplier.address && tyresupplier.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (tyresupplier.city && tyresupplier.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (tyresupplier.emailid && tyresupplier.emailid.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (tyresupplier.telephoneno && tyresupplier.telephoneno.toLowerCase().includes(searchTerm.toLowerCase())) 
                );
            }

            tyresupplier.reverse(); 

            const total = tyresupplier.length;
            tyresupplier = tyresupplier.map(tyresupplier => ({
                ...tyresupplier,
                supplier_name: tyresupplier.supplier_name.toUpperCase(),
                address: tyresupplier.address ? tyresupplier.address.toUpperCase() : null,
                city: tyresupplier.city ? tyresupplier.city.toUpperCase() : null,
                emailid: tyresupplier.emailid ? tyresupplier.emailid.toUpperCase() : null,
                telephoneno: tyresupplier.telephoneno ? tyresupplier.telephoneno.toUpperCase() : null
            }));
            const paginatedPlaces = tyresupplier.slice(offset, offset + pageSize);

           return res.json({
                tyresupplier: paginatedPlaces,
                total: total
            });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
}
 const gettyresupplierbyid = (req, res) => {
   // const id = '1';
     const id = req.params.id.toString(); 
console.log(id)
    const query = 'CALL gettyresupplierbyid(?)';
    const contactpersonQuery = 'CALL gettscpdetailsbytsid(?)';
    try {
        db.query(query, id, (err, ownerResults) => {
            if (err) {
                console.error('Error executing owner query:', err);
                res.status(500).send('Server error');
                return;
            }

            const ownerData = ownerResults[0];

            // Execute the contact person query
            db.query(contactpersonQuery, id, (err, contactResults) => {
                if (err) {
                    console.error('Error executing contact person query:', err);
                    res.status(500).send('Server error');
                    return;
                }

                const contactPersonData = contactResults[0];

                // Combine owner data and contact person data
                const responseData = {
                    Data: ownerData,
                    contactPersonData: contactPersonData
                };

              
               return res.json(responseData);
            });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};


const addtyresupplier = (req, res) => {
    console.log(req.body);
    const {
        supplierName,
        address,
        city,
        telephone,
        email,
        pan,
        vendorCode,
        vat,
        cst,
        ecc,
        tyresupplierContacts
    } = req.body;

    const addSupplierQuery = `
        SET @message = '';
        SET @inserted_id = 0;
        CALL addtyresupplier(?, ?, ?, ?, ?, ?, ?, ?, @message, ?, ?, ?, @inserted_id);
        SELECT @message as message;
        SELECT @inserted_id as inserted_id;
    `;

    const addContactPersonQuery = `
        CALL addtscontactpersondetails(?, ?, ?, ?, ?, ?);
    `;

    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            res.status(500).send('Server error');
            return;
        }

        connection.beginTransaction(err => {
            if (err) {
                console.error('Error starting transaction:', err);
                res.status(500).send('Server error');
                connection.release();
                return;
            }

            connection.query(addSupplierQuery, [
                supplierName, // in_supplier_name
                address, // in_address
                telephone, // in_telephoneno
                pan, // in_panno
                '', // in_gstno - Assuming GST No is not provided, replace '' with the actual variable if needed
                city, // in_city
                email, // in_emailid
                vendorCode, // in_vendor_code
                cst, // in_cst
                vat, // in_vat
                ecc // in_ecc
            ], (err, results) => {
                if (err) {
                    console.error('Error executing addSupplierQuery:', err);
                    return connection.rollback(() => {
                        res.status(500).send('Server error');
                        connection.release();
                    });
                }
                const message = results[2] && results[2][0] ? results[2][0].message : null;
                const insertedId = results[3] && results[3][0] ? results[3][0].inserted_id : null;

                if (!insertedId) {
                    console.error('Error: insertedId not found');
                    return connection.rollback(() => {
                        res.status(500).send('Server error');
                        connection.release();
                    });
                }

                const addContactsPromises = tyresupplierContacts.map(contact => {
                    return new Promise((resolve, reject) => {
                        connection.query(addContactPersonQuery, [
                            insertedId, // in_tsid
                            contact.ContactPerson, // in_cpname
                            contact.address, // in_address
                            contact.designation, // in_designation
                            contact.email, // in_email
                            contact.phoneNumber // in_fax
                        ], (err, results) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results);
                            }
                        });
                    });
                });

                Promise.all(addContactsPromises)
                    .then(() => {
                        connection.commit(err => {
                            if (err) {
                                console.error('Error committing transaction:', err);
                                return connection.rollback(() => {
                                    res.status(500).send('Server error');
                                    connection.release();
                                });
                            }

                            res.json({ message, insertedId });
                            connection.release();
                        });
                    })
                    .catch(err => {
                        console.error('Error adding contact persons:', err);
                        connection.rollback(() => {
                            res.status(500).send('Server error');
                            connection.release();
                        });
                    });
            });
        });
    });
};





const updatetyresuppliers = (req, res) => {
   
    const id = req.params.id;
    const {
        supplierName,
        address,
        city,
        telephone,
        email,
        pan,
        vendorCode,
        vat,
        cst,
        ecc,
        tyresupplierContacts
    } = req.body;

    const updateSupplierQuery = `
        SET @message = '';
        CALL updatetyresupplier(?, ?, ?, ?, ?, ?, ?, ?, ?, @message, ?, ?, ?);
        SELECT @message as message;
    `;

    const addContactPersonQuery = `
        CALL addtscontactpersondetails(?, ?, ?, ?, ?, ?);
    `;

    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            res.status(500).send('Server error');
            return;
        }

        connection.beginTransaction(err => {
            if (err) {
                console.error('Error starting transaction:', err);
                res.status(500).send('Server error');
                connection.release();
                return;
            }

            connection.query(updateSupplierQuery, [
                id, // up_tsd_id
                supplierName, // up_supplier_name
                address, // up_address
                telephone, // up_telephoneno
                pan, // up_panno
                '', // up_gstno - Assuming GST No is not provided, replace '' with the actual variable if needed
                city, // up_city
                email, // up_emailid
                vendorCode, // up_vendor_code
                cst, // in_cst
                vat, // in_vat
                ecc // in_ecc
            ], (err, results) => {
                if (err) {
                    console.error('Error executing updateSupplierQuery:', err);
                    return connection.rollback(() => {
                        res.status(500).send('Server error');
                        connection.release();
                    });
                }

                // Extract the message from the results
                const message = results[2] && results[2][0] ? results[2][0].message : null;
                if (!message) {
                    console.error('Error: message not found');
                    return connection.rollback(() => {
                        res.status(500).send('Server error');
                        connection.release();
                    });
                }

                console.log(`Message: ${message}`);

                // Insert contact persons
                const addContactsPromises = tyresupplierContacts.map(contact => {
                    return new Promise((resolve, reject) => {
                        connection.query(addContactPersonQuery, [
                            id, // in_tsid
                            contact.ContactPerson, // in_cpname
                            contact.address, // in_address
                            contact.designation, // in_designation
                            contact.email, // in_email
                            contact.phoneNumber // in_fax
                        ], (err, results) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results);
                            }
                        });
                    });
                });

                Promise.all(addContactsPromises)
                    .then(() => {
                        connection.commit(err => {
                            if (err) {
                                console.error('Error committing transaction:', err);
                                return connection.rollback(() => {
                                    res.status(500).send('Server error');
                                    connection.release();
                                });
                            }

                            res.json({ message });
                            connection.release();
                        });
                    })
                    .catch(err => {
                        console.error('Error adding contact persons:', err);
                        connection.rollback(() => {
                            res.status(500).send('Server error');
                            connection.release();
                        });
                    });
            });
        });
    });
};






const deletetyresupplier = (req, res) => {
   // const id = "1"; // Example id to be deleted
const id=req.params.id.toString()
    const query = `
        CALL deletetyresupplier(?, @message);
        SELECT @message as message;
    `;

    try {
        db.query(query, [id.join(",")], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            // Extract the message from the results
            const message = results[1][0].message;
            console.log(`Message: ${message}`);
          return  res.json({ message });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};

  module.exports = {
    getalltyresuppliers,
    gettyresupplierbyid,
    getalltyresupplierss,
    updatetyresuppliers,
    deletetyresupplier,
    addtyresupplier
  };