const db = require('./db');
const fs = require('fs');

db.initialize();

db.getAllData((err, data) => {
  if (err) {
    console.error('Error getting data:', err);
    process.exit(1);
  }

  let sql = '';

  // Create tables
  sql += `CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY,
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

CREATE TABLE IF NOT EXISTS wishlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  eventId INTEGER,
  userEmail TEXT,
  addedAt TEXT
);

CREATE TABLE IF NOT EXISTS registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  eventId INTEGER,
  userEmail TEXT,
  registeredAt TEXT,
  eventTitle TEXT
);

`;

  // Insert events
  data.events.forEach(event => {
    sql += `INSERT INTO events (id, title, category, date, time, location, description, bannerUrl, formLink, coordinator, clubName, status, createdAt, rejectionReason) VALUES (${event.id}, '${event.title.replace(/'/g, "''")}', '${event.category}', '${event.date}', '${event.time}', '${event.location}', '${event.description.replace(/'/g, "''")}', '${event.bannerUrl}', '${event.formLink}', '${event.coordinator}', '${event.clubName}', '${event.status}', '${event.createdAt}', '${event.rejectionReason}');\n`;
  });

  // Insert wishlist
  data.wishlist.forEach(item => {
    sql += `INSERT INTO wishlist (eventId, userEmail, addedAt) VALUES (${item.eventId}, '${item.userEmail}', '${item.addedAt}');\n`;
  });

  // Insert registrations
  data.registrations.forEach(reg => {
    sql += `INSERT INTO registrations (eventId, userEmail, registeredAt, eventTitle) VALUES (${reg.eventId}, '${reg.userEmail}', '${reg.registeredAt}', '${reg.eventTitle.replace(/'/g, "''")}');\n`;
  });

  fs.writeFileSync('campusconnect.sql', sql);
  console.log('Data exported to campusconnect.sql');
  process.exit(0);
});
