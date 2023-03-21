const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const Joi = require('joi');


const router = express.Router();
const db = new sqlite3.Database('User.db');

// JOI Şeması
const userSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required()
});

// GET - Tüm Kullanıcılar
router.get('/', async (req, res) => {
  const users = await db.all('SELECT * FROM users')
  res.success(users);
})


// GET - Kullanıcı ID'sine Göre Getir
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const user = await db.get('SELECT * FROM users WHERE id = ?', id)
  if (user) {
    res.success(user)
  } else {
    res.fail(`User with id ${id} not found`)
  }
})

// GET - İsme Göre Filtreleme
router.get('/search/:name', (req, res, next) => {
  const name = req.params.name;
  
  db.all(`SELECT * FROM users WHERE name LIKE '${name}%'`, (err, rows) => {
    if (err) {
      console.error('Error executing query: ' + err.message);
      return res.status(500).json({
        error: 'Could not retrieve users'
      });
    }
    return res.status(200).json(rows);
  });
});

// POST - Kullanıcı Oluşturma
router.post('/', async (req, res, next) => {
  const { name, surname } = req.body;

  try {
    await userSchema.validateAsync({ name, surname})
    const result = await db.run(
      'INSERT INTO users (name, surname) VALUES (?, ?)',
      [name, surname])
    const user = await db.get('SELECT * FROM users WHERE id = ?', result.lastID)
    res.success(user)
  } catch (err) {
    res.fail(err.details[0].message)
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name, surname } = req.body

  try {
    await userSchema.validateAsync({ name, surname })
    const result = await db.run(
      'UPDATE users SET name = ?, surname = ?, WHERE id = ?', //buraya bak
      [name, surname, id])
    if (result.changes > 0) {
      const user = await db.get('SELECT * FROM users WHERE id = ?', id)
      res.success(user)
    } else {
      res.fail(`User with id ${id} not found`)
    }
  } catch (err) {
    res.fail(err.details[0].message)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const result = await db.run('DELETE FROM users WHERE id = ?', id)
  if (result.changes > 0) {
    res.success(`User with id ${id} deleted successfully`)
  } else {
    res.fail(`User with id ${id} not found`)
  }
})

module.exports = router;