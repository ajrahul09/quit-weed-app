const router = require('express').Router();
const Profile = require('../model/Profile');
const User = require('../model/User');
const verify = require('./verifyToken');
const { newProfileValidation } = require('../validation');

// Get all profiles
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.json(profiles);
    } catch (err) {
        res.json({ message: err })
    }
})

// Add a profile
router.post('/', async (req, res) => {

    // Let's validate the profile before we save
    const { error } = newProfileValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const userId = req.body.userId;

    try {
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(400).json(
                {
                    message: 'User with userId: ' + userId +
                        ' doesn\'t exists!'
                });
        }

        const profileExists = await Profile.findOne({
            userId: userId
        })
        if (profileExists) {
            return res.status(400).json({
                message: 'Profile with userId: ' + userId +
                    ' already exists!'
            });
        }
        const profile = new Profile({
            userId: userId,
            quittingReason: req.body.quittingReason,
            smokingTimesPerDay: req.body.smokingTimesPerDay,
            smokingTimesPerWeek: req.body.smokingTimesPerWeek,
            smokingCostPerWeek: req.body.smokingCostPerWeek,
            soberDate: req.body.soberDate,
            createdTime: Date.now()
        })

        const savedProfile = await profile.save();
        res.json(savedProfile);

    } catch (err) {
        res.status(400).send(err);
    }
})

// Fetch a specific Profile
router.get('/:userIdParam', async (req, res) => {

    const userId = req.params.userIdParam;
    if (!userId) {
        return res.status(400).json({
            message: 'UserId query param missing in the request'
        });
    }

    try {
        const existingProfile = await Profile.findOne({
            userId: userId
        })
        if (!existingProfile) {
            return res.status(400).json({
                message: 'No profile exists for userId: ' + userId
            });
        }
        res.json(existingProfile);
    } catch (err) {
        res.status(400).send(err);
    }
})

// Update a specific profile
router.patch('/:userIdParam', async (req, res) => {
    let userId = req.params.userIdParam;

    const existingProfile = await Profile.findOne({
        userId: userId
    })

    if (!existingProfile) {
        return res.status(400).json({
            message: 'No profile exists for userId: ' + userId
        });
    }

    try {
        const updatedProfile = await Profile.updateOne({ userId: userId }, {
            $set: {
                quittingReason: req.body.quittingReason,
                smokingTimesPerDay: req.body.smokingTimesPerDay,
                smokingTimesPerWeek: req.body.smokingTimesPerWeek,
                smokingCostPerWeek: req.body.smokingCostPerWeek,
                modifiedTime: Date.now()
            }
        });
        return res.json({
            message: 'Profile updated for userId: ' + userId
        });
    } catch (err) {
        res.status(400).send(err);
    }
})

// Update the sober date for a specific profile
router.patch('/soberDate/:userIdParam', async (req, res) => {
    let userId = req.params.userIdParam;

    const existingProfile = await Profile.findOne({
        userId: userId
    })

    if (!existingProfile) {
        return res.status(400).json({
            message: 'No profile exists for userId: ' + userId
        });
    }

    try {
        const updatedProfile = await Profile.updateOne({ userId: userId }, {
            $set: {
                soberDate: req.body.soberDate,
                modifiedTime: Date.now()
            }
        });
        return res.json({
            message: 'Sober date updated for userId: ' + userId
        });
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;