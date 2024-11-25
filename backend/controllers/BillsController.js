const db = require("../config/dbConfig");
const fs = require("fs").promises;
const pdf = require("html-pdf");
const path = require("path");
const numberToWords = require("number-to-words");

// const transporter = require("./LRController");
const nodemailer = require("nodemailer");
const getbillsbybranch = (req, res) => {
  const branch = req.params.branch;
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  const offset = page * pageSize;

  const query = "CALL getbillsbybranch(?)";

  try {
    db.query(query, branch, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Server error");
        return;
      }

      let billsbybranch = results[0];

      const total = billsbybranch.length;
      const paginatedbillsbybranch = billsbybranch.slice(
        offset,
        offset + pageSize
      );
      return res.json({
        billsbybranch: paginatedbillsbybranch,
        total: total,
      });
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Server error");
  }
};

const getbillbyid = (req, res) => {
  const id = req.params.id;
  const queryBill = "CALL getbillbyid(?)";
  const queryBillDetails = `SELECT bd.id, bd.bill_id, bd.lr_id, CONCAT(branch.branch_abbreviation, "-", lm.lr_no) AS lrno, 
       COALESCE(bd.freight, 0) AS freight, COALESCE(bd.hamali, 0) AS hamali, 
       COALESCE(bd.collection, 0) AS collection, COALESCE(bd.door_delivery, 0) AS door_delivery, 
       COALESCE(bd.wt_charges, 0) AS wt_charges, COALESCE(bd.other_ch, 0) AS other_ch, 
       COALESCE(bd.statistics, 0) AS statistics, COALESCE(bd.total, 0) AS total, 
       bd.gstn, bd.gstpayby, fplace.place_name AS from_place, tplace.place_name AS to_place, 
       DATE_FORMAT(lm.lr_date, "%d-%m-%Y") AS lrdate, 
       fcust.customer_name AS consigner_name, tcust.customer_name AS consignee_name,
       lm.consigner AS consigner_id, 
       lm.pay_type ,
       SUM(COALESCE(tlr.actual_wt, 0)) AS total_actual_weight, 
       SUM(COALESCE(tlr.no_of_articles, 0)) AS total_articles, 
       COALESCE(bd.gst_amount, 0) AS gst_amount
FROM bill_details bd 
INNER JOIN lorry_reciept_master lm ON lm.id = bd.lr_id 
INNER JOIN transactions_lr tlr ON tlr.lr_master_id = lm.id
LEFT JOIN place fplace ON fplace.place_id = lm.loc_from 
LEFT JOIN place tplace ON tplace.place_id = lm.loc_to 
LEFT JOIN customer fcust ON fcust.customer_id = lm.consigner 
LEFT JOIN customer tcust ON tcust.customer_id = lm.consignee 
LEFT JOIN branch ON branch.branch_id = lm.branch
WHERE bd.bill_id = ?
GROUP BY lm.id`;
  const getLocQuery = `
    SELECT loc_from, loc_to
    FROM lorry_reciept_master
    WHERE id = ?
  `;
  const getPlaceNameQuery = `
    SELECT place_id, place_name
    FROM place
    WHERE place_id = ?
  `;

  db.query(queryBill, [id], (err, billResults) => {
    if (err) {
      console.error("Error executing bill query:", err);
      res.status(500).send("Server error");
      return;
    }

    if (billResults.length === 0) {
      res.status(404).send("Bill not found");
      return;
    }

    const bill = billResults[0][0];

    db.query(queryBillDetails, [id], (err, billDetailsResults) => {
      if (err) {
        console.error("Error executing bill details query:", err);
        res.status(500).send("Server error");
        return;
      }

      if (billDetailsResults.length === 0) {
        res.status(404).send("Bill details not found");
        return;
      }
      console.log(billDetailsResults);
      const billDetails = billDetailsResults;
      const lr_id = billDetails[0].lr_id; // Assuming lr_id is a property of billDetails

      // Fetch loc_from and loc_to details from lorry_reciept_master
      db.query(getLocQuery, [lr_id], (err, locResults) => {
        if (err) {
          console.error("Error executing getLocQuery:", err);
          res.status(500).send("Server error");
          return;
        }

        if (locResults.length === 0) {
          res.status(404).send("Lorry receipt not found");
          return;
        }

        const loc_from = locResults[0].loc_from;
        const loc_to = locResults[0].loc_to;

        // Fetch place_name for loc_from and loc_to
        db.query(getPlaceNameQuery, [loc_from], (err, locFromResult) => {
          if (err) {
            console.error(
              "Error executing getPlaceNameQuery for loc_from:",
              err
            );
            res.status(500).send("Server error");
            return;
          }

          if (locFromResult.length === 0) {
            res.status(404).send("Location from not found");
            return;
          }

          const loc_from_name = locFromResult[0].place_name;

          db.query(getPlaceNameQuery, [loc_to], (err, locToResult) => {
            if (err) {
              console.error(
                "Error executing getPlaceNameQuery for loc_to:",
                err
              );
              res.status(500).send("Server error");
              return;
            }

            if (locToResult.length === 0) {
              res.status(404).send("Location to not found");
              return;
            }

            const loc_to_name = locToResult[0].place_name;

            // Add loc_from and loc_to fields to billDetails
            billDetails.loc_from = loc_from;
            billDetails.loc_to = loc_to;

            // Add location details to the bill object
            bill.details = {
              loc_from_name: loc_from_name,
              loc_to_name: loc_to_name,
            };

            // Include billDetailsResults along with other details in the response
            bill.billDetailsResults = billDetailsResults[0];

            return res.json(bill);
          });
        });
      });
    });
  });
};

