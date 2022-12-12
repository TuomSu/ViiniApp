const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('viinit.db');

db.serialize( () => {

	let sql = "CREATE TABLE viini (" +
			  "id integer PRIMARY KEY NOT NULL, " +
			  "nimi text NOT NULL, " +
			  "maa text NOT NULL, " +
			  "vuosi integer NOT NULL, " +
			  "tyyppi integer NOT NULL, " +
			  "rypaleet text, " +
			  "alkoholi integer, " +
			  "hinta integer, " +
			  "kuvaus text, " +
			  "arvostelu integer, " +
			  "kuva text )";

	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Taulu tehtiin");
	}) 

	sql = "INSERT INTO `viini` (`id`, `nimi`, `maa`, `vuosi`, `tyyppi`, `rypaleet`, `alkoholi`,`hinta`, `kuvaus`, `arvostelu`, 'kuva') "+
	" VALUES (1, 'Acqua in Fiamme Amarone', 'Italia', 2017, 1, 'corvina, rondinella', 16, 39, 'mehevä ja hilloinen', 3, 'red.jpg' )";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	})

	sql = "INSERT INTO `viini` (`id`, `nimi`, `maa`, `vuosi`, `tyyppi`, `rypaleet`, `alkoholi`,`hinta`, `kuvaus`, `arvostelu`, 'kuva') "+
	" VALUES (2, '2u Duas Uvas Branco White', 'Portugali', 2020, 2, 'arinto, fernao pires', 12, 9, 'pirteä ja hedelmäinen', 3, 'white.jpg')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	})

	sql = "INSERT INTO `viini` (`id`, `nimi`, `maa`, `vuosi`, `tyyppi`, `rypaleet`, `alkoholi`,`hinta`, `kuvaus`, `arvostelu`, 'kuva') "+
	" VALUES (3, 'A. Bergere Blanc de Blancs Champagne Brut', 'Ranska', 2020,  3, 'chardonnay', 12, 44, 'runsas ja paahteinen', 5, 'sparkling.jpg')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	})

	sql = "INSERT INTO `viini` (`id`, `nimi`, `maa`, `vuosi`, `tyyppi`, `rypaleet`, `alkoholi`,`hinta`, `kuvaus`, `arvostelu`, 'kuva') "+
	" VALUES (4, 'Hill & Dale Merlot Rosé', 'Etelä-Afrikka', 2019, 4, 'merlot', 13, 10, 'makea', 3, 'rose.jpg' )";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	})

	db.each("SELECT id, nimi FROM viini", function(err, row) {
		if (err) {
		  return console.log(err.message);
		}
		console.log(row.id + ", " + row.nimi);
	})

	db.close();
})
