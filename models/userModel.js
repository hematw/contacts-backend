const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please enter email address"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("User", userSchema);