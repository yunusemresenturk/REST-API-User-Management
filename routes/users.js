const express = require('express');
const { PromisedDatabase } = require('promised-sqlite3');
const { promisify } = require('util');
const Joi = require('joi');
const router = express.Router();
const db = new PromisedDatabase();



// JOI Şeması
const userSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required()
});

// GET - Tüm Kullanıcılar
router.get('/', async (req, res) => {
  try {
    await db.open('User.db');
    await db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, surname TEXT NOT NULL)");
    const data = await db.all('SELECT * FROM users');
    res.success(data, messages.Successful);
  } catch (err) {
    res.fail(messages.Try_Again);
  }
});

// GET - Kullanıcı ID'sine Göre Getir
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.open('User.db');
    const data = await db.get(`SELECT * FROM users WHERE id = ?`, [id]);
    if (data)
      return res.success(data, messages.Successful);
    return res.fail(messages.NotFound);
  } catch (err) {
    res.fail(messages.Error);
  }
});

// GET - İsme Göre Filtreleme
router.get('/search/:name', async (req, res) => {
  try {
    const name = req.params.name;
    await db.open('User.db');
    const data = await db.all(`SELECT * FROM users WHERE name LIKE '${name}%'`);
    res.success(data, messages.Successful);
  } catch (err) {
    res.fail(messages.Try_Again);
  } finally {
    await db.close();
  }
});

// POST - Kullanıcı Oluşturma
router.post('/', async (req, res) => {
  try {
    const { name, surname } = req.body;
    const { error } = userSchema.validate({ name, surname });
    if (error)
      return res.fail(messages.Try_Again);
    await db.open('User.db');
    const data = await db.run(`INSERT INTO users(name, surname) VALUES(?, ?)`, [name, surname]);
    res.success(data, messages.Successful);
  } catch (err) {
    res.fail(message.Error);
  } finally {
    await db.close(); 
  }
});

// PUT - Kullanıcı Güncelleme
router.put('/:id', async (req, res) => {
  try {
    const { name, surname } = req.body;
    const id = req.params.id;
    const { error } = userSchema.validate({ name, surname });
    if (error) {
      res.fail(messages.Try_Again);
    }
    await db.open('User.db');
    await db.run(`UPDATE users SET name = ?, surname = ? WHERE id = ?`, [name, surname, id]);
    const data = await db.get(`SELECT * FROM users WHERE id = ?`, [id]);
    res.success(data, messages.Successful);
  } catch (err) {
    res.fail(messages.Try_Again);
  } finally {
    await db.close(); 
  }
});

// DELETE - Kullanıcı Silme
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.open('User.db');
    await db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, surname TEXT NOT NULL)");
    const data = await db.run(`DELETE FROM users WHERE id = ?`, [id]);
    if (!data.changes) {
      return res.fail(messages.Try_Again);
    }
    res.success(messages.Successful);
  } catch (err) {
    res.fail(messages.Try_Again);
  } finally {
    await db.close(); // veritabanı bağlantısını kapatır
  }
});

module.exports = router;