//import module
var calc = require("./Calc");

//masukkan nilai untuk menghitung luas dan keliling dari persegi dan persegi panjang
var sisi = 5;
var panjang = 10;
var lebar = 5;

console.log(
  "Luas persegi dengan nilai sisi = 5 adalah " + calc.LuasPersegi(sisi)
);
console.log(
  "Keliling persegi dengan nilai sisi = 5 adalah " + calc.KelilingPersegi(sisi)
);
console.log(
  "Luas persegi panjang dengan nilai panjang = 10 dan lebar = 5 adalah " +
    calc.LuasPersegiPanjang(panjang, lebar)
);
console.log(
  "Keliling persegi panjang dengan nilai panjang = 10 dan lebar = 5 adalah " +
    calc.KelilingPersegiPanjang(panjang, lebar)
);
