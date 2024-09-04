import { createClient } from 'redis';
import { promisify } from 'util';
/**
 * Represents a Redis client used to make connections.
 */
class RedisClient {
  /**
   * Creates a new RedisClient instance
   */
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.error('Cnnection error:', err.message || err.toString());
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  /**
   * Checks if the client is still connected.
   * @returns {boolean}
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * Returns the value of the given key.
   * @param {String} key The key of the item to get.
   * @returns {String | Object}
   */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * Stores the given value in the given key.
   * @param {String} key The key of the item to store.
   * @param {String | Number | Boolean} value The val of the item to store.
   * @param {Number} duration The expiration of the item in seconds.
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
  }

  /**
   * Removes the given key.
   * @param {String} key The key to be remove.
   * @returns {Promise<void>}
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