const addbillmaster = (req, res) => {
  const {
    bill_no,
    in_bill_date,
    bill_type,
    customer_id,
    tot_freight,
    tot_hamali,
    service_ch,
    del_char,
    other_ch,
    demurage,
    tds,
    tot_tax,
    tot_amount,
    remarks,
    in_fileloc,
    branch,
    user_id,
    bill_details,
  } = req.body;

  const validTotTax = tot_tax ? tot_tax : "0";

  let query;
  if (!bill_no) {
    query = `
            SET @message = '';
            SET @inserted_id = 0;
            CALL add_bill_master_auto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @message, @inserted_id);
            SELECT @message as message, @inserted_id as inserted_id;
        `;
  } else {
    query = `
            SET @message = '';
            SET @inserted_id = 0;
            CALL add_bill_master(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @message, @inserted_id);
            SELECT @message as message, @inserted_id as inserted_id;
        `;
  }

  const parameters = [
    bill_no,
    in_bill_date,
    bill_type,
    customer_id,
    tot_freight,
    tot_hamali,
    service_ch,
    del_char,
    other_ch,
    demurage,
    tds,
    validTotTax,
    tot_amount,
    remarks,
    in_fileloc,
    branch,
    user_id,
  ];

  db.query(query, parameters, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Server error" });
    }

    let message, inserted_id;

    if (results && results[2] && results[2][0]) {
      message = results[2][0].message;
    }

    if (results && results[3] && results[3][0]) {
      inserted_id = results[3][0].inserted_id;
    }

    if (bill_details && bill_details.length > 0) {
      const detailQuery = `
                CALL add_bill_details(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;

      const promises = bill_details.map((detail) => {
        return new Promise((resolve, reject) => {
          db.query(
            detailQuery,
            [
              inserted_id,
              detail.table_lr_id,
              detail.table_lr_freight,
              detail.table_lr_hamali,
              detail.table_lr_collection,
              detail.table_lr_delivery,
              detail.table_lr_wtcharges,
              detail.table_lr_otherchar,
              detail.table_lr_statistical,
              detail.table_lr_total,
              "",
              detail.table_lr_gstpayby,
              detail.table_lr_gst_amount,
            ],
            (err) => {
              if (err) {
                console.error("Error executing detail query:", err);
                reject(err);
              } else {
                resolve();
              }
            }
          );
        });
      });

      Promise.all(promises)
        .then(() => {
          return res.json({
            message: "Bill and details added successfully",
            inserted_id,
          });
        })
        .catch((err) => {
          console.error("Error executing detail queries:", err);
          return res.status(500).json({ error: "Server error" });
        });
    } else {
      return res.json({ message, inserted_id });
    }
  });
};

const deletebills = (req, res) => {
  const id = req.params.id;
  console.log(id);

  const query = `
        CALL deletebills(?, @message);
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
      const message = results[2][0].message;
      console.log(`Message: ${message}`);
      return res.json({ message });
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Server error");
  }
};
const searchBills = (req, res) => {
  const { bill_no, cust_id, branch } = req.query;

  const query = "CALL bills_search(?, ?, ?)";

  try {
    db.query(query, [bill_no, cust_id, branch], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Server error");
        return;
      }

      return res.json(results[0]);
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Server error");
  }
};
const getLorryMasterListForBill = (req, res) => {
  const { in_cust, in_billtype } = req.query;
  const query = "CALL lorrymasterlistforbill(?, ?)";

  try {
    db.query(query, [in_cust, in_billtype], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Server error");
        return;
      }

      // Transform the results to the desired format
      const transformedResults = results[0].map((item) => ({
        id: item.id,
        lr_no:
          item[
            'CONCAT((SELECT branch_abbreviation FROM branch WHERE branch_id=lm.branch),"-",lm.lr_no)'
          ],
      }));

      return res.json(transformedResults);
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Server error");
  }
};

