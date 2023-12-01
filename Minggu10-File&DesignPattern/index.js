//Mengimpor module
const express = require("express");
const pool = require("./models/queries");
const bodyParser = require("body-parser");
const moviesRouter = require("./routes/movieRouter");
const usersRouter = require("./routes/userRouter");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const multer = require("multer");
const path = require("path");

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

app.use("/upload", express.static(path.join(__dirname, "upload")));

// menentukan lokasi pengunggahan
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/upload"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

//menerapkan middleware multer
app.post(
  "/movies/upload",
  multer({ storage: diskStorage }).single("photo"),
  (req, res) => {
    const file = req.file.path;
    console.log(file);
    if (!file) {
      res.status(400).send({
        status: false,
        data: "no file is selected",
      });
    }
    res.send(file);
  }
);

//Set Template Engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
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
