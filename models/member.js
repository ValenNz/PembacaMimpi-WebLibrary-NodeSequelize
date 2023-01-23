/* File proses mengatur data yang tersimpan di tabel detail member */
'use strict'; // menunjukkan bahwa kode harus dijalankan dalam "mode ketat". misalnya menggunakan variabel yang tidak dideklarasikan

/* Memanggil Modul */
const {Model} = require('sequelize'); // Memanggil modul sequelize untuk menggunakan Model 

/* Membuat Data  dengan Arror Fn */
module.exports = (sequelize, DataTypes) => {
  // exports : supaya dapat digunakan di file lain dengan param sequelize dan type data
  /* Membuat Class */
  class member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* Membuat Relasi */
    static associate(models) { // Menggunakan params
      // define association here
      this.hasMany(models.borrow, {
        foreignKey: `memberID`, as: "borrow"
      })
    }
  }
  /* Melakuikan inisialisai terhadap tabel member */
  member.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    contact: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'member',
  });
  /* Mengirim data */
  return member;
};