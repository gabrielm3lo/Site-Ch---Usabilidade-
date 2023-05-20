const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const clienteSchema = new Schema({
    nome: String,
    sobrenome: String,
    email: String,
    pwd: String,
    nasc: String
});
const Cliente = mongoose.model('Cliente', clienteSchema, 'clientes');

module.exports = {
    Cliente
}