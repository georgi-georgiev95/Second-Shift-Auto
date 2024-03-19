const router = require("express").Router();

const carService = require("../services/carService");
const {isAuth}= require('../middlewares/authMiddleware');

router.get('/catalog', async (req, res) => {
    const data = await carService.getAll();
    res.json(data);
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
        res.send({ ok: true });
    } catch (err) {
        res.status(400).send({ error: err });
    }
})

router.get('/details/:carId', async (req, res) => {
    const carId = req.params.carId;
    const car = await carService.getOne(carId);
    res.json(car);
});

router.put('/edit/:carId', async (req, res) => {
    const carData = req.body;
    const carId = req.params.carId;
    const car = await carService.edit(carId, carData);
    res.json(car);
});

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
        const data = await carService.search(query);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})



module.exports = router;