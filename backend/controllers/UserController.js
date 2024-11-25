const db = require("../config/dbConfig");

const getUser = (req, res) => {
    const username = 'Shiroli';
    // const username = req.body.username; 

    const query = 'CALL finduser(?)';

    try {
        db.query(query, username, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            console.log(results[0]);
            res.json(results[0]);
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Server error');
    }
};
const getNewUser = (req, res) => {

    const id = parseInt(req.params.branch);


    const query = 'CALL listnewuser(?)';

    try {
        db.query(query, id, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            console.log(results[0]);
            res.json(results[0]);
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Server error');
    }
};

const getBranches = async (req, res) => {
    const query = 'call findbranch()';

    try {
        const [results] = await db.query(query)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            // console.log('No data found');
            return res.status(404).send({ message: 'No data found' });
        }
    } catch (err) {
        console.error('Error getting place List', err);
        return res.status(500).send({ message: 'Error getting branch List', Error: err.message });
    }
};

const getUserListByBranch = async (req, res) => {
    const branchid = req.params.branchid
    const query = 'call listuserdetails(?)';

    try {
        const [results] = await db.query(query, branchid)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            // console.log('No data found');
            return res.status(200).send(results[0]);
        }
    } catch (err) {
        console.error('Error getting User Details List', err);
        return res.status(500).send({ message: 'Error getting User Details List', Error: err.message });
    }
};

const getEmployeeList = async (req, res) => {
    const branchid = req.params.branchid
    const query = 'call findemployee(?)';

    try {
        const [results] = await db.query(query, 30)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            // console.log('No data found');
            return res.status(200).send(results[0]);
        }
    } catch (err) {
        console.error('Error getting Employee List', err);
        return res.status(500).send({ message: 'Error getting Employee List', Error: err.message });
    }
};

const registerUser = async (req, res) => {
    // console.log(req.body);

    const { branch, userType, employee, username, password } = req.body

    const query = 'call registeruser(?,?,?,?,?,?,@message)';

    try {
        const results = await db.query(query, [username, password, branch, 0, employee, userType])
        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            return res.status(500).send(results);
        }
    } catch (err) {
        console.error('Error while user registration', err);
        return res.status(500).send({ message: 'Error while user registration', Error: err.message });
    }
};

const getUserDetails = async (req, res) => {
    const username = req.params.username
    const query = 'call finduser(?);';

    try {
        const [results] = await db.query(query, username)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            // console.log('No data found');
            return res.status(200).send(results[0]);
        }
    } catch (err) {
        console.error('Error getting User details', err);
        return res.status(500).send({ message: 'Error getting User details', Error: err.message });
    }
};

const updateUserDetails = async (req, res) => {
    console.log(req.body);

    const { branch, userType, employee, username, password, status, id } = req.body

    const query = 'call updateuser(?,?,?,?,?,?,@message,?)';

    try {
        const results = await db.query(query, [username, password, branch, status, employee, userType, id])
        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            return res.status(500).send(results);
        }
    } catch (err) {
        console.error('Error while user registration', err);
        return res.status(500).send({ message: 'Error while user registration', Error: err.message });
    }
};

const activateUser = async (req, res) => {
    const userid = req.params.userid

    const query = 'call activateuser(?,@message)';

    try {
        const [results] = await db.query(query, userid)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            console.log('Error in activate/deactivate user');
            return res.status(200).send(results[0]);
        }
    } catch (err) {
        console.error('Error in activate/deactivate user', err);
        return res.status(500).send({ message: 'Error in activate/deactivate user', Error: err.message });
    }
};

const deleteUser = async (req, res) => {
    const userid = req.params.userid
    // console.log("user id to del :", userid)

    const query = 'call deleteuser(?,@message)';

    try {
        const [results] = await db.query(query, userid)
        // console.log("del result : ", results[0][0].message);
        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            console.log('Error in delete user');
            return res.status(200).send(results[0]);
        }
    } catch (err) {
        console.error('Error in delete user', err);
        return res.status(500).send({ message: 'Error in delete user', Error: err.message });
    }
};


// For Permissions
const getUserPermissions = async (req, res) => {
    const userid = req.params.userid
    const query = 'call finduserpermissions(?)';

    try {
        const [results] = await db.query(query, userid)

        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        } else {
            // console.log('No data found');
            return res.status(200).send(results[0]);
        }
    } catch (err) {
        console.error('Error getting User psermissions', err);
        return res.status(500).send({ message: 'Error getting User psermissions', Error: err.message });
    }
};

const updateUserPermission = async (req, res) => {
    // console.log("data : ", req.body)
    const { checkdata, checkdata1 } = req.body

    const query = 'call update_user_permissions(?, ?, @message)';
    try {
        const [results] = await db.query(query, [`${checkdata}`, checkdata1])
        console.log("up result : ", results);


        if (results.length > 0) {
            return res.status(200).send(results[0]);
        } else {
            console.log('No data found');
            return res.status(200).send(results[0]);
        }
    } catch (err) {
        console.error('Error while update psermissions', err);
        return res.status(500).send({ message: 'Error while update psermissions', Error: err.message });
    }
};


module.exports = {
    getUser,
    getNewUser,

    getBranches,
    getUserListByBranch,
    getEmployeeList,
    registerUser,
    getUserDetails,
    updateUserDetails,
    activateUser,
    deleteUser,

    // For permissions
    getUserPermissions,
    updateUserPermission
};