const router = require("express").Router();

const carService = require("../services/carService");

router.get('/catalog', async (req, res) => {
    const data = await carService.getAll();
    res.json(data);
});

router.post('/create', async (req, res) => {
    console.log(req.body);
    const car = req.body.carObj;
    car.owner = req.body.owner;

    try {
        const newCar = await carService.create(car);
        res.send(newCar);
    } catch (err) {
        res.send({ error: err });
    }
    
});

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
    res.json({ok: true});
})


module.exports = router;