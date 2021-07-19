const router = require('express').Router();
const DailyLog = require('../model/DailyLog');
const verify = require('./verifyToken');
const { dailyLogValidation } = require('../validation');

// Commented the below api so that it is not accessible to everyone

// Get all dailyLogs
// router.get('/', async (req, res) => {
//     try {
//         const dailyLogs = await DailyLog.find();
//         res.json(dailyLogs);
//     } catch (err) {
//         return res.status(403).json({
//             message: 'Something went wrong.'
//         });
//     }
// })

// Fetch a specific DailyLog
router.get('/:userIdParam', verify, async (req, res) => {

    const userId = req.params.userIdParam;
    if (!userId) {
        return res.status(403).json({
            message: 'UserId query param missing in the request'
        });
    }

    try {
        const existingDailyLog = await DailyLog.findOne({
            userId: userId
        })
        if (!existingDailyLog) {
            return res.status(403).json({
                message: 'No Daily Log exists for userId: ' + userId
            });
        }
        res.json(existingDailyLog);
    } catch (err) {
        return res.status(403).json({
            message: 'Something went wrong.'
        });
    }
})

// Update a dailyLog
router.patch('/:userIdParam', verify, async (req, res) => {

    // Let's validate the dailyLog before we update
    const { error } = dailyLogValidation(req.body);
    if (error) {
        return res.status(403).json({
            message: error.details[0].message
        });
    }

    const userId = req.params.userIdParam;

    try {

        const dailyLogExists = await DailyLog.findOne({
            userId: userId
        })
        if (!dailyLogExists) {
            return res.status(403).json({
                message: 'No dailyLog exists for userId: ' + userId
                    + '. Create a profile before updating the dailyLog.'
            });
        }
        const newDailyLog = await DailyLog.updateOne({ userId: userId }, {
            $push: {
                dailyLog: [{
                    cravings: req.body.cravings,
                    irritability: req.body.irritability,
                    anxiety: req.body.anxiety,
                    insomnia: req.body.insomnia,
                    appetiteLoss: req.body.appetiteLoss,
                    moodSwings: req.body.moodSwings,
                    depression: req.body.depression,
                    coldSweats: req.body.coldSweats,
                    confidence: req.body.confidence,
                    happiness: req.body.happiness,
                    motivation: req.body.motivation,
                }]
            }
        })

        const savedDailyLog = await DailyLog.findOne({
            userId: userId
        })

        return res.json(savedDailyLog);

    } catch (err) {
        return res.status(403).json({
            message: 'Something went wrong.'
        });
    }
})

module.exports = router;