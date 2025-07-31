const express = require('express');
const router = express.Router();
const db = require('../database/db');






// GET /review/reviews
router.get('/reviews', (req, res) => {
  const sql = `
    SELECT
      r.*,
      u.fullname AS user_fullname,
      c.brand AS car_brand,
      c.model AS  car_model
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    JOIN cars c ON r.car_id = c.id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

router.get('/:id/reviews', (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT
      r.*,
      u.fullname AS user_fullname
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.car_id = ?
    ORDER BY r.created_at DESC
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(results);
  });
});


router.get('/:id/reviews/stats', (req, res) => {
  const carId = req.params.id;

  const sql = `
    SELECT 
      COUNT(*) AS totalReviews,
      ROUND(AVG(rating), 1) AS averageRating,
      SUM(rating = 5) AS '5',
      SUM(rating = 4) AS '4',
      SUM(rating = 3) AS '3',
      SUM(rating = 2) AS '2',
      SUM(rating = 1) AS '1'
    FROM reviews
    WHERE car_id = ?
  `;

  db.query(sql, [carId], (err, results) => {
    if (err) {
      console.error("Error fetching review stats:", err);
      return res.status(500).json({ error: 'Server error' });
    }

    const row = results[0];
    const breakdown = {
      5: row['5'],
      4: row['4'],
      3: row['3'],
      2: row['2'],
      1: row['1']
    };

    res.json({
      totalReviews: row.totalReviews,
      averageRating: row.averageRating,
      breakdown
    });
  });
});



router.post('/reviews', (req, res) => {
  const { user_id, car_id, rating, comment } = req.body;

  if (!user_id || !car_id || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'info incorect' });
  }

  db.query(
    'INSERT INTO reviews (user_id, car_id, rating, comment) VALUES (?, ?, ?, ?)',
    [user_id, car_id, rating, comment],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error adding review' });
      }

      db.query(
        'SELECT AVG(rating) AS avgRating, COUNT(*) AS count FROM reviews WHERE car_id = ?',
        [car_id],
        (err, rows) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error fetching rating' });
          }

          if (!rows || rows.length === 0) {
            return res.status(500).json({ error: 'Unexpected DB response' });
          }

          const avg = rows[0].avgRating !== null ? Number(rows[0].avgRating).toFixed(1) : 0;
          const count = rows[0].count || 0;

          db.query(
            'UPDATE cars SET rating = ?, review_count = ? WHERE id = ?',
            [avg, count, car_id],
            (err, result) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error updating car rating' });
              }

              res.status(201).json({
                message: 'Review added successfully',
                avgRating: avg,
                reviewCount: count
              });
            }
          );
        }
      );
    }
  );
});



module.exports = router;
