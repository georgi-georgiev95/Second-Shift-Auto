const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// mongoose.connect("mongodb://localhost:27017/second-shift-auto")
// .then(() => {
//     console.log("Connected to MongoDB");
// })

mongoose.connect("mongodb+srv://georgiev9507:georgiev9507prod@cluster0.okkqwi4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to MongoDB");
    })

const routes = require("./routes");
const { auth } = require("./middlewares/authMiddleware");

const app = express();
app.use(cookieParser());
// !Avoid CORS error
app.use(cors({
    origin: 'https://second-shift-auto-beta.free.bg',
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