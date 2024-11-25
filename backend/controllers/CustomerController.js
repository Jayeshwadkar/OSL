const db = require("../config/dbConfig");
const getAllCustomer = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = page * pageSize;
    const searchTerm = req.query.search;
    const customerQuery = 'CALL viewallcustomer()';
    const contactPersonQuery = 'SELECT person_name FROM contact_person_details WHERE customer_id = ?';

    try {
        db.query(customerQuery, (err, customerResults) => {
            if (err) {
                console.error('Error executing customer query:', err);
                res.status(500).send('Server error');
                return;
            }

            let customers = customerResults[0];

            if (searchTerm) {
                customers = customers.filter(customer =>
                    (customer.customer_name && customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (customer.address && customer.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (customer.emailid && customer.emailid.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (customer.telephoneno && customer.telephoneno.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (customer.vendor_code && customer.vendor_code.toLowerCase().includes(searchTerm.toLowerCase()))
                );
            }

            customers.reverse();
            const total = customers.length;
            const paginatedCustomers = customers.slice(offset, offset + pageSize);

            const customerPromises = paginatedCustomers.map(customer => {
                return new Promise((resolve, reject) => {
                    db.query(contactPersonQuery, [customer.customer_id], (err, contactPersonResults) => {
                        if (err) {
                            reject(err);
                        } else {
                            // Convert the person_name to uppercase
                            customer.contact_person_details = contactPersonResults.map(cp => cp.person_name.toUpperCase());
                            let uppercasedCustomer = {};
                            for (let key in customer) {
                                if (typeof customer[key] === 'string') {
                                    uppercasedCustomer[key] = customer[key].toUpperCase();
                                } else {
                                    uppercasedCustomer[key] = customer[key];
                                }
                            }
                            resolve(uppercasedCustomer);
                        }
                    });
                });
            });

            Promise.all(customerPromises)
                .then(paginatedCustomersWithContact => {
                    return res.json({
                        Customer: paginatedCustomersWithContact,
                        total: total
                    });
                })
                .catch(err => {
                    console.error('Error fetching contact person details:', err);
                    res.status(500).send('Server error');
                });
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};
const getAllCustomers = async (req, res) => {
    const query = 'CALL viewallcustomer()';

    try {
        const [results] = await db.query(query);
        const customers = results[0];
        const filteredCustomers = customers.map(customer => ({
            customer_id: customer.customer_id,
            customer_name: customer.customer_name
        }));

     
        return res.json(filteredCustomers);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};


const getPoCustomers = async (req, res) => {

    const query = 'SELECT customer_id, customer_name FROM pocustomer';

    try {

        const [results] = await db.query(query);


        const customers = results;


        const filteredCustomers = customers.map(customer => ({
            customer_id: customer.customer_id,
            customer_name: customer.customer_name
        }));


        return res.json(filteredCustomers);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};




const getCustomerbyid = (req, res) => {
    const id = req.params.id;

    const queryCustomer = 'CALL findcustomerbyid(?)';
    const queryContact = 'CALL findcustomercontactperbyid(?)';

    try {

        db.query(queryCustomer, id, (err, customerResults) => {
            if (err) {
                console.error('Error executing query findcustomerbyid:', err);
                res.status(500).send('Server error');
                return;
            }


            const customerData = customerResults[0];
            


            db.query(queryContact, id, (err, contactResults) => {
                if (err) {
                    console.error('Error executing query getcustomercontactperbyid:', err);
                    res.status(500).send('Server error');
                    return;
                }


                const contactData = contactResults[0];
                const combinedResults = {
                    customer: customerData,
                    contact: contactData
                };


                return res.json(combinedResults);
            });
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};


const AddCustomer = (req, res) => {
    const {
        branch,
        name,
        address,
        telephone,
        faxNo,
        cstNo,
        gstNo,
        state,
        city,
        email,
        vendorCode,
        vatNo,
        eccNo,
        contactPersons
    } = req.body;

    const query = `
        SET @message = '';
        SET @inserted_id = 0;
        CALL addcustomer(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @message, @inserted_id, ?, ?, ?, ?);
        SELECT @message as message, @inserted_id as inserted_id;
    `;

    try {
        db.query(query, [
            name,
            address,
            telephone,
            faxNo,
            gstNo,
            city,
            email,
            vendorCode,
            "",
            "",
            "",
            "",
            "",
            branch,
            state,
            cstNo,
            vatNo,
            eccNo
        ], async (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            const message = results[2][0].message;
            const inserted_id = results[3][0].inserted_id;

            console.log(`Message: ${message}, Inserted ID: ${inserted_id}`);

            if (inserted_id !== 0 && Array.isArray(contactPersons)) {
                const customerId = inserted_id;
                const contactQuery = `CALL insertCustContPerDetails(?, ?, ?, ?, ?, ?)`;
                const promises = contactPersons.map(contact => {
                    return db.query(contactQuery, [customerId, contact.person_name, contact.address, contact.emailid, contact.phoneNumber, contact.address]);
                });
                try {
                    await Promise.all(promises);
                    console.log('All contact persons added successfully');
                } catch (error) {
                    // console.error('Error adding contact persons:', error);
                }
            }

            return res.json({ message, inserted_id });
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};



const UpadteCustomer = (req, res) => {
    const { id } = req.params;
    const {
        name,
        address,
        telephone,
        faxNo,
        gstNo,
        city,
        email,
        vendorCode,
        cp_person_name,
        cp_address,
        cp_designation,
        cp_emailid,
        cp_faxno,
        state,
        cstNo,
        vatNo,
        eccNo,
        branch,
        contactPersons
    } = req.body;

    const customerQuery = `
        CALL updatecustomer(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,@message, ?, ?, ?, ?);
    `;

    try {
        db.query(customerQuery, [
            id,
            name,
            address,
            telephone,
            faxNo,
            gstNo,
            city,
            email,
            vendorCode,
            id,
            cp_person_name,
            cp_address,
            cp_designation,
            cp_emailid,
            cp_faxno,
            state,
            cstNo,
            vatNo,
            eccNo,
            branch
        ], (err, results) => {
            if (err) {
                console.error('Error executing customer query:', err);
                res.status(500).send('Server error');
                return;
            }

            const message = results;
            console.log(`Message: ${message}`);
            res.json({ message });


            for (const contactPerson of contactPersons) {
                const contactPersonQuery = `
                    INSERT INTO contact_person_details (customer_id, person_name, address, designation, emailid, faxno)
                    VALUES (?, ?, ?, ?, ?, ?);
                `;
                db.query(contactPersonQuery, [
                    contactPerson.customer_id || id,
                    contactPerson.person_name,
                    contactPerson.address,
                    contactPerson.designation,
                    contactPerson.emailid,
                    contactPerson.faxno,
                ], (err, results) => {
                    if (err) {
                        console.error('Error executing contact person query:', err);
                        // Handle error as per your application's requirement
                    }
                });
            }
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};





const deleteContactPerson = (req, res) => {
    const cpdId = req.params.id;
    console.log(cpdId)
    const query = 'DELETE FROM contact_person_details WHERE cpd_id = ?';

    try {
        db.query(query, [cpdId], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

          
            return res.json({ message: 'Contact person deleted successfully' });
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};


const deletecustomer = (req, res) => {
    const id = req.params.id;

    const query = 'CALL deletecustomer(?, @message)';

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

    
                return res.json({ message: result });
            });
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};



const getpoCustomerById = async (req, res) => {
    
    const { branch, customer_id } = req.query;
  


    if (!branch || !customer_id) {
        return res.status(400).send('Branch and ID are required');
    }


    const query = 'CALL findpocustomerbyid(?, ?)';

    try {

        const [results] = await db.query(query, [branch, customer_id]);
        const customers = results[0];

        if (customers.length === 0) {
            return res.status(404).send('No customer found');
        }


        return res.json(customers);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};



const getPOByCustomer = async (req, res) => {
    const { customer_id } = req.query; 

    if (!customer_id) {
        return res.status(400).send('Customer ID is required');
    }
    const query = 'SELECT id, customer_id, po_no, po_date FROM osl.po_master WHERE customer_id = ?';

    try {
        const [results] = await db.query(query, [customer_id]);
        if (results.length === 0) {
            return res.status(404).send('No POs found for the given customer ID');
        }
        return res.json(results);
    } catch (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Server error');
    }
};


module.exports = {
    getAllCustomer,
    getCustomerbyid,
    UpadteCustomer,
    deletecustomer,
    deleteContactPerson,
    AddCustomer,
    getAllCustomers,
    getPoCustomers,
    getpoCustomerById,
    getPOByCustomer
};