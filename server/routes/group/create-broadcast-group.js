const express = require('express');
const { authenticateToken } = require('../../utils/token-helpers');
const { HttpError } = require('../../utils/errors');
const { Group } = require('../../models');
const { getBearerToken } = require('../../utils/token-helpers');

const router = express.Router();
router.post('/group', authenticateToken, async (req, res) => {
  const { name } = req.body;
  const token = getBearerToken(req);

  if (!name) {
    return res.status(400).json({ message: 'Invalid Payload' });
  }
  const group = new Group(name, token);
  try {
    await group.save();
    return res.status(201).json({ message: `${name} group has been successfully created` });
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
});
module.exports = router;
