// Mengimpor library swagger-autogen
const swaggerAutogen = require("swagger-autogen")();

// Konfigurasi untuk dokumentasi Swagger
const doc = {
  info: {
    title: "Nodejs Express + Postgresql API",
    description: "Nodejs Express + Postgresql API",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./index.js");
});
