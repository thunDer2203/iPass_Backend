const bodyParser = require('body-parser');
const express = require('express')
const cors=require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');



const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName='passOp'
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())
client.connect();


app.get('/',async (req, res) => {
    const db=client.db(dbName);
    const collection = db.collection('documents');
const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

app.post('/',async (req, res) => {
    const password=req.body 
    const db=client.db(dbName);
    const collection = db.collection('documents');
const findResult = await collection.insertOne(password)
  res.send({success:true})
})

app.delete('/',async (req, res) => {
    const password=req.body 
    const db=client.db(dbName);
    const collection = db.collection('documents');
const findResult = await collection.deleteOne(password)
  res.send({success:true})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})