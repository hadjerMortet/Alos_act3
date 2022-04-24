import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../../../utils/config'
import User from '../Models/User'
import verifyToken from '../../middlewares/verifyToken'
var router = express.Router()

router.post('/register', function (req, res) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const user = User.add({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    var token = jwt.sign({
        id: user.id
    }, config.jwtsecret, {
        expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({
        auth: true,
        token: token
    });
});

router.get('/me', verifyToken, function (req, res) {
    var token = req.headers['access-token'];
    if (!token) return res.status(401).send({
        auth: false,
        message: 'No token provided.'
    });

    jwt.verify(token, config.jwtsecret, function (err, decoded) {
        if (err) return res.status(500).send({
            auth: false,
            message: 'Failed to authenticate token.'
        });

        let user = User.get(decoded.id)
        delete user['password']

        res.status(200).send(user);
    });
});


router.post('/login', verifyToken, function (req, res) {

    let user = User.get_by('email', req.body.email)

    if (!user) return res.status(404).send('User Not Found.');

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({
        auth: false,
        token: null
    });

    var token = jwt.sign({
        id: user.id
    }, config.jwtsecret, {
        expiresIn: 86400 // in 24 HOURE
    });

    res.status(200).send({
        auth: true,
        token: token
    });

});

router.get('/logout', verifyToken, function (req, res) {
    res.status(200).send({
        auth: false,
        token: null
    });
});


export default router;