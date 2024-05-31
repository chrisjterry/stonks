import * as express from 'express';

import followProfile from '../services/follow/followProfile';
import unfollowProfile from '../services/follow/unfollowProfile';

const router = express.Router();

router.post('/follow', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { profileId } = req.body;
    const follow = await followProfile({ token, profileId });
    return res.json(follow);
  } catch (err) {
    return res.status(400).json({ err })
  }
});

router.post('/unfollow', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { profileId } = req.body;
    const success = await unfollowProfile({ token, profileId });
    return res.json(success);
  } catch (err) {
    return res.status(400).json({ err })
  }
});

export default router;
