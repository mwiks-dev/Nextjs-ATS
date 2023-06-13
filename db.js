import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.user,
  host: 'localhost',
  database: process.env.database, 
  password: process.env.password,
  port: '5432',
});

export default pool;
