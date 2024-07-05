DROP TABLE IF EXISTS entries;

CREATE TABLE entries(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    temperature REAL NOT NULL,
    unit TEXT CHECK(unit IN('C', 'F')) NOT NULL
);