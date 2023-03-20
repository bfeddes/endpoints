const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const uri = 'mongodb+srv://brianfeddes:NetflixPassword@netflixdatabase.m4ijrna.mongodb.net/NetflixDatabase';
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

const port = process.env.PORT || 3000
app.get('/test', function(request, response) {
	response.type('text/plain')
	response.send('Node.js and Express running on port='+port)
})

app.listen(port, function() {
	console.log("Server is running at http://localhost:3000/")
})
