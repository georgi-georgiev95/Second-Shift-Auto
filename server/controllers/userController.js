const router = require("express").Router();

const userService = require("../services/userService");

router.post('/login', async (req, res) => {
    const userData = req.body;

    try {
        const { email, authToken, userId, username } = await userService.login(userData);
        res.send({ email, authToken, userId, username });
    } catch {
        res.send({ error: 'Wrong email or password!' });
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
        res.send({ email, authToken, userId, username });
    } catch {
        res.send({ error: 'Email already exists!' });
    }
});	

router.get('/logout', (req, res) => {
    res.json({ok: true});
})

module.exports = router;