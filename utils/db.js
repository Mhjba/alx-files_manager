
import mongodb from 'mongodb';
import Collection from 'mongodb/lib/collection';
import { existsSync, readFileSync } from 'fs';


const envLoader = () => {
  const nodeEnv = process.env.NPM_LIFECYCLE_EVENT || 'dev';
  const path = nodeEnv.includes('test') || nodeEnv.includes('cover') ? '.env.test' : '.env';

  if (existsSync(path)) {
    const data = readFileSync(path, 'utf-8').trim().split('\n');

    for (const line of data) {
      const delimPosition = line.indexOf('=');
      const variable = line.substring(0, delimPosition);
      const envValue = line.substring(delimPosition + 1);
      process.env[variable] = envValue;
    }
  }
};

class DBClient {
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const URL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(URL, { useUnifiedTopology: true });
    this.client.connect();
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  async usersCollection() {
    return this.client.db().collection('users');
  }

  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
