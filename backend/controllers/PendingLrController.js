const db = require("../config/dbConfig");

const getstartdateofyear = (req, res) => {
  const query = "CALL getstartdateofyear(@message)";

  try {
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Server error");
        return;
      }

      db.query("SELECT @message AS message", (err, rows) => {
        if (err) {
          console.error("Error retrieving message:", err);
          res.status(500).send("Server error");
          return;
        }
      return  res.json({ message: rows[0].message });
      });
    });
  } catch (err) {
    console.error("Error:", err);
   return res.status(500).send("Server error");
  }
};

const getpendinglrlistforreportbydefault = (req, res) => {
  const branch = req.params.branch;
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  const offset = page * pageSize;
  const searchTerm = req.query.search; 
  const consignorSearchTerm = req.query.consignor;
  const consigneeSearchTerm = req.query.consignee; 
  const query = "CALL getpendinglrlistforreportbydefault(?)";

  try {
    db.query(query, [branch], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Server error");
        return;
      }
      let pendingLR = results[0];

      // Filter by search term if provided
      if (searchTerm) {
        pendingLR = pendingLR.filter((item) =>
          (item.lr_no && item.lr_no.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.consignor && item.consignor.toLowerCase().includes(searchTerm.toLowerCase())) || 
          (item.lr_date && item.lr_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.consignee && item.consignee.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.no_of_articles && item.no_of_articles.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.weight && item.weight.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      // Filter by consignor if provided
      if (consignorSearchTerm) {
        pendingLR = pendingLR.filter((item) =>
          item.consignor && item.consignor.toLowerCase() === consignorSearchTerm.toLowerCase()
        );
      }

      // Filter by consignee if provided
      if (consigneeSearchTerm) {
        pendingLR = pendingLR.filter((item) =>
          item.consignee && item.consignee.toLowerCase() === consigneeSearchTerm.toLowerCase()
        );
      }

      const total = pendingLR.length;

      // Assign srNo to each item
      pendingLR = pendingLR.map((item, index) => ({
        ...item,
        srNo: index + 1
      }));

      const paginatedpendingLR = pendingLR.slice(offset, offset + pageSize);

     return res.json({
        pendingLR: paginatedpendingLR,
        total: total,
      });
    });
  } catch (err) {
    console.error("Error:", err);
  return  res.status(500).send("Server error");
  }
};



module.exports = {
  getstartdateofyear,
  getpendinglrlistforreportbydefault,
};
