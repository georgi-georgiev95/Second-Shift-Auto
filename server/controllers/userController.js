const router = require("express").Router();
const {constants} = require("../constants");
const userService = require("../services/userService");
const jwt = require("jsonwebtoken");

router.post('/login', async (req, res) => {
    const userData = req.body;

    try {
        const { email, authToken, userId, username } = await userService.login(userData);
        res.cookie('auth-cookie', authToken, { httpOnly: true, secure: true });
        res.status(200).send({ email, userId, username });
    } catch(err) {
        res.send({ error: err.message });
    }
    
});

router.get('/authorize', (req, res) => {
    const token = req.cookies[constants.cookie];

    try {
        const decodedToken = jwt.verify(token, constants.SECRET);
        res.status(200).send(decodedToken);
    } catch (err) {
        res.status(401).send({ error: 'Unauthorized' });
    }
})

router.post('/register', async (req, res) => {
    const userData = req.body;
    const user = {
        email: userData.email,
        username: userData.username,
        password: userData.passGroup.password,
        rePassword: userData.passGroup.rePassword
    }

    try {
        const { email, authToken, userId, username } = await userService.register(user);
        res.cookie('auth-cookie', authToken, { httpOnly: true, secure: true });
        res.status(200).send({ email, userId, username });
    } catch(err) {
        res.send({ error: err.message });
    }
});	

router.post('/logout', (req, res) => {
    try {
        res.clearCookie('auth-cookie');
        res.status(200).send({ message: 'Logout successful' });
    } catch (err) {
        res.status(500).send({ error: 'Logout failed' });
    }
})

module.exports = router;