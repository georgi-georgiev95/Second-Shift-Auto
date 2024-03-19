const jwt = require('jsonwebtoken');
const {constants} = require('../constants');
const SECRET = constants.SECRET;

exports.auth = async (req, res, next) => {
    const token = req.headers['X-Authorization'];

    if (token) {
        try {
            const decodedToken = jwt.verify(token, SECRET);
            req.user = decodedToken;
            next();
        } catch (err) {
            res.redirect('/users/login');
        }
    } else {
        next();
    }
};

// TODO: add isAuth as a route guard
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