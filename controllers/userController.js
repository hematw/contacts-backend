const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt")
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const saltRound = 10;

// @route POST Register user
// @access public
const registerUser = asyncHandler(async function (req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required!")
    }

    var availableUser = await User.findOne({ username })
    if (availableUser) {
        console.log("username error is here");
        res.status(400);
        throw new Error("username is already taken!")
    }

    availableUser = await User.findOne({ email })
    if (availableUser) {
        console.log("email error is here");
        res.status(400);
        throw new Error("email is already registerd!")
    }

    const hashedPassword = await bcrypt.hash(password, saltRound)
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    });
    if (newUser) {
        res.status(201).json({ _id: newUser._id, email: newUser.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid")
    }
})

// @route POST Login user
// @access public
const loginUser = asyncHandler(async function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required!")
    }

    const user = await User.findOne({ email });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
            process.env.JWT_SECRET,
            { expiresIn: "5m" }
        )
        res.json({ token })
    } else {
        res.status(401);
        throw new Error("email or password is invalid!")
    }

})

// @route GET current user
// @access private
const currentUser = asyncHandler(async function (req, res) {
    res.send(req.user)
})

module.exports = { registerUser, loginUser, currentUser }