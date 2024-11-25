const db = require("../config/dbConfig");
const fs = require('fs').promises;
const pdf = require("html-pdf");
const path = require("path");
const nodemailer = require('nodemailer');
const pool = require("../config/dbConfig");
const getallmasterforlr = async (req, res) => {
  const query = 'call getallmasterforlr()';

  try {
      const [results] = await db.query(query)

      if (results[0].length > 0) {
        //console.log(results)
          return res.status(200).send({
            customer:results[0],
            place:results[1],
            branch:results[2],
            vehicle:results[3],
            articles:results[4]
          });
      } else {
          console.log('No data found');
          return res.status(404).send({ message: 'No data found' });
      }
  } catch (err) {
      console.error('Error getting place List', err);
      return res.status(500).send({ message: 'Error getting customers List', Error: err.message });
  }
};
const addlrmaster = (req, res) => {
  const {
    lrNo,
    date,
    transportmode,
    vehicleno,
    consignor,
    consignorAddress,
    from,
    consignee,
    consigneeAddress,
    to,
    freightdetails,
    BillingDetails,
    in_user_id,
    in_branch,
  } = req.body;
   //const branch=in_branch.branch_id ? in_branch.branch_id : 10;
   const branch=in_branch.branch_id || null
   //console.log(branch) 
  const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const {
    Freight,
    ExtCharges,
    VaraiHamali,
    Collection,
    DoorDelivery,
    WeightChar,
    Other,
    Statistical,
    SubTotal,
    IGST,
    CGST,
    SGST,
    Total
  } = freightdetails;
  const {
    DelvType,
    DelvDays,
    WeightType,
    Paybill,
    ToBilled,
    CollectAt,
    Remark
  }=BillingDetails
// if(branch == null || branch == '' || branch == undefined){
//   return res.status(500).send('Branch cannot be empty');
// }
  const formattedDate = date ? new Date(date).toISOString().slice(0, 19).replace('T', ' ') : currentTime;
  const in_lr_no = lrNo ? lrNo : null;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).send('Server error');
    }
    connection.beginTransaction(err => {
      if (err) {
        console.error('Error beginning transaction:', err);
        connection.release();
        return res.status(500).send('Server error');
      }
      const addLrMasterSp = `
        CALL insert_lr_master(
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,@message,@inserted_id, ?, ?
        )
      `;

      connection.query(addLrMasterSp, [
        in_lr_no, formattedDate, vehicleno,consignor, consignorAddress,consignee,consigneeAddress,from,to,branch,Freight,ExtCharges,
        VaraiHamali,Collection,DoorDelivery,WeightChar,Other,Statistical,SubTotal,IGST,null,CGST,null,SGST,null,Total,DelvType,DelvDays,
        WeightType,Paybill,ToBilled,CollectAt,Remark,null,null,1,transportmode
      ], (err, results) => {
        if (err) {
          console.error('Error executing stored procedure:', err);
          return connection.rollback(() => {
            connection.release();
            return res.status(500).send('Server error');
          });
        }
        const { message, inserted_id } = results[0][0];
        return res.json({ message, inserted_id });
        // const lrdata = rows.map(row => [
        //   row.id, row.Article, row.Company, row['Invoice No'], row['No of article'], row.Weight,
        //   row.fPlace, row.fPayment, row.Remark, inserted_id
        // ]);

        // const insertTransactionsQuery = `
        //   INSERT INTO transactions_lr (sr_no, description, articles, no_of_articles, actual_wt, char_wt,
        //     rate_per, rate, inv_amt, lr_master_id)
        //   VALUES ?
        // `;

        // connection.query(insertTransactionsQuery, [lrdata], (err, results) => {
        //   if (err) {
        //     console.error('Error inserting LR transactions:', err);
        //     return connection.rollback(() => {
        //       connection.release();
        //       return res.status(500).send('Server error');
        //     });
        //   }
        //   connection.commit(err => {
        //     if (err) {
        //       console.error('Error committing transaction:', err);
        //       return connection.rollback(() => {
        //         connection.release();
        //         return res.status(500).send('Server error');
        //       });
        //     }

        //     connection.release();
         
        //     return res.json({ message, inserted_id });
        //   });
        // });
      });
    });
  });
};
  module.exports = {
    getallmasterforlr,
    addlrmaster
  };