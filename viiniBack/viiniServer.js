const express = require('express');
const app = express();

var helmet = require('helmet');
app.use(helmet( { crossOriginResourcePolicy: false } ));

app.use(express.json());
app.use(express.urlencoded( { limit: '5mb', extended: true } ));

const cors = require('cors');
app.use(cors());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('viinit.db');

app.listen(8080, () => {
	console.log('Node toimii localhost:8080');
});

app.get('/', (req, res, next) => {
	return res.status(200).json( { error: false, message: 'Toimii' } );
});

app.get('/viini/all', (req, res, next) => {
	db.all('SELECT * FROM viini', (error, results) => {
		if (error) throw error;
		return res.status(200).json(results);
		})
})

//etsii kaikki viinit tyypin mukaan
app.get('/viini/type/:tyyppi', (req, res, next) => {
	let tyyppi = req.params.tyyppi;
	db.all('SELECT * FROM viini where tyyppi=?', [tyyppi], (error, results) => {
		if (error) throw error; 
		return res.status(200).json(results);
		})
})

//etsii kaikki viinit maan mukaan
app.get('/viini/country/:maa', (req, res, next) => {
	let maa = req.params.maa;
	db.all('SELECT * FROM viini where maa=?', [maa], (error, results) => {
		if (error) throw error;
		return res.status(200).json(results);
		})
})

app.get('/viini/one/:id', (req, res, next) => {
	let id = req.params.id;
db.get('SELECT * FROM viini where id=?', [id], (error, result) => {
if (error) throw error;
if (typeof(result) === 'undefined') {
return res.status(200).json({});
}
return res.status(200).json(result);
}) // db.get

})

const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, './images'); // Mihin kansioon ladataan
	},
	filename: (req, file, callback) => {
		callback(null, file.originalname);  // Millä tiedostonimellä
	}
});

const upload = multer({ storage: storage })

app.post('/viini/add', upload.single('kuva'), (req, res, next) => {
	let viini = req.body;

	let kuvaNimi = null;
	if (req.file) {
		kuvaNimi = req.file.originalname;
	}

	db.run('insert into viini (nimi, maa, vuosi, tyyppi, rypaleet, alkoholi, hinta, kuvaus, arvostelu, kuva) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
		[viini.nimi, viini.maa, viini.vuosi, viini.tyyppi, viini.rypaleet, viini.alkoholi, viini.hinta, viini.kuvaus, viini.arvostelu, kuvaNimi ], (error, result) => {
		if (error) throw error;

		return res.status(200).json( { count: 1 } );
	});
})

app.get('/download/:nimi', (req, res, next) => {
	var file = './images/' + req.params.nimi;
	res.download(file);
});

app.get('/viini/delete/:id', (req, res, next) => {
	let id = req.params.id;
db.run('DELETE FROM viini WHERE id = ?', [id], function (error, result) {
if (error) throw error;
return res.status(200).json( {count: this.changes} );
})

})

//edit
app.put('/viini/edit/:id', (req, res, next) => {
    let viini = req.body;
    let id = req.params.id;
	console.log(req.body);

    db.run('UPDATE viini SET nimi=?,maa=?,vuosi=?,tyyppi=?, rypaleet=?, alkoholi=?, hinta=?, kuvaus=?, arvostelu=? WHERE id = ?', [viini.nimi, viini.maa, viini.vuosi, viini.tyyppi, viini.rypaleet, viini.alkoholi, viini.hinta, viini.kuvaus, viini.arvostelu, id], (error, result) => {
		if (error) throw error;
		return res.status(200).json( {count: 1} );
		})

})

app.get('*', (req, res, next) => {
	return res.status(404).json( { error: true, message: 'Ei pyydettyä palvelua' } );
})
