import { MongoClient } from 'mongodb';

// Set database connection details.
const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${HOST}:${PORT}`;

// Define the DBClient class to manage MongoDB operations.
class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
    this.client.connect().then(() => {
      this.db = this.client.db(`${DATABASE}`);
    }).catch((err) => {
      console.log(err);
    });
  }

  //check if the database client is connected.
  isAlive() {
    return this.client.isConnected();
  }

  // get the count of documents in the 'users' collection.
  async nbUsers() {
    const users = this.db.collection('users');
    const usersNum = await users.countDocuments();
    return usersNum;
  }

  // get the count of documents in the 'files' collection.
  async nbFiles() {
    const files = this.db.collection('files');
    const filesNum = await files.countDocuments();
    return filesNum;
  }
}

// Create an instance of the DBClient.
const dbClient = new DBClient();
module.exports = dbClient;

