const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { getAllUsers, getUserById, getUserByName, deleteUserById, postUser, putUserById } = require('../db');

// JOI Şeması
const userSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required()
});

// GET - Tüm Kullanıcılar
router.get('/', async (req, res) => {
  try {
    const data = await getAllUsers();
    res.json(data);
  } catch (err) {
    res.success(data, messages.Successful);
  }
});

// GET - Kullanıcı ID'sine Göre Getir
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getUserById(id);
    if (data.success)
      return res.json(data);
    return res.status(404).json({ message: messages.NotFound });
  } catch (err) { 
    res.status(500).json({ message: err.message });
  }
});

//GET filter by name
router.get('/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const data = await getUserByName(name);
    if (data.success)
      return res.json(data);
    return res.status(404).json({ message: messages.NotFound });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - Kullanıcı Oluşturma
router.post('/', async(req, res) => {
  const { success, data } = await postUser(req.body)

  if(success){
      return res.json({success, data})
  }

  return res.status(500).json({success: false, message: 'Error'})
})

//Update User by Id
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const user = req.body
  const { success, data } = await putUserById(id, user)
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error'})
})

// Delete User by Id
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const { success, data } = await deleteUserById(id)
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error'})
})

module.exports = router;