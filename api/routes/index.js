var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({
  user: 'root',
  host: '51.79.188.203',
  database: 'MPC',
  password: 'postgres',
  port: 5431,
});

json_base64_banner = function(x){
  return {
    'id': x['id'], 
    'nama_banner': x['nama_banner'],
    'keterangan': x['keterangan'],
    'aktif': x['aktif'],
    'gambar': atob(x['gambar'].toString('base64'))
  }
};
router.get('/queue/', async function(req, res, next) {
  var MyDate = new Date();
  var MyDateString;
  MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);
  var param = req.params;
  var id = param.id;


  const query1 = `SELECT DISTINCT categ_layanan AS layanan FROM pet_clinic_antrian`
  const client1 = await pool.connect();
  const result1 = await client1.query(query1);
  const userData1 = result1.rows;
  // const userData1 = [{layanan: 'jasa_dokter'} , {layanan: 'grooming'}, {layanan: 'vaksin'}];

  
  for (let i = 0; i < userData1.length; i++) {
    const element = userData1[i];
    var query2 = `select pet_clinic_antrian.no_antrian as no_antrian,
        pet_clinic_antrian.layanan as id_layanan,
        pet_clinic_service.service_id as nomor_layanan,
        product_template.name as name_layanan,
        
        pet_clinic_antrian.pemilik as id_pemilik,
        pet_clinic_client.name as nama_pemilik,
        
        pet_clinic_antrian.hewan as id_hewan,
        pet_clinic_pet.name as name_hewan,
        
        pet_clinic_antrian.id_kunjungan as id_kunjungan,
        pet_clinic_visitation.visitation_id as nomor_kunjungan,
        
        pet_clinic_antrian.tanggal, 
        pet_clinic_antrian.status,
        pet_clinic_antrian.categ_layanan 
      from pet_clinic_antrian
      left join pet_clinic_service on pet_clinic_service.id = pet_clinic_antrian.layanan
      left join pet_clinic_client on pet_clinic_client.id = pet_clinic_antrian.pemilik
      left join pet_clinic_pet on pet_clinic_pet.id = pet_clinic_antrian.hewan
      left join pet_clinic_visitation on pet_clinic_visitation.id = pet_clinic_antrian.id_kunjungan
      left join product_product on product_product.id = pet_clinic_service.item_service
      left join product_template on product_template.id = product_product.product_tmpl_id
      where categ_layanan = '${element.layanan}'
      order by no_antrian asc
      `
    const client2 = await pool.connect();
    const result2 = await client2.query(query2);
    const userData2 = result2.rows;
    client2.release();

    if (userData2.length > 0) {
      userData1[i]['id_layanan'] = userData2[0].id_layanan;
      userData1[i]['no_antrian'] = userData2[0].no_antrian;
    }
    else{
      const query3 = `SELECT no_antrian 
        from pet_clinic_antrian 
        left join pet_clinic_service on pet_clinic_service.id = pet_clinic_antrian.layanan
        left join product_product on product_product.id = pet_clinic_service.item_service
        left join product_template on product_template.id = product_product.product_tmpl_id
        where categ_layanan = '${element.layanan}'
        and Date(pet_clinic_antrian.tanggal) = '${MyDateString}'
        order by no_antrian desc`
      const client3 = await pool.connect();
      const result3 = await client3.query(query3);
      const userData3 = result3.rows;
      userData1[i]['id_layanan'] = '';
      userData1[i]['no_antrian'] = '';
      if (userData3.length > 0) {
         userData1[i]['id_layanan'] = userData3[0].id_layanan;
         userData1[i]['no_antrian'] = userData3[0].no_antrian;
      }
      client3.release();
    }
    userData1[i]['tanggal'] = MyDateString;
    userData1[i]['antrian'] = userData2;
  }
  client1.release();
  res.send(userData1)
});

router.get('/banner/', async function(req, res, next) {
  var param = req.params;
  var id = param.id;
  var query = `select * from pet_clinic_banner where kategori = 'slider';`
  const client = await pool.connect();
  const result = await client.query(query);
  const userData = result.rows;
  client.release();
  res.send((userData).map(json_base64_banner))
});
module.exports = router;