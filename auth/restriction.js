const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  const token = req.headers.authorization;

  if (token) {
    const secret = process.env.JWT_SECRET || "A myth about secrets...";

    jwt.verify(token, secret, (err, decodedToken) => {
      console.log('error in jwt.verify: ', err)
      if (err) {
        res.status(401).json({ message:"Invalid credentials" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};