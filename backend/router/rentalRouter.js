const express = require("express")
const router = express.Router()
const db = require('../database/db')




router.get('/rentals', (req, res) => {
  const sql = `
    SELECT
      r.id AS rental_id,
      u.fullname AS customer,
      CONCAT(c.brand, ' ', c.model) AS vehicle,
      c.transmission,
      c.fuel_type,
      r.rental_date,
      r.return_date,
      DATEDIFF(IFNULL(r.return_date, CURDATE()), r.rental_date) AS duration_days,
      r.total_amount,
      r.status
    FROM rentals r
    JOIN users u ON r.user_id = u.id
    JOIN cars c ON r.car_id = c.id
    ORDER BY r.rental_date DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching rentals:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    results.forEach(r => {
      r.total_amount = parseFloat(r.total_amount) || 0;
    });
    res.json(results);
  });
});


router.get('/rentals/:id', (req, res) => {
  const rentalId = req.params.id;

  const sql = `
        SELECT
            r.id AS rental_id,
            u.fullname AS customer,
            c.brand,
            c.model,
            c.transmission,
            c.fuel_type,
            c.filename,
            r.rental_date,
            r.return_date,
            r.total_amount,
            r.status
        FROM rentals r
        JOIN users u ON r.user_id = u.id
        JOIN cars c ON r.car_id = c.id
        WHERE r.id = ?
    `;

  db.query(sql, [rentalId], (err, results) => {
    if (err) {
      console.error("Error fetching rental by ID:", err);
      return res.status(500).json({ error: "Database query error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Rental not found" });
    }

    res.json(results[0]);
  });
});

// Cancel rental by updating status
router.put('/cancel/:id', (req, res) => {
  const rentalId = req.params.id;
  const sql = `UPDATE rentals SET status = 'cancelled' WHERE id = ?`;

  db.query(sql, [rentalId], (err, result) => {
    if (err) {
      console.error("Cancel error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Rental cancelled" });
  });
});




router.get('/rental/:id/pending', (req, res) => {
  const { id } = req.params;
  const sql = `
      SELECT r.*, c.brand, c.model, c.filename
      FROM rentals r
      JOIN cars c ON r.car_id = c.id
      WHERE r.user_id = ? AND (r.status = 'pending' OR r.status = 'active')
      ORDER BY r.rental_date DESC
    `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error fetching user rentals:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// GET rental history (completed or cancelled)
router.get("/:userId/history", (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT r.*, c.brand , c.model, c.filename
    FROM rentals r
    JOIN cars c ON r.car_id = c.id
    WHERE r.user_id = ? AND (r.status = 'completed' OR r.status = 'cancelled')
    ORDER BY r.rental_date DESC
    
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching rental history:", err);
      return res.status(500).json({ message: "Server error fetching history" });
    }
    res.status(200).json(results);
  });
});







router.get('/details', (req, res) => {
  const sql = `
    SELECT 
  r.id AS rental_id,
  u.fullname AS customer_name,
  c.brand AS vehicle_brand,
  c.model AS vehicle_model,
  r.rental_date,
  r.return_date,
  r.total_amount AS amount,
  r.status
FROM rentals r
JOIN users u ON r.user_id = u.id
JOIN cars c ON r.car_id = c.id
ORDER BY r.id DESC;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('DB query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.json(results);
  });
});


router.get('/stats', (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM users WHERE status = 'active') AS activeCustomers,
      (SELECT COUNT(*) FROM rentals WHERE LOWER(status) = 'active') AS activeRentals,
      (SELECT COUNT(*) FROM rentals WHERE LOWER(status) = 'completed') AS completedRentals,
      (SELECT COUNT(*) FROM rentals WHERE LOWER(status) = 'pending') AS inProcessRentals,
      (SELECT COUNT(*) FROM rentals WHERE LOWER(status) = 'cancelled') AS cancelledRentals,
      (SELECT COALESCE(SUM(total_amount), 0) FROM rentals) AS totalRevenue,
      (SELECT COALESCE(SUM(total_amount)/COUNT(DISTINCT user_id), 0) FROM rentals) AS avgRevenuePerCustomer
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('DB stats error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results[0]);
  });
});





router.patch('/rentals/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ['active', 'cancelled', 'pending', 'completed'];
  if (!allowedStatuses.includes(status.toLowerCase())) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  const sql = `UPDATE rentals SET status = ? WHERE id = ?`;
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error('Error updating status:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Rental not found' });
    }
    res.json({ message: 'Status updated successfully' });
  });
});




