const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const server = express();

server.use(morgan('tiny'));
server.use(cors());

server.use(express.json());

const formsCadastro = ['pessoa1', 'pessoa2', 'pessoa3'];

server.get('/cadastrados/:index', (req, res) => {
    const { index } = req.params;

    return res.json(formsCadastro[index]);
});

server.get('/cadastrados', (req, res) => {
    return res.json(formsCadastro)
});

server.post('/cadastros', (req, res) => {
    const { name } = req.body;
    formsCadastro.push(name);

    return res.json(formsCadastro);
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

server.listen(3000);