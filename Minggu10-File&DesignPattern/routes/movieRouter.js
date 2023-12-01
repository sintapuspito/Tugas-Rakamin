//Mengimpor module
const express = require("express");
const router = express.Router();
const pool = require("../models/queries");

// Endpoint untuk mendapatkan data movie dengan opsi limit (/movies/?limit=10)
router.get("/movies", (req, res) => {
  const limit = req.query.limit ? `LIMIT ${req.query.limit}` : "";

  pool.query(`SELECT * FROM movies ${limit}`, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result.rows);
  });
});

// Endpoint untuk mendapatkan data movie berdasarkan ID
router.get("/movies/:id", (req, res) => {
  pool.query(
    `SELECT * FROM movies WHERE id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result.rows);
    }
  );
});

// Endpoint untuk menambahkan data movie baru
router.post("/movies", (req, res) => {
  pool.query(
    "INSERT INTO movies (id, title, genres, year) VALUES ($1, $2, $3, $4)",
    [req.body.id, req.body.title, req.body.genres, req.body.year],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("data movies added");
    }
  );
});

// Endpoint untuk memperbarui data movie berdasarkan ID
router.put("/movies/:id", (req, res) => {
  const { id, title, genres, year } = req.body;

  pool.query(
    "UPDATE movies SET id=$1, title=$2, genres=$3, year=$4 WHERE id=$5",
    [id, title, genres, year, req.params.id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("data movies updated");
    }
  );
});

// Endpoint untuk menghapus data movie berdasarkan ID
router.delete("/movies/:id", (req, res) => {
  pool.query(
    `DELETE FROM movies WHERE id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("data movies deleted");
    }
  );
});

// Mengekspor module untuk digunakan di file lain
module.exports = router;
