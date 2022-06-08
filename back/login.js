/*function getOne(collection, id) {
    return client.db('site-cha').collection(collection).findOne(id);
  }
  server.get('/cadastrados/login', async (req, res) => {
      const email: req.body.email;
      const pwd: req.body.pwd;
  
      await Cliente.findOneAndUpdate({email: email}, req.body);
      await Cliente.save();
  
      return res.status(201).json({ message: 'Dados atualizados' });
  });*/