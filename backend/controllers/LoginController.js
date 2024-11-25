const db = require("../config/dbConfig");


 const login = (req, res) => {
    
    console.log(req.body)
    const { email, password } = req.body;

    try {
        // Use a raw query to find the user by email
        db.query('SELECT * FROM user WHERE username = ? AND password =?', [email,password], async (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
console.log(results[0])
            const user = results[0];

    
            res.json(user);
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

};


  module.exports = {
  login
  };