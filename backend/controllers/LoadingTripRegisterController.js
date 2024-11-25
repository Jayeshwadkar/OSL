const db = require("../config/dbConfig");


const getlslistforreportbydate = (req, res) => {
  const branch = req.params.branch;
  const formattedFromDate = req.query.formattedFromDate; 
  const formattedToDate =req.query.formattedToDate; 
  const page = parseInt(req.query.page) || 0;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const searchTerm = req.query.search ? req.query.search.toLowerCase() : '';
  const consignorSearchTerm = req.query.consignor ? req.query.consignor.toLowerCase() : '';
  const lrnoSearchTerm = req.query.lrno ? req.query.lrno.toString() : '';
  const offset = page * pageSize;
  const query = 'CALL getlslistforreportbydate(?,?,?)';
  

  try {
    db.query(query, [branch, formattedFromDate, formattedToDate], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Server error');
        return;
      }
      
      let LoadingTripRegister = results[0];

      if (searchTerm) {
        LoadingTripRegister = LoadingTripRegister.filter(item =>
          (item.lr_no && item.lr_no.toString().toLowerCase().includes(searchTerm)) ||
          (item.dc_no && item.dc_no.toLowerCase().includes(searchTerm)) ||
          (item.dc_date && item.dc_date.toLowerCase().includes(searchTerm)) ||
          (item.consigner_name && item.consigner_name.toLowerCase().includes(searchTerm)) ||
          (item.consignee_name && item.consignee_name.toLowerCase().includes(searchTerm)) ||
          (item.from_loc && item.from_loc.toLowerCase().includes(searchTerm)) ||
          (item.to_loc && item.to_loc.toLowerCase().includes(searchTerm)) ||
          (item.pay_type && item.pay_type.toLowerCase().includes(searchTerm)) ||
          (item.no_of_articles && item.no_of_articles.toString().toLowerCase().includes(searchTerm)) ||
          (item.total && item.total.toLowerCase().includes(searchTerm)) ||
          (item.total_weight && item.total_weight.toString().toLowerCase().includes(searchTerm))
        );
      }

      if (consignorSearchTerm) {
        LoadingTripRegister = LoadingTripRegister.filter(item =>
          item.consigner_name && item.consigner_name.toLowerCase().includes(consignorSearchTerm)
        );
      }

      if (lrnoSearchTerm) {
        LoadingTripRegister = LoadingTripRegister.filter(item =>
          item.lr_no && item.lr_no.toString().includes(lrnoSearchTerm)
        );
      }

      const total = LoadingTripRegister.length;
      const paginatedloadingtrip = LoadingTripRegister.slice(offset, offset + pageSize);
     return res.json({
        Loadingtripregister: paginatedloadingtrip,
        total: total
      });
    });
  } catch (err) {
    console.error('Error:', err);
   return res.status(500).send('Server error');
  }
};




  module.exports = {
    getlslistforreportbydate,
  };