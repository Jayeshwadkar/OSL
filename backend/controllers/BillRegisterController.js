const db = require("../config/dbConfig");


const getbilllistforreportbydate = (req, res) => {
  const branch = req.params.branch;
  const formattedFromDate = req.query.formattedFromDate;
  const formattedToDate = req.query.formattedToDate;
  const page = parseInt(req.query.page) || 0;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const searchTerm = req.query.search ? req.query.search.toLowerCase() : '';
  const consignorSearchTerm = req.query.consignor ? req.query.consignor.toLowerCase() : '';
  const offset = page * pageSize;
  const query = 'CALL getbilllistforreportbydate(?,?,?)';

  try {
      db.query(query, [branch, formattedFromDate, formattedToDate], (err, results) => {
          if (err) {
              console.error('Error executing query:', err);
              res.status(500).send('Server error');
              return;
          }

          let BillRegister = results[0].map(result => ({
              id: result.id,
              bill_no: result["CONCAT((SELECT branch_abbreviation FROM branch WHERE branch.branch_id = b.branch),'-',b.bill_no)"],
              bill_date: result.bill_date,
              customer_name: result.customer_name,
              tot_amount: parseFloat(result['IFNULL(b.tot_amount,0)']) // Ensure tot_amount is a number
          }));

          if (consignorSearchTerm) {
              BillRegister = BillRegister.filter(item =>
                  item.customer_name && item.customer_name.toLowerCase().includes(consignorSearchTerm)
              );
          }
          if (searchTerm) {
              BillRegister = BillRegister.filter(item =>
                  (item.bill_no && item.bill_no.toString().toLowerCase().includes(searchTerm)) ||
                  (item.bill_date && item.bill_date.toLowerCase().includes(searchTerm)) ||
                  (item.customer_name && item.customer_name.toLowerCase().includes(searchTerm)) ||
                  (item.tot_amount && item.tot_amount.toString().toLowerCase().includes(searchTerm))
              );
          }

          const total = BillRegister.length;
          const paginatedBillRegister = BillRegister.slice(offset, offset + pageSize);

          // Calculate total amount of filtered bills
          const totalAmount = BillRegister.reduce((sum, item) => sum + item.tot_amount, 0);

          return res.json({
              BillRegisters: paginatedBillRegister,
              total: total,
              totalAmount: totalAmount.toFixed(8) // Ensure the total amount is formatted to 2 decimal places
          });
      });
  } catch (err) {
      console.error('Error:', err);
      return res.status(500).send('Server error');
  }
};





  module.exports = {
    getbilllistforreportbydate,
  };


  