var express = require("express");
var router = express.Router();
var pool = require("./query.js");

router.get("/film", (req, res) => {
  pool.query("SELECT * FROM film", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
});

router.get("/film/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("SELECT * FROM film WHERE film_id = $1", [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
});

router.get("/category", (req, res) => {
  pool.query("SELECT * FROM category", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
});

router.get("/film-category/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    "SELECT * FROM film_category WHERE category_id = $1",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result.rows);
    }
  );
});

pool.connect((err, res) => {
  console.log(err);
  console.log("connected");
});

module.exports = router;
