import redis from 'redis';

// class to define methods for commonly used redis commands
class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (error) => {
      console.error(`Redis client not connected to the server: ${error}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

// get value for given key from redis server
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

// set key value pair to redis server
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

// del key vale pair from redis server
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
