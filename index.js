import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017'; // replace with your MongoDB URL
const dbName = 'testdb';

app.use(express.static('public'));

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const collection = db.collection('messages');

    app.get('/', (req, res) => {
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Node.js with MongoDB</title>
          </head>
          <body>
            <h1 style="color: red;">Happy</h1>
          </body>
        </html>
      `);
    });

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
