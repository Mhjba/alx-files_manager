import redisClient from '../utils/redis.js';
import dbClient from '../utils/db.js';


class AppController {
  static getStatus(request, response) {
    response.status(200).json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
  }

  static async getStats(request, response) {
    const usersClient = await dbClient.nbUsers();
    const filesClient = await dbClient.nbFiles();
    response.status(200).json({ users: usersClient, files: filesClient });
  }
}

export default AppController;
