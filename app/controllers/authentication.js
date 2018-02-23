const jwt = require('jwt-simple');
const User = require('../models/user');

function tokenForUser(user) {
    return jwt.encode(
        {sub: user.id, iat: new Date().getTime()},
        'asdjahskdjh21321asdaskl'
    );
}

exports.signin = function (req, res, next) {
    res.send({token: tokenForUser(req.user)});
};

exports.signup = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({error: 'You must provide email and password'});
    }

    User.findOne({email: email}, function (err, existingUser) {
        if (err) {
            next(err);
        }

        if (existingUser) {
            return res.status(422).send({error: 'Email is already in use'});
        }
    });

    const user = new User({
        email: email,
        password: password
    });

    user.save(function (err) {
        if (err) {
            return next(err);
        }

        res.json({token: tokenForUser(user)});
    });
};
