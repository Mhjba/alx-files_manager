import { ObjectId } from 'mongodb';
import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    // Validate email and password
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Check if user already exists
    const existingUser = await dbClient.db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Already exist' });
    }

    // Hash the password
    const hashedPassword = sha1(password);

    // Insert new user into the database
    const result = await dbClient.db.collection('users').insertOne({
      email,
      password: hashedPassword,
    });

    // Respond with the new user's ID and email
    return res.status(201).json({
      id: result.insertedId,
      email,
    });
  }
}

export default UsersController;
