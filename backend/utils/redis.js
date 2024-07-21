const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
    });

    
  console.log(`Attempting to connect to Redis at ${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`);

    this.client.on('error', (error) => {
      console.error('Redis connection error:', error);
    });

    this.client.on('connect', () => {
      console.log('Successfully connected to Redis');
    });

    this.client.on('ready', () => {
      console.log('Redis client ready');
    });

    this.client.on('end', () => {
      console.log('Redis connection ended');
    });

    this.client.on('reconnecting', () => {
      console.log('Redis client reconnecting');
    });

    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.client.connected;
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.client.on('connect', resolve);
      this.client.on('error', reject);
    });
  }

  async quit() {
    return new Promise((resolve) => {
      this.client.quit(() => {
        console.log('Redis connection closed');
        resolve();
      });
    });
  }

  async ping() {
    return new Promise((resolve, reject) => {
      this.client.ping((err, reply) => {
        if (err) reject(err);
        else resolve(reply);
      });
    });
  }

  async get(key) {
    console.log(`Attempting to get key: ${key}`);
    const value = await this.getAsync(key);
    console.log(`Retrieved value for key ${key}: ${value}`);
    return value;
  }

  async set(key, value, duration) {
    try {
    console.log(`Setting key: ${key} with value: ${value} for duration: ${duration}`);
    await this.setAsync(key, value, 'EX', duration);
    console.log(`Successfully set key: ${key}`);
  } catch (error) {
    console.error(`Error setting key ${key}:`, error);
    throw error;
  }
}
  async keys(pattern) {
    return new Promise((resolve, reject) => {
      this.client.keys(pattern, (err, keys) => {
        if (err) reject(err);
        else resolve(keys);
      });
    });
  }

  async del(key) {
    await this.delAsync(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;