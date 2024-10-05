import connection from '../config/db.js';
import dotenv from 'dotenv';
import express from 'express';

// Getting environment variables
dotenv.config();

// Connecting to Database
connection();

const app = express();
export default app;
