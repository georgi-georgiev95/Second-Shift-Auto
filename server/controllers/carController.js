const router = require("express").Router();

const carService = require("../services/carService");
const userService = require("../services/userService");
const {isAuth}= require('../middlewares/authMiddleware');

router.get('/catalog', async (req, res) => {
    const data = await carService.getAll();
    res.json(data);
});

router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const data = await carService.getUserCars(userId);
        res.status(200).send(data);
    } catch (err) {
        res.status(400).send({ error: err });
    }
    
});

router.post('/create', async (req, res) => {
    const car = req.body.carObj;
    car.owner = req.body.owner;

    try {
        const newCar = await carService.create(car);
        res.send(newCar);
    } catch (err) {
        res.send({ error: err });
    }
    
});

router.post('/details/:carId/edit', isAuth, async (req, res) => {
    const car = req.body.carObj;
    car.owner = req.body.owner;
    const carId = req.params.carId;

    try {
        await carService.update(carId, car);
        res.status(200).send({ ok: true });
    } catch (err) {
        res.status(400).send({ error: err });
    }
});

router.get('/details/:carId', async (req, res) => {
    const carId = req.params.carId;
    try {
        const car = await carService.getOne(carId);
        res.json(car);
    } catch (err) {
        res.status(404).send({ error: err });
    }
});

router.delete('/details/:carId/delete', isAuth, async (req, res) => {
    const carId = req.params.carId;
    try {
        await carService.delete(carId);
        res.json({ ok: true });
    } catch (err) {
        res.status(400).send({ error: err });
    }
});

router.post('/details/:carId/buy', async (req, res) => {
    const carId = req.params.carId;
    const carData = await carService.getOne(carId);
    if (carData.buyer.length == 0) { 
        const buyerId = req.body.buyerId;
        try {
            await carService.buyCar(carId, buyerId);
            await userService.updateBoughtCars(buyerId, carId);
            res.json({ ok: true });
        } catch (err) {
            res.status(400).send({ error: err });
        }
    } else {
        res.status(400).send({ error: "Car already bought" });
    }
    
 })

router.delete('/delete/:carId', async (req, res) => {
    const carId = req.params.carId;
    await carService.delete(carId);
    res.json({ ok: true });
});

router.get('/search', async (req, res) => { 
    const make = req.query.make;
    const year = Number(req.query.year);
    const maxPrice = Number(req.query.maxPrice);
    const minPrice = Number(req.query.minPrice);
    const city = req.query.city;
    const showAll = req.query.showAll;
    const showBought = req.query.showBought;
    const showNonBought = req.query.showNonBought;
    try {
        let query = {};
        if (make) {
            query.make = new RegExp(`^${make}$`, 'i');
        }
        if (year) {
            query.year = Number(year);
        }
        if (minPrice && maxPrice) {
            query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
        } else if (minPrice) {
            query.price = { $gte: Number(minPrice) };
        } else if (maxPrice) {
            query.price = { $lte: Number(maxPrice) };
        }
        if (city) {
            query.location = new RegExp(`^${city}$`, 'i');
        }
        const data = await carService.search(query);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})



module.exports = router;