const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/second-shift-auto")
.then(() => {
    console.log("Connected to MongoDB");
})

const routes = require("./routes");
const { auth } = require("./middlewares/authMiddleware");

const app = express();
app.use(cookieParser());
// !Avoid CORS error
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(express.json());
app.use(auth);
app.use(routes);


app.get("/", (req, res) => {
    res.json("Hello World!");
});

app.listen(3000, () => {
    console.log(`Server listening on port: 3000`);
});