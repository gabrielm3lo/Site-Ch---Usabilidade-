const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./database/dbconnect');
const server = express();

server.use(morgan('tiny'));
server.use(cors());
server.use(express.json());

db.connect();

server.get('/cadastrados/:id', (req, res) => {
    const { id } = req.params;
    return res.json(db.getOne('clientes', id));
});

server.get('/cadastrados', (req, res) => {
    return res.json(db.getAll('clientes'));
});

server.post('/cadastros', (req, res) => {
    const { cliente } = req.body;
    return res.json(db.insert('clientes', cliente));
});

server.put('/cadastros/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    formsCadastro[index] = name;

    return res.json(formsCadastro);
});

server.delete('/cadastros/:index', (req, res) => {
    const { index } = req.params;

    formsCadastro.splice(index, 1);

    return res.json({ message: "A pessoa foi deletada" });
})

db.close();
server.listen(3000);