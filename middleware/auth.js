module.exports = { //ticket gremlin
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next() //logged in, go to next page
      } else {
        res.redirect('/') //not logged in, go to homepage
      }
    }
  }
  