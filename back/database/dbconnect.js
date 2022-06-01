const { MongoClient, ServerApiVersion } = require('mongodb');

const url = 'mongodb+srv://admin:site-cha@cluster0.42h1j.mongodb.net/?retryWrites=true&w=majority'; 
const client = new MongoClient(url, {
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

function connect(){
    client.connect((err) => {
    if(err) throw err;
    console.log('connected to database');
  });
} 

function getAll(collection) {
  return client.db('site-cha').collection(collection).find();
}

function getOne(collection, id) {
  return client.db('site-cha').collection(collection).findOne(id);
}

function insert(collection, document) {
  client.db('site-cha').collection(collection).insertOne(document);
  console.log('document inserted');
  return document;
}

function update(collection, id, document) {
  client.db('site-cha').collection(collection).updateOne(id, document);
  console.log('document updated');
  return document;
}

function deleteOne(collection, id) {
  return client.db('site-cha').collection(collection).deleteOne(id);
}

function close() {
  client.close();
}
module.exports = { 
  connect,
  getAll,
  getOne,
  insert,
  update,
  deleteOne,
  close
 }; 