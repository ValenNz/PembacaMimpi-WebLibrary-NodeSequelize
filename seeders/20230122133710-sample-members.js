/* File untuk mmebrikan data Dummy */
'use strict'; // menunjukkan bahwa kode harus dijalankan dalam "mode ketat". misalnya menggunakan variabel yang tidak dideklarasikan

/* Import Modul  */
/** @type {import('sequelize-cli').Migration} */  // Import module seuileze

/* zMembuat data dummy */
module.exports = {
  async up (queryInterface, Sequelize) { // Menunggu hingga telah dirender semua
     /* Melakukan render (tunggu) jika promise telah tercukupi maka jhalankan*/
    await queryInterface.bulkInsert("members", [ // Membuat data dummy members
      {
        name: `Soekarno`, gender: `Male`,
        contact: `021-223311`, address: `Tokyo, Japan`,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: `Soeharto`, gender: `Male`,
        contact: `0331-474747`, address: `Beijing, China`,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: `Megawati`, gender: `Female`,
        contact: `091-23981`, address: `Bangkok, Thailand`,
        createdAt: new Date(), updatedAt: new Date()
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('members', null, {});
  }
};
