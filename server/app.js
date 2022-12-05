import express from 'express';
import dotenv from 'dotenv';
import { connectPassport } from './utils/provider.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import passport from 'passport';

// Routes Imports
import userRoute from './routes/user.js';

const app = express();
export default app;

dotenv.config({
  path: './config/config.env',
});

// using middlewares
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());

app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());

connectPassport();

app.use('/api/v1', userRoute);

// using error middleware
app.use(errorMiddleware);
