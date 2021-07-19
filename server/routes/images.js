const router = require('express').Router();
const User = require('../model/User');
const Image = require('../model/Image');
const verify = require('./verifyToken');


// SAVE AND UPDATE IMAGE
router.post('/', verify, async (req, res) => {

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

        let query = { userId: userId, type: req.body.type };
        let update = {
            userId: userId,
            imageName: req.body.imageName,
            imageData: req.body.imageData,
            type: req.body.type
        };
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };
        let uploadedImage = await Image.findOneAndUpdate(query, update, options);

        return res.json(uploadedImage);

    } catch (err) {
        return res.status(403).json({
            message: 'Something went wrong.'
        });
    }
})

// FETCH IMAGE
router.get('/:userIdParam/:typeParam', verify, async (req, res) => {

    const userId = req.params.userIdParam;
    const type = req.params.typeParam;

    try {

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(403).json(
                {
                    message: 'User with userId: ' + userId +
                        ' doesn\'t exists!'
                });
        }

        let query = { userId: userId, type: type };

        let uploadedImage = await Image.findOne(query);

        if (!uploadedImage) {
            return res.status(403).json({
                message: 'No image exists for userId: ' + userId
            });
        }

        return res.json(uploadedImage);

    } catch (err) {
        return res.status(403).json({
            message: 'Something went wrong.'
        });
    }
})

module.exports = router;