import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { User } from '../models/user.js';
import { Document } from '../models/document.js';

export const connectPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, done) {
        // Here comes the Database
        const user = await User.findOne({
          googleId: profile.id,
        });

        if (!user) {
          const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            photo: profile.photos[0].value,
          });
          return done(null, newUser);
        } else {
          return done(null, user);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};

export const createDocument = async () => {
  await Document.create({
    docId: 'vv',
    docOwner: 'suhitha.bodla@gmail.com',
    docName: 'Chota Impossible',
    docData: {
      order: ['aaa', 'bbb'],
      data: {
        aaa: {
          content: 'Hello',
          type: 'Text',
          id: 'aaa',
        },
        bbb: {
          content: 'World',
          type: 'Cell',
          id: 'bbb',
        },
      },
    },
  });
};

export const documentRead = async () => {
  const a = await Document.findOne({ docId: 'mwfosatygi' });
  console.log(a);
};
