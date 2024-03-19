const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const {constants} = require("./constants");

mongoose.connect(constants.DB_URL)
.then(() => {
    console.log("Connected to MongoDB");
})

const routes = require("./routes");
const { auth } = require("./middlewares/authMiddleware");

const app = express();
app.use(cookieParser());
// !Avoid CORS error
app.use(cors({
    origin: constants.origin,
    credentials: true
}));
app.use(express.json());
app.use(auth);
app.use(routes);


app.listen(constants.PORT, () => {
    console.log(`Server listening on port: ${constants.PORT}`);
});