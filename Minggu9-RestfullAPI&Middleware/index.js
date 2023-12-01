//Mengimpor module
const express = require("express");
const pool = require("./queries");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moviesRouter = require("./routes/movies");
const usersRouter = require("./routes/users");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

// Membuat objek aplikasi Express
const app = express();

// Menentukan port aplikasi
const PORT = process.env.PORT || 3000;

// Middleware untuk menampilkan dokumentasi Swagger di /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware untuk logging menggunakan morgan
app.use(morgan("common"));

// Middleware untuk body permintaan dengan format JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register User
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword]
    );

    const user = result.rows[0];
    res.status(201).json({
      email: user.email,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login User
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve user from the database
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, "secretNumber", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Protected Route
app.get("/protected", (req, res) => {
  // Middleware for authentication
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "secretNumber", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // User is authenticated
    res.json({ message: "Protected route accessed", user: decoded });
  });
});

// Menggunakan router untuk endpoint terkait movies dan users
app.use(moviesRouter);
app.use(usersRouter);

//Koneksi ke database
pool.connect((err, res) => {
  console.log(err);
  console.log("connected");
});

// Menjalankan aplikasi Express pada port yang ditentukan
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