const getLorryMasterListForBillUpdate = (req, res) => {
  const { in_cust, in_billtype } = req.query;
  const query = `
    SELECT 
        lm.id,
        CONCAT((SELECT branch_abbreviation FROM branch WHERE branch_id = lm.branch), "-", lm.lr_no) AS lr_display
    FROM 
        lorry_reciept_master lm
        INNER JOIN lr_status s ON lm.id = s.lr_id
    WHERE 
        (lm.consigner = ? OR lm.consignee = ?)
        AND lm.pay_type = ?
    ORDER BY 
        lm.id DESC;`;

  try {
    db.query(query, [in_cust, in_cust, in_billtype], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Server error");
        return;
      }
      console.log(results);
      // Transform the results to the desired format if needed
      const finalresult = results.map((item) => ({
        id: item.id,
        lr_no: item.lr_display
      }));

      return res.json(finalresult);
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Server error");
  }
};

const getlrdetailsbyid = (req, res) => {
  const { in_id, in_cust } = req.query;

  const getLRDetailsQuery = "CALL getlrdetailsbyid(?, ?)";

  try {
    db.query(getLRDetailsQuery, [in_id, in_cust], (err, lrResults) => {
      if (err) {
        console.error("Error executing getLRDetailsQuery:", err);
        return res.status(500).send("Server error");
      }

      if (lrResults && lrResults[0] && lrResults[0][0]) {
        const lrDetails = lrResults[0][0];
        const lrid = lrDetails.id;

        // Query to fetch consignor's name
        const getConsignorQuery = `
          SELECT c.customer_name AS consignor_name
          FROM lorry_reciept_master lr
          LEFT JOIN customer c ON lr.consigner = c.customer_id
          WHERE lr.id = ?
        `;

        db.query(getConsignorQuery, [lrid], (err, consignorResult) => {
          if (err) {
            console.error("Error executing getConsignorQuery:", err);
            return res.status(500).send("Server error");
          }

          if (consignorResult && consignorResult[0]) {
            lrDetails.consignor_name = consignorResult[0].consignor_name;

            const getLocQuery = `
              SELECT loc_from, loc_to
              FROM lorry_reciept_master
              WHERE id = ?
            `;

            db.query(getLocQuery, [lrid], (err, locResults) => {
              if (err) {
                console.error("Error executing getLocQuery:", err);
                return res.status(500).send("Server error");
              }

              if (locResults && locResults[0]) {
                const locFrom = locResults[0].loc_from;
                const locTo = locResults[0].loc_to;

                const getPlaceNameQuery = `
                  SELECT place_id, place_name
                  FROM place
                  WHERE place_id IN (?, ?)
                `;

                db.query(
                  getPlaceNameQuery,
                  [locFrom, locTo],
                  (err, placeResults) => {
                    if (err) {
                      console.error("Error executing getPlaceNameQuery:", err);
                      return res.status(500).send("Server error");
                    }

                    if (placeResults && placeResults.length === 2) {
                      const placeFrom = placeResults.find(
                        (place) => place.place_id === locFrom
                      );
                      const placeTo = placeResults.find(
                        (place) => place.place_id === locTo
                      );

                      if (placeFrom && placeTo) {
                        lrDetails.loc_from_name = placeFrom.place_name;
                        lrDetails.loc_to_name = placeTo.place_name;

                        return res.json(lrDetails);
                      } else {
                        res
                          .status(404)
                          .send("Place names not found for loc_from or loc_to");
                      }
                    } else {
                      res.status(404).send("Place names not found");
                    }
                  }
                );
              } else {
                res
                  .status(404)
                  .send("Locations not found in lorry_reciept_master");
              }
            });
          } else {
            res.status(404).send("Consignor details not found");
          }
        });
      } else {
        res.status(404).send("LR details not found");
      }
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Server error");
  }
};

const updateBill = (req, res) => {
  const id = req.params.id;
  const {
    billNo,
    billDate,
    billType,
    customer_id,
    tot_freight,
    tot_hamali,
    service_ch,
    delivery_ch,
    other_ch,
    demurage,
    tds,
    tot_tax,
    tot_amount,
    remarks,
    branchId,
    user_id,
    bill_details,
  } = req.body;
console.log(req.body.   bill_details)
  const sqlUpdateBill = `
    CALL update_bill_master(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @message, @inserted_id, ?);
  `;

  const parameters = [
    billNo,
    billDate,
    billType,
    customer_id,
    tot_freight.toString(), // Ensure all numerical parameters are converted to strings if they are defined as VARCHAR in the stored procedure
    tot_hamali.toString(),
    service_ch.toString(),
    delivery_ch.toString(),
    other_ch.toString(),
    demurage.toString(),
    tds.toString(),
    tot_tax.toString(),
    tot_amount.toString(),
    remarks,
    "", // Placeholder for in_fileloc
    branchId,
    user_id,
    id,
  ];

  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection:", err);
      return res.status(500).json({ error: "Server error" });
    }

    const rollback = (error) => {
      connection.rollback(() => {
        console.error("Transaction error:", error);
        connection.release();
        res.status(500).json({ error: "Server error" });
      });
    };

    connection.beginTransaction((err) => {
      if (err) return rollback(err);

      connection.query(sqlUpdateBill, parameters, (err, results) => {
        if (err) return rollback(err);

        // Fetch the OUT parameters after executing the stored procedure
        connection.query(
          "SELECT @message AS message, @inserted_id AS inserted_id",
          (err, result) => {
            if (err) return rollback(err);

            const message = result[0].message;
            const inserted_id = result[0].inserted_id;

            const sqlAddBillDetails = `
            CALL add_bill_details(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
          `;

            const billDetailPromises = bill_details.map((detail) => {
              return new Promise((resolve, reject) => {
                connection.query(
                  sqlAddBillDetails,
                  [
                    inserted_id,
                    detail.table_lr_id,
                    detail.table_lr_freight,
                    detail.table_lr_hamali,
                    detail.table_lr_collection,
                    detail.table_lr_delivery,
                    detail.table_lr_wtcharges,
                    detail.table_lr_otherchar,
                    detail.table_lr_statistical,
                    detail.table_lr_total,
                    "", // Placeholder for gstn
                    detail.table_lr_gstpayby,
                    detail.table_lr_gst_amount,
                  ],
                  (err) => {
                    if (err) {
                      console.error(
                        "Error executing add bill details query:",
                        err
                      );
                      reject(err);
                    } else {
                      resolve();
                    }
                  }
                );
              });
            });

            Promise.all(billDetailPromises)
              .then(() => {
                connection.commit((err) => {
                  if (err) return rollback(err);

                  connection.release();
                  return res.json({
                    message: "Bill and details updated successfully",
                    inserted_id,
                  });
                });
              })
              .catch((err) => rollback(err));
          }
        );
      });
    });
  });
};

