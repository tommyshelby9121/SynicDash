import { config } from "dotenv";
config();
import express, { Application } from "express";
import logger from "morgan";
import connectDB from "./database/connection";

// Init Express
const app:Application = express();

// Init connectDB
connectDB().catch(err => {
   console.error(err);
   process.exit(1);
});

// Logging
if (process.env.NODE_ENV === "development") {
    app.use(logger("dev"));
}

// Body Parser
app.use(express.urlencoded({
    extended: false,
}));
app.use(express.json());

// Routes
import index from "./routes/index";
app.use("/", index);

// Define Port
const port:string|number = process.env.PORT || 3000;

// Listen
app.listen(port, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${port}`));