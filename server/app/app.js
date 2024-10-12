import connection from '../config/db.js';
import dotenv from 'dotenv';
import express from 'express';
import { mainRoutes } from '../middlewares/handlingMainRoutes.js';

// Getting environment variables
dotenv.config();

// Connecting to Database
connection();

const app = express();

// Controlling the App to accept data from POST requests
app.use(express.json());

// Getting MiddleWares
app.use('/', mainRoutes);

export default app;
