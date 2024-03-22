const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SECRET = "SECRET_KEY";

exports.register = async (userData) => {
    const user = await User.findOne({ email: userData.email });
    if (user) {
        throw new Error('Email already exists');
    }
    
    if (userData.password !== userData.rePassword) {
        throw new Error('Passwords don\'t match');
    }

    const newUser = await User.create(userData);

    return generateToken(newUser);
};

exports.login = async (userData) => {
    const user = await User.findOne({ email: userData.email })

    if(!user) {
        throw new Error('Wrong email or password!');
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);

    if(!isMatch) {
        throw new Error('Wrong email or password!');
    }

    return generateToken(user);
};

exports.verifyUser = async (token) => {
    if (token) {
        const user = jwt.verify(token, SECRET);
        if(user) {
            return user;
        }
    }
}


function generateToken(user) {

    const token = jwt.sign({
        _id: user._id,
        email: user.email
    }, SECRET);

    return {
        email: user.email,
        authToken: token,
        userId: user._id,
        username: user.username
    };
} 