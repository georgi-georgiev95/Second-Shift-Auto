const Car = require("../models/Car");

exports.getAll = () => Car.find();
exports.create = (carData) => Car.create(carData);
exports.getOne = (carId) => Car.findById(carId);
exports.edit = (carId, carData) => Car.findByIdAndUpdate(carId, carData);
exports.delete = (carId) => Car.findByIdAndDelete(carId);