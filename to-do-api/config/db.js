const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.ATLAS_URI || '';
const dbName = process.env.DB_NAME;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

let connection;
try {
  connection = client.connect();
} catch (error) {
  console.error(error);
}

const db = client.db(dbName);
module.exports = db;
