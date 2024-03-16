const router = require("express").Router();

const userService = require("../services/userService");

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