const bcrypt = require('bcrypt');
const User = require('../models/User');
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
                    response.json({ success: false, msg: 'Failed to register user' });
                } else {
                    response.json({ success: true, msg: 'User successfully registered' });
                }
            });
        } else {
            response.json({ success: false, msg: 'Failed: Email Exist' });
        }
    });

}


module.exports = {
    userRegistration
}