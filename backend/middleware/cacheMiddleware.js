const { getAsync, setAsync, initRedisClient } = require('../utils/redis');

const cache = (duration) => {
  return async (req, res, next) => {
    await initRedisClient(); // Ensure Redis client is connected
    const key = req.originalUrl;
    const cachedData = await getAsync(key);

    if (cachedData) {
      res.send(JSON.parse(cachedData));
      return;
    }

    res.sendResponse = res.send;
    res.send = (body) => {
      setAsync(key, JSON.stringify(body), 'EX', duration);
      res.sendResponse(body);
    };

    next();
  };
};

module.exports = cache;
