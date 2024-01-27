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
  const name = req.params.name;
  console.log(`Queried ${req.params.name}`);

  client.query(`SELECT * FROM person WHERE person_name ILIKE $1`, [name])
  .then((data) => {
    if (data.rows.length === 0) {
      console.log(`No matches for: ${name}.`)
      res.sendStatus(400);
      return;
    }
    console.log(data.rows[0]);
    res.json(data.rows[0]);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
})

app.post("/person", (req, res) => {
  const name = req.body.person_name;
  const money = Number.parseInt(req.body.person_money);

  //TODO capitalize first letter in name to be posted
  //TODO check if valid name

  console.log(`Want to post name: ${name}, money: ${money}`);

  client.query(`INSERT INTO person (person_name, person_money) VALUES ($1, $2) RETURNING *`, [name, money])
  .then((data) => {
    console.log(data.rows[0]);
    res.json(data.rows[0]);
  })
  .catch((err) => {
    console.log(err);
    return;
  })
})

app.delete("/person/:name", (req, res) => {
  const name = req.params.name;
  console.log(`Want to delete: ${req.params.name}`);

  client.query(`DELETE FROM person WHERE person_name ILIKE $1`, [name])
  .then((data) => {
    if(!data.rows[0]) {
      console.log(`Nothing to delete at ${name}`);
      res.sendStatus(404);
      return;
    }
    console.log(`Deleted ${name}`);
    console.log(data.rows[0]);
    res.json(data.rows[0]);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
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

app.get("/baked_goods/:id", (req, res) => {
  const id = Number.parseInt(req.params.id);
  console.log(`Queried ${id}`);

  client.query(`SELECT * FROM baked_goods WHERE baked_goods_id = $1`, [id])
  .then((data) => {
    if (data.rows.length === 0) {
      console.log(`No matches for: ${id}.`)
      res.sendStatus(400);
      return;
    }
    console.log(data.rows[0]);
    res.json(data.rows[0]);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
})

app.post("/baked_goods", (req, res) => {
  const name = req.body.baked_goods_name;
  const price = Number.parseInt(req.body.baked_goods_price);


  console.log(`Want to post name: ${name}, price: ${price}`);

  client.query(`INSERT INTO baked_goods (baked_goods_name, baked_goods_price) VALUES ($1, $2) RETURNING *`, [name, price])
  .then((data) => {
    console.log(data.rows[0]);
    res.json(data.rows[0]);
  })
  .catch((err) => {
    console.log(err);
    return;
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}.`);
});