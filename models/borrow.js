/* File proses mengatur data yang tersimpan di tabel pembelian */
'use strict'; // menunjukkan bahwa kode harus dijalankan dalam "mode ketat". misalnya menggunakan variabel yang tidak dideklarasikan

/* Memanggil Modul */
const {Model} = require('sequelize'); // Memanggil modul sequelize untuk menggunakan Model 

/* Membuat Data  dengan Arror Fn */
module.exports = (sequelize, DataTypes) => { // exports : supaya dapat digunakan di file lain dengan param sequelize dan type data
  /* Membuat Class */
  class borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* Membuat Relasi */
    static associate(models) { // Menggunakan params
      // define association here
      this.belongsTo(models.admin) // Relasi tabel borrow ke admin
      this.belongsTo(models.member)  // Relasi tabel borrow ke member
      this.hasMany(models.details_of_borrow, {
        foreignKey: `borrowID`, as: "details_of_borrow"  // Relasi tabel “borrows” dan tabel “details_of_borrows” dengan key “id” dari tabel “borrows” dan key “borrowID” dari tabel “details_of_borrows”. 
      })
    }
  }
  /* Melakuikan inisialisai terhadap tabel pembelian */
  borrow.init({
    memberID: DataTypes.INTEGER,
    adminID: DataTypes.INTEGER,
    date_of_borrow: DataTypes.DATE,
    date_of_return: DataTypes.DATE,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'borrow',
  });
  /* mengirimkan data */
  return borrow;
};