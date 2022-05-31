const { MongoClient, ServerApiVersion } = require('mongodb');

const url = 'mongodb+srv://admin:site-cha@cluster0.42h1j.mongodb.net/?retryWrites=true&w=majority'; 
const client = new MongoClient(url, {
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

const cliente = {
    nome: "exemplo",
    email: "exemplo@exemplo.com"
  }

client.connect((err) => {
  const collection = client.db('site-cha').collection('clientes');
  console.log('collection created');
  collection.insertOne(cliente);
  console.log('document inserted');
  if(err) throw err;
});
client.close();
