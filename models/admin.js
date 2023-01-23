/* File proses mengatur data yang tersimpan di tabel admin */
'use strict'; // menunjukkan bahwa kode harus dijalankan dalam "mode ketat". misalnya menggunakan variabel yang tidak dideklarasikan

/* Memanggil Modul */
const {Model} = require('sequelize'); // Memanggil modul sequelize untuk menggunakan Model 

/* Membuat Data  dengan Arror Fn */
module.exports = (sequelize, DataTypes) => {
  // exports : supaya dapat digunakan di file lain dengan param sequelize dan type data
  /* Membuat Class */
  class admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* Membuat Relasi */
    static associate(models) {// Menggunakan params
      // define association here
      this.hasMany(models.borrow, {
        foreignKey: `adminID`, as: "borrowed"
      })
    }
  }
  /* Melakuikan inisialisai terhadap tabel admin */
  admin.init({
    name: DataTypes.STRING,
    contact: DataTypes.STRING,
    address: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'admin',
  });
  /* Mengirim data */
  return admin;
};