const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save", async function () {
   this.password = await bcrypt.hash(this.password, 12); 
})

const User = mongoose.model("User", userSchema);

module.exports = User;