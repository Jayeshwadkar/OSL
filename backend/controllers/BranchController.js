const db = require("../config/dbConfig");
const getAllBranches = (req, res) => {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const offset = page * pageSize;
    const searchTerm = req.query.search; 
    const query = 'CALL getallbranches()';

    try {
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }
            let branches = results[0];
            branches.reverse();
            if (searchTerm) {
                branches = branches.filter(branch =>
                    (branch.branch_code && branch.branch_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (branch.branch_abbreviation && branch.branch_abbreviation.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (branch.branch_name && branch.branch_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (branch.place_name && branch.place_name.toLowerCase().includes(searchTerm.toLowerCase()))
                );
            }
            const total = branches.length; 
            const paginatedBranches = branches.slice(offset, offset + pageSize).map(branch => ({
                ...branch,
                branch_code: branch.branch_code.toUpperCase(),
                branch_abbreviation: branch.branch_abbreviation.toUpperCase(),
                branch_name: branch.branch_name.toUpperCase(),
                place_name: branch.place_name.toUpperCase(),
                description: branch.description.toUpperCase()
            }));
            res.json({
                branches: paginatedBranches,
                total: total
            });
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Server error');
    }
};

const getBranchbyid = (req, res) => {
  
     const id = req.params.id; 
     
    const query = 'CALL getbranchbyid(?)';

    try {
        db.query(query, id, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }
           return res.json(results[0]);
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};
const deleteBranch = (req, res) => {
    const id = req.params.id.toString();
    
    const query = 'CALL deletebranch(?, @message)';

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
              return  res.json({ message: result[0].message });
            });
        });
    } catch (err) {
        console.error('Error:', err);
       return res.status(500).send('Server error');
    }
};

const addBranch = (req, res) => {
  const { branch_code,branch_abbreviation,branch_name,description,place,printer_name} = req.body;
  const query = 'CALL addbranch( ?,?,?,?,?,?, @message)';
  try {
      db.query(query, [branch_code,branch_abbreviation,branch_name,description,place,printer_name], (err, results) => {
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
             return res.json({ message: result[0].message });
          });
      });
  } catch (err) {
      console.error('Error:', err);
    return  res.status(500).send('Server error');
  }
};
const upadteBranch = (req, res) => {
    const { id } = req.params; 
    console.log(id)
    const { branch_code, branch_abbreviation, branch_name, description, place_id, printer_name } = req.body;
    
    const query = 'CALL updatebranch(?, ?, ?, ?, ?, ?, ?, @message)';
  
    try {
        db.query(query, [id, branch_code, branch_abbreviation, branch_name, description, place_id, printer_name], (err, results) => {
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

const SelectBranch = async (req, res) => {
    const query = 'CALL findbranch()';

    try {
        // Use the promise-based query method
        const [results] = await db.query(query);

        // The first element in results is the data rows
        const branches = results[0];

        // Mapping the data to extract necessary fields
        const branchList = branches.map((branch) => ({
            branch_id: branch.branch_id,
            branch_code: branch.branch_code,
            branch_abbreviation: branch.branch_abbreviation,
            branch_name: branch.branch_name,
            place_id: branch.place_id,
            description: branch.description,
            printer_name: branch.printer_name,
            place_name: branch.place_name,
        }));

        return res.json(branchList);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Server error');
    }
};



  module.exports = {
    getAllBranches,
    deleteBranch,
    addBranch,
    upadteBranch,
    SelectBranch,
    getBranchbyid
  };