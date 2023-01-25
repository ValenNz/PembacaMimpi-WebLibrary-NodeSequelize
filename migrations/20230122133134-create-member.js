/* File untuk mengatur struktur database seperti table dan relasi */
'use strict'; // menunjukkan bahwa kode harus dijalankan dalam "mode ketat". misalnya menggunakan variabel yang tidak dideklarasikan

/* Import Modul */
/** @type {import('sequelize-cli').Migration} */ 

/* Membuat struktur and relasi */
module.exports = {
  /* Memproses data secara bersamaan */
  async up(queryInterface, Sequelize) { // Menunggu hingga telah dirender semua
    /* Melakukan render (tunggu) jika promise telah tercukupi maka jhalankan*/
    await queryInterface.createTable('members', { // Create Table
      id: {
        allowNull: false, // kolom id tidak boleh dikosongkan datanya
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      gender: { 
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      foto: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('members');
  }
};