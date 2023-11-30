const jwt = require('jsonwebtoken');

// to verify we must pass both the token - access token and refresh token
// if access token is expired using refresh token we will generate access token
// if refresh token is expired, we logout the user

module.exports = function (req, res, next) {
    // Get token from header
    const accessToken = req.header('x-auth-token');
    const refreshToken = req.header('x-auth-refresh-token');
    let secretKey = "jwtSecret123";

    if (!accessToken && !refreshToken) {
        return res.status(401).send('Access Denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(accessToken, secretKey);
        req.user = decoded.user;
        next();
    } catch (error) {
        if (!refreshToken) {
            return res.status(401).send('Access Denied. No refresh token provided.');
        }

        try {
            const decoded = jwt.verify(refreshToken, secretKey);
            const accessToken = jwt.sign({ user: decoded.user }, secretKey, { expiresIn: '1h' });
            req.accessToken = accessToken;
            req.user = decoded.user;
            next();
        } catch (error) {
            return res.status(400).send('Invalid Token.');
        }
    }


}