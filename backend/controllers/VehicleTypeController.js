const db = require("../config/dbConfig");

const getallvehicletypes = (req, res) => {
    const branch = null;
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const offset = page * pageSize;
    const searchTerm = req.query.search;
    const query = 'CALL getallvehicletypes()';

    try {
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            let vehicleTypes = results[0];

            // If searchTerm is provided, filter the vehicleTypes array based on the searchTerm
            if (searchTerm) {
                vehicleTypes = vehicleTypes.filter(item => {
                    const vehicleTypeUpperCase = item.vehicle_type.toUpperCase();
                    const tyreQtyUpperCase = item.tyre_qty.toUpperCase();
                    return vehicleTypeUpperCase.includes(searchTerm.toUpperCase()) ||
                        tyreQtyUpperCase.includes(searchTerm.toUpperCase());
                });
            }
            const total = vehicleTypes.length;


            vehicleTypes = vehicleTypes.map(vehicleTypes => ({
                ...vehicleTypes,
                vehicle_type: vehicleTypes.vehicle_type.toUpperCase(),
                tyre_qty: vehicleTypes.tyre_qty ? vehicleTypes.tyre_qty.toUpperCase() : null
            }));
            const paginatedvehicletype = vehicleTypes.slice(offset, offset + pageSize);
            return res.json({
                vehicleTypes: paginatedvehicletype,
                total: total
            });
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};



const getvehicletypebyid = (req, res) => {
    // const id = '1';
    const id = req.params.id;

    const query = 'CALL getvehicletypebyid(?)';

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


const addvehicletype = (req, res) => {
    // const vehicleType = "Boxer"; // Example vehicle type
    // const tyreQuantity = "2";

    const { vehicleType, tyreQuantity, branch } = req.body;

    const query = `
        SET @message = '';
        CALL addvehicletype(?, ?, ?, @message);
        SELECT @message as message;
    `;

    try {
        db.query(query, [
            vehicleType,
            tyreQuantity,
            branch
        ], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            // Extract the message from the results
            const message = results[1][0].message;
            console.log(`Message: ${message}`);
            res.json({ message });
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Server error');
    }
};




const updatevehicletype = (req, res) => {
    const { id } = req.params;
    console.log(id)
    const in_branch = 10;
    const { vehicleType, tyreQuantity } = req.body;
    const query = `
        SET @message = '';
        CALL updatevehicletype(?, ?, ?, ?, @message);
        SELECT @message as message;
    `;

    try {
        db.query(query, [
            id,
            vehicleType,
            tyreQuantity,
            in_branch
        ], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            // Extract the message from the results
            const message = results[2][0].message;
            console.log(`Message: ${message}`);
            res.json({ message });
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};




const deletevehicletype = (req, res) => {
    const id = req.params.id;
    console.log(id)
    const query = `
        SET @message = '';
        CALL deletevehicletype(?, @message);
        SELECT @message as message;
    `;

    try {
        db.query(query, [id], (err, results) => {
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
        console.log(err)
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};

module.exports = {
    getallvehicletypes,
    getvehicletypebyid,
    updatevehicletype,
    deletevehicletype,
    addvehicletype
};