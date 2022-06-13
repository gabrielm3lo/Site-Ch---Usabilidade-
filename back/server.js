const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { Cliente } = require("./clienteModel");
const server = express();
const mongoose = require("mongoose");

server.use(morgan("tiny"));
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const uri =
  "mongodb+srv://admin:site-cha@cluster0.42h1j.mongodb.net/site-cha?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB and server started");
  })
  .catch((err) => {
    console.log(err);
});

server.get("/cadastrados", async (req, res, next) => {
  const cliente = await Cliente.find({})
  .catch((err) => {
    console.log(err);
  });

  return res.status(200).json(cliente);
});

server.get("/cadastrados/:email", async (req, res, next) => {
  const cliente = await Cliente.findOne( {email: req.params.email} )
  .catch((err) => {
    console.log(err);
  });
  return res.status(200).json(cliente);
});

server.post("/cadastrados/login", async (req, res) => {
  const login = await Cliente.findOne(req.body)
  .catch((err) => {
    console.log(err);
  });

  if(login == null){
    return res.status(401).send(false);
  }
  return res.status(200).send(true);
})

server.post("/cadastrados", async (req, res) => {
  const cliente = new Cliente(req.body);

  await Cliente.create(cliente).then(() => {
    console.log("document inserted");    
  })
  .catch((err) => {
    console.log(err);
  });

  return res.status(201).json(cliente);
});

server.put("/cadastrados/:email", async (req, res) => {
  const email = req.params.email;

  await Cliente.findOneAndUpdate({ email: email }, req.body)
  .catch((err) => {
    console.log(err);
  });

  return res.status(201).json({ message: "Dados atualizados" });
});

server.delete("/cadastrados/:email", async (req, res) => {
  const email = req.params.email;

  await Cliente.findOneAndRemove({ email: email })
  .catch((err) => {
    console.log(err);
  });

  return res.status(200).json({ message: "Cliente deletado" });
});

server.listen(3000);
