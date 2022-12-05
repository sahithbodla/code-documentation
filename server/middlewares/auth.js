import ErroHandler from '../utils/errorHanlder.js';

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies['connect.sid'];

  if (!token) {
    return next(new ErroHandler('Not Logged In', 401));
  }
  next();
};
