var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Celulares = require('../models/celulares');

// GET para todos
router.get('/', function(req, res, next) {
  Celulares.find({}, function(err, datos) {
    res.status(200).json(datos);
  });

});

// GET por ID
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

});

//POST para ingresar nuevo celular
router.post('/', function(req, res, next) {
  var Celular = Celulares({
    id: req.body.id,
    Marca:req.body.Marca,
    Modelo:req.body.Modelo,
    Año:req.body.Año,
    Imagen:req.body.Imagen
  });
  


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

//DELETE por el ID del celular
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

//DELETE de todo (no permitirlo)
router.delete('/',function(req,res,next){
  res.status(405).json({mensaje:'Accion no permitida'});
});

//PUT por ID
router.put('/:celId',function(req, res, error){
    let update =req.body;
  Celulares.replaceOne({'Id': req.params.AutosId}, update, function(err, data){
    if(err){
      res.status(404).json({mensaje: "Ese ID no existe en la base."});
    } else{
      res.status(200).json(data);
    }
  });
});

 //PUT para todo (no permitirlo)
router.put('/', function (req, res){
  res.status(405).json({mensaje:'Accion no permitida'});
});

//PATCH para un ID
router.patch('/:celId',function(req, res, error){
  let update =req.body;
  Celulares.findOneAndUpdate({'Id': req.params.AutosId}, update, function(err, data){
    if(err){
      res.status(404).json({mensaje: "No se encontro Id"});
    } else{
      res.status(200).json(data);
    }
  });
});

 //PATCH para toda la base
router.patch('/', function (req, res){
  res.status(405).json({mensaje:'Accion no permitida'});
});


module.exports = router;
