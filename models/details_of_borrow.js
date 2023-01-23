/* File proses mengatur data yang tersimpan di tabel detail pembelian */
'use strict'; // menunjukkan bahwa kode harus dijalankan dalam "mode ketat". misalnya menggunakan variabel yang tidak dideklarasikan

/* Memanggil Modul */
const {Model} = require('sequelize'); // Memanggil modul sequelize untuk menggunakan Model 
module.exports = (sequelize, DataTypes) => { // exports : supaya dapat digunakan di file lain dengan param sequelize dan type data
  /* Membuat Class */
  class details_of_borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     /* Membuat Relasi */
    static associate(models) { // Menggunakan params
      // define association here
      this.belongsTo(models.borrow)
      this.belongsTo(models.book)
    }
  }
  /* Melakuikan inisialisai terhadap tabel detail pembelian */
  details_of_borrow.init({
    borrowID: DataTypes.INTEGER,
    bookID: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'details_of_borrow',
  });
  /* Mengirim data */
  return details_of_borrow;
};