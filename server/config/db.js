import { connect } from 'mongoose';

// Trying to connect to the database
const connection = async () => {
  try {
    const db = await connect(process.env.MONGO_URI);
    console.log(`Connection established successfully to ${db.connection.host}`);
  } catch (error) {
    // Sending Error and closing connection with failure code
    console.error(`${error.message}`);
    process.exit(1);
  }
};

export default connection;
