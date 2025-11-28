require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

// Serve frontend static files
app.use(express.static(path.join(__dirname)));

// Initialize DB
db.initialize();

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Get entire dataset
app.get('/api/data', (req, res) => {
  db.getAllData((err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Replace entire dataset (used by frontend to save)
app.post('/api/data', (req, res) => {
  const payload = req.body;
  db.replaceAllData(payload, err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`CampusConnect backend listening on http://localhost:${PORT}`);
});
