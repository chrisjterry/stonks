import * as express from 'express';

import createChannel from '../services/channel/createChannel';
import notifyFollowers from '../services/notification/notifyFollowers';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { title, description } = req.body;
    const channel = await createChannel({ token, title, description })
    return res.json(channel);
  } catch (err) {
    return res.status(400).json({ err })
  }
});

router.post('/stream', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { username } = req.body;
    const text = `${username} has started to stream!`
    await notifyFollowers({ token, text });
    // start stream
    return res.json({});
  } catch (err) {
    return res.status(400).json({ err })
  }
});

export default router;
