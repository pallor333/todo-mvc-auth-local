const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const passport = require('passport');
const User = require('../models/User')

//old
// module.exports = function (passport) {
//   passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
//     User.findOne({ email: email.toLowerCase() }, (err, user) => {
//       if (err) { return done(err) }
//       if (!user) {
//         return done(null, false, { msg: `Email ${email} not found.` })
//       }
//       if (!user.password) {
//         return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
//       }
//       user.comparePassword(password, (err, isMatch) => {
//         if (err) { return done(err) }
//         if (isMatch) {
//           return done(null, user)
//         }
//         return done(null, false, { msg: 'Invalid email or password.' })
//       })
//     })
//   }))
module.exports = function (passport) {
  passport.use( new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email });
          if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
          }
          const isMatch = await user.comparePassword(password); // Assuming comparePassword is defined in your User model
          if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  )
  

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id); // Use async/await instead of a callback
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  })
}
