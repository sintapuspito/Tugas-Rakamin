//menghitung luas persegi
exports.LuasPersegi = function (sisi) {
  return sisi * sisi;
};

//menghitung keliling persegi
exports.KelilingPersegi = function (sisi) {
  return 4 * sisi;
};

//menghitung luas persegi panjang
exports.LuasPersegiPanjang = function (panjang, lebar) {
  return panjang * lebar;
};

//menghitung keliling persegi panjang
exports.KelilingPersegiPanjang = function (panjang, lebar) {
  return 2 * (panjang + lebar);
};
