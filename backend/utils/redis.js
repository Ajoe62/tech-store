const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

client.on('error', (error) => {
  console.error(error);
});

client.on('connect', () => {
  console.log('Redis connected');
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);

module.exports = { client, getAsync, setAsync, delAsync };
