const redisClient = require('../utils/redis');

const cache = (duration) => {
  return async (req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = await redisClient.get(key);

    if (cachedResponse) {
      return res.json(JSON.parse(cachedResponse));
    }

    res.originalJson = res.json;
    res.json = async (body) => {
      await redisClient.set(key, JSON.stringify(body), duration);
      res.originalJson(body);
    };
    next();
  };
};

module.exports = cache;