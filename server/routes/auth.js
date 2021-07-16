const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const { registerValidation, loginValidation } = require('../validation');

dotenv.config();

let transporter = nodemailer.createTransport({    
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Confirm email
router.get('/confirmation/:token', async (req, res) => {
    try {
        const decodedVal = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
        const emailVerified = await User.updateOne({_id: decodedVal.user}, {
            $set: {
                emailVerified: true
            }
        });
        return res.send('Email confirmed. Proceed to login');
    } catch (err) {
        return res.status(403).json({
            message: 'Something went wrong.'
        });
    }
});


router.post('/register', async (req, res) => {

    // Let's validate the user before we save a user
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(403).send({
            message: error.details[0].message
        })
    }

    // Checking if the user is already exists in db
    try {
        const emailExists = await User.findOne({
            email: req.body.email
        })
        if (emailExists) {
            return res.status(403).json({
                message: 'Email already exists!'
            });
        }
    } catch (err) {
        return res.status(403).json({
            message: 'Something went wrong.'
        });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();

        // async email
        const emailToken = jwt.sign(
            {
                user: savedUser._id,
            },
            process.env.EMAIL_SECRET,
            {
                expiresIn: '30d',
            },
        );

        const url = `http://localhost:3000/api/user/confirmation/${emailToken}`;

        const email = await transporter.sendMail({
            to: user.email,
            subject: 'Confirm Email',
            html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
        });

        return res.send({ user: savedUser._id });

    } catch (err) {
        return res.status(403).json({
            message: 'Something went wrong.'
        });
    }

});

// Login
router.post('/login', async (req, res) => {

    // Let's validate the user before we save a user
    const { error } = loginValidation(req.body);

    if (error) {
        return res.status(403).json({
            message: error.details[0].message
        });
    }

    // Checking if the email already exists in db
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) {
        return res.status(403).json({
            message: 'Email doesn\'t exist. '
        });
    }

    if (!user.emailVerified) {
        return res.status(403).json({
            message: 'Please confirm your email to login.'
        });
    }

    // Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(403).json({
            message: 'Invalid password.'
        });
    }

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.json({ userId: user._id, token: token });
})

module.exports = router;