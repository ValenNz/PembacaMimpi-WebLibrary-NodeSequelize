
		                    Pengenalan Folder Pada Project
*	Server.js merupakan file utama yang dieksekusi saat proyek aplikasi akan dijalankan.
-	Routes merupakan kumpulan jalur endpoint yang disediakan di dalam proyek.
-	Controllers merupakan kumpulan logic atau proses mengolah request yang diterima dan memberikan response.
-	Models merupakan kumpulan proses manipulasi data ke database meliputi create, read, update, dan delete.
-	Migration merupkan kumpulan proses pembuatan struktur database meliputi struktur table dan relasinya.
-	Middleware merupakan kumpulan proses yang menjembatani antara route dan controller. Proses middleware ini bersifat opsional (bisa didefinisikan atau tidak)

		                         Pengenalan Sequelize
-	Sequelize merupakan sebuah library yang digunakan untuk melakukan interaksi dengan database.
-	Sequelize berbasis ORM (Object Relational Maping) dan berbasis promise, sehingga proses kueri ke database berorientasi pada object.
-	Sequelize sudah mendukung untuk MySQL, PostgreSQL, MariaDB, SQLite, dan MSSQL.

		                        Create Project SEQUELIZE

1. make folder

2. Inisialisasi package.json	: npm init -y	

3. menginstal nodemon (menjalankan server otomatis)	: npm installl nodemon 

4. install library	: npm install express cors mysql2 sequelize md5

5. Inisialisasi sequelize in project	: npx sequelize-cli init	
	Menghasilkan 
		-	Folder config, berisi file konfigurasi untuk menunjukkan database mana yang akan terhubung pada project tersebut.
		-	Folder models, berisi file model yang digunakan untuk manipulasi data pada database meliputi perintah CRUD.
		-	Folder migrations, berisi file migration yang digunakan untuk membuat struktur database meliputi pembuatan atau penghapusan tabel, relasi
			antar tabel, dan pengubahan struktur database lainnya.
		-	Folder seeders, berisi file seeder yang digunakan untuk pembenihan data pada database (inisiasi data awal).

6. Pada folder config -> config.json hubungkan ke database pada bagian development -> "database" : "nama_database"
	-	Migration merupakan proses untuk mengatur struktur database seperti table dan relasi
	-	Model merupakan proses untuk mengatur data yang tersimpan pada database.

7. Buat migration : npx sequelize-cli model:generate --name nama tabel --attributes field:typeData,field2:typeData
	Isi :
		function up() : * Pembuat tabel. 
					 * Terdapat penamaan 's' diakhir nama tabel (kemajemukan : menunjukan berisi banyak data). 
					 * Kolom 'id': primary key 
					 * Akan dijalankan dengan perintah :  npx sequelize-cli db:migrate
		Function down() : * Menhancurkan table
					   * Akan dijalankan dengan perintah : npx sequelize-cli db:migrate:undo:all
                       
8. Hubungkan relation nya 
	Akan dijalankan dengan perintah : npx sequelize-cli db:migrate

9. Lakukan seeder	
		Sequelize Seeder :
	-	Seeder merupakan sebuah proses untuk memberikan sample data pada struktur database yang telah dibuat sebelumnya
	-	Create seeder	: npx sequelize-cli seed:generate --name sample-nama_table
	-	Jika sudah mebuat data lakukan :  npx sequelize-cli db:seed:all
 
10. Lakukan relation di folder model
	-	hasOne, relasi ini digunakan untuk hubungan bertipe “one to one” dari tabel parent ke tabel child.
	-	belongsTo, relasi ini digunakan untuk hubungan bertipe “one to one” dari tabel child ke tabel parent.
	-	hasMany, relasi ini digunakan untuk hubungan bertipe “one to many” dari tabel parent ke tabel child.
	-	belongsToMany, relasi ini digunakan untuk hubungan bertipe “one to many” dari tabel child ke tabel parent.


11. Buatlah CRUD di folder controller
	- Lakukan inisialisasi di folder models : const nama_tabel = require(tempat folder model).nama_tabel
	- Fungsi create() merupakan sebuah promise yang harus di-handle menggunakan then() dan catch() atau dapat menggunakan await yang harus di dalam scope async function. 

		await member.create({
			name: "dummy",
			gender: "Male",
			contact: "096357"
			address: "Mekkah"
		})

		LIKE let sql = INSERT INTO 'table_name' (field1,field2) VALUE ('value1', 'value2')
		
	- Fungsi update() merupakan sebuah promise yang harus di-handle menggunakan then() dan catch() atau dapat menggunakan await yang harus di dalam scope async function.

	
	- Fungsi destroy() merupakan sebuah promise yang harus di-handle menggunakan then() dan catch() atau dapat menggunakan await yang harus di dalam scope async function. 
	- Read data
		-	findAll() digunakan untuk mendapatkan semua data dari tabel dan parameter pencarian yang dikehendaki. Hasil perintah ini berupa array object dari data yang didapatkan.
		-	findByPk() digunakan untuk mendapatkan data berdasarkan nilai data primary key yang dikehendaki. Hasil perintah ini berupa object dari data yang didapatkan
		-	findOne() digunakan untuk mendapatkan data berdasarkan parameter pencarian yang dikehendaki (penggunaan where clause). Hasil perintah ini berupa object
		-	findAndCountAll() digunakan untuk mendapatkan semua data dari tabel dan parameter pencarian yang dikehendaki beserta jumlah data yang didapatkan. Hasil perintah ini
			berupa object yang berisi dua key yaitu key “count” bernilai jumlah data yang didapatkan dan key “rows” berisi array object data yang didapatkan.
	- Filtering Data
		-	Inisialisasi const op = require('sequelize').Op

12. Buatlah router untuk menjalankan function CRUD

13. Buatlah server untuk menjalankan 
