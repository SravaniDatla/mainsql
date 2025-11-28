CREATE TABLE IF NOT EXISTS events (
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

INSERT INTO events (id, title, category, date, time, location, description, bannerUrl, formLink, coordinator, clubName, status, createdAt, rejectionReason) VALUES (1761138365225, 'jack prerelease event', 'cultural', '2025-10-28', '20:35', 'SEETHA AUDITORIUM', 'urdreaserxgfctrzds', '', 'https://docs.google.com/forms/d/e/1FAIpQLScXGuBFhgeImNvBTdecJ08UQrZ45Bpgr-1fvtAZy644De08mg/viewform', 'coordinator@college.edu', 'Tech Club', 'approved', '2025-10-22T13:06:05.225Z', 'null');
INSERT INTO registrations (eventId, userEmail, registeredAt, eventTitle) VALUES (1761138365225, 'student@college.edu', '2025-10-22T13:23:46.242Z', 'jack prerelease event');
