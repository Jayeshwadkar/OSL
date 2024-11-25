const db = require("../config/dbConfig");

const getallVehicleOwener = async (req, res) => {
  const query = "CALL vehicleownerlistdet()";

  try {
    // Execute the stored procedure without any parameters
    const [results] = await db.query(query);

    // Extract the vehicle data from the results
    const vehiclesowner = results[0];

    // Send the formatted vehicle data as a JSON response
    return res.json(vehiclesowner);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Server error");
  }
};

const getallVehicleOweners = (req, res) => {
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  const offset = page * pageSize;
  const searchTerm = req.query.search;
  const query = "CALL getallvehicleowner()";

  try {
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Server error");
        return;
      }
      let vehicleowener = results[0];

      if (searchTerm) {
        vehicleowener = vehicleowener.filter(
          (vehicleowener) =>
            (vehicleowener.vehical_owner_name &&
              vehicleowener.vehical_owner_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (vehicleowener.address &&
              vehicleowener.address
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (vehicleowener.city &&
              vehicleowener.city
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (vehicleowener.emailid &&
              vehicleowener.emailid
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (vehicleowener.telephoneno &&
              vehicleowener.telephoneno
                .toLowerCase()
                .includes(searchTerm.toLowerCase()))
        );
      }

      vehicleowener.reverse();

      const total = vehicleowener.length;
      vehicleowener = vehicleowener.map((vehicleowener) => ({
        ...vehicleowener,
        vehical_owner_name: vehicleowener.vehical_owner_name.toUpperCase(),
        address: vehicleowener.address
          ? vehicleowener.address.toUpperCase()
          : null,
        city: vehicleowener.city ? vehicleowener.city.toUpperCase() : null,
        emailid: vehicleowener.emailid
          ? vehicleowener.emailid.toUpperCase()
          : null,
        telephoneno: vehicleowener.telephoneno
          ? vehicleowener.telephoneno.toUpperCase()
          : null,
      }));
      const paginatedPlaces = vehicleowener.slice(offset, offset + pageSize);

      return res.json({
        vehicleowener: paginatedPlaces,
        total: total,
      });
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Server error");
  }
};

const getVehicleOwenerbyid = (req, res) => {
  //const id = '2049';

  const id = req.params.id.toString();

  const query = "CALL getvehicleownerbyid(?)";
  const contactpersonQuery = "CALL getvocpdetailsbyvoid(?)";

  try {
    db.query(query, id, (err, ownerResults) => {
      if (err) {
        console.error("Error executing owner query:", err);
        res.status(500).send("Server error");
        return;
      }

      const ownerData = ownerResults[0];

      // Execute the contact person query
      db.query(contactpersonQuery, id, (err, contactResults) => {
        if (err) {
          console.error("Error executing contact person query:", err);
          res.status(500).send("Server error");
          return;
        }

        const contactPersonData = contactResults[0];

        // Combine owner data and contact person data
        const responseData = {
          ownerData: ownerData,
          contactPersonData: contactPersonData,
        };

        return res.json(responseData);
      });
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Server error");
  }
};

const AddVehicleOwener = async (req, res) => {
  const {
    ownerName,
    ownerType,
    address,
    city,
    telephone,
    email,
    pan,
    vendorCode,
    vat,
    cst,
    ecc,
    vehicleContacts,
  } = req.body;

  const ownerQuery = `
    SET @message = '';
    CALL addvehicleowner(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @message, ?, ?, ?, ?, ?, @inserted_id);
    SELECT @message as message, @inserted_id as inserted_id;
`;

  const contactQuery = `
    CALL addvocontactpersondetails(?, ?, ?, ?, ?, ?);
`;

  try {
    // Insert vehicle owner details
    const [ownerResults] = await db.promise().query(ownerQuery, [
      ownerName,
      address,
      telephone,
      pan,
      "", // gstno
      ownerType,
      city,
      email,
      vendorCode,
      "0", // branch
      "", // bank
      ecc,
      "", // ifsccode
      vat,
      cst,
    ]);

    // Extract the message and inserted_id from the results
    const message = ownerResults[2][0].message;
    const inserted_id = ownerResults[2][0].inserted_id;
    console.log(`Message: ${message}`);
    console.log(`Inserted ID: ${inserted_id}`);

    // Insert vehicle contacts
    for (const contact of vehicleContacts) {
      const {
        ContactPerson,
        designation,
        email: contactEmail,
        phoneNumber,
        address: contactAddress,
      } = contact;
      await db
        .promise()
        .query(contactQuery, [
          inserted_id,
          ContactPerson,
          contactAddress,
          designation,
          contactEmail,
          phoneNumber,
        ]);
    }

    return res.json({ message, inserted_id });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Server error");
  }
};

const UpdateVehicleOwener = async (req, res) => {
  const id = req.params.id;
  const {
    ownerName,
    ownerType,
    address,
    city,
    telephone,
    email,
    pan,
    vendorCode,
    vat,
    cst,
    ecc,
    vehicleContacts,
  } = req.body;

  const updateOwnerQuery = `
        SET @message = '';
        CALL updatevehicleowner(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @message, ?, ?, ?, ?, ?);
        SELECT @message as message;
    `;

  const updateContactsQuery = `
        CALL addvocontactpersondetails(?, ?, ?, ?, ?, ?);
    `;

  try {
    db.query(
      updateOwnerQuery,
      [
        id,
        ownerName,
        address,
        telephone,
        pan,
        "", // gstno
        ownerType,
        city,
        email,
        vendorCode,
        "0", // branch
        "", // bank
        ecc,
        "", // ifsccode
        vat,
        cst,
      ],
      async (err, results) => {
        if (err) {
          console.error("Error executing owner update query:", err);
          res.status(500).send("Server error");
          return;
        }

        // Extract the message from the results
        const message = results[2][0].message;

        // Update contact persons
        for (const contact of vehicleContacts) {
          const {
            ContactPerson,
            designation,
            email: contactEmail,
            phoneNumber,
            address: contactAddress,
          } = contact;
          await db
            .promise()
            .query(updateContactsQuery, [
              id,
              ContactPerson,
              contactAddress,
              designation,
              contactEmail,
              phoneNumber,
            ]);
        }
        return res.json({ message });
      }
    );
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Server error");
  }
};

const deletevehicleowner = (req, res) => {
  // const id = "2479";
  const id = req.params.id.toString();
  const query = `
        SET @message = '';
        CALL deletevehicleowner(?, @message);
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
  getallVehicleOwener,
  getallVehicleOweners,
  getVehicleOwenerbyid,
  UpdateVehicleOwener,
  deletevehicleowner,
  AddVehicleOwener,
};
