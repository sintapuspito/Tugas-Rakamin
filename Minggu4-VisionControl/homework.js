let arrRandom = [];

// Buat array dengan 100 nilai acak antara 1 dan 50
for (let i = 0; i < 100; i++) {
  const angkaRandom = Math.floor(Math.random() * 50) + 1;
  arrRandom.push(angkaRandom);
}

console.log("Array dengan jumlah index 100:");
console.log(arrRandom);

const arrGenap = [];
const arrGanjil = [];

// Pecah array menjadi array genap dan ganjil berdasarkan indeks
for (let i = 0; i < arrRandom.length; i++) {
  if (arrRandom[i] % 2 === 0) {
    arrGenap.push(arrRandom[i]);
  } else {
    arrGanjil.push(arrRandom[i]);
  }
}

console.log("Array genap dengan jumlah index 50:");
console.log(arrGenap);
console.log("Array ganjil dengan jumlah index 50:");
console.log(arrGanjil);

// Fungsi untuk menghitung nilai minimum
function findMin(array) {
  let min = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i];
    }
  }
  return min;
}

// Fungsi untuk menghitung nilai maksimum
function findMax(array) {
  let max = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}

// Fungsi untuk menghitung total
function findTotal(array) {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }
  return total;
}

// Fungsi untuk menghitung rata-rata
function findAverage(array) {
  if (array.length === 0) {
    return 0;
  }
  const total = findTotal(array);
  return total / array.length;
}

// Hitung nilai minimum, maksimum, total, dan rata-rata untuk array genap dan ganjil
const minGenap = findMin(arrGenap);
const maxGenap = findMax(arrGenap);
const totalGenap = findTotal(arrGenap);
const averageGenap = findAverage(arrGenap);

const minGanjil = findMin(arrGanjil);
const maxGanjil = findMax(arrGanjil);
const totalGanjil = findTotal(arrGanjil);
const averageGanjil = findAverage(arrGanjil);

console.log("Array genap:");
console.log("Minimum:", minGenap);
console.log("Maksimum:", maxGenap);
console.log("Total:", totalGenap);
console.log("Rata-rata:", averageGenap);

console.log("Array ganjil:");
console.log("Minimum:", minGanjil);
console.log("Maksimum:", maxGanjil);
console.log("Total:", totalGanjil);
console.log("Rata-rata:", averageGanjil);

// Perbandingan nilai-nilai
console.log("Perbandingan nilai:");
console.log(
  "Minimum lebih besar pada:",
  minGenap > minGanjil ? "Array Genap" : "Array Ganjil"
);
console.log(
  "Maksimum lebih besar pada:",
  maxGenap > maxGanjil ? "Array Genap" : "Array Ganjil"
);
console.log(
  "Total memiliki nilai sama antara Array Genap dan Array Ganjil:",
  totalGenap === totalGanjil
);
console.log(
  "Rata-rata lebih besar pada:",
  averageGenap > averageGanjil ? "Array Genap" : "Array Ganjil"
);
