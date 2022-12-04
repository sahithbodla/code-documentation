import express from 'express';
import dotenv from 'dotenv';
import { connectPassport } from './utils/provider.js';
import session from 'express-session';

// Routes Imports
import userRoute from './routes/user.js';
import passport from 'passport';

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

app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());

connectPassport();

app.use('/api/v1', userRoute);
