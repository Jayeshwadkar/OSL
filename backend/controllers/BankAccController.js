const db = require("../config/dbConfig");

const getAllBanksAcc = (req, res) => {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const offset = page * pageSize;
    const searchTerm = req.query.search; 
    const query = 'CALL getallbankaccounts()';
    
    try {
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }
            let BankAcc = results[0];
            BankAcc.reverse();
            if (searchTerm) {
                BankAcc = BankAcc.filter(acc =>
                    (acc.account_holder_name && acc.account_holder_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (acc.account_number && acc.account_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (acc.account_type && acc.account_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (acc.bank_name && acc.bank_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (acc.customer_id && acc.customer_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (acc.opening_balance && acc.opening_balance.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (acc.ifsc_code && acc.ifsc_code.toLowerCase().includes(searchTerm.toLowerCase()))
                );
            }
            const total = BankAcc.length; 
            const paginatedBankAcc = BankAcc.slice(offset, offset + pageSize).map(acc => ({
                ...acc,
                account_holder_name: acc.account_holder_name.toUpperCase(),
                account_number: acc.account_number.toUpperCase(),
                account_type: acc.account_type.toUpperCase(),
                bank_name: acc.bank_name.toUpperCase(),
                customer_id: acc.customer_id.toUpperCase(),
                ifsc_code: acc.ifsc_code.toUpperCase()
            }));
          return  res.json({
                BankAcc: paginatedBankAcc,
                total: total
            });
        });
    } catch (err) {
        console.error('Error:', err);
        return  res.status(500).send('Server error');
    }
};


 const getBankAccbyid = (req, res) => {

    const id = req.params.id; 

    const query = 'CALL getbankaccountbyid(?)';

    try {
        db.query(query, id, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }
        return  res.json(results[0]);
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};

const AddBankacc = (req, res) => {
    const { bank, accountType, accountHolderName, customerId, accountNumber, openingBalance } = req.body;

    const query = 'CALL addbankaccount(?,?,?,?,?,?, @message)';

    try {
        db.query(query, [bank, accountType, accountHolderName, customerId, accountNumber, openingBalance], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            db.query('SELECT @message as message', (err, result) => {
                if (err) {
                    console.error('Error retrieving message:', err);
                    res.status(500).send('Server error');
                    return;
                }

                console.log(result[0].message);
              return  res.json({ message: result[0].message });
            });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};

const UpadteBankAcc = (req, res) => {

    const { id } = req.params; 
    const stringId = id.toString(); 
    
    const {  bank, accountType, accountHolderName, customerId, accountNumber, openingBalance } = req.body; 
 

    const query = `
        SET @message = '';
        CALL updatebankaccount(?, ?, ?, ?, ?, ?, @message, ?);
        SELECT @message as message;
    `;
    
    try {
        db.query(query, [ bank, accountType, accountHolderName, customerId, accountNumber, openingBalance,stringId], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }
            const message = results[2][0].message;
            console.log(message);
           return res.json({ message });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};



const deletebankacc = (req, res) => {
    
 
    const id = req.params.id; 

    const query = 'CALL deletebankaccount(?, @message)';

    try {
        db.query(query, [id], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            db.query('SELECT @message as message', (err, result) => {
                if (err) {
                    console.error('Error retrieving message:', err);
                    res.status(500).send('Server error');
                    return;
                }

                console.log(result);
              return  res.json({ message: result });
            });
        });
    } catch (err) {
        console.error('Error:', err);
      return  res.status(500).send('Server error');
    }
};

  module.exports = {
    getAllBanksAcc,
    getBankAccbyid,
    UpadteBankAcc,
    deletebankacc,
    AddBankacc
  };