router.get('/dashboard-stats', (req, res) => {
  const queries = {
    totalVehicles: 'SELECT COUNT(*) AS total_vehicles FROM cars;',
    newVehiclesThisWeek: `
      SELECT COUNT(*) AS new_vehicles_this_week FROM cars
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);
    `,
    newVehiclesLastWeek: `
      SELECT COUNT(*) AS new_vehicles_last_week FROM cars
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 14 DAY)
      AND created_at < DATE_SUB(CURDATE(), INTERVAL 7 DAY);
    `,
    activeRentals: "SELECT COUNT(*) AS active_rentals FROM rentals WHERE status = 'active';",
    newActiveRentalsYesterday: `
      SELECT COUNT(*) AS new_active_rentals_yesterday FROM rentals
      WHERE status = 'active'
      AND created_at >= DATE_SUB(CURDATE(), INTERVAL 1 DAY);
    `,
    totalCustomers: 'SELECT COUNT(*) AS total_customers FROM users;',
    newCustomersThisMonth: `
      SELECT COUNT(*) AS new_customers_this_month FROM users
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH);
    `,
    monthlyRevenue: `
      SELECT SUM(amount) AS monthly_revenue FROM payments
      WHERE YEAR(payment_date) = YEAR(CURDATE()) AND MONTH(payment_date) = MONTH(CURDATE());
    `,
    lastMonthRevenue: `
      SELECT SUM(amount) AS last_month_revenue FROM payments
      WHERE YEAR(payment_date) = YEAR(DATE_SUB(CURDATE(), INTERVAL 1 MONTH))
      AND MONTH(payment_date) = MONTH(DATE_SUB(CURDATE(), INTERVAL 1 MONTH));
    `
  };

  db.query(queries.totalVehicles, (err, resultVehicles) => {
    if (err) return res.status(500).send(err);

    db.query(queries.newVehiclesThisWeek, (err, resultNewVehiclesThisWeek) => {
      if (err) return res.status(500).send(err);

      db.query(queries.newVehiclesLastWeek, (err, resultNewVehiclesLastWeek) => {
        if (err) return res.status(500).send(err);

        db.query(queries.activeRentals, (err, resultRentals) => {
          if (err) return res.status(500).send(err);

          db.query(queries.newActiveRentalsYesterday, (err, resultNewActiveRentalsYesterday) => {
            if (err) return res.status(500).send(err);

            db.query(queries.totalCustomers, (err, resultCustomers) => {
              if (err) return res.status(500).send(err);

              db.query(queries.newCustomersThisMonth, (err, resultNewCustomersThisMonth) => {
                if (err) return res.status(500).send(err);

                db.query(queries.monthlyRevenue, (err, resultMonthlyRevenue) => {
                  if (err) return res.status(500).send(err);

                  db.query(queries.lastMonthRevenue, (err, resultLastMonthRevenue) => {
                    if (err) return res.status(500).send(err);

                    const monthlyRevenueRaw = resultMonthlyRevenue[0].monthly_revenue;
                    const lastMonthRevenueRaw = resultLastMonthRevenue[0].last_month_revenue;

                    const monthlyRevenue = parseFloat(monthlyRevenueRaw) || 0;
                    const lastMonthRevenue = parseFloat(lastMonthRevenueRaw) || 0;

                    const growth = lastMonthRevenue > 0
                      ? ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
                      : 0;

                    res.json({
                      totalVehicles: resultVehicles[0].total_vehicles,
                      newVehiclesThisWeek: resultNewVehiclesThisWeek[0].new_vehicles_this_week,
                      newVehiclesLastWeek: resultNewVehiclesLastWeek[0].new_vehicles_last_week,
                      activeRentals: resultRentals[0].active_rentals,
                      newActiveRentalsYesterday: resultNewActiveRentalsYesterday[0].new_active_rentals_yesterday,
                      totalCustomers: resultCustomers[0].total_customers,
                      newCustomersThisMonth: resultNewCustomersThisMonth[0].new_customers_this_month,
                      monthlyRevenue: monthlyRevenue.toFixed(2),
                      growth: growth.toFixed(2),
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});







router.get('/rental/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM rentals WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Rental not found' });
    res.json(results[0]);
  });
});


router.post('/available-cars', (req, res) => {
  const { pickup_city, dropoff_city, rental_date, return_date } = req.body;

  if (!pickup_city || !dropoff_city || !rental_date || !return_date) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const query = `
    SELECT * FROM cars 
    WHERE city = ?
    AND id NOT IN (
      SELECT car_id FROM rentals
      WHERE (
        (? < return_date AND ? > rental_date)
        OR (? < return_date AND ? > rental_date)
      )
    )
  `;

  db.query(query, [
    pickup_city,
    rental_date,
    rental_date,
    return_date,
    return_date,
  ], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
    res.json(results);
  });
});





router.post('/rentals', (req, res) => {
  const { user_id, car_id, rental_date, return_date, total_amount, status } = req.body;
  const query = 'INSERT INTO rentals (user_id, car_id, rental_date, return_date, total_amount, status) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, [user_id, car_id, rental_date, return_date, total_amount, status || 'pending'], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Rental added', rentalId: result.insertId });
  });
});



router.put('/rentals/:id', (req, res) => {
  const id = req.params.id;
  const { user_id, car_id, rental_date, return_date, total_amount, status } = req.body;
  const query = `
    UPDATE rentals 
    SET user_id = ?, car_id = ?, rental_date = ?, return_date = ?, total_amount = ?, status = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `;

  db.query(query, [user_id, car_id, rental_date, return_date, total_amount, status, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Rental not found' });
    res.json({ message: 'Rental updated' });
  });
});




router.delete('/rentals/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM rentals WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Rental not found' });
    res.json({ message: 'Rental deleted' });
  });
});



module.exports = router