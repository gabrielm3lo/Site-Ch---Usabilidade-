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
  const cadastrados = await Cliente.find({});

  return res.status(200).json(cadastrados);
}).catch((err) => {
    console.log(err);
});

server.post("/cadastrados", async (req, res) => {
  const cliente = new Cliente(req.body);

  await Cliente.create(cliente);
  console.log("document inserted");

  return res.status(201).json(cliente);
}).catch((err) => {
    console.log(err);
});

server.put("/cadastrados/:email", async (req, res) => {
  const email = req.params.email;

  await Cliente.findOneAndUpdate({ email: email }, req.body);

  return res.status(201).json({ message: "Dados atualizados" });
}).catch((err) => {
    console.log(err);
});

server.delete("/cadastrados/:email", async (req, res) => {
  const email = req.params.email;

  await Cliente.findOneAndRemove({ email: email }, req.body);

  return res.status(200).json({ message: "Cliente deletado" });
}).catch((err) => {
    console.log(err);
});

server.listen(3000);
