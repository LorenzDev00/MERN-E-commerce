import jwt from 'jsonwebtoken';

// Generate a JWT token with user data as payload
export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            isAdmin: user.isAdmin,
        }
        , process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        });
};

// Middleware to verify if the user is authenticated
export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        // Extract the token from the 'Authorization' header
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        // Verify the token using the JWT_SECRET and decode the user data from the payload
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Invalid Token' });
            } else {
                // Add the user data to the request object
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({ message: 'No Token' });
    }
};

// Middleware to verify if the user is an admin
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        // If user is authenticated and isAdmin is true, allow access
        next();
    } else {
        // Otherwise, send an error message
        res.status(401).send({ message: 'Invalid Admin Token' });
    }
};