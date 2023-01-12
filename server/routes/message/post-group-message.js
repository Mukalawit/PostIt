const express = require('express');
const { HttpError } = require('../../utils/errors');
const { Message } = require('../../models');
const { authenticateToken } = require('../../utils/token-helpers');

const router = express.Router();
router.post('/:id/message', authenticateToken, async (req, res) => {
    const { msg } = req.body;
    const { id } = req.user;
    const groupId  = Number(req.params.id);
    if (!msg) {
        return res.status(400).json({ message: 'Invalid Payload' });
    }

    try {
        const message = new Message(id,groupId,msg);
        await message.add();
        return res.status(201).json({ message: 'Message sent' });
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
    }
});
module.exports = router;
