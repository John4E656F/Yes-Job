import postgres from 'postgres';

const connectionString = process.env.NEXT_PRIVATE_POSTGRES_URI;

if (!connectionString) {
  throw new Error('Database connection string is not defined.');
}

// Create a PostgreSQL client
const sql = postgres(connectionString);

export default sql;
