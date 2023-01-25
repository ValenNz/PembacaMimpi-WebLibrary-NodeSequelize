/* File untuk mengatur struktur database seperti table dan relasi */
'use strict'; // menunjukkan bahwa kode harus dijalankan dalam "mode ketat". misalnya menggunakan variabel yang tidak dideklarasikan

/* Import Modul */
/** @type {import('sequelize-cli').Migration} */ // Import module seuileze

/* Membuat struktur and relasi */
module.exports = {
  /* Memproses data secara bersamaan */
  async up(queryInterface, Sequelize) { // Menunggu hingga telah dirender semua
    /* Melakukan render (tunggu) jika promise telah tercukupi maka jhalankan*/
    await queryInterface.createTable('details_of_borrows', { // Create Table
      id: {
        allowNull: false, // kolom memberID tidak boleh dikosongkan datanya
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      borrowID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "borrows",
          key: "id"
        }
      },
      bookID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "books",
          key: "id"
        }
      },
      qty: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('details_of_borrows');
  }
};