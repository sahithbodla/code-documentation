import express from 'express';
import passport from 'passport';
import { myProfile, logout, getTheme, setTheme } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get(
  '/googlelogin',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

router.get('/login', passport.authenticate('google'), (req, res, next) => {
  res.send('Logged In');
});

router.get('/me', isAuthenticated, myProfile);
router.get('/logout', logout);

// user theme routes
router.get('/user/:id', getTheme);
router.patch('/user/:id', setTheme);

export default router;
