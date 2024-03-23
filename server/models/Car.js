const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    make: { type: String, required: true},
    model: { type: String, required: true},
    price: { type: Number, required: true},
    year: { type: Number, required: true},
    engineType: { type: String, enum: ["Petrol", "Diesel", "Electric", "Hybrid"], required: true},
    power: { type: Number, required: true},
    gearbox: { type: String, enum: ["Manual", "Automatic"], required: true},
    category: { type: String, enum: ["Sedan", "Coupe", "Hatchback", "SUV", "Wagon"], required: true},
    mileage: { type: Number, required: true},
    color: { type: String, required: true},
    description: { type: String, required: true},
    image: { type: String, required: true },
    location: { type: String, required: true },
    additionalImages: { type: Array },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    buyer: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;