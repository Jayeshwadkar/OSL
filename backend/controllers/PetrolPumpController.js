const db = require("../config/dbConfig");

const getallpetrolpumps = (req, res) => {
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  const offset = page * pageSize;
  const searchTerm = req.query.search;
  const query = "CALL getallpetrolpumps()";

  try {
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Server error");
        return;
      }


      let petrolpump = results[0];
      if (searchTerm) {
        petrolpump = petrolpump.filter(
          (petrolpump) =>
            (petrolpump.petrol_pump_name &&
              petrolpump.petrol_pump_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (petrolpump.owner_name &&
              petrolpump.owner_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())),
       ( petrolpump.address &&
            petrolpump.address.toLowerCase().includes(searchTerm.toLowerCase())),
         ( petrolpump.contact_number &&
            petrolpump.contact_number
              .toLowerCase()
              .includes(searchTerm.toLowerCase())),
          (petrolpump.emailid &&
            petrolpump.emailid.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      const total = petrolpump.length;

      petrolpump = petrolpump.map((petrolpump) => ({
        ...petrolpump,
        petrol_pump_name: petrolpump.petrol_pump_name.toUpperCase(),
        address: petrolpump.address.toUpperCase(),
        contact_number: petrolpump.contact_number.toUpperCase(),
        emailid: petrolpump.emailid.toUpperCase(),
        owner_name: petrolpump.owner_name
          ? petrolpump.owner_name.toUpperCase()
          : null,
      }));
      const paginatedpetrolpump = petrolpump.slice(offset, offset + pageSize);
     return res.json({
        petrolpump: paginatedpetrolpump,
        total: total,
      });
    });
  } catch (err) {
    console.error("Error:", err);
  return  res.status(500).send("Server error");
  }
};

const getpetrolpumpbyid = (req, res) => {
  // const id = "1";
  const id = req.params.id;

  const query = "CALL getpetrolpumpbyid(?)";

  try {
    db.query(query, id, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Server error");
        return;
      }
      console.log(results[0]);
     return res.json(results[0]);
    });
  } catch (err) {
    console.error("Error:", err);
   return res.status(500).send("Server error");
  }
};

const insertpetrolpump = (req, res) => {
  // const in_petrol_pump_name = "Sample Petrol Pump";
  // const in_owner_name = "Owner Name";
  // const in_address = "123 Example St";
  // const in_contact_number = "1234567890";
  // const in_emailid = "owner@example.com";
  const { name, ownerName, address, contactNumber, emailId } = req.body;
  console.log(req.body);
  const query = `
        SET @message = '';
        CALL insertpetrolpump(?, ?, ?, ?, ?, @message);
        SELECT @message as message;
    `;

  try {
    db.query(
      query,
      [name, ownerName, address, contactNumber, emailId],
      (err, results) => {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).send("Server error");
          return;
        }

        // Extract the message from the results
        const message = results[1][0].message;
        console.log(`Message: ${message}`);
       return res.json({ message });
      }
    );
  } catch (err) {
    console.error("Error:", err);
   return res.status(500).send("Server error");
  }
};

const updatepetrolpump = (req, res) => {
  // const up_pp_id = 1;
  // const up_petrol_pump_name = "Updated Petrol Pump"; // Updated petrol pump name
  // const up_owner_name = "Updated Owner Name";
  // const up_address = "456 Updated St";
  // const up_contact_number = "9876543210";
  // const up_emailid = "updated@example.com";
  const id=req.params.id
  const { petrol_pump_name, owner_name, address, contact_number, emailid } = req.body;
  console.log(id)
  const query = `
        SET @message = '';
        CALL updatepetrolpump(?, ?, ?, ?, ?, ?, @message);
        SELECT @message as message;
    `;

  try {
    db.query(
      query,
      [
        id,
        petrol_pump_name,
        owner_name,
        address,
        contact_number,
        emailid,
      ],
      (err, results) => {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).send("Server error");
          return;
        }

        // Extract the message from the results
        const message = results[2][0].message;
        console.log(`Message: ${message}`);
       return res.json({ message });
      }
    );
  } catch (err) {
    console.error("Error:", err);
   return res.status(500).send("Server error");
  }
};

const deletepetrolpump = (req, res) => {
  const id = req.params.id;

  const query = `
        CALL deletepetrolpump(?, @message);
        SELECT @message as message;
    `;

  try {
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Server error");
        return;
      }

      // Extract the message from the results
      const message = results[1][0].message;
      console.log(`Message: ${message}`);
     return res.json({ message });
    });
  } catch (err) {
    console.error("Error:", err);
   return res.status(500).send("Server error");
  }
};

module.exports = {
  getallpetrolpumps,
  getpetrolpumpbyid,
  updatepetrolpump,
  deletepetrolpump,
  insertpetrolpump,
};
