import { authRoutes } from '../routes/users/authRoutes.js';
import connection from '../config/db.js';
import dotenv from 'dotenv';
import express from 'express';

// Getting environment variables
dotenv.config();

// Connecting to Database
connection();

const app = express();

// Controlling the App to accept data from POST requests
app.use(express.json());

// Getting Routes
app.use('/', authRoutes);

export default app;
