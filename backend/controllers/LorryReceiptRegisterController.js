const db = require("../config/dbConfig");


const getlrlistforreportbydate = (req, res) => {
  const branch = req.params.branch;
  const formattedFromDate = req.query.formattedFromDate; 
  const formattedToDate = req.query.formattedToDate;
  const page = parseInt(req.query.page, 10);
  const pageSize = parseInt(req.query.pageSize, 10);
  const searchTerm = req.query.search || '';
  const consignorSearchTerm = req.query.consignor || '';
  const paymode = req.query.paymentMode || '';
  const offset = page * pageSize;

  const query = 'CALL getlrlistforreportbydate(?,?,?)';

  try {
    db.query(query, [branch, formattedFromDate, formattedToDate], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Server error');
        return;
      }

      let pendinglr = results[0];

      // Filter by search term
      if (searchTerm) {
        pendinglr = pendinglr.filter((item) =>
          (item.lr_no && item.lr_no.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.lr_date && item.lr_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.consignor && item.consignor.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.consignee && item.consignee.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.from_loc && item.from_loc.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.to_loc && item.to_loc.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.pay_type && item.pay_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.no_of_articles && item.no_of_articles.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.total && item.total.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.weight && item.weight.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      // Filter by consignor
      if (consignorSearchTerm) {
        pendinglr = pendinglr.filter((item) =>
          item.consignor && item.consignor.toLowerCase().includes(consignorSearchTerm.toLowerCase())
        );
      }

      // Filter by payment mode
      if (paymode) {
        pendinglr = pendinglr.filter((item) =>
          item.pay_type && item.pay_type.toLowerCase().includes(paymode.toLowerCase())
        );
      }

      // Add serial numbers
      pendinglr = pendinglr.map((item, index) => ({
        ...item,
        srNo: offset + index + 1
      }));

      const total = pendinglr.length;
      const paginatedpendinglr = pendinglr.slice(offset, offset + pageSize);

    return  res.json({
        pendinglr: paginatedpendinglr,
        total: total
      });
    });
  } catch (err) {
    console.error('Error:', err);
   return res.status(500).send('Server error');
  }
};




  module.exports = {
    getlrlistforreportbydate,
  };