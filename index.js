const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const uri = 'mongodb+srv://brianfeddes:NetflixPassword@netflixdatabase.m4ijrna.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db('NetflixDatabase').collection('NetflixCollection');
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
