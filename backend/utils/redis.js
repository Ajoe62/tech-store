const redis = require('redis');

let client;

const initRedisClient = async () => {
  if (!client) {
    client = redis.createClient({
      url: 'redis://localhost:6379',
    });

    client.on('error', (err) => console.error('Redis Client Error', err));

    await client.connect();
  }
};

const getAsync = (key) => client.get(key);
const setAsync = (key, value, ...args) => client.set(key, value, ...args);
const delAsync = (key) => client.del(key);

module.exports = { initRedisClient, getAsync, setAsync, delAsync };
