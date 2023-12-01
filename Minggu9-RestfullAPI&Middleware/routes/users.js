// Mengimpor module
const express = require("express");
const router = express.Router();
const pool = require("../queries");

// Endpoint untuk mendapatkan data user dengan opsi limit (/users/?limit=10)
router.get("/users", (req, res) => {
  const limit = req.query.limit ? `LIMIT ${req.query.limit}` : "";

  pool.query(`SELECT * FROM users ${limit}`, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result.rows);
  });
});

// Endpoint untuk mendapatkan data user berdasarkan ID
router.get("/users/:id", (req, res) => {
  pool.query(
    `SELECT * FROM users WHERE id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result.rows);
    }
  );
});

// Endpoint untuk menambahkan data user baru
router.post("/users", (req, res) => {
  pool.query(
    "INSERT INTO users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5)",
    [
      req.body.id,
      req.body.email,
      req.body.gender,
      req.body.password,
      req.body.role,
    ],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("data user added");
    }
  );
});

// Endpoint untuk memperbarui data user berdasarkan ID
router.put("/users/:id", (req, res) => {
  const { id, email, gender, password, role } = req.body;
  pool.query(
    "UPDATE users SET id=$1, email=$2, gender=$3, password=$4, role=$5 WHERE id=$6",
    [id, email, gender, password, role, req.params.id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("data user updated");
    }
  );
});

// Endpoint untuk menghapus data pengguna berdasarkan ID
router.delete("/users/:id", (req, res) => {
  pool.query(`DELETE FROM users WHERE id = ${req.params.id}`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send("data user deleted");
  });
});

// Mengekspor module untuk digunakan di file lain
module.exports = router;
