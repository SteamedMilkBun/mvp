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

app.get("/bakery", (req, res) => {
  client.query("SELECT * FROM bakery")
  .then((data) => {
    console.log(data.rows);
    res.json(data.rows);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
});

app.get("/person", (req, res) => {
  client.query("SELECT * FROM person")
  .then((data) => {
    console.log(data.rows);
    res.json(data.rows);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
});

app.get("/person/:name", (req, res) => {
  const name = JSON.stringify(req.params.name);
  console.log(`Queried ${req.body.name}, stringified: ${name}`);

  
})

app.get("/baked_goods", (req, res) => {
  client.query("SELECT * FROM baked_goods")
  .then((data) => {
    console.log(data.rows);
    res.json(data.rows);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}.`);
});