import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

const client = new pg.Client({
    // TODO: Replace "postgres://localhost/example_db" with process.env.DATABASE_URL
    connectionString: process.env.DATABASE_URL
  });
  
  await client.connect();
  
  app.use(express.static("public"));
  
  app.get("/api/students", (_, res) => {
    client.query("SELECT * FROM student").then((data) => {
      res.json(data.rows);
    });
  });
  
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}.`);
  });