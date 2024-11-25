const dayjs = require('dayjs')
const db = require('../config/dbConfig');

// For article
const getArticleList = async (req, res) => {
    const  id = null;  // Correct destructuring
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = page * pageSize;
    const searchTerm = req.query.search || null;
    

    const query2 = 'call findarticles(?)';

    try {
        const [results2] = await 
            db.query(query2, [id])
;

        let articles = results2[0];
        
        articles.reverse();

        if (searchTerm) {
            articles = articles.filter(article =>
                (article.articles_name && article.articles_name.toLowerCase().includes(searchTerm.toLowerCase())) 
            );
        }

        const total = articles.length;
        articles = articles.map(article => ({
            ...article,
            articles_name: article.articles_name.toUpperCase(),

        }));

        const paginatedArticles = articles.slice(offset, offset + pageSize);

      return  res.json({
            articles: paginatedArticles,
            total: total
        });

    } catch (err) {
        console.error('Error:', err);
        return  res.status(500).send('Server error');
    }
};
const getallArticleList = async (req, res) => {
    const  id = null;  // Correct destructuring
    

    const query2 = 'call findarticles(?)';

    try {
        const [results2] = await 
            db.query(query2, [id])
;

        let articles = results2[0];
        
        return res.json(
            articles           
        );

    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};
const addArticle = async (req, res) => {

    const { articleName, branchId } = req.body;

    const query = 'call insertarticles(?,?,?,@message)'

    try {
        const [results1] = await Promise.all([
            db.query(query, [articleName, "", branchId])
        ]);
        return res.status(200).send(results1[0])
    } catch (error) {
        res.status(500).send({ message: "Error while adding articles", error: error.message })
        console.log(error);
    }
}

const deleteArticle = async (req, res) => {
    const newarr = `(${req.body.join(',')})`

    const query = 'call deletearticles(?,@message)'
    try {
        const [result] = await db.query(query, newarr)
        return res.status(200).send(result[0][0])
    } catch (error) {
        res.status(500).send({ message: "Error while delete articles", error: error.message })
        console.log(error);
    }
}

const findArticleById = async (req, res) => {
    const id = req.params.id
    const query = 'call findarticleobject(?)'

    try {
        const [result] = await db.query(query, id)
        console.log(result[0]);
        return res.status(200).send(result[0][0])
    } catch (error) {
        res.status(500).send({ message: "Error while editing articles", error: error.message })
        console.log(error);
    }
}

const updateArticle = async (req, res) => {
    const { articleName, branchId, articleId } = req.body

    const query = 'call updatearticles(?,?,?,?,@message)'
    try {
        const [result] = await db.query(query, [articleId, articleName, "", branchId])
        return res.status(200).send(result[0])
    } catch (error) {
        res.status(500).send({ message: "Error while editing articles", error: error.message })
        console.log(error);
    }
}

// For places
const getPlacesList = async (req, res) => {
    const query = 'call findplace()';
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = page * pageSize;
    const searchTerm = req.query.search || null;
    console.log(searchTerm)
    try {
        const [results] = await db.query(query)

        let place = results[0];
    
        place.reverse();

        if (searchTerm) {
            place = place.filter(place =>
                (place.place_name && place.place_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (place.place_abbreviation && place.place_abbreviation.toLowerCase().includes(searchTerm.toLowerCase()))
                
            );
        }

        const total = place.length;
        
        place = place.map(place => ({
            ...place,
            place_name: place.place_name.toUpperCase(),

        }));
        
        const paginatedArticles = place.slice(offset, offset + pageSize);

      return  res.json({
        place: paginatedArticles,
            total: total
        });

    } catch (err) {
        console.error('Error:', err);
        return  res.status(500).send('Server error');
    }
};
const getAllPlacesList = async (req, res) => {
    const query = 'call findplace()';

    try {
        const [results] = await db.query(query)

        let place = results[0];

      return  res.json(
        place
        
        );

    } catch (err) {
        console.error('Error:', err);
        return  res.status(500).send('Server error');
    }
};
const getCustomersList = async (req, res) => {
    const query = 'call viewallcustomer()';

    try {
        const [results] = await db.query(query)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error getting place List', err);
        return res.status(500).send({ message: 'Error getting customers List', Error: err.message });
    }
};

const addPlaces = async (req, res) => {
    const { customer_id, place_name, distance } = req.body

    const query = 'call insertplace(?,?,?,@message)';

    try {
        const [results] = await db.query(query, [place_name, distance, customer_id])
        return res.status(200).send(results[0]);
    } catch (err) {
        console.error('Error while add place data', err);
        return res.status(500).send({ message: 'Error while add place data', Error: err.message });
    }
};

const deletePlace = async (req, res) => {

    const newarr = req.body
    const delData = []

    const query = 'call deleteplace(?,@message)';

    try {
        for (let i = 0; i < newarr.length; i++) {
            const [result] = await db.query(query, newarr[i])
            if (result[0][0].message.length > 0) {
                delData.push(result[0][0].message)
            }
        }
        return res.status(200).send(delData)
    } catch (error) {
        res.status(500).send({ message: "Error while delete place", error: error.message })
        console.log(error);
    }
};

const findPlaceById = async (req, res) => {
    const placeid = req.params.placeid
    const query = 'call findplaceobject(?)';

    try {
        const [result] = await db.query(query, placeid)
        return res.status(200).send(result[0][0])
    } catch (error) {
        res.status(500).send({ message: "Error while fetching place data", error: error.message })
        console.log(error);
    }
};

const updatePlace = async (req, res) => {
    const { customer_id, place_name, distance, placeid } = req.body

    const query = 'call updateplace(?,?,?,?,@message)';

    try {
        const [result] = await db.query(query, [placeid, place_name, distance, customer_id])
        return res.status(200).send(result[0])
    } catch (error) {
        res.status(500).send({ message: "Error while updating place data", error: error.message })
        console.log(error);
    }
};

// For Branches
const getBranchesList = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = page * pageSize;
    const searchTerm = req.query.search || null;
    const query = 'call findbranch()';

    try {
        const [results] = await db.query(query)

        let branch = results[0];
    
        branch.reverse();

        if (searchTerm) {
            branch = branch.filter(branch =>
                (branch.branch_code && branch.branch_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (branch.branch_abbreviation && branch.branch_abbreviation.toLowerCase().includes(searchTerm.toLowerCase())) || 
                (branch.branch_name && branch.branch_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (branch.description && branch.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (branch.place_name && branch.place_name.toLowerCase().includes(searchTerm.toLowerCase())) 
                
            );
        }

        const total = branch.length;
        
        branch = branch.map(branch => ({
            ...branch,
            branch_code: branch.branch_code.toUpperCase(),
            branch_abbreviation: branch.branch_abbreviation.toUpperCase(),
            description: branch.description.toUpperCase(),
            place_name: branch.place_name.toUpperCase(),

        }));
        
        const paginatedArticles = branch.slice(offset, offset + pageSize);

      return  res.json({
        branch: paginatedArticles,
            total: total
        });

    } catch (err) {
        console.error('Error:', err);
        return  res.status(500).send('Server error');
    }
};
const getAllBranchesList = async (req, res) => {
    const query = 'call findbranch()';

    try {
        const [results] = await db.query(query)

        let branch = results[0];
 
      return  res.json(branch);

    } catch (err) {
        console.error('Error:', err);
        return  res.status(500).send('Server error');
    }
};
const addBranch = async (req, res) => {
    // console.log("Branch Data", req.body);
    const { branchCode, abbreviation, branchName, description, placeId, address, state, city, pincode } = req.body

    const query = 'call insertbranch(?,?,?,?,?,NULL,?,?,?,?,@message)';

    try {
        const [results] = await db.query(query, [
            branchCode, abbreviation, branchName, description, placeId,
            address, state, city, pincode])
         console.log("result add ", results);

        return res.status(200).send(results[0][0])
    } catch (error) {
        res.status(500).send({ message: "Error while fetching place data", error: error.message })
        console.log(error);
    }
};

const findBranchById = async (req, res) => {
    const branchid = req.params.branchid

    const query = "call findonebranch(?)";

    try {
        const [results] = await db.query(query, branchid)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error getting branch data', err);
        return res.status(500).send({ message: 'Error getting branch data', Error: err.message });
    }
};

const updateBranch = async (req, res) => {
    // console.log("up br : ", req.body);

    const { branchid, branchCode, abbreviation, branchName, description, placeId, address, state, city, pincode } = req.body

    const query = 'call updatebranch(?,?,?,?,?,?,NULL,?,?,?,?,@message)';

    try {
        const [results] = await db.query(query, [branchid, branchCode, abbreviation, branchName, description, placeId, address, state, city, pincode])
        return res.status(200).send(results[0])
    } catch (error) {
        res.status(500).send({ message: "Error while updating branch data", error: error.message })
        console.log(error);
    }
};

const deleteBranch = async (req, res) => {
    const newarr = req.body
    const delData = []
console.log(newarr)
    const query = 'call deletebranch(?,@message)';

    try {
        for (let i = 0; i < newarr.length; i++) {
            const [result] = await db.query(query, newarr[i])
            if (result[0][0].message.length > 0) {
                delData.push(result[0][0].message)
            }
        }
        return res.status(200).send(delData)
    } catch (error) {
        res.status(500).send({ message: "Error while delete branch", error: error.message })
        console.log(error);
    }
};

// For Customers

const getCustomerListByPage = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const start_index = page + 1;
    const counts = pageSize;

    const query = 'call findcustomerpage(?,?);';

    try {
        const [results] = await db.query(query, [start_index, counts]);

        let customer = results[0];

        const total = results.length > 0 ? results[0][0].total_count : 0;
        customer = customer.map(customer => ({
            ...customer,
            customer_name: customer.customer_name ? customer.customer_name.toUpperCase() : '',
            gstno: customer.gstno ? customer.gstno.toUpperCase() : '',
            vendor_code: customer.vendor_code ? customer.vendor_code.toUpperCase() : '',
            address: customer.address ? customer.address.toUpperCase() : '',
            state: customer.state ? customer.state.toUpperCase() : '',
            city: customer.city ? customer.city.toUpperCase() : '',
            emailid: customer.emailid ? customer.emailid.toUpperCase() : '',
            cpname: customer.cpname ? customer.cpname.toUpperCase() : '',
            telephoneno: customer.telephoneno ? customer.telephoneno.toUpperCase() : '',
            lrs: customer.lrs ? customer.lrs.toString() : ''
        }));
        
        return res.json({
            customer,
            total
        });

    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};

const getAllCustomerList = async (req, res) => {
    const query = 'call getallcustomer();';

    try {
        const [results] = await db.query(query)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error fetching Customer List', err);
        return res.status(500).send({ message: 'Error fetching Customer List', Error: err.message });
    }
};
const getCustomerListBySerach = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = page * pageSize;
    const searchTerm = req.query.search || null;
    
    const query = 'call findcustomersearchpage(?);';

    try {
        const [results] = await db.query(query, [searchTerm]);

        let customer = results[0];
        const total = results.length > 0 ? results[0][0]['@totc'] : 0;
        customer = customer.map(customer => ({
            ...customer,
            customer_name: customer.customer_name ? customer.customer_name.toUpperCase() : '',
            gstno: customer.gstno ? customer.gstno.toUpperCase() : '',
            vendor_code: customer.vendor_code ? customer.vendor_code.toUpperCase() : '',
            address: customer.address ? customer.address.toUpperCase() : '',
            state: customer.state ? customer.state.toUpperCase() : '',
            city: customer.city ? customer.city.toUpperCase() : '',
            emailid: customer.emailid ? customer.emailid.toUpperCase() : '',
            cpname: customer.cpname ? customer.cpname.toUpperCase() : '',
            telephoneno: customer.telephoneno ? customer.telephoneno.toUpperCase() : '',
            lrs: customer.lrs ? customer.lrs.toString() : ''
        }));
        const paginatedArticles = customer.slice(offset, offset + pageSize);

        return res.json({
            customer:paginatedArticles,
            total
        });

    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};
const addCustomer = async (req, res) => {
    console.log("Customer Data", req.body);
    const { branch, cust_name, gst_no, vendor_code, email, mobileno, address, state, city, pincode, contactPersons } = req.body

    const query = 'call insertcustomer(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@message,@inserted_id,?);';

    try {
        const [results] = await db.query(query, [
            cust_name, address, mobileno, "",
            gst_no, city, email, vendor_code,
            "", "", "", "", "",
            branch, pincode, state
        ])
        console.log("result add ", results);

        const inserted_id = results[1][0].inserted_id;
        if (inserted_id != 0 && Array.isArray(contactPersons)) {
            const customerId = inserted_id;
            const query2 = `call insertCustContPerDetails(?,?,?,?,?,?)`;
            const promises = contactPersons.map(contact => {
                return db.query(query2, [customerId, contact.cp_name, contact.cp_address, contact.cp_designation, contact.cp_email, ""]);
            });
            try {
                await Promise.all(promises);
                console.log('All contact persons added successfully');
            } catch (error) {
                console.error('Error adding consinee part', error);
            }

        }
        return res.status(200).send(results[0][0])
    } catch (error) {
        res.status(500).send({ message: "Error while add customer data", error: error.message })
        console.log(error);
    }
};

const getCustomerById = async (req, res) => {
    const custid = req.params.custid
    const query1 = 'call findcustomerbyid(?,?);';
    const query2 = 'call findcustomercontactperbyid(?)';

    try {
        const [results1, results2] = await Promise.all([
            db.query(query1, ["", custid]),
            db.query(query2, custid)
        ]);

        if (results1[0].length > 0 || results2[0].length > 0) {
            const finalObject = {
                customer: results1[0][0],
                contactPer: results2[0][0]
            }
            return res.status(200).send(finalObject);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error fetching customer by id', err);
        return res.status(500).send({ message: 'Error fetching customer by id', Error: err.message });
    }
};

const updateCustomer = async (req, res) => {
    console.log("Customer Data", req.body);
    const { custid, branch, cust_name, gst_no, vendor_code, email, mobileno, address, state, city, pincode, contactPersons } = req.body

    const query = 'call updatecustomer(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@message,?);';

    try {
        const [results] = await db.query(query, [custid,
            cust_name, address, mobileno, "",
            gst_no, city, email, vendor_code,
            0, "", "", "", "", "", pincode, state
        ])
        console.log("result update ", results);

        if (custid != 0 && Array.isArray(contactPersons)) {
            const query2 = `call insertCustContPerDetails(?,?,?,?,?,?)`;
            const promises = contactPersons.map(contact => {
                return db.query(query2, [custid, contact.cp_name, contact.cp_address, contact.cp_designation, contact.cp_email, contact.cp_mobile]);
            });
            try {
                await Promise.all(promises);
                // console.log('All contact persons added successfully');
            } catch (error) {
                console.error('Error adding consinee part', error);
            }

        }
        return res.status(200).send(results[0])
    } catch (error) {
        res.status(500).send({ message: "Error while add customer data", error: error.message })
        console.log(error);
    }
};

const deleteCustomer = async (req, res) => {
    // console.log("part del data : ", req.body);
    const newarr = req.body
    const delData = []

    const query = 'call deletecustomer(?,@message);';

    try {
        for (let i = 0; i < newarr.length; i++) {
            const [result] = await db.query(query, newarr[i])
            if (result[0][0].message.length > 0) {
                delData.push(result[0][0].message)
            }
        }
        return res.status(200).send(delData)
    } catch (error) {
        res.status(500).send({ message: "Error while delete part no", error: error.message })
        console.log(error);
    }
};

// For drivers

const getDriversList = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const pageSize = parseInt(req.query.pageSize) || 10;

    try {
        
        const query = 'CALL listdriverpage(?, ?)';
        const [results] = await db.query(query, [page, pageSize]);

        let driver = results[0];
       
        driver = driver.map(driver => ({
            ...driver,
            driver_name: driver.driver_name.toUpperCase(),
            corresp_address: driver.corresp_address.toUpperCase(),
            licenseno: driver.licenseno.toUpperCase(),
        }));

        const total = driver.length > 0 ? driver[0][`@totc`] : 0;
        const totCounts = driver.length > 0 ? driver[0].tot_counts : 0;

        return res.json({
            driver,
            total
            
        });

    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};

const getAllDriversserach = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = page * pageSize;
    const searchTerm = req.query.search || null;
    
    const query = 'call listdriver("")';

    try {
        const [results] = await db.query(query)

        let driver = results[0];
    
        driver.reverse();

        if (searchTerm) {
            driver = driver.filter(driver =>
                (driver.driver_name && driver.driver_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (driver.corresp_address && driver.corresp_address.toLowerCase().includes(searchTerm.toLowerCase())) || 
                (driver.licenseno && driver.licenseno.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (driver.mobileno && driver.mobileno.toLowerCase().includes(searchTerm.toLowerCase())) 
               
                
            );
        }

        const total = driver.length;
        
        driver = driver.map(driver => ({
            ...driver,
            driver_name: driver.driver_name.toUpperCase(),
            corresp_address: driver.corresp_address.toUpperCase(),
            licenseno: driver.licenseno.toUpperCase(),
            mobileno: driver.mobileno.toUpperCase(),

        }));
        
        const paginatedArticles = driver.slice(offset, offset + pageSize);

      return  res.json({
        driver: paginatedArticles,
            total: total
        });

    } catch (err) {
        console.error('Error:', err);
        return  res.status(500).send('Server error');
    }
};
const getAllDrivers = async (req, res) => {
    const query = 'call listdriver("")';

    try {
        const [results] = await db.query(query)

        let driver = results[0];
    
        driver.reverse();

       
      return  res.json(driver);

    } catch (err) {
        console.error('Error:', err);
        return  res.status(500).send('Server error');
    }
};
const getDriverById = async (req, res) => {
    const driverid = req.params.driverid
    const query = 'call finddriver(?);';

    try {
        const [results] = await db.query(query, driverid)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error fetching Driver by Id', err);
        return res.status(500).send({ message: 'Error fetching Driver  by Id', Error: err.message });
    }
};

const addDriver = async (req, res) => {

    const { name, address, dateOfBirth, mobile, fathername, reference, eyesight,
        license_no, license_type, remark, permanantAdd, qualification, joiningDate,
        blood_grp, renewDate, expiryDate, curr_state, curr_city, curr_pincode,
        per_state, per_city, per_pincode
    } = req.body

    const query = 'call insertdriver(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@message)';

    try {
        const [results] = await db.query(query, [
            name,
            address,
            dateOfBirth,
            "",
            fathername,
            reference,
            eyesight,
            license_no,
            `${license_type}`,
            remark,
            permanantAdd,
            qualification,
            mobile,
            joiningDate,
            `${blood_grp}`,
            renewDate,
            expiryDate,
            '',
            curr_state, curr_city, curr_pincode,
            per_state, per_city, per_pincode
        ])
        // console.log("Driver add result", results);
        return res.status(200).send(results[0])
    } catch (error) {
        res.status(500).send({ message: "Error while adding driver data", error: error.message })
        console.log(error);
    }
};

const updateDriver = async (req, res) => {
    // console.log("update driver data : ", req.body);

    const { name, address, dateOfBirth, mobile, fathername, reference, eyesight,
        license_no, license_type, remark, permanantAdd, qualification, joiningDate,
        blood_grp, renewDate, expiryDate, driverid, curr_state, curr_city, curr_pincode,
        per_state, per_city, per_pincode
    } = req.body

    const query = 'call updatedriver(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@message,?,?,?,?,?,?)';

    try {
        const [results] = await db.query(query, [
            driverid,
            name,
            address,
            dateOfBirth,
            "",
            fathername,
            reference,
            eyesight,
            license_no,
            `${license_type}`,
            remark,
            permanantAdd,
            qualification,
            mobile,
            joiningDate,
            `${blood_grp}`,
            renewDate,
            expiryDate,
            '',
            curr_state, curr_city, curr_pincode,
            per_state, per_city, per_pincode
        ])
        // console.log("Driver update result", results);
        return res.status(200).send(results[0])
    } catch (error) {
        res.status(500).send({ message: "Error while adding driver data", error: error.message })
        console.log(error);
    }
};

const deleteDriver = async (req, res) => {
    // console.log("del driver data : ", req.body);
    const newarr = req.body
    const delData = []

    const query = 'call deletedriver(?,@message);';

    try {
        for (let i = 0; i < newarr.length; i++) {
            const [results] = await db.query(query, newarr[i])
            if (results[0][0].message.length > 0) {
                delData.push(results[0][0].message)
            }
        }
        return res.status(200).send(delData)

    } catch (error) {
        res.status(500).send({ message: "Error while delete employee data", error: error.message })
        console.log(error);
    }
};

// For employee
const getEmployeeList = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = page * pageSize;
    const searchTerm = req.query.search || null;
    const query = 'call findemployee(30)';

    try {
        const [results] = await db.query(query)

        let employee = results[0];
    
        employee.reverse();

        if (searchTerm) {
            employee = employee.filter(employee =>
                (employee.employee_name && employee.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (employee.designation && employee.designation.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (employee.emailid && employee.emailid.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (employee.corresp_address && employee.corresp_address.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (employee.mobileno && employee.mobileno.toLowerCase().includes(searchTerm.toLowerCase())) 
            
            );
        }

        const total = employee.length;
        
        employee = employee.map(employee => ({
            ...employee,
            employee_name: employee.employee_name.toUpperCase(),
            designation: employee.designation.toUpperCase(),
            emailid: employee.emailid.toUpperCase(),
            corresp_address: employee.corresp_address.toUpperCase(),

        }));
        
        const paginatedArticles = employee.slice(offset, offset + pageSize);

      return  res.json({
        employee: paginatedArticles,
            total: total
        });

    } catch (err) {
        console.error('Error:', err);
        return  res.status(500).send('Server error');
    }
};
const getAllEmployeeList = async (req, res) => {
    const query = 'call findemployee(30)';

    try {
        const [results] = await db.query(query)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error fetching employee List', err);
        return res.status(500).send({ message: 'Error fetching employee List', Error: err.message });
    }
};
const getEmployeeById = async (req, res) => {
    const empid = req.params.empid
    const query = 'call findemployeeobject(?);';

    try {
        const [results] = await db.query(query, empid)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error fetching employee data by id', err);
        return res.status(500).send({ message: 'Error fetching employee data by id', Error: err.message });
    }
};

const addEmployee = async (req, res) => {
    // console.log("emp add data ", req.body);
    const {
        empname,
        empId,
        department,
        address,
        birthdate,
        email,
        permanantAdd,
        joiningDate,
        qualification,
        mobileno,
        bloodG,
        designation,
        curr_state, curr_city, curr_pincode,
        per_state, per_city, per_pincode
    } = req.body

    const bdate = dayjs(birthdate).format('YYYY-MM-DD');
    const jdate = dayjs(joiningDate).format('YYYY-MM-DD');

    const query = 'call insertemployee(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@message)';

    try {
        const [results] = await db.query(query, [empname,
            address,
            bdate,
            email,
            jdate,
            permanantAdd,
            qualification,
            mobileno,
            bloodG,
            designation, "0", department,
            curr_state, curr_city, curr_pincode,
            per_state, per_city, per_pincode
        ])
        // console.log("add emp result", results);
        return res.status(200).send(results[0])
    } catch (error) {
        res.status(500).send({ message: "Error while add employee data", error: error.message })
        console.log(error);
    }
};

const updateEmployee = async (req, res) => {
    // console.log("emp update data ", req.body);
    const {
        empid,
        empname,
        empId,
        department,
        address,
        birthdate,
        email,
        permanantAdd,
        joiningDate,
        qualification,
        mobileno,
        bloodG,
        designation,
        curr_state, curr_city, curr_pincode,
        per_state, per_city, per_pincode } = req.body

    const bdate = dayjs(birthdate).format('YYYY-MM-DD');
    const jdate = dayjs(joiningDate).format('YYYY-MM-DD');

    const query = 'call updateemployee(?,?,?,?,?,?,?,?,?,?,?,?,?,@message,?,?,?,?,?,?,?)';

    try {
        const [results] = await db.query(query, [
            empid,
            empname,
            address,
            bdate,
            "",
            email,
            jdate,
            permanantAdd,
            qualification,
            mobileno,
            bloodG,
            designation,
            "0", department,
            curr_state, curr_city, curr_pincode,
            per_state, per_city, per_pincode
        ])
        // console.log("update employee result", results);
        return res.status(200).send(results[0])
    } catch (error) {
        res.status(500).send({ message: "Error while updating employee data", error: error.message })
        console.log(error);
    }
};

const deleteEmployee = async (req, res) => {
    const { id } = req.body
    const newarr = `(${id.join(',')})`

    const query = 'call deleteemployee(?,@message)';

    try {
        const [results] = await db.query(query, newarr)
        // console.log("delete emp result", results);
        return res.status(200).send(results[0])
    } catch (error) {
        res.status(500).send({ message: "Error while delete employee data", error: error.message })
        console.log(error);
    }
};


// For transporter

const getTransporterList = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = page * pageSize;
    const searchTerm = req.query.search || null;
    const query = 'call vehicleownerlist(?)';

    try {
        const [results] = await db.query(query, "")

        let vehicleowner = results[0];
    
        vehicleowner.reverse();

        if (searchTerm) {
            vehicleowner = vehicleowner.filter(vehicleowner =>
                (vehicleowner.vehical_owner_name && vehicleowner.vehical_owner_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (vehicleowner.address && vehicleowner.address.toLowerCase().includes(searchTerm.toLowerCase())) || 
                (vehicleowner.city && vehicleowner.city.toLowerCase().includes(searchTerm.toLowerCase())) || 
                (vehicleowner.emailid && vehicleowner.emailid.toLowerCase().includes(searchTerm.toLowerCase())) || 
                (vehicleowner.telephoneno && vehicleowner.telephoneno.toLowerCase().includes(searchTerm.toLowerCase())) 
            );
        }

        const total = vehicleowner.length;
        
        vehicleowner = vehicleowner.map(vehicleowner => ({
            ...vehicleowner,
            vehical_owner_name: vehicleowner.vehical_owner_name.toUpperCase(),
            address: vehicleowner.address.toUpperCase(),
            city: vehicleowner.city.toUpperCase(),
            emailid: vehicleowner.emailid.toUpperCase(),
        }));
        
        const paginatedArticles = vehicleowner.slice(offset, offset + pageSize);

      return  res.json({
        vehicleowner: paginatedArticles,
            total: total
        });

    } catch (err) {
        console.error('Error:', err);
        return  res.status(500).send('Server error');
    }
};
const getAllTransporterList = async (req, res) => {
  
    const query = 'call vehicleownerlist(?)';

    try {
        const [results] = await db.query(query, "")

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error fetching transporter List', err);
        return res.status(500).send({ message: 'Error fetching transporter List', Error: err.message });
    }
};
const addTransporter = async (req, res) => {
    console.log("t data ", req.body);
    const { transp_name, branch, address, city, mobileno, emailid, pan_no, vendor_code, gst_no,
        bank_name, account_no, ifsc_code, state, pincode, bank_address
    } = req.body

    const query = 'call insertvehicleowner(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@message,?,?,?,?,?,?)';

    try {
        const [results] = await db.query(query, [
            transp_name,
            address,
            mobileno,
            pan_no,
            gst_no,
            "", city,
            emailid,
            vendor_code, "", "", "", "", "",
            branch,
            bank_name,
            account_no,
            ifsc_code,
            state, pincode, bank_address
        ])
        // console.log("add t result", results);
        return res.status(200).send(results[0])
    } catch (error) {
        res.status(500).send({ message: "Error while add vehicle type", error: error.message })
        console.log(error);
    }
};

const findTransporterById = async (req, res) => {
    const transpid = req.params.transpid
    const query = 'call findvehicleowner(?)';

    try {
        const [results] = await db.query(query, transpid)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error fetching transporter by id', err);
        return res.status(500).send({ message: 'Error fetching transporter by id', Error: err.message });
    }
};

const updateTransporter = async (req, res) => {
    console.log("t data ", req.body);
    const { transpid, transp_name, branch, address, city, mobileno, emailid, pan_no, vendor_code, gst_no,
        bank_name, account_no, ifsc_code, state, pincode, bank_address
    } = req.body

    const query = 'call updatevehicleowner(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@message,?,?,?,?,?,?)';

    try {
        const [results] = await db.query(query, [
            transpid,
            transp_name,
            address,
            mobileno,
            pan_no,
            gst_no,
            "", city,
            emailid,
            vendor_code, "", "", "", "", "",
            branch,
            bank_name,
            account_no,
            ifsc_code, state, pincode, bank_address
        ])
        // console.log("update result", results);
        return res.status(200).send(results)
    } catch (error) {
        res.status(500).send({ message: "Error while updating vehicle type", error: error.message })
        console.log(error);
    }
};

const deleteTransporter = async (req, res) => {
    // console.log("t del data ", req.body);
    const newarr = req.body
    const delData = []

    const query = 'call deletevehicleowner(?,@message)';

    try {
        for (let i = 0; i < newarr.length; i++) {
            const [result] = await db.query(query, newarr[i])
            if (result[0][0].message.length > 0) {
                delData.push(result[0][0].message)
            }
        }
        return res.status(200).send(delData)
    } catch (error) {
        res.status(500).send({ message: "Error while delete transporter data", error: error.message })
        console.log(error);
    }
};


// For vehicle

const getVehicleList = async (req, res) => {
    console.log(req.query)
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const start_index = page + 1;
    const counts = pageSize;
    const query = 'call vehiclelistpage(?,?)';

    try {
        const [results] = await db.query(query, [start_index, counts])

        let vehicle = results[0];

        const total = results.length > 0 ? results[0][0]['@totc'] : 0;
        vehicle = vehicle.map(vehicle => ({
            ...vehicle,
            vehicleno: vehicle.vehicleno ? vehicle.vehicleno.toUpperCase() : '',
            vehical_owner_name: vehicle.vehical_owner_name ? vehicle.vehical_owner_name.toUpperCase() : '',
            vo_address: vehicle.vo_address ? vehicle.vo_address.toUpperCase() : '',
            owner_name: vehicle.owner_name ? vehicle.owner_name.toUpperCase() : '',
            owner_address: vehicle.owner_address ? vehicle.owner_address.toUpperCase() : '',
            vehicle_type: vehicle.vehicle_type ? vehicle.vehicle_type.toUpperCase() : ''
        }));
        
        return res.json({
            vehicle,
            total
        });

    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};
const getAllVehicleserach = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = page * pageSize;
    const searchTerm = req.query.search || null;
    
    const query = 'call vehiclelistsearchpage(?);';

    try {
        const [results] = await db.query(query, [searchTerm]);

        let vehicle = results[0];

        const total = vehicle.length;
        vehicle = vehicle.map(vehicle => ({
            ...vehicle,
            vehicleno: vehicle.vehicleno ? vehicle.vehicleno.toUpperCase() : '',
            vehical_owner_name: vehicle.vehical_owner_name ? vehicle.vehical_owner_name.toUpperCase() : '',
            vo_address: vehicle.vo_address ? vehicle.vo_address.toUpperCase() : '',
            owner_name: vehicle.owner_name ? vehicle.owner_name.toUpperCase() : '',
            owner_address: vehicle.owner_address ? vehicle.owner_address.toUpperCase() : '',
            vehicle_type: vehicle.vehicle_type ? vehicle.vehicle_type.toUpperCase() : ''
        }));
        const paginatedArticles = vehicle.slice(offset, offset + pageSize);

        return res.json({
            vehicle:paginatedArticles,
            total
        });

    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};
const getALLVehicleList = async (req, res) => {
  
    const query = 'call vehiclelist()';

    try {
        const [results] = await db.query(query)

        let vehicle = results[0];

        
        return res.json(vehicle);

    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};
const getTransporterData = async (req, res) => {

    const query1 = 'call vehicleownerlist("");';
    const query2 = 'call vehicletypelist(""); ';

    try {
        const [results1, results2] = await Promise.all([
            db.query(query1),
            db.query(query2)
        ]);

        if (results1[0].length > 0 || results2[0].length > 0) {
            const finalObject = {
                transporter: results1[0][0],
                vehicleType: results2[0][0]
            }
            return res.status(200).send(finalObject);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error getting transporter list and vehicle type list', err);
        return res.status(500).send({ message: 'Error getting transporter list and vehicle type list', Error: err.message });
    }
};



const addvehicle = async (req, res) => {
    console.log("v data ", req.body);
    const {
        transporterName,
        ownName,
        vehicle_no,
        make,
        reg_date,
        engine_no,
        vehicle_type,
        capacity,
        chasis_no,
        description,
        expiry_date,
        puc_no,
        puc_exp_date,
        body,
        ownAddress,
        mobileno
    } = req.body.vdata

    const query = 'call insertvehicledetails(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@message,?,?,?)';

    try {
        const [results] = await db.query(query, [
            transporterName,
            vehicle_no,
            make,
            reg_date,
            engine_no,
            vehicle_type,
            capacity,
            chasis_no,
            description, "", "", "", "", "", "", "", "",
            expiry_date,
            puc_no,
            puc_exp_date,
            body,
            ownName, ownAddress, mobileno])
        // console.log("add v result", results);
        return res.status(200).send(results[0])
    } catch (error) {
        res.status(500).send({ message: "Error while add vehicle type", error: error.message })
        console.log(error);
    }
};

const getVehicleById = async (req, res) => {
    const vehicleid = req.params.vehicleid
    const query1 = 'call vehicleownerlist("");';
    const query2 = 'call vehicletypelist(""); ';
    const query3 = 'call findvehicle(?)';

    try {
        const [results1, results2, results3] = await Promise.all([
            db.query(query1),
            db.query(query2),
            db.query(query3, vehicleid)
        ]);

        if (results1[0].length > 0 || results2[0].length > 0 || results3[0].length > 0) {
            const tData = results1[0][0].filter(x => x.vod_id == results3[0][0][0].vod_id)
            const vtData = results2[0][0].filter(x => x.vt_id == results3[0][0][0].vt_id)
            const finalObject = {
                transporter: { value: tData[0].vod_id, label: tData[0].vehical_owner_name },
                vehicleType: { value: vtData[0].vt_id, label: vtData[0].vehicle_type },
                vehicleById: results3[0][0]
            }
            return res.status(200).send(finalObject);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error fetching vehicle data by id', err);
        return res.status(500).send({ message: 'Error fetching vehicle data by id', Error: err.message });
    }
};

const updateVehicle = async (req, res) => {
    // console.log("update v data ", req.body);
    const {
        vehicleid,
        transporterName,
        vehicle_no,
        make,
        reg_date,
        engine_no,
        vehicle_type,
        capacity,
        chasis_no,
        description,
        expiry_date,
        puc_no,
        puc_exp_date,
        body,
        ownName, ownAddress,
        mobileno
    } = req.body.vdata

    const rdate = dayjs(reg_date).format('YYYY-MM-DD');
    const edate = dayjs(expiry_date).format('YYYY-MM-DD');
    const pedate = dayjs(puc_exp_date).format('YYYY-MM-DD');

    const query = 'call updatevehicledetails(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@message,?,?,?)';

    try {
        const [results] = await db.query(query, [
            vehicleid,
            transporterName,
            vehicle_no,
            make,
            rdate,
            engine_no,
            vehicle_type,
            capacity,
            chasis_no,
            description, "", "", "", "", "", "", "", "",
            edate,
            puc_no,
            pedate,
            body,
            ownName, ownAddress, mobileno])
        console.log("update v result", results[0]);
        return res.status(200).send(results[0])
    } catch (error) {
        res.status(500).send({ message: "Error while update vehicle type", error: error.message })
        console.log(error);
    }
};


const deleteVehicle = async (req, res) => {
    // console.log("vt data ", req.body);
    const newarr = req.body
    const delData = []

    const query = 'call deletevehicle(?,@message)';

    try {
        for (let i = 0; i < newarr.length; i++) {
            const [result] = await db.query(query, newarr[i])
            if (result[0][0].message.length > 0) {
                delData.push(result[0][0].message)
            }
        }
        return res.status(200).send(delData)
    } catch (error) {
        res.status(500).send({ message: "Error while delete vehicle", error: error.message })
        console.log(error);
    }
};


// For vehicle type
const getVehicleTypeList = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = page * pageSize;
    const searchTerm = req.query.search || null;
    const query = 'call vehicletypelist(30)';

    try {
        const [results] = await db.query(query)

        let vehicletype = results[0];
    
        vehicletype.reverse();

        if (searchTerm) {
            vehicletype = vehicletype.filter(vehicletype =>
                (vehicletype.vehicle_type && vehicletype.vehicle_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (vehicletype.tyre_qty && vehicletype.tyre_qty.toLowerCase().includes(searchTerm.toLowerCase()))
                
            );
        }

        const total = vehicletype.length;
        
        vehicletype = vehicletype.map(vehicletype => ({
            ...vehicletype,
            vehicle_type: vehicletype.vehicle_type.toUpperCase(),
            tyre_qty: vehicletype.tyre_qty.toUpperCase(),
        }));
        
        const paginatedArticles = vehicletype.slice(offset, offset + pageSize);

      return  res.json({
        vehicletype: paginatedArticles,
            total: total
        });

    } catch (err) {
        console.error('Error:', err);
        return  res.status(500).send('Server error');
    }
};
const getAllVehicleTypeList = async (req, res) => {
    const query = 'call vehicletypelist(30)';

    try {
        const [results] = await db.query(query)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error fetching vehicle type List', err);
        return res.status(500).send({ message: 'Error fetching vehicle type List', Error: err.message });
    }
};

const addvehicletype = async (req, res) => {
    console.log("vt data ", req.body);
    const { vehicleType, tyre_qty } = req.body

    const query = 'call insertvehicletype(?,?,?,@message)';

    try {
        const [results] = await db.query(query, [vehicleType, tyre_qty, ""])
        // console.log("add vt result", results);
        return res.status(200).send(results[0])
    } catch (error) {
        res.status(500).send({ message: "Error while add vehicle type", error: error.message })
        console.log(error);
    }
};

const findVehicleTypeById = async (req, res) => {
    const vtid = req.params.vehicletId
    const query = 'call findvehicletype(?)';

    try {
        const [results] = await db.query(query, vtid)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error fetching vehicle type List', err);
        return res.status(500).send({ message: 'Error fetching vehicle type List', Error: err.message });
    }
};

const updateVehicleType = async (req, res) => {
    console.log("vt data ", req.body);
    const { vehicletid, vehicleType, tyre_qty } = req.body

    const query = 'call updatevehicletype(?,?,?,?,@message)';

    try {
        const [results] = await db.query(query, [vehicletid, vehicleType, tyre_qty, "30"])
        // console.log("del result", results);
        return res.status(200).send(results)
    } catch (error) {
        res.status(500).send({ message: "Error while updating vehicle type", error: error.message })
        console.log(error);
    }
};

const deleteVehicleType = async (req, res) => {
    // console.log("vt data ", req.body);
    const newarr = req.body
    const delData = []

    const query = 'call deletevehicletype(?,@message)';

    try {
        for (let i = 0; i < newarr.length; i++) {
            const [result] = await db.query(query, newarr[i])
            if (result[0][0].message.length > 0) {
                delData.push(result[0][0].message)
            }
        }
        return res.status(200).send(delData)
    } catch (error) {
        res.status(500).send({ message: "Error while delete branch", error: error.message })
        console.log(error);
    }
};


// For PO Customers

const getPoCustomersList = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const start_index = page + 1;
    const counts = pageSize;
    const query = 'call findpocustomerpage(?,?)';

    try {
        const [results] = await db.query(query, [start_index, counts])

        let pocustomer = results[0];

        const total = results.length > 0 ? results[0][0][['@totc']] : 0;
        pocustomer = pocustomer.map(pocustomer => ({
            ...pocustomer,
            customer_name: pocustomer.customer_name ? pocustomer.customer_name.toUpperCase() : '',
            gstno: pocustomer.gstno ? pocustomer.gstno.toUpperCase() : '',
            panno: pocustomer.panno ? pocustomer.panno.toUpperCase() : '',
            vendor_code: pocustomer.vendor_code ? pocustomer.vendor_code.toUpperCase() : '',
            address: pocustomer.address ? pocustomer.address.toUpperCase() : '',
            state: pocustomer.state ? pocustomer.state.toUpperCase() : '',
            city: pocustomer.city ? pocustomer.city.toUpperCase() : '',
            emailid: pocustomer.emailid ? pocustomer.emailid.toUpperCase() : '',
            cpname: pocustomer.cpname ? pocustomer.cpname.toUpperCase() : '',
            telephoneno: pocustomer.telephoneno ? pocustomer.telephoneno.toUpperCase() : '',
         
        }));
        
        return res.json({
            pocustomer,
            total
        });

    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};

const getPoCustomerListBySerach = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = page * pageSize;
    const searchTerm = req.query.search || null;
    
    const query = 'call findpocustomersearchpage(?);';

    try {
        const [results] = await db.query(query, [searchTerm]);

        let pocustomer = results[0];

        const total = pocustomer.length;
        pocustomer = pocustomer.map(pocustomer => ({
            ...pocustomer,
            customer_name: pocustomer.customer_name ? pocustomer.customer_name.toUpperCase() : '',
            gstno: pocustomer.gstno ? pocustomer.gstno.toUpperCase() : '',
            panno: pocustomer.panno ? pocustomer.panno.toUpperCase() : '',
            vendor_code: pocustomer.vendor_code ? pocustomer.vendor_code.toUpperCase() : '',
            address: pocustomer.address ? pocustomer.address.toUpperCase() : '',
            state: pocustomer.state ? pocustomer.state.toUpperCase() : '',
            city: pocustomer.city ? pocustomer.city.toUpperCase() : '',
            emailid: pocustomer.emailid ? pocustomer.emailid.toUpperCase() : '',
            cpname: pocustomer.cpname ? pocustomer.cpname.toUpperCase() : '',
            telephoneno: pocustomer.telephoneno ? pocustomer.telephoneno.toUpperCase() : '',
         
        }));
        const paginatedArticles = pocustomer.slice(offset, offset + pageSize);

        return res.json({
            pocustomer:paginatedArticles,
            total
        });

    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};
const getAllPoCustomerList = async (req, res) => {
    const query = 'call findallpocustomers();';

    try {
        const [results] = await db.query(query)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error fetching Customer List', err);
        return res.status(500).send({ message: 'Error fetching Customer List', Error: err.message });
    }
};
const addPoCustomer = async (req, res) => {
    // console.log("part no data ", req.body);
    const { branch,
        cust_code,
        cust_id,
        cust_name,
        address,
        mobileno,
        email,
        vendor_code,
        gst_no,
        gst_no_date,
        state,
        state_code,
        city,
        pan_no,
        cin_no, pincode,
        contactPersons } = req.body

    const query = 'call insertpocustomer(?,?,?,?,?,?,?,?,?,?,?,?,?,?,@message,@inserted_id,?,?,?,?,?,?,?,?,?,?,?)';

    try {
        const [results] = await db.query(query, [
            cust_name,
            address,
            mobileno, "",
            gst_no,
            city,
            email,
            vendor_code,
            "", "", "", "", "", //contact person data
            branch,
            state,
            state_code,
            cust_code,
            gst_no_date,
            pan_no,
            cin_no,
            cust_id,
            "", "", "", pincode
        ])
        // console.log("add partno result", results);
        const inserted_id = results[1][0].inserted_id;
        if (inserted_id != 0 && Array.isArray(contactPersons)) {
            const pocustomerId = inserted_id;
            const query2 = `call insertPoCustContPer(?,?,?,?,?,?,?,?,?,?,?)`;
            const promises = contactPersons.map(contact => {
                return db.query(query2, [pocustomerId, contact.contactP_name, contact.billing_address, contact.designation, contact.email,
                    contact.mobileno, contact.contactP_gstNo, contact.contactP_date, contact.contactP_stateCode, contact.payment_terms, contact.contactP_state]);
            });
            try {
                await Promise.all(promises);
                // console.log('All contact persons added successfully');
            } catch (error) {
                console.error('Error adding contact persons', error);
            }

        }
        return res.status(200).send(results[0])
    } catch (error) {
        res.status(500).send({ message: "Error while add po customer", error: error.message })
        console.log(error);
    }
};

const getPoCustomerById = async (req, res) => {
    const pocustid = req.params.pocustid

    const query1 = 'call findpocustomerbyid(?,?)';
    const query2 = 'call findpocustomercontactperbyid(?)';

    try {
        const [results1, results2] = await Promise.all([
            db.query(query1, ["", pocustid]),
            db.query(query2, pocustid)
        ]);

        if (results1[0].length > 0 || results2[0].length > 0) {
            const finalObject = {
                pocustomer: results1[0][0],
                contactPer: results2[0][0]
            }
            return res.status(200).send(finalObject);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error fetching po customer by id', err);
        return res.status(500).send({ message: 'Error fetching po customer by id', Error: err.message });
    }
};

const updatePoCustomer = async (req, res) => {
    console.log("po up data ", req.body);
    const { branch,
        cust_code,
        cust_id,
        cust_name,
        address,
        mobileno,
        email,
        vendor_code,
        gst_no,
        gst_no_date,
        state,
        state_code,
        city,
        pan_no,
        cin_no, pincode,
        contactPersons, pocustid } = req.body

    const query = 'call updatepocustomer(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@message,?,?,?,?,?,?,?,?,?,?,?)';

    try {
        const [results] = await db.query(query, [
            pocustid,
            cust_name,
            address,
            mobileno, "",
            gst_no,
            city,
            email,
            vendor_code,
            0, "", "", "", "", "", //contact person data
            state,
            state_code,
            cust_code,
            gst_no_date,
            pan_no,
            cin_no,
            cust_id,
            "", "", "", pincode
        ])
        console.log("add gst result", results);
        if (pocustid != 0 && Array.isArray(contactPersons)) {
            const query2 = `call insertPoCustContPer(?,?,?,?,?,?,?,?,?,?,?)`;
            const promises = contactPersons.map(contact => {
                return db.query(query2, [pocustid, contact.contactP_name, contact.billing_address, contact.designation, contact.email,
                    contact.mobileno, contact.contactP_gstNo, contact.contactP_date, contact.contactP_stateCode, contact.payment_terms, contact.contactP_state]);
            });
            try {
                await Promise.all(promises);
                console.log('All contact persons added successfully');
            } catch (error) {
                console.error('Error adding contact persons', error);
            }

        }
        return res.status(200).send(results[0])
    } catch (error) {
        res.status(500).send({ message: "Error while add GST master", error: error.message })
        console.log(error);
    }
};

const deletePoCustomer = async (req, res) => {
    // console.log("part del data : ", req.body);
    const newarr = req.body
    const delData = []

    const query = 'call delete_pocustomer(?,@message)';

    try {
        for (let i = 0; i < newarr.length; i++) {
            const [result] = await db.query(query, newarr[i])
            if (result[0][0].message.length > 0) {
                delData.push(result[0][0].message)
            }
        }
        return res.status(200).send(delData)
    } catch (error) {
        res.status(500).send({ message: "Error while delete part no", error: error.message })
        console.log(error);
    }
};


// For Part No.
const getPartNoList = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const start_index = page + 1;
    const counts = pageSize;
    console.log(start_index,counts)
    const query = 'call getallpartnumberpage(?,?)';

    try {
        const [results] = await db.query(query, [start_index, counts])

        let partno = results[0];

        const total = results.length > 0 ? results[0][0]['@totc'] : 0;
    
        partno = partno.map(partno => ({
            ...partno,
            consignorname: partno.consignorname ? partno.consignorname.toUpperCase() : '',
            consignor_partnumber: partno.consignor_partnumber ? partno.consignor_partnumber.toUpperCase() : '',
            consignee_partnumber: partno.consignee_partnumber ? partno.consignee_partnumber.toUpperCase() : '',
            consignee_name: partno.consigneename ? partno.consigneename.toUpperCase() : '',

        }));
    
        return res.json({
            partno,
            total
        });

    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};
const getPartNoListBySerach = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = page * pageSize;
    const searchTerm = req.query.search || null;
    
    const query = 'call getallpartnumbersearchpage(?);';

    try {
        const [results] = await db.query(query, [searchTerm]);

        let partno = results[0];

        const total = partno.length;
        partno = partno.map(partno => ({
            ...partno,
            consignorname: partno.consignorname ? partno.consignorname.toUpperCase() : '',
            consignor_partnumber: partno.consignor_partnumber ? partno.consignor_partnumber.toUpperCase() : '',
            consignee_partnumber: partno.consignee_partnumber ? partno.consignee_partnumber.toUpperCase() : '',
            consignee_name: partno.consignee_name ? partno.consignee_name.toUpperCase() : '',

        }));
                const paginatedArticles = partno.slice(offset, offset + pageSize);

        return res.json({
            partno:paginatedArticles,
            total
        });

    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};
const getAllPartNoList = async (req, res) => {
    const query = 'call getallpartnumber();';

    try {
        const [results] = await db.query(query)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error fetching Customer List', err);
        return res.status(500).send({ message: 'Error fetching Customer List', Error: err.message });
    }
};
const addPartNo = async (req, res) => {
    // console.log("part no data ", req.body);
    const { branch, consignor_name, part_no, consineePartNo } = req.body

    const query = 'call insertpartnumbermaster(?,?,@message,@inserted_id)';

    try {
        const [results] = await db.query(query, [part_no, consignor_name])
        console.log("add partno result", results);
        const inserted_id = results[1][0].inserted_id;
        if (inserted_id != 0 && Array.isArray(consineePartNo)) {
            const partnoId = inserted_id;
            const query2 = `call insertpartnumberdetails(?,?,?,?)`;
            const promises = consineePartNo.map(part => {
                return db.query(query2, [partnoId, part.consinee_id, part.description, part.consinee_partno]);
            });
            try {
                await Promise.all(promises);
                // console.log('All consinee part added successfully');
            } catch (error) {
                console.error('Error adding consinee part', error);
            }

        }
        return res.status(200).send(results[0])
    } catch (error) {
        res.status(500).send({ message: "Error while add part no", error: error.message })
        console.log(error);
    }
};

const getPartNoById = async (req, res) => {
    const partnoid = req.params.partnoid

    const query1 = 'call findpartnumberbyid(?)';
    const query2 = 'call findpartnumberdetailsbyid(?)';

    try {
        const [results1, results2] = await Promise.all([
            db.query(query1, partnoid),
            db.query(query2, partnoid)
        ]);

        if (results1[0].length > 0 || results2[0].length > 0) {
            const finalObject = {
                partNo: results1[0][0],
                details: results2[0][0]
            }
            return res.status(200).send(finalObject);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error fetching part no by id', err);
        return res.status(500).send({ message: 'Error fetching part no by id', Error: err.message });
    }

};

const updatePartNo = async (req, res) => {
    // console.log("part no data ", req.body);
    const { branch, consignor_name, part_no, partnoid, consineePartNo } = req.body

    const query = 'call updatepartnumber(?,?,@up_message,?)';

    try {
        const [results] = await db.query(query, [part_no, consignor_name, partnoid])
        console.log("update partno result", results);
        if (partnoid != 0 && Array.isArray(consineePartNo)) {
            const query2 = `call insertpartnumberdetails(?,?,?,?)`;
            const promises = consineePartNo.map(part => {
                return db.query(query2, [partnoid, part.consinee_id, part.description, part.consinee_partno]);
            });
            try {
                await Promise.all(promises);
                // console.log('All consinee part update successfully');
            } catch (error) {
                console.error('Error updating consinee part', error);
            }
        }
        return res.status(200).send(results[0])
    } catch (error) {
        res.status(500).send({ message: "Error while update part no", error: error.message })
        console.log(error);
    }
};

const deletePartNo = async (req, res) => {
    // console.log("part del data : ", req.body);
    const newarr = req.body
    const delData = []

    const query = 'call delete_partno_master(?,@message)';

    try {
        for (let i = 0; i < newarr.length; i++) {
            const [result] = await db.query(query, newarr[i])
            if (result[0][0].message.length > 0) {
                delData.push(result[0][0].message)
            }
        }
        return res.status(200).send(delData)
    } catch (error) {
        res.status(500).send({ message: "Error while delete part no", error: error.message })
        console.log(error);
    }
};


// For GST master
const getGSTmasterList = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const start_index = page + 1;
    const counts = pageSize;
    const searchTerm = req.query.search || null;
    const query = 'call getallgstmasterpage(?,?,?)';

    try {
        const [results] = await db.query(query, [start_index, counts, 30])

        let gstmaster = results[0];
  
        const total = results.length > 0 ? results[0][0]['@totc'] : 0;
    
        if (searchTerm) {
            gstmaster = gstmaster.filter(gstmaster =>
                (gstmaster.state && gstmaster.state.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (gstmaster.taxRate && gstmaster.taxRate.toLowerCase().includes(searchTerm.toLowerCase())) || 
                (gstmaster.gstCategory && gstmaster.gstCategory.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (gstmaster.sacCode && gstmaster.sacCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (gstmaster.remarks && gstmaster.remarks.toLowerCase().includes(searchTerm.toLowerCase())) 
                
            );
        }

        
        gstmaster = gstmaster.map(gstmaster => ({
            ...gstmaster,
            state: gstmaster.state.toUpperCase(),
            gstCategory: gstmaster.gstCategory.toUpperCase(),
            remarks: gstmaster.remarks.toUpperCase()

        }));
        

      return  res.json({
        gstmaster,
            total: total
        });

    } catch (err) {
        console.error('Error:', err);
        return  res.status(500).send('Server error');
    }
};
const getAllgstmaster = async (req, res) => {
    const query = 'call getallgstmaster(30);';

    try {
        const [results] = await db.query(query)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error fetching Customer List', err);
        return res.status(500).send({ message: 'Error fetching Customer List', Error: err.message });
    }
};
const addGSTmaster = async (req, res) => {
    // console.log("gst data ", req.body);
    const {
        branch, state, state_code, gst_name, wef_date, end_date, rate, gst_rate_category,
        gst_category, sac_code, type, igst, igst_posting_output, igst_posting_input,
        cgst, cgst_posting_output, cgst_posting_input,
        sgst, sgst_posting_output, sgst_posting_input, remarks
    } = req.body

    const query = 'call addgstmaster(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@res_code,@message,?)';

    try {
        const [results] = await db.query(query, [
            state, state_code, gst_name,
            wef_date, end_date, rate,
            gst_category, gst_rate_category, sac_code,
            type, igst, igst_posting_output,
            igst_posting_input, cgst, cgst_posting_output,
            cgst_posting_input, sgst, sgst_posting_output,
            sgst_posting_input, remarks, branch
        ])
        console.log("add gst result", results);
        return res.status(200).send(results[0])
    } catch (error) {
        res.status(500).send({ message: "Error while add GST master", error: error.message })
        console.log(error);
    }
};

const getGSTmasterById = async (req, res) => {
    const gstmid = req.params.gstmid

    const query = 'call getgstmasterbyid(?)';

    try {
        const [results] = await db.query(query, gstmid)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error fetching gst master by id', err);
        return res.status(500).send({ message: 'Error fetching gst master by id', Error: err.message });
    }
};


const updateGSTmaster = async (req, res) => {
    console.log("gst data ", req.body);
    const {
        branch, state, state_code, gst_name, wef_date, end_date, rate, gst_rate_category,
        gst_category, sac_code, type, igst, igst_posting_output, igst_posting_input,
        cgst, cgst_posting_output, cgst_posting_input,
        sgst, sgst_posting_output, sgst_posting_input, remarks, gstmid
    } = req.body

    const query = 'call updategstmaster(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@message,?)';

    try {
        const [results] = await db.query(query, [
            state, state_code, gst_name,
            wef_date, end_date, rate,
            gst_category, gst_rate_category, sac_code,
            type, igst, igst_posting_output,
            igst_posting_input, cgst, cgst_posting_output,
            cgst_posting_input, sgst, sgst_posting_output,
            sgst_posting_input, remarks, gstmid, branch
        ])
        // console.log("update gstm result", results);
        return res.status(200).send(results[0])
    } catch (error) {
        res.status(500).send({ message: "Error while update TDS master", error: error.message })
        console.log(error);
    }
};

const deleteGSTmaster = async (req, res) => {
    // console.log("gst del data : ", req.body);
    const newarr = req.body
    const delData = []

    const query = 'call deletegstmaster(?,@message)';

    try {
        for (let i = 0; i < newarr.length; i++) {
            const [result] = await db.query(query, newarr[i])
            if (result[0][0].message.length > 0) {
                delData.push(result[0][0].message)
            }
        }
        return res.status(200).send(delData)
    } catch (error) {
        res.status(500).send({ message: "Error while delete tds master", error: error.message })
        console.log(error);
    }
};



// For TDS master

const getTDSmasterList = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const start_index = page + 1;
    const counts = pageSize;
    const searchTerm = req.query.search || null;
    const query = 'call getalltdsmasterpage(?,?)';

    try {
        const [results] = await db.query(query, [start_index, counts])

        let tdsmaster = results[0];
  console.log(tdsmaster)
        const total = results.length > 0 ? results[0][0]['@totc'] : 0;
    
        if (searchTerm) {
            tdsmaster = tdsmaster.filter(tdsmaster =>
                (tdsmaster.name && tdsmaster.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (tdsmaster.code && tdsmaster.code.toLowerCase().includes(searchTerm.toLowerCase())) || 
                (tdsmaster.section && tdsmaster.section.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (tdsmaster.status && tdsmaster.status.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (tdsmaster.applicable_from && tdsmaster.applicable_from.toLowerCase().includes(searchTerm.toLowerCase())) 
                
            );
        }

        
        tdsmaster = tdsmaster.map(tdsmaster => ({
            ...tdsmaster,
            name: tdsmaster.name.toUpperCase(),
            code: tdsmaster.code.toUpperCase(),
            section: tdsmaster.section.toUpperCase(),
            status: tdsmaster.status.toUpperCase(),
           
        }));
        

      return  res.json({
        tdsmaster,
            total: total
        });

    } catch (err) {
        console.error('Error:', err);
        return  res.status(500).send('Server error');
    }
};
const getAllTDSmasterList = async (req, res) => {
    const query = 'call getalltdsmaster();';

    try {
        const [results] = await db.query(query)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error fetching Customer List', err);
        return res.status(500).send({ message: 'Error fetching Customer List', Error: err.message });
    }
};
const addTDSmaster = async (req, res) => {
    console.log("tds data ", req.body);
    const { tdsName, tdsCode, tdsSection, tdsStatus, wefDate, basic_exemption, basic_rate_with_pan, basic_rate_without_pan } = req.body.tdsData

    const query = 'call addtdsmaster(?,?,?,?,?,?,?,?,@res_code,@message)';

    try {
        const [results] = await db.query(query, [
            tdsName,
            tdsCode,
            tdsSection,
            tdsStatus,
            wefDate,
            basic_exemption,
            basic_rate_with_pan,
            basic_rate_without_pan
        ])
        console.log("add tds result", results);
        return res.status(200).send(results[0])
    } catch (error) {
        res.status(500).send({ message: "Error while add TDS master", error: error.message })
        console.log(error);
    }
};

const getTDSmasterById = async (req, res) => {
    const tdsmid = req.params.tdsmid
    const query = 'call gettdsmasterbyid(?)';

    try {
        const [results] = await db.query(query, tdsmid)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error fetching tds master by id', err);
        return res.status(500).send({ message: 'Error fetching tds master by id', Error: err.message });
    }
};

const updateTDSmaster = async (req, res) => {
    console.log("tds data ", req.body);
    const { tdsmid, tdsName, tdsCode, tdsSection, tdsStatus, wefDate, basic_exemption, basic_rate_with_pan, basic_rate_without_pan } = req.body.tdsData

    const query = 'call updatetdsmaster(?,?,?,?,?,?,?,?,@message,?)';

    try {
        const [results] = await db.query(query, [
            tdsName,
            tdsCode,
            tdsSection,
            tdsStatus,
            wefDate,
            basic_exemption,
            basic_rate_with_pan,
            basic_rate_without_pan,
            tdsmid
        ])
        console.log("update vt result", results);
        return res.status(200).send(results[0])
    } catch (error) {
        res.status(500).send({ message: "Error while update TDS master", error: error.message })
        console.log(error);
    }
};

const deleteTDSmaster = async (req, res) => {
    // console.log("tds data : ", req.body);
    const newarr = req.body
    const delData = []

    const query = 'call deletetdsmaster(?,@message)';

    try {
        for (let i = 0; i < newarr.length; i++) {
            const [result] = await db.query(query, newarr[i])
            if (result[0][0].message.length > 0) {
                delData.push(result[0][0].message)
            }
        }
        return res.status(200).send(delData)
    } catch (error) {
        res.status(500).send({ message: "Error while delete tds master", error: error.message })
        console.log(error);
    }
};

const updateFlagStatus = async (req, res) => {
    // console.log("flag : ", req.body);
    const { id, status, name, colname } = req.body
    let query;

    if (status == 1) {
        query = `update ${name} set flagStatus=0 where ${colname} = ${id}`
    } else {
        query = `update ${name} set flagStatus=1 where ${colname} = ${id}`
    }
    try {
        const [result] = await db.query(query)
        // console.log("up res : ", result);

        return res.status(200).send(result[0])
    } catch (error) {
        res.status(500).send({ message: "Error while editing articles", error: error.message })
        console.log(error);
    }

}


module.exports = {
    // for articles
    getArticleList,
    addArticle,
    deleteArticle,
    findArticleById,
    updateArticle,
    getallArticleList,

    // for places
    getAllPlacesList,
    getPlacesList,
    getCustomersList,
    addPlaces,
    deletePlace,
    findPlaceById,
    updatePlace,

    // for branches
    getBranchesList,
    getAllBranchesList,
    addBranch,
    findBranchById,
    updateBranch,
    deleteBranch,

    // for customers
    getCustomerListByPage,
    getAllCustomerList,
    getCustomerListBySerach,
    addCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer,

    // for drivers
    getDriversList,
    getAllDrivers,
    getAllDriversserach,
    getDriverById,
    addDriver,
    updateDriver,
    deleteDriver,

    // for employee
    getAllEmployeeList,
    getEmployeeList,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee,

    // For transporter
    getTransporterList,
    getAllTransporterList,
    addTransporter,
    findTransporterById,
    updateTransporter,
    deleteTransporter,

    // For vehicle
    getVehicleList,
    getAllVehicleserach,
    getALLVehicleList,
    getTransporterData,
    getVehicleById,
    addvehicle,
    updateVehicle,
    deleteVehicle,

    // for vehicle type
    getVehicleTypeList,
    getAllVehicleTypeList,
    addvehicletype,
    findVehicleTypeById,
    updateVehicleType,
    deleteVehicleType,

    // For PO Customer
    getPoCustomersList,
    getPoCustomerListBySerach,
    getAllPoCustomerList,
    addPoCustomer,
    getPoCustomerById,
    updatePoCustomer,
    deletePoCustomer,

    // For part no.
    getPartNoList,
    getAllPartNoList,
    getPartNoListBySerach,
    addPartNo,
    getPartNoById,
    updatePartNo,
    deletePartNo,

    // For GST master
    getGSTmasterList,
    getAllgstmaster,
    getGSTmasterById,
    addGSTmaster,
    updateGSTmaster,
    deleteGSTmaster,

    // For TDS master
    getTDSmasterList,
    addTDSmaster,
    getAllTDSmasterList,
    getTDSmasterById,
    updateTDSmaster,
    deleteTDSmaster,

    // Update flagStatus for all master sub-tab
    updateFlagStatus,
}