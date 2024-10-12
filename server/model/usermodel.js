const mongose = require('mongoose');

const userSchema = new mongose.Schema({
    username: {
        type: String,
        required: true,
        min : 6,
        max : 50,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max : 50,
        unique: true
    },

    password: {
        type: String,
        required: true,
        min : 6,

    },
    isProfile: {
        type: Boolean,
        default: false
    },
    profileimg: {
        type: "String",
        default: "",
    }
});

module.exports = mongose.model('User', userSchema);
