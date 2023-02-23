CREATE TABLE IF NOT EXISTS  users (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(20) NOT NULL,
  "email" VARCHAR(100) UNIQUE NOT NULL,
  "password" VARCHAR(120) NOT NULL,
  "admin" BOOLEAN NOT NULL DEFAULT FALSE,
  "active" BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO
users ("name", "email", "password", "admin", "active")
VALUES('teste3', 'teste3@gmail.com', '123456', 'true', 'true')
RETURNING "id","name", "email", "admin", "active"; 


SELECT * FROM users;

DROP TABLE users ;