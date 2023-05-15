require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { sequelize } = require("./config/dbConn");
const { logger } = require("./middleware/logEvents");
const verifyJWT = require("./middleware/verifyJWT");
const errorHandler = require("./middleware/errorHandler");
const credentials = require("./middleware/credentials");
const PORT = process.env.PORT || 4000;

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cress Origin Resource Sharing
app.use(cors(corsOptions));

// buit-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// build in middleware for json
app.use(express.json());

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// routes

app.use(verifyJWT);

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

app.use(errorHandler);

sequelize
    .authenticate()
    .then(() =>
        app.listen(PORT, () => console.log(`Server is running on port ` + PORT))
    )
    .catch((err) => console.log(err));
// listening server
