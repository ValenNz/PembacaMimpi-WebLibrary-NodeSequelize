/* File untuk mengatur struktur database seperti table dan relasi */
'use strict'; // menunjukkan bahwa kode harus dijalankan dalam "mode ketat". misalnya menggunakan variabel yang tidak dideklarasikan

/* Import Modul */
/** @type {import('sequelize-cli').Migration} */ // Import module seuileze

/* Membuat struktur and relasi */
module.exports = {
  /* Memproses data secara bersamaan */
  async up(queryInterface, Sequelize) { // Menunggu hingga telah dirender semua
    /* Melakukan render (tunggu) jika promise telah tercukupi maka jhalankan*/
    await queryInterface.createTable('borrows', { // Create Table
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      memberID: {
        type: Sequelize.INTEGER,
        allowNull:false,  // kolom memberID tidak boleh dikosongkan datanya
        /* Membuat relasi ke tabel members dengan id*/
        references: {      
          model: "members",
          key: "id"
        },
      },
      adminID: {
        type: Sequelize.INTEGER,
        allowNull: false, // kolom memberID tidak boleh dikosongkan datanya
        /* Membuat relasi ke tabel admins dengan id*/
        references: {
          model: "admins",
          key: "id"
        }
      },
      date_of_borrow: {
        type: Sequelize.DATE
      },
      date_of_return: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('borrows');
  }
};