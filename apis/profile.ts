import * as express from 'express';

import registerProfile from '../services/profile/registerProfile';
import loginProfile from '../services/profile/loginProfile';
import updateProfile from '../services/profile/updateProfile';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { fullName, username, email, password, avatar } = req.body;
    const profile = await registerProfile({ fullName, username, email, password, avatar });
    return res.json(profile);
  } catch (err) {
    return res.status(400).json({ err })
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const profile = await loginProfile({ email, password });
    return res.json(profile);
  } catch (err) {
    return res.status(400).json({ err })
  }
});

router.post('/update', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { fullName, username, avatar } = req.body;
    const profile = await updateProfile({ token, fullName, username, avatar });
    return res.json(profile);
  } catch (err) {
    return res.status(400).json({ err })
  }
});

export default router;
