const Car = require("../models/Car");

exports.getAll = () => Car.find();
exports.create = (carData) => Car.create(carData);
exports.getOne = (carId) => Car.findById(carId);
exports.edit = (carId, carData) => Car.findByIdAndUpdate(carId, carData);
exports.delete = (carId) => Car.findByIdAndDelete(carId);
exports.search = (query) => Car.find(query);
exports.update = (carId, carData) => Car.findByIdAndUpdate(carId, carData);
exports.getUserCars = (userId) => Car.find({ owner: userId });