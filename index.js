// requiring
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const uri = 'mongodb+srv://brianfeddes:NetflixPassword@netflixdatabase.m4ijrna.mongodb.net/?retryWrites=true&w=majority'; // connection string
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use(express.static(__dirname + '/client'))

// redirecting so the default page will be the home page
app.get('/', (req, res) => {
	res.redirect('/home')
});

// this will be the home page
app.get('/home', (req, res) => {
	res.sendFile(__dirname + '/client/index.html')
});

// getting all movies and shows from all streaming services
app.get('/total', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db('NetflixDatabase').collection('NetflixCollection');
    const data = await collection.find({}).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  } catch (e) {
    console.error(e);
    res.status(500).send('There was an error on the server.');
  } finally {
    await client.close();
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});