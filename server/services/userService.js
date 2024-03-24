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

exports.updateBoughtCars = (userId, carId) => User.findByIdAndUpdate(userId, { $push: { boughtCars: carId } });

exports.getUserCars = (userId) => {
    return User.findById(userId).populate('boughtCars').select('boughtCars -_id');
}

function generateToken(user) {

    const token = jwt.sign({
        userId: user._id,
        email: user.email,
        username: user.username
    }, SECRET);

    return {
        email: user.email,
        authToken: token,
        userId: user._id,
        username: user.username
    };
} 