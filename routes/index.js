var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user/:nome/:password', function(req, res, next){
  let db = new sqlite3.Database('./platform.db');

  var nome = req.params.nome;
  var password = req.params.password;

  let query = `SELECT * from users where nome = ? and password = ?`;

  db.get(query,[nome,password],(err,row)=>{
    if(err){
      console.error(err.message);
    }
    db.close((err) => {
      if (err) {
       console.error(err.message);
      }
      console.log("Connection closed.");
    });
    res.json(row);
  });

});

router.post('/aula/criar/:nome/:link', function(req, res, next){
  let db = new sqlite3.Database('./platform.db');

  var nome = req.params.nome;
  var link = req.params.link;

  let query = `INSERT INTO classes VALUES(?,?)`;

  db.run(query,[nome,link],(err,row)=>{
    if(err){
      console.error(err.message);
      res.json("500");
    }else{
      res.json("200");
    }
    db.close((err) => {
      if (err) {
       console.error(err.message);
      }
      console.log("Connection closed.");
    });
    
  });

});

router.post('/aula/apagar/:nome', function(req, res, next){
  let db = new sqlite3.Database('./platform.db');

  var nome = req.params.nome;

  let query = `DELETE FROM classes where nome = ?`;

  db.run(query,[nome],(err,row)=>{
    if(err){
      console.error(err.message);
      res.json("500");
    }else{
      res.json("200");
    }
    db.close((err) => {
      if (err) {
       console.error(err.message);
      }
      console.log("Connection closed.");
    });
    
  });

});

router.post('/aula/atualizar/:nome/:link', function(req, res, next){
  let db = new sqlite3.Database('./platform.db');

  var nome = req.params.nome;
  var link = req.params.link;

  let query = `UPDATE classes SET link = ? where nome = ?`;

  db.run(query,[link,nome],(err,row)=>{
    if(err){
      console.error(err.message);
      res.json("500");
    }else{
      res.json("200");
    }
    db.close((err) => {
      if (err) {
       console.error(err.message);
      }
      console.log("Connection closed.");
    });
    
  });

});

router.get('/aula/', function(req, res, next){
  let db = new sqlite3.Database('./platform.db');


  let query = `SELECT * from classes`;

  db.all(query,(err,row)=>{
    if(err){
      console.error(err.message);
    }
    db.close((err) => {
      if (err) {
       console.error(err.message);
      }
      console.log("Connection closed.");
    });
    res.json(row);
  });

});

module.exports = router;
