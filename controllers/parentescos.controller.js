const { response } = require('express');
const { Parentesco } = require('../models');
require('../utils/functions');




class ParentescoController {
    getParentescos = async (req, res = response) => {


      try {

         const parentescos = await Parentesco.findAll();
         const total = parentescos.length;
         res.json({
            total,
            parentescos
         });

      } catch (error) {

         console.log(error);
         res.status(500).json(error);

      }

      
    }

    getParentesco = async (req, res = response) => {
        
      try {
         
         const { id } = req.params;
         const parentesco = await Parentesco.findByPk(id);

         if (!parentesco) {
            return res.status(404).json({
               msg: 'No existe un parentesco con el id ' + id
            });
         }

         res.status(200).json(parentesco);

      } catch (error) {

         console.log(error);
         res.status(500).json(error);
         
      }

    }


   createParentesco = async (req, res = response) => {

      try {
         const { nombre, peso } = req.body; 

         if ( typeof value !== 'number' ) {
            return res.status(400).json({
               msg: 'El campo peso debe ser un número entero.'
            });
         } else if ( peso < 0 ) {
            return res.status(400).json({
               msg: 'El campo peso no puede ser negativo.'
            });
         } else if( !nombre || !peso ){
            return res.status(400).json({
               msg: 'Los campos nombre y peso son obligatorios.'
            });
         }
      
         const parentesco = await Parentesco.create({ nombre: nombre.capitalize(), peso });

         res.status(201).json(parentesco);

      } catch (error) {

            console.log(error);
            res.status(500).json(error);

      }
      
      
   }

   updateParentesco = async (req, res = response) => {

      try {
         
         const { id } = req.params;
         const { nombre, peso } = req.body;

         if( peso && typeof peso !== 'number' ) {
            return res.status(400).json({
               msg: 'El campo peso debe ser un número entero.'
            });
         } else if ( peso && peso < 0 ) {
            return res.status(400).json({
               msg: 'El campo peso no puede ser negativo.'
            });
         }
         

         const parentesco = await Parentesco.findByPk( id );
         
         if (!parentesco) {
            return res.status(404).json({
               msg: 'No existe un parentesco con el id ' + id
            });
         } else if ( !nombre && !peso) {
            return res.status(400).json({
               msg: 'Debe actualizar alguno de los campos.'
            });
         }

         if ( nombre ) parentesco.nombre = nombre.capitalize();
         if ( peso ) parentesco.peso = peso;

         await parentesco.save();

         res.json({
            parentesco,
            msg: 'Parentesco actualizado exitosamente!'
         });

      } catch (error) {
         
         console.log(error);
         res.status(500).json(error);

      }

   }

   deleteParentesco = async (req, res = response) => {

      try {

         const { id } = req.params;

         const parentesco = await Parentesco.findByPk(id);

         if (!parentesco) {
            return res.status(404).json({
               msg: 'No existe un parentesco con el id ' + id
            });
         }

         let nombre = parentesco.nombre; 

         await parentesco.destroy();

         res.json({
            nombre,
            msg: 'Parentesco eliminado exitosamente!'
         });


      } catch (error) {
            
         console.log(error);
         res.status(500).json(error);
   
      }
   
   }

}

module.exports = new ParentescoController();