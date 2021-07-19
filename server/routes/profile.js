const router = require('express').Router();
const Profile = require('../model/Profile');
const User = require('../model/User');
const DailyLog = require('../model/DailyLog')
const verify = require('./verifyToken');
const { newProfileValidation } = require('../validation');

// Commented the below api so that it is not accessible to everyone

// Get all profiles
// router.get('/', async (req, res) => {
//     try {
//         const profiles = await Profile.find();
//         res.json(profiles);
//     } catch (err) {
//         return res.status(403).json({
//             message: 'Something went wrong.'
//         });
//     }
// })

// Add a profile
router.post('/', verify, async (req, res) => {

    // Let's validate the profile before we save
    const { error } = newProfileValidation(req.body);
    if (error) {
        return res.status(403).json({
            message: error.details[0].message
        });
    }

    const userId = req.body.userId;

    try {
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(403).json(
                {
                    message: 'User with userId: ' + userId +
                        ' doesn\'t exists!'
                });
        }

        const profileExists = await Profile.findOne({
            userId: userId
        })
        if (profileExists) {
            return res.status(403).json({
                message: 'Profile with userId: ' + userId +
                    ' already exists!'
            });
        }
        const profile = new Profile({
            quittingReason: req.body.quittingReason,
            smokingTimesPerDay: req.body.smokingTimesPerDay,
            smokingTimesPerWeek: req.body.smokingTimesPerWeek,
            smokingCostPerWeek: req.body.smokingCostPerWeek,
            soberDate: req.body.soberDate
        })

        const dailyLog = new DailyLog({
            userId: userId,
            dailyLog: []
        })

        const savedProfile = await profile.save();
        const savedDailyLog = await dailyLog.save();

        res.json(savedProfile);

    } catch (err) {
        return res.status(403).json({
            message: 'Something went wrong.'
        });
    }
})

// Fetch a specific Profile
router.get('/:userIdParam', verify, async (req, res) => {

    const userId = req.params.userIdParam;
    if (!userId) {
        return res.status(403).json({
            message: 'UserId query param missing in the request'
        });
    }

    try {
        const existingProfile = await Profile.findOne({
            userId: userId
        })
        if (!existingProfile) {
            return res.status(403).json({
                message: 'No profile exists for userId: ' + userId
            });
        }
        res.json(existingProfile);
    } catch (err) {
        return res.status(403).json({
            message: 'Something went wrong.'
        });
    }
})

// Update a specific profile
router.patch('/:userIdParam', verify, async (req, res) => {

    // Let's validate the profile before we update
    const { error } = newProfileValidation(req.body);
    if (error) {
        return res.status(403).json({
            message: error.details[0].message
        });
    }

    const userId = req.params.userIdParam;

    const existingProfile = await Profile.findOne({
        userId: userId
    })

    if (!existingProfile) {
        return res.status(403).json({
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
                soberDate: req.body.soberDate,
                modifiedTime: Date.now()
            }
        });

        const savedProfile = await Profile.findOne({
            userId: userId
        })

        return res.json(savedProfile);

    } catch (err) {
        return res.status(403).json({
            message: 'Something went wrong.'
        });
    }
})

// Update the sober date for a specific profile
router.patch('/soberDate/:userIdParam', verify, async (req, res) => {
    let userId = req.params.userIdParam;

    const existingProfile = await Profile.findOne({
        userId: userId
    })

    if (!existingProfile) {
        return res.status(403).json({
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
        return res.status(403).json({
            message: 'Something went wrong.'
        });
    }
})

module.exports = router;