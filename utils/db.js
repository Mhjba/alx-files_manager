import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${HOST}:${PORT}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
    this.client.connect().then(() => {
      this.db = this.client.db(`${DATABASE}`);
    }).catch((err) => {
      console.log(err);
    });
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const users = this.db.collection('users');
    const usersClient = await users.countDocuments();
    return usersClient;
  }

  async nbFiles() {
    const files = this.db.collection('files');
    const filesClient = await files.countDocuments();
    return filesClient;
  }
}

const dbClient = new DBClient();
export default dbClient;
