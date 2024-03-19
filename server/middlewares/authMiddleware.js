const jwt = require('jsonwebtoken');
const SECRET = "SECRET_KEY";
const carService = require('../services/carService');

exports.auth = async (req, res, next) => {
    const token = req.headers['X-Authorization'];

    if (token) {
        try {
            const decodedToken = jwt.verify(token, ENV.SECRET);
            req.user = decodedToken;
            next();
        } catch (err) {
            res.redirect('/users/login');
        }
    } else {
        next();
    }
};

exports.isOwner = async (req, res, next) => {
    const stoneId = req.params.id;
    const stone = await stoneService.getOne(stoneId);
    if (stone.owner._id == req.user?._id) {
        next();
    } else {
        return res.redirect('/404');
    }
};

exports.isUser = async (req, res, next) => {
    const data = await stoneService.getOne(req.params.id);
    if (data) {
        if (data.owner._id == req.user?._id) {
            return res.redirect('/404');
        }

        if(data.likedList.some(x => x._id == req.user?._id)) {
            return res.redirect('/404');
        }
    }

    if (!req.user?._id) {
        return res.redirect('/404');
    }

    next();
};

exports.isGuest = (req, res, next) => {
    if (req.user?._id) {
        return res.redirect('/404');
    }

    next();
}

exports.isAuth = async (req, res, next) => {
    const token = req.cookies['auth-cookie'];
    const carId = req.params.carId;
    const result = jwt.verify(token, SECRET);
    const userId = result._id;
    const carData = await carService.getOne(carId);
    const carOwner = carData.owner._id;

    if(userId != carOwner) {
        const error = new Error();
        error.status = 400;
        error.message = 'You are not authorized';
        return next(error);
    }

    next();
}