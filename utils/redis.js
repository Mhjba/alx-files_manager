import redis from 'redis';
import { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.getAsync = promisify(this.client.get).bind(this.client);

    this.client.on('error', (error) => {
      console.error(`Redis client not connected to the server:: ${error}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, reply) => {
        if (error) {
          reject(error);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async set(key, value, durationInSeconds) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, durationInSeconds, value, (error, reply) => {
        if (error) {
          reject(error);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error, reply) => {
        if (error) {
          reject(error);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