const getBillForPrint = async (req, res) => {
  const { id } = req.params;

  try {
    const queryBill = "CALL getbillprintbyid(?)";
    const queryBillDetails = "CALL getbilldetailsprintbyid(?)";

    db.query(queryBill, [id], async (err, billResults) => {
      if (err) {
        console.error("Error executing getbillprintbyid query:", err);
        return res.status(500).send("Server error");
      }

      if (billResults.length === 0 || billResults[0].length === 0) {
        return res.status(404).send("Bill not found");
      }

      const bill = billResults[0][0];

      db.query(queryBillDetails, [id], async (err, billDetailsResults) => {
        if (err) {
          console.error("Error executing getbilldetailsprintbyid query:", err);
          return res.status(500).send("Server error");
        }

        if (
          billDetailsResults.length === 0 ||
          billDetailsResults[0].length === 0
        ) {
          return res.status(404).send("Bill details not found");
        }

        const billDetails = billDetailsResults[0];
        bill.details = billDetails;

        try {
          const templatePath = path.join(__dirname, "../Billpdf/bill.html");
          console.log("Template Path:", templatePath);
          const templateContent = await fs.readFile(templatePath, "utf8");
          const totalAmountWords = numberToWords
            .toWords(parseFloat(bill["IFNULL(b.tot_amount,0)"]))
            .toUpperCase();

          let renderedHTML = templateContent
            .replace("{{bill.bill_no}}", bill.bill_no || "")
            .replace("{{bill.lrdate}}", bill.bill_date || "")
            .replace("{{bill.customer_name}}", bill.customer_name || "")
            .replace(
              "{{bill.tot_freight}}",
              bill["IFNULL(b.tot_freight,0)"] || ""
            )
            .replace(
              "{{bill.delivery_ch}}",
              bill["IFNULL(b.delivery_ch,0)"] || ""
            )
            .replace(
              "{{bill.tot_hamali}}",
              bill["IFNULL(b.tot_hamali,0)"] || ""
            )
            .replace("{{bill.other_ch}}", bill["IFNULL(b.other_ch,0)"] || "")
            .replace(
              "{{bill.tot_amount}}",
              bill["IFNULL(b.tot_amount,0)"] || ""
            )
            .replace("{{bill.tot_amount_words}}", totalAmountWords || "")
            .replace("{{bill.cust.gstno}}", bill["IFNULL(cust.gstno,'')"] || "")
            .replace("{{bill.b.remarks}}", bill["IFNULL(b.remarks,'')"] || "");

          let itemHeaderHTML = `
            <style>
              tr {
                page-break-inside: avoid;
                    page-break-before: auto;
              }
            </style>
            <thead>
              <tr>
                <td style="border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">LR No.</td>
                <td style="width: 75pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">Date</td>
                <td style="width: 65pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">To Place</td>
                <td style="width: 70pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">INV No</td>
                <td style="width: 65pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">Vehicle No</td>
                <td style="width: 79pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">Consignee</td>
                <td style="width: 38pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">Article</td>
                <td style="width: 37pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">Weight</td>
                <td style="width: 38pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">Freight</td>
                <td style="width: 37pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">Hamali</td>
                <td style="width: 37pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">Other</td>
                <td style="width: 42pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">Amount</td>
              </tr>
            </thead>
          `;

          // Function to insert line breaks after every 7 characters
          function formatConsignote(consignote) {
            if (!consignote) return "";
            const words = consignote.split("");
            let result = "";

            for (let i = 0; i < words.length; i++) {
              result += words[i];
              if ((i + 1) % 19 === 0 && i < words.length - 1) {
                result += "<br>";
              }
            }
            return result;
          }

          const itemSummariesHTML = bill.details
            .map((item) => {
              return `
                  <div style="page-break-inside: avoid;page-break-before: auto;">
                <tr style="height:22px; page-break-inside: avoid;page-break-before: auto;" >
                 <td style="width: 5pt; border-left: 1px solid; border-bottom: 1pt ridge; font-size: 6pt; text-align: center;font-family: Arial, sans-serif;">
                    ${item.lrno}
                  </td>
                  <td style="width: 3px; border-right: 1pt solid; border-left: 1pt solid; font-size: 6pt;text-align: center; border-bottom: 1pt ridge; font-family: Arial, sans-serif;">
                    ${item.lrdate}
                  </td>
                  <td style="width: 18pt; border-right: 1pt solid; border-left: 1pt solid; font-size: 6pt;text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                    ${item.place_name}
                  </td>
                  <td style="width: 40pt; border-right: 1pt solid; border-left: 1pt solid;font-size: 6pt;text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                    ${formatConsignote(item['IFNULL(lm.consignote,"")'])}
                  </td>
                  <td style="width: 50pt; border-right: 1pt solid; border-left: 1pt solid; font-size: 6pt;text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                    ${item.truck_tempo_number ? item.truck_tempo_number : ""}
                  </td>
                  <td style="width: 20pt; border-right: 1pt solid; border-left: 1pt solid; font-size: 5pt;text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                    ${item.customer_name}
                  </td>
                  <td style="width: 38pt; border-right: 1pt solid; border-left: 1pt solid; font-size: 6pt;text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                    ${item["sum(IFNULL(tlr.no_of_articles,0))"] ?? 0}
                  </td>
                  <td style="width: 37pt; border-right: 1pt solid; border-left: 1pt solid; font-size: 6pt;text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                   ${item["sum(IFNULL(tlr.char_wt,0))"] ?? 0}
                  </td>
                  <td style="width: 38pt; border-right: 1pt solid; border-left: 1pt solid; font-size: 6pt;text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                   ${item["IFNULL(bd.freight,0)"] ?? 0}
                  </td>
                  <td style="width: 37pt; border-right: 1pt solid; border-left: 1pt solid; font-size: 6pt;text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                   ${item["IFNULL(bd.hamali,0)"] ?? 0}
                  </td>
                  <td style="width: 37pt; border-right: 1pt solid; border-left: 1pt solid; font-size: 6pt; text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                  ${item["IFNULL(bd.other_ch,0)"] ?? 0}
                  </td>
                  <td style="width: 42pt; border-right: 1pt solid; border-left: 1pt solid; font-size: 6pt;text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                  ${item["IFNULL(bd.total,0)"] ?? 0}
                  </td>
                </tr>   
                 </div>`;
            })
            .join("");

          renderedHTML = renderedHTML.replace(
            "{{itemSummaries}}",
            itemSummariesHTML
          );
          renderedHTML = renderedHTML.replace(
            "{{itemHeaderHTML}}",
            itemHeaderHTML
          );

          const options = {
            format: "A4",
            orientation: "portrait",
            border: {
              top: "10mm",
              right: "10mm",
              bottom: "10mm",
              left: "10mm",
            },
          };

          const finalPath = path.join(__dirname, "../Billpdf/");
          const fileName = `${bill.bill_no}`;
          const returnPath = `Billpdf/${fileName}.pdf`;

          pdf
            .create(renderedHTML, options)
            .toFile(
              path.join(finalPath, `${fileName}.pdf`),
              (pdfErr, result) => {
                if (pdfErr) {
                  console.error("Error creating PDF:", pdfErr);
                  return res
                    .status(500)
                    .json({ error: true, message: "Error creating PDF" });
                }

                const fileToSend = result.filename;

                return res.json({ returnPath });
              }
            );
        } catch (readFileError) {
          console.error("Error reading HTML template:", readFileError);
          return res
            .status(500)
            .json({ error: true, message: "Error reading HTML template" });
        }
      });
    });
  } catch (e) {
    console.error("Error in getBillForPrint:", e);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const mailbill = async (req, res) => {
  const { id } = req.params;

  try {
    const queryBill = "CALL getbillprintbyid(?)";
    const queryBillDetails = "CALL getbilldetailsprintbyid(?)";

    db.query(queryBill, [id], async (err, billResults) => {
      if (err) {
        console.error("Error executing getbillprintbyid query:", err);
        return res.status(500).send("Server error");
      }

      if (billResults.length === 0 || billResults[0].length === 0) {
        return res.status(404).send("Bill not found");
      }

      const bill = billResults[0][0];

      db.query(queryBillDetails, [id], async (err, billDetailsResults) => {
        if (err) {
          console.error("Error executing getbilldetailsprintbyid query:", err);
          return res.status(500).send("Server error");
        }

        if (
          billDetailsResults.length === 0 ||
          billDetailsResults[0].length === 0
        ) {
          return res.status(404).send("Bill details not found");
        }

        const billDetails = billDetailsResults[0];
        bill.details = billDetails;

        console.log(bill);

        try {
          const templatePath = path.join(
            __dirname,
            "../MailBill/mailBill.html"
          );
          console.log("Template Path:", templatePath);
          const templateContent = await fs.readFile(templatePath, "utf8");
          const totalAmountWords = numberToWords
            .toWords(parseFloat(bill["IFNULL(b.tot_amount,0)"]))
            .toUpperCase();
          let renderedHTML = templateContent
            .replace("{{bill.bill_no}}", bill.bill_no || "")
            .replace("{{bill.lrdate}}", bill.bill_date || "")
            .replace("{{bill.customer_name}}", bill.customer_name || "")
            .replace(
              "{{bill.tot_freight}}",
              bill["IFNULL(b.tot_freight,0)"] || ""
            )
            .replace(
              "{{bill.delivery_ch}}",
              bill["IFNULL(b.delivery_ch,0)"] || ""
            )
            .replace(
              "{{bill.tot_hamali}}",
              bill["IFNULL(b.tot_hamali,0)"] || ""
            )
            .replace("{{bill.other_ch}}", bill["IFNULL(b.other_ch,0)"] || "")
            .replace(
              "{{bill.tot_amount}}",
              bill["IFNULL(b.tot_amount,0)"] || ""
            )
            .replace("{{bill.tot_amount_words}}", totalAmountWords || "")
            .replace("{{bill.cust.gstno}}", bill["IFNULL(cust.gstno,'')"] || "")
            .replace("{{bill.b.remarks}}", bill["IFNULL(b.remarks,'')"] || "");

          // If you have any item summaries to include in the rendered HTML, you can add them here
          let itemHeaderHTML = `
          <style>
            tr {
              page-break-inside: avoid;
                  page-break-before: auto;
            }
          </style>
          <thead>
            <tr>
              <td style="border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">LR No.</td>
              <td style="width: 75pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">Date</td>
              <td style="width: 65pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">To Place</td>
              <td style="width: 70pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">INV No</td>
              <td style="width: 65pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">Vehicle No</td>
              <td style="width: 79pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">Consignee</td>
              <td style="width: 38pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">Article</td>
              <td style="width: 37pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">Weight</td>
              <td style="width: 38pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">Freight</td>
              <td style="width: 37pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">Hamali</td>
              <td style="width: 37pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">Other</td>
              <td style="width: 42pt; border: 1pt solid; font-size: 9pt; text-align: center; font-weight: bold;">Amount</td>
            </tr>
          </thead>
        `;

          // Function to insert line breaks after every 7 characters
          function formatConsignote(consignote) {
            if (!consignote) return "";
            const words = consignote.split("");
            let result = "";

            for (let i = 0; i < words.length; i++) {
              result += words[i];
              if ((i + 1) % 19 === 0 && i < words.length - 1) {
                result += "<br>";
              }
            }
            return result;
          }

          const itemSummariesHTML = bill.details
            .map((item) => {
              return `
                <div style="page-break-inside: avoid;page-break-before: auto;">
              <tr style="height:22px; page-break-inside: avoid;page-break-before: auto;" >
               <td style="width: 5pt; border-left: 1px solid; border-bottom: 1pt ridge; font-size: 6pt; text-align: center;font-family: Arial, sans-serif;">
                  ${item.lrno}
                </td>
                <td style="width: 3px; border-right: 1pt solid; border-left: 1pt solid; font-size: 6pt;text-align: center; border-bottom: 1pt ridge; font-family: Arial, sans-serif;">
                  ${item.lrdate}
                </td>
                <td style="width: 18pt; border-right: 1pt solid; border-left: 1pt solid; font-size: 6pt;text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                  ${item.place_name}
                </td>
                <td style="width: 40pt; border-right: 1pt solid; border-left: 1pt solid;font-size: 6pt;text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                  ${formatConsignote(item['IFNULL(lm.consignote,"")'])}
                </td>
                <td style="width: 50pt; border-right: 1pt solid; border-left: 1pt solid; font-size: 6pt;text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                  ${item.truck_tempo_number ? item.truck_tempo_number : ""}
                </td>
                <td style="width: 20pt; border-right: 1pt solid; border-left: 1pt solid; font-size: 5pt;text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                  ${item.customer_name}
                </td>
                <td style="width: 38pt; border-right: 1pt solid; border-left: 1pt solid; font-size: 6pt;text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                  ${item["sum(IFNULL(tlr.no_of_articles,0))"] ?? 0}
                </td>
                <td style="width: 37pt; border-right: 1pt solid; border-left: 1pt solid; font-size: 6pt;text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                 ${item["sum(IFNULL(tlr.char_wt,0))"] ?? 0}
                </td>
                <td style="width: 38pt; border-right: 1pt solid; border-left: 1pt solid; font-size: 6pt;text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                 ${item["IFNULL(bd.freight,0)"] ?? 0}
                </td>
                <td style="width: 37pt; border-right: 1pt solid; border-left: 1pt solid; font-size: 6pt;text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                 ${item["IFNULL(bd.hamali,0)"] ?? 0}
                </td>
                <td style="width: 37pt; border-right: 1pt solid; border-left: 1pt solid; font-size: 6pt; text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                ${item["IFNULL(bd.other_ch,0)"] ?? 0}
                </td>
                <td style="width: 42pt; border-right: 1pt solid; border-left: 1pt solid; font-size: 6pt;text-align: center; border-bottom: 1pt ridge;font-family: Arial, sans-serif;">
                ${item["IFNULL(bd.total,0)"] ?? 0}
                </td>
              </tr>   
               </div>`;
            })
            .join("");

          renderedHTML = renderedHTML.replace(
            "{{itemSummaries}}",
            itemSummariesHTML
          );
          renderedHTML = renderedHTML.replace(
            "{{itemHeaderHTML}}",
            itemHeaderHTML
          );

          const options = {
            format: "A4",
            orientation: "portrait",
            border: {
              top: "10mm",
              right: "10mm",
              bottom: "10mm",
              left: "10mm",
            },
          };

          const finalPath = path.join(__dirname, "../Billpdf/");
          const fileName = `${bill.bill_no}`;
          const returnPath = `Billpdf/${fileName}.pdf`;

          pdf
            .create(renderedHTML, options)
            .toFile(
              path.join(finalPath, `${fileName}.pdf`),
              (pdfErr, result) => {
                if (pdfErr) {
                  console.error("Error creating PDF:", pdfErr);
                  return res
                    .status(500)
                    .json({ error: true, message: "Error creating PDF" });
                }

                const fileToSend = result.filename;

                return res.json({ returnPath });
              }
            );
        } catch (readFileError) {
          console.error("Error reading HTML template:", readFileError);
          return res
            .status(500)
            .json({ error: true, message: "Error reading HTML template" });
        }
      });
    });
  } catch (e) {
    console.error("Error in getBillForPrint:", e);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const transporter = nodemailer.createTransport({
  host: "rajeshtransportservices.com",
  port: 587,
  secure: false,
  auth: {
    user: "support@rajeshtransportservices.com",
    pass: "support@4321",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMail = async (req, res) => {
  const {
    pdfpathfile,
    emailForm: { toEmail, message },
  } = req.body;

  const mailOptions = {
    from: '"Rajesh Transport" <support@rajeshtransportservices.com>',
    to: toEmail,
    subject: "Regarding bills",
    text: message,
    attachments: [
      {
        filename: "print.pdf",
        path: `./${pdfpathfile}`,
      },
    ],
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).send("Error sending email: " + error.message);
  }
};

module.exports = {
  getbillsbybranch,
  deletebills,
  addbillmaster,
  getbillbyid,
  searchBills,
  getLorryMasterListForBill,
  getlrdetailsbyid,
  updateBill,
  getBillForPrint,
  mailbill,
  sendMail,
  getLorryMasterListForBillUpdate,
};
