const { response } = require('express');
const { Genero } = require('../models');
require('../utils/functions');




class GeneroController {
    getGeneros = async (req, res = response) => {


      try {

         const generos = await Genero.findAll();
         const total = generos.length;
         res.json({
            total,
            generos
         });

      } catch (error) {

         console.log(error);
         res.status(500).json(error);

      }

      
    }

    getGenero = async (req, res = response) => {
        
      try {
         
         const { id } = req.params;
         const genero = await Genero.findByPk(id);

         if (!genero) {
            return res.status(404).json({
               msg: 'No existe un genero con el id ' + id
            });
         }

         res.status(200).json(genero);

      } catch (error) {

         console.log(error);
         res.status(500).json(error);
         
      }

    }


   createGenero = async (req, res = response) => {

      try {
         const { nombre } = req.body; 

         if( !nombre ){
            return res.status(400).json({
               msg: 'El campo nombre es obligatorio.'
            });
         }
      
         const genero = await Genero.create({ nombre: nombre.capitalize() });

         res.status(201).json(genero);

      } catch (error) {

            console.log(error);
            res.status(500).json(error);

      }
      
      
   }

   updateGenero = async (req, res = response) => {

      try {
         
         const { id } = req.params;
         const { nombre } = req.body;

         if( !nombre ){
            return res.status(400).json({
               msg: 'El campo nombre es obligatorio.'
            });
         }

         const genero = await Genero.findByPk( id );

         if (!genero) {
            return res.status(404).json({
               msg: 'No existe un genero con el id ' + id
            });
         }

         genero.nombre = nombre.capitalize();
         await genero.save();

         res.json({
            genero,
            msg: 'Gernero actualizado exitosamente!'
         });

      } catch (error) {
         
         console.log(error);
         res.status(500).json(error);

      }

   }

   deleteGenero = async (req, res = response) => {

      try {

         const { id } = req.params;

         const genero = await Genero.findByPk(id);

         if (!genero) {
            return res.status(404).json({
               msg: 'No existe un genero con el id ' + id
            });
         }

         let nombre = genero.nombre; 

         await genero.destroy();

         res.json({
            nombre,
            msg: 'Genero eliminado exitosamente!'
         });


      } catch (error) {
            
         console.log(error);
         res.status(500).json(error);
   
      }
   
   }

}

module.exports = new GeneroController();