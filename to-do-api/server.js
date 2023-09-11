const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const client = require('./config/db.js');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/tasks', async (req, res) => {
  try {
    const { text } = req.body;

    const collection = await client.collection('record');
    const result = await collection.insertOne({ text: text });

    if (result.acknowledged) {
      let todos = await collection.find({}).toArray();
      res.json({ success: true, data: todos });
    } else {
      res.json({ success: false, msg: 'something wrong' });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get('/tasks', async (req, res) => {
  try {
    let collection = await client.collection('record');
    let results = await collection.find({}).toArray();

    res.json({ tasks: results });
  } catch (error) {
    console.log(error);
  }
});

app.put('/tasks/:taskId', async (req, res) => {
  try {
    const { text } = req.body;
    const query = { _id: new ObjectId(req.params.taskId) };
    const collection = await client.collection('record');
    const result = await collection.updateOne(query, { $set: { text: text } });

    if (result.acknowledged) {
      let todos = await collection.find({}).toArray();
      res.json({ success: true, data: todos });
    } else {
      res.json({ success: false, msg: 'something wrong' });
    }
  } catch (error) {
    console.log(error);
  }
});

app.delete('/tasks/:taskId', async (req, res) => {
  const query = { _id: new ObjectId(req.params.taskId) };

  const collection = client.collection('record');
  let result = await collection.deleteOne(query);

  if (result.acknowledged) {
    let chats = await collection.find({}).toArray();
    res.json({ success: true, chats: chats });
  } else {
    res.json({ success: false, msg: 'something went wrong' });
  }
});

app.listen(4000, () => {
  console.log('listening to port 4000');
});
