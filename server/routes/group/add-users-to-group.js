const express = require('express');
const { HttpError } = require('../../utils/errors');
const { Group } = require('../../models');
const { authenticateToken } = require('../../utils/token-helpers');

const router = express.Router();
router.post('/:id/user', authenticateToken, async (req, res) => {
    const { data } = req.body;
    const { id } = req.user;
    const groupId  = req.params.id;
    if (!Array.isArray(data)) {
        return res.status(400).json({ message: 'Invalid Payload' });
    }

    try {
        await Group.addUsers(data, groupId, id);
        return res.status(201).json({ message: 'group user(s) successfully added' });
    } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
    }
});
module.exports = router;
