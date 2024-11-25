const db = require("../config/dbConfig");

const getallRateMaster = (req, res) => {
    // Assuming req.body.branch contains the branch parameter, or null if not provided
    const branch =  null;

    const query = 'CALL getallratemaster()';
    
    try {
        db.query(query,  (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            console.log(results[0]);
          return  res.json(results[0]);
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};
const getallRateMasters = (req, res) => {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const offset = page * pageSize;
    const searchTerm = req.query.search; 
    const query = 'CALL getallratemaster()';
    
    try {
        db.query(query,  (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }
            let ratemaster = results[0];

            if (searchTerm) {
                ratemaster = ratemaster.filter(place => 
                    
                    (ratemaster.articles_name && ratemaster.articles_name.toLowerCase().includes(searchTerm.toLowerCase())) || 
                    (ratemaster.rate && ratemaster.rate.toLowerCase().includes(searchTerm.toLowerCase()))
                );
            }

            ratemaster.reverse(); 

            const total = ratemaster.length;
            ratemaster = ratemaster.map(ratemaster => ({
                ...ratemaster,
            
                articles_name: ratemaster.articles_name ? ratemaster.articles_name.toUpperCase() : null,
                rate: ratemaster.rate ? ratemaster.rate.toUpperCase() : null
            }));
            const paginatedPlaces = ratemaster.slice(offset, offset + pageSize);

           return res.json({
                ratemaster: paginatedPlaces,
                total: total
            });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};
 const getRateMasterbyid = (req, res) => {
   // const id = '1';
   
     const id = req.params.id.toString(); 

    const query = 'CALL getratemasterbyid(?)';

    try {
        db.query(query, id, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }
            console.log(results[0]);
         return   res.json(results[0]);
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};


const AddRateMaster = (req, res) => {
    
 const {
    customer,
    article,
    fromStation,
    toStation,
    rate,
    userid,
    branch,
     record_date 
 }=req.body
    const query = `
        SET @message = '';
        CALL addratemaster(?, ?, ?, ?, ?, ?, ?, ?, @message);
        SELECT @message as message;
    `;

    try {
        db.query(query, [
            customer,
            article,
            fromStation,
            toStation,
            rate,
            userid,
            branch,
            record_date
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



const UpdateRateMaster = (req, res) => {

   const id= req.params.id

   const {
    customer,
    article,
    fromStation,
    toStation,
    rate,
    userid,
    branch,
     record_date 
 }=req.body
    const query = `
        SET @message = '';
        CALL updateratemaster(?, ?, ?, ?, ?, ?, ?, ?,?, @message);
        SELECT @message as message;
    `;

    try {
        db.query(query, [
            id,
            customer,
            article,
            fromStation,
            toStation,
            rate,
            userid,
            branch,
            record_date,
            
        ], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            // Extract the message from the results
            const message = results;
            console.log(`Message: ${message}`);
           return res.json({ message });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};




const deleteratemaster= (req, res) => {
    //const id = "1"; 
const id=req.params.id.toString()
    const query = `
        SET @message = '';
        CALL deleteratemaster(?, @message);
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
           return res.json({ message });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};

  module.exports = {
    getallRateMaster,
    getRateMasterbyid,
    UpdateRateMaster,
    deleteratemaster,
    AddRateMaster,
    getallRateMasters
  };