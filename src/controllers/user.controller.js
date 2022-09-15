const express = require('express');

const route = express.Router();

const { User } = require('../database/models');

route.get('/search/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.query;
    const user = await User.findOne({ where: { id, email } });

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado!' });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) return res.status(404).json({ message: 'Usuário não encontrado!' });

  return res.status(200).json(user);
});

route.get('/', async (_req, res) => {
  const users = await User.findAll();
  return res.status(200).json(users);
});

route.post('/', async (req, res, next) => {
  try {
    const { fullName, email, phoneNum } = req.body;
    const existEmail = await User.findOne({ where: { email } });

    if (!existEmail) {
      const newUser = await User.create({ fullName, email, phoneNum });
      return res.status(201).json(newUser);
    }

    return res.status(409).json({ message: 'Usuário com este email já existe!' });
  } catch (error) {
    return next(error);
  }
});

route.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fullName, email, phoneNum } = req.body;
    const [updateUser] = await User.update(
      { fullName, email, phoneNum },
      { where: { id } },
    );

    if (!updateUser) return res.status(404).json({ message: 'Usuário não encontrado!' });

    return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  } catch (error) {
    return next(error);
  }
});

route.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.destroy(
      { where: { id } },
    );

    if (!deleteUser) return res.status(404).json({ message: 'Usuário não encontrado!' });

    return res.status(200).json({ message: 'Usuário removido com sucesso!' });
  } catch (error) {
    return next(error);
  }
});

module.exports = route;
