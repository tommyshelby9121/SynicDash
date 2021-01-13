import { config } from "dotenv";
config();
import express, { Application } from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import logger from "morgan";
import cookieParser from "cookie-parser";
import { connection } from "mongoose";
import passport from "passport";
const MongoStore = require("connect-mongo")(session);
import connectDB from "./database/connection";

// Init Express
const app:Application = express();

// Init connectDB
connectDB().catch(err => {
   console.error(err);
   process.exit(1);
});

// DiscordStrategy
require("./config/passport")(passport);

// Logging
if (process.env.NODE_ENV === "development") {
    app.use(logger("dev"));
}

// Body Parser
app.use(express.urlencoded({
    extended: false,
}));
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Sessions
app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET!,
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
       mongooseConnection: connection,
    }),
}));

// View Engine
app.use(expressLayouts);
app.set("views", "./src/views");
app.set("layout", "layouts/master");
app.set("view engine", "ejs");

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
import index from "./routes/index";
app.use("/", index);

// Define Port
const port:string|number = process.env.PORT || 3000;

// Listen
app.listen(port, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${port}`));