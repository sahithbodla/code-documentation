import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import {
  connectPassport,
  createDocument,
  documentRead,
} from './utils/provider.js';
import { editDocument } from './controllers/document.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import passport from 'passport';

// Routes Imports
import userRoute from './routes/user.js';
import documentRoute from './routes/document.js';

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
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());

connectPassport();
// createDocument();
// documentRead();

app.use('/api/v1', userRoute);
app.use('/api/v1', documentRoute);

// using error middleware
app.use(errorMiddleware);
