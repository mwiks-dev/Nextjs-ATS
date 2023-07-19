import pool from '@/db';
import bcrypt from 'bcrypt';
async function signup(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        //Getting email and password from body
        const { username, email, password, password2 } = req.body;
    
        //Connect with database
        const client = await pool.connect();
        
        //Check existing
        const checkQuery = 'SELECT * FROM users WHERE email = $1';
        const checkExisting = await pool.query(checkQuery, [email])
        //Send error response if duplicate user is found
        if (checkExisting.rows.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Check if the password and confirm password match
        // if (password != password2 ) {
        //     return res.status(401).json({ message: 'Passwords do not match' });
        // }

        // Hash password
        const saltRounds = 10;
        const hashed_pass = await bcrypt.hash(password, saltRounds);

        const query = 'INSERT INTO users (username,email, password) VALUES ($1, $2, $3) RETURNING *';
        const values = [username,email, hashed_pass];
        const result = await client.query(query,values);
        //Close DB connection
        // client.close();
        //Send success response
        const user = result.rows[0]
        client.release();

        console.log('User:', user)
        return res.status(200).json({ message: 'User created successfully'});
    } 
        //Response for other than POST method
        return res.status(500).json({ message: 'Route not valid' });
}

export default signup;