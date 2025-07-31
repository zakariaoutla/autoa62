const express = require("express")
const router = express.Router()
const db = require('../database/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 's3cr3tK3y!@#2025$%^&*()_+randomStuff';



// Route to register a new user
router.post('/register', async (req, res) => {
  const { fullname, email, password, phone } = req.body;

  if (!fullname || !email || !password || !phone) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (fullname, email, password, phone) VALUES (?, ?, ?, ?)';
    db.query(sql, [fullname, email, hashedPassword, phone, 'user'], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error during registration' });
      }

      const userId = result.insertId;

      const getUserSql = 'SELECT id, email, role FROM users WHERE id = ?';
      db.query(getUserSql, [userId], (err2, users) => {
        if (err2 || users.length === 0) {
          return res.status(500).json({ message: 'Error fetching user after registration' });
        }

        const user = users[0];

        const token = jwt.sign(
          { userId: user.id, email: user.email, role: user.role },
          JWT_SECRET,
          { expiresIn: '7h' }
        );

        return res.status(200).json({
          message: 'User registered',
          token,
          user: {
            fullname: user.fullname,
            email: user.email,
          }
        });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});






// Route to login a user
router.post('/login', (req, res) => {

  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({ message: 'Invalid request. Please check your input.' });
  }


  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error while accessing the database.' });
    }


    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: '7h' }
    );
    res.status(200).json({
      message: 'User log in',
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
      }
    });
  });
});


module.exports = router