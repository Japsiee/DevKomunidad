const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req,res,next) {
  const { auth } = req.cookies;
  if (!auth) {
    res.json({ authenticated: false });
  } else {
    jwt.verify(auth, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ authenticated: false });
      } else {
        next();  
      }
    })
  }
}