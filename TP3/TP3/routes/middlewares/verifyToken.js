import jwt from 'jsonwebtoken'
import config from '../../utils/config'

export default function verifyToken(req, res, next) {
    var token = req.headers['access-token'];
    if (!token)
        return res.status(403).send({
            auth: false,
            message: 'No token provided.'
        });

    jwt.verify(token, config.jwtsecret, function (err, decoded) {
        if (err)
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });

        // If everything is good, save to request use in other routes 
        req.user_id = decoded.id;
        next();
    });
}
