const express = require("express")
const router = express.Router()
const db = require('../database/db')
const PDFDocument = require('pdfkit');





router.get('/payments', (req, res) => {
  db.query('SELECT * FROM payments', (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});



router.get('/invoice/:id', (req, res) => {
  const paymentId = req.params.id;

  const sql = `
    SELECT * FROM payments WHERE id = ?
  `;

  db.query(sql, [paymentId], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send('Database error');
    }

    if (results.length === 0) {
      console.log("No results found for paymentId:", paymentId);
      return res.status(404).send('Invoice not found');
    }

    const data = results[0];

    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', `attachment; filename=invoice_${data.payment_id}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    doc.fontSize(20).text('Auto a62 Invoice', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Invoice #: ${data.payment_id}`);
    doc.text(`Customer: ${data.customer_name}`);
    doc.text(`Car: ${data.car_model}`);
    doc.text(`Rental Code: ${data.rental_code}`);
    doc.text(`Amount: ${data.amount} Dh`);
    doc.text(`Payment Method: ${data.payment_method}`);
    doc.text(`Date: ${data.payment_date}`);
    doc.text(`Status: ${data.status}`);

    doc.end();
  });
  console.log("Requested Payment ID:", paymentId);
});





router.get('/filtered', (req, res) => {
  const { status, paymentMethod } = req.query;

  let query = 'SELECT * FROM payments WHERE 1=1 ';
  const params = [];
  if (status && status !== 'All') {
    query += ' AND status = ? ';
    params.push(status);
  }
  if (paymentMethod && paymentMethod !== 'All') {
    query += ' AND payment_method = ? ';
    params.push(paymentMethod);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
});




router.post('/payment/export', (req, res) => {
  const { status, paymentMethod } = req.body;

  let sql = `SELECT * FROM payments WHERE 1=1`;
  const params = [];


  if (status && status !== 'All Status') {
    sql += ` AND status = ?`;
    params.push(status);
  }

  if (paymentMethod && paymentMethod !== 'All') {
    sql += ` AND payment_method = ?`;
    params.push(paymentMethod);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).send('Database error');
    }

    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument({ margin: 30 });
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    doc.fontSize(20).text('Auto A62 - Payment Report', { align: 'center' });
    doc.moveDown();

    if (results.length === 0) {
      doc.text("No matching payments found.");
    } else {
      results.forEach((p, index) => {
        doc
          .fontSize(12)
          .text(`📄 Payment #${index + 1}`, { underline: true })
          .text(`- Customer: ${p.customer_name}`)
          .text(`- Car: ${p.car_model}`)
          .text(`- Rental Code: ${p.rental_code}`)
          .text(`- Amount: ${p.amount} Dh`)
          .text(`- Payment Method: ${p.payment_method}`)
          .text(`- Status: ${p.status}`)
          .text(`- Date: ${p.payment_date}`)
          .moveDown();
      });
    }

    doc.end();
  });
});




router.get('/revenue/weekly', (req, res) => {
  const sql = `
    SELECT 
  YEAR(payment_date) AS year,
  WEEK(payment_date, 1) AS week,
  STR_TO_DATE(CONCAT(YEAR(payment_date), WEEK(payment_date, 1), '1'), '%X%V%w') AS week_start_date,
  SUM(amount) AS weekly_revenue
FROM payments
WHERE payment_date >= DATE_SUB(CURDATE(), INTERVAL 8 WEEK)
GROUP BY year, week, week_start_date
ORDER BY year, week;

  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});



router.post('/payment', (req, res) => {
  
  const { customer_name, car_model, amount, payment_method, status } = req.body;
  const query = 'INSERT INTO payments (customer_name, car_model, amount, payment_method, status) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [customer_name, car_model, amount, payment_method, status || 'ongoing'], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    const insertedId = result.insertId;
    const paymentId = 'PAY' + insertedId;
    const updateQuery = 'UPDATE payments SET payment_id = ? WHERE id = ?';

    db.query(updateQuery, [paymentId, insertedId], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });
    })
      res.status(201).json({ message: 'Rental added', payment_id: paymentId });
    });
  });


  module.exports = router