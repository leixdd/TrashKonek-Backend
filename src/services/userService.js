const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/userRepository');

const userRegistration = (request, response) => {

    //TODO: CREATE VALIDATIONS

    let userModel = UserRepository.setModel({
        loginDetails: {
            email: request.body.email,
            password: request.body.password
        },
    });

    //validate if email is existing
    UserRepository.getUserUsingEmail(userModel.loginDetails.email, (err, data) => {
        if (!data) {
            UserRepository.addUser(userModel, (err, data) => {
                if (err) {
                    response.status(400).json({ success: false, msg: 'Failed to register user' });
                } else {
                    response.status(200).json({ success: true, msg: 'User successfully registered' });
                }
            });
        } else {
            response.status(400).json({ success: false, msg: 'Failed: Email Exist' });
        }
    });

}

const userLogin = (req, res, next) => passport.authenticate('signin', (err, user, info) => {
    try {
        
        if (err) return next(new Error("An error occured"));

        if (!user) return res.status(401).json({ success: false, info });

        req.login(user, {session: false}, async (err) => {
            if (err) return next(err);

            const token = jwt.sign({
                _id: user._id
            }, process.env.JWT_SECRET);

            return res.status(200).json({ success: true, token: 'Bearer ' + token, user: { id: user._id }})
        })
    } catch (error) {
        if (error) return next(error);
    }
})(req, res, next);


const getUser = (req, res) => UserRepository.getUser(req.body.id, (err, user) => {
    if (err) return res.status(503).json({ success: false, data: "An Error occured" });
    
    return res.status(200).json({ success: true, data: user });
});


module.exports = {
    userRegistration,
    userLogin,
    getUser
}