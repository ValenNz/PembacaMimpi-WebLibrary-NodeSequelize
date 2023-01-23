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
      this.belongsTo(models.admin)
      this.belongsTo(models.member)
      this.hasMany(models.details_of_borrow, {
        foreignKey: `borrowID`, as: "details_of_borrow"
      })
    }
  }
  /* Melakuikan inisialisai terhadap tabel apembelian */
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