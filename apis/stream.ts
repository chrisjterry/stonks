import * as express from 'express';

import notifyFollowers from '../services/notification/notifyFollowers';

const router = express.Router();

router.post('/start', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { username } = req.body;
    // open websocket here
    const text = `${username} has started to stream!`
    await notifyFollowers({ token, text });
    return res.json({});
  } catch (err) {
    return res.status(400).json({ err })
  }
});

export default router;
