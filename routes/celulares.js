var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Celulares = require('../models/celulares');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Celulares.find({}, function(err, datos) {
    res.status(200).json(datos);
  });

});


router.get('/:celId', function(req, res, next) {
  Celulares.findOne({
    'id': req.params.celId
  }, function(err, datos) {
    if (datos == null) {
      res.status(404).json({
        mensaje: "No existe"
      });
    } else {
      res.status(200).json(datos);
    }

  });
  //res.json(req.params.userId);
});

router.post('/', function(req, res, next) {
  var Celular = Celulares({
    id: req.body.id,
    Marca:req.body.Marca,
    Modelo:req.body.Modelo,
    Año:req.body.Año
  });
  //res.send(usuario);


  Celular.save(function(err, data) {
    if (err) {
      res.status(404).json({
        mensaje: "Error al guardar"
      });
    } else {
      res.status(201).json(data);
    }
  });

});

router.delete('/:celId', function(req, res, next) {
  Celulares.findOneAndDelete({
    id: req.params.celId
  }, function(err, data) {
    if (err) {
      res.status(404).json(err);
    }
    res.status(200).json(data);
  });
});

router.delete('/',function(req,res,next){
  res.status(405).json({mensaje:'Accion no permitida'});
});


module.exports = router;
