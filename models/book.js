/* File proses mengatur data yang tersimpan di tabel book */
'use strict'; // menunjukkan bahwa kode harus dijalankan dalam "mode ketat". misalnya menggunakan variabel yang tidak dideklarasikan

/* Memanggil Modul */
const {Model} = require('sequelize'); // Memanggil modul sequelize untuk menggunakan Model 

/* Membuat Data  dengan Arror Fn */
module.exports = (sequelize, DataTypes) => { // exports : supaya dapat digunakan di file lain dengan param sequelize dan type data
  /* Membuat Class */
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     /* Membuat Relasi */
    static associate(models) { // Menggunakan params
      // define association here
      this.hasMany(models.details_of_borrow, {
        foreignKey: `bookID`, as: `details_of_borrow`
      })
    }
  }
  /* Melakuikan inisialisai terhadap tabel book */
  book.init({
    isbn: DataTypes.STRING,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    publisher: DataTypes.STRING,
    category: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    cover: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'book',
  });
  /* Mengirim data */
  return book;
};