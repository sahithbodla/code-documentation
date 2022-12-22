import { User } from '../models/user.js';
import { asyncErrorHandler } from '../middlewares/errorMiddleware.js';

export const myProfile = (req, res, next) => {
  res.status(200).json({ success: true, user: req.user });
};

export const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    } else {
      res.clearCookie('connect.sid');
      res.status('200').json({ message: 'logged out' });
    }
  });
};

// @get - get theme for given user
export const getTheme = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({ googleId: req.params.id });

  if (user) {
    res.status(201).json({
      success: true,
      theme: user.theme || 'slate',
    });
  } else {
    res.status(404).json({
      success: false,
      message: `No user found`,
    });
  }
});

// @patch - setting theme for given user
export const setTheme = asyncErrorHandler(async (req, res, next) => {
  const theme = req.body.theme;
  const user = await User.findOne({ googleId: req.params.id });

  if (user) {
    await User.updateOne(
      { googleId: req.params.id },
      { $set: { theme: theme } }
    );

    res.status(201).json({
      success: true,
      googleId: req.params.id,
      message: `theme successfully updated`,
    });
  } else {
    res.status(409).json({
      success: false,
      googleId: req.params.id,
      message: `user dont exist`,
    });
  }
});
