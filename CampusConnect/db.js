const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/campusconnect',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

function initialize() {
  const createEventsTable = `
    CREATE TABLE IF NOT EXISTS events (
      id BIGINT PRIMARY KEY,
      title TEXT,
      category TEXT,
      date TEXT,
      time TEXT,
      location TEXT,
      description TEXT,
      bannerUrl TEXT,
      formLink TEXT,
      coordinator TEXT,
      clubName TEXT,
      status TEXT,
      createdAt TEXT,
      rejectionReason TEXT
    );
  `;

  const createWishlistTable = `
    CREATE TABLE IF NOT EXISTS wishlist (
      id SERIAL PRIMARY KEY,
      eventId BIGINT,
      userEmail TEXT,
      addedAt TEXT
    );
  `;

  const createRegistrationsTable = `
    CREATE TABLE IF NOT EXISTS registrations (
      id SERIAL PRIMARY KEY,
      eventId BIGINT,
      userEmail TEXT,
      registeredAt TEXT,
      eventTitle TEXT
    );
  `;

  pool.query(createEventsTable, (err) => {
    if (err) console.error('Error creating events table:', err);
    else console.log('Events table ready');
  });

  pool.query(createWishlistTable, (err) => {
    if (err) console.error('Error creating wishlist table:', err);
    else console.log('Wishlist table ready');
  });

  pool.query(createRegistrationsTable, (err) => {
    if (err) console.error('Error creating registrations table:', err);
    else console.log('Registrations table ready');
  });
}

function getAllData(callback) {
  const data = {};
  pool.query('SELECT * FROM events', (err, result) => {
    if (err) return callback(err);
    data.events = result.rows;
    pool.query('SELECT * FROM wishlist', (err2, result2) => {
      if (err2) return callback(err2);
      data.wishlist = result2.rows;
      pool.query('SELECT * FROM registrations', (err3, result3) => {
        if (err3) return callback(err3);
        data.registrations = result3.rows;
        callback(null, data);
      });
    });
  });
}

function replaceAllData(newData, callback) {
  (async () => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM events');
      await client.query('DELETE FROM wishlist');
      await client.query('DELETE FROM registrations');

      // Insert events using parameterized queries to avoid SQL injection
      if (Array.isArray(newData.events) && newData.events.length > 0) {
        const insertEventText = `INSERT INTO events (id, title, category, date, time, location, description, bannerUrl, formLink, coordinator, clubName, status, createdAt, rejectionReason) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`;
        for (const e of newData.events) {
          const vals = [
            e.id || Date.now(),
            e.title || null,
            e.category || null,
            e.date || null,
            e.time || null,
            e.location || null,
            e.description || null,
            e.bannerUrl || null,
            e.formLink || null,
            e.coordinator || null,
            e.clubName || null,
            e.status || null,
            e.createdAt || null,
            e.rejectionReason || null
          ];
          await client.query(insertEventText, vals);
        }
      }

      // Insert wishlist
      if (Array.isArray(newData.wishlist) && newData.wishlist.length > 0) {
        const insertWishlistText = `INSERT INTO wishlist (eventId, userEmail, addedAt) VALUES ($1,$2,$3)`;
        for (const w of newData.wishlist) {
          const vals = [w.eventId || null, w.userEmail || null, w.addedAt || null];
          await client.query(insertWishlistText, vals);
        }
      }

      // Insert registrations
      if (Array.isArray(newData.registrations) && newData.registrations.length > 0) {
        const insertRegText = `INSERT INTO registrations (eventId, userEmail, registeredAt, eventTitle) VALUES ($1,$2,$3,$4)`;
        for (const r of newData.registrations) {
          const vals = [r.eventId || null, r.userEmail || null, r.registeredAt || null, r.eventTitle || null];
          await client.query(insertRegText, vals);
        }
      }

      await client.query('COMMIT');
      callback(null);
    } catch (err) {
      try { await client.query('ROLLBACK'); } catch (e) { /* ignore */ }
      callback(err);
    } finally {
      client.release();
    }
  })().catch(err => callback(err));
}

module.exports = {
  pool,
  initialize,
  getAllData,
  replaceAllData
};
