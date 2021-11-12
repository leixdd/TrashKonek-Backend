const bcrypt = require('bcrypt');
const User = require('../models/User');

const setModel = (details) => new User(details);

const getUserID = (id, callback) => User.findById(id, '_id', callback);
const getUser = (id, callback) => User.findById(id, callback);
const getUserUsingEmail =  (email, callback) =>  User.findOne({ 'loginDetails.email': email }, callback);

const addUser = (user, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(user.loginDetails.password, salt, (hashingError, hash) => {
            if (hashingError) throw hashingError;
            user.loginDetails.password = hash;
            user.save(callback);
        })
    })
}

const comparePassword = async (password, userPassword, callback) => await bcrypt.compare(password, userPassword, callback);
 
module.exports = {
    setModel,
    getUserUsingEmail,
    getUserID,
    addUser,
    comparePassword,
    getUser
}