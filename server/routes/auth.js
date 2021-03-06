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
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Confirm email
router.get('/confirmation/:token', async (req, res) => {
    try {
        const decodedVal = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
        const emailVerified = await User.updateOne({ _id: decodedVal.user }, {
            $set: {
                emailVerified: true
            }
        });
        return res.send('Email confirmed. Proceed to login');
    } catch (err) {
        return res.status(403).send('Something went wrong.');
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

    let savedUser = {};
    let isError = false;

    try {
        
        savedUser = await user.save();

        const emailToken = jwt.sign({
            user: savedUser._id,
        },
            process.env.EMAIL_SECRET,
            {
                expiresIn: '30d',
            });

        const baseUrl = req.protocol + '://' + req.get('host');

        const url = `${baseUrl}/api/user/confirmation/${emailToken}`;

        const email = await transporter.sendMail({
            from: `QuitWeed.org ${process.env.EMAIL_ACCOUNT}`,
            to: user.email,
            subject: 'Confirm your account on QuitWeed.org',
            html: `Thanks for signing up with QuitWeed.org! 
            You must follow this link to activate your account:
            <br/><br/><a href="${url}">${url}</a>`,
            text: `Thanks for signing up with QuitWeed.org! 
            You must follow this link to activate your account:
            <br/><br/><a href="${url}">${url}</a>`,
        });

        return res.send({ user: savedUser._id });

    } catch (err) {
        isError = true;
        console.log(err);
        return res.status(403).json({
            message: 'Something went wrong.'
        });
    } finally {
        try {
            if (isError && savedUser._id) {
                const deletedUser = await User.findOneAndRemove({ _id: savedUser._id });
            }
        } catch (err) {
            console.log(err);
        }
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