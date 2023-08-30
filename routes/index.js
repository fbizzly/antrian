var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({
    user: 'openpg',
    host: 'localhost',
    database: 'pet_clinic',
    password: 'openpgpwd',
    port: 5432,
  });

router.get('/queue/', async function(req, res, next) {
  var MyDate = new Date();
  var MyDateString;
  MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);
  var param = req.params;
  var id = param.id;
  var query = `select * from pet_clinic_antrian where Date(tanggal) = '${MyDateString}'`
  const client = await pool.connect();
  const result = await client.query(query);
  const userData = result.rows;
  client.release();
  res.send(userData)
});

module.exports = router;