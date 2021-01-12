import { config } from "dotenv";
config();
import express, { Application } from "express";

// Init Express
const app:Application = express();

// Define Port
const port:string|number = process.env.PORT || 3000;

// Listen
app.listen(port, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${port}`));