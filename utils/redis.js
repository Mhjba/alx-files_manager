import redis from 'redis';

// Class to define methods for commonly used Redis commands
class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (error) => {
      console.error(`Redis client not connected to server: ${error}`);
    });

    this.client.on('connect', () => {
      console.log('Redis client connected to server');
    });
  }

  // Check connection status and report
  isAlive() {
    return this.client.connected;
  }

  // Get value for a given key from the Redis server
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, reply) => {
        if (error) {
          console.error(`Error fetching key ${key}: ${error}`);
          reject(error);
        } else {
          resolve(reply);
        }
      });
    });
  }

  // Set key-value pair to Redis server with expiration time
  async set(key, value, durationInSeconds) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, durationInSeconds, value, (error, reply) => {
        if (error) {
          console.error(`Error setting key ${key}: ${error}`);
          reject(error);
        } else {
          resolve(reply);
        }
      });
    });
  }

  // Delete key-value pair from Redis server
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error, reply) => {
        if (error) {
          console.error(`Error deleting key ${key}: ${error}`);
          reject(error);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;

