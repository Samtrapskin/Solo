const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();





router.get('/', (req, res) => {
	console.log('mileage Get route');
	let queryText = `SELECT * FROM mileage;`;
	pool
		.query(queryText)
		.then((result) => {
			res.send(result.rows);
		})
		.catch((error) => {
			console.log(error);
			res.sendStatus(500);
		});
});

router.post('/', (req, res, next) => {
	console.log('POST Route');
	console.log(req.body);
	if (req.isAuthenticated()) {
		const queryText = 'INSERT INTO mileage ("description", "address", "total_miles") VALUES ($1, $2, $3);';
		pool
			.query(queryText, [req.body.description, req.body.address, req.body.total_miles ])
			.then((result) => {
				res.sendStatus(201);
			})
			.catch((err) => {
				console.log(err);
				res.sendStatus(500);
			});
	} else {
		res.sendStatus(403);
	}
});

router.delete('/:id' , (req, res,next) => {
    console.log('in DELETE mileage router', req.body)
    const queryText = `DELETE FROM "mileage" WHERE id=$1`;
    pool.query(queryText, [req.params.id])
    .then(() => {res.sendStatus(200);
    }).catch((err) => {
        console.log('Error completing SELECT  query', err);
        res.sendStatus(500);
    });
});

module.exports = router;