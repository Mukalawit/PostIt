const express = require('express');
const { HttpError } = require('../../utils/errors');
const { Message } = require('../../models');
const { authenticateToken } = require('../../utils/token-helpers');

const router = express.Router();
router.get('/:id/messages', authenticateToken, async (req, res) => {
    const { id } = req.user;
    const groupId  = Number(req.params.id);

    try {
        const message = new Message(id,groupId);
        const messages = await message.view();
        return res.status(200).json({ message: messages });
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
    }
});
module.exports = router;
