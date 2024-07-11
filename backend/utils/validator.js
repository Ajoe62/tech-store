const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', {
    expiresIn: '1h',
  });
};
