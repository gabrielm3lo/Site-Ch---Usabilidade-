const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const clienteSchema = new Schema({
    nome: String,
    sobrenome: String,
    email: String,
    nasc: String,
    tel: String, 
    pwd: String
});
const Cliente = mongoose.model('Cliente', clienteSchema, 'clientes');

module.exports = {
    Cliente
}