import jwt from 'jsonwebtoken';

// Creates a signed JWT containing the user's public data, valid for 30 days
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

// Middleware: verifies the Bearer token and attaches the decoded user to req.user
export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // strip "Bearer "
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Invalid Token' });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({ message: 'No Token' });
    }
};

// Middleware: blocks the request unless the authenticated user is an admin
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: 'Invalid Admin Token' });
    }
};
