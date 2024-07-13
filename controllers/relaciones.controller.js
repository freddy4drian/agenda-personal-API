const { response } = require('express');
const { Relacion } = require('../models');
require('../utils/functions');




class RelacionController {
    getRelaciones = async (req, res = response) => {


      try {

         const relaciones = await Relacion.findAll();
         const total = relaciones.length;
         res.json({
            total,
            relaciones
         });

      } catch (error) {

         console.log(error);
         res.status(500).json(error);

      }

      
    }

    getRelacion = async (req, res = response) => {
        
      try {
         
         const { id } = req.params;
         const relacion = await Relacion.findByPk(id);

         if (!relacion) {
            return res.status(404).json({
               msg: 'No existe un relación con el id ' + id
            });
         }

         res.status(200).json(relacion);

      } catch (error) {

         console.log(error);
         res.status(500).json(error);
         
      }

    }


   createRelacion = async (req, res = response) => {

      try {
         const { parentesco_id, persona_id_1, persona_id_2 } = req.body; 

         if( !parentesco_id, !persona_id_1, !persona_id_2 ){
            return res.status(500).json({
               msg: 'Algo salio mal al intentar crear la relación.'
            });
         }
      
         const relacion = await Relacion.create({ parentesco_id, persona_id_1, persona_id_2 });

         res.status(201).json(relacion);

      } catch (error) {

            console.log(error);
            res.status(500).json(error);

      }
      
      
   }

   updateRelacion = async (req, res = response) => {

      try {
         
         const { id } = req.params;
         const { parentesco_id, persona_id_1, persona_id_2 } = req.body;


         const relacion = await Relacion.findByPk( id );

         if (!relacion) {
            return res.status(404).json({
               msg: 'No existe una relación con el id ' + id
            });
         }

         relacion.parentesco_id = parentesco_id ? parentesco_id : relacion.parentesco_id
         relacion.persona_id_1 = persona_id_1 ? persona_id_1 : relacion.persona_id_1
         relacion.persona_id_2 = persona_id_2 ? persona_id_2 : relacion.persona_id_2
         await relacion.save();

         res.json({
            relacion,
            msg: 'Relación actualizada exitosamente!'
         });

      } catch (error) {
         
         console.log(error);
         res.status(500).json(error);

      }

   }

   deleteRelacion = async (req, res = response) => {

      try {

         const { id } = req.params;

         const relacion = await Relacion.findByPk(id);

         if (!relacion) {
            return res.status(404).json({
               msg: 'No existe una relación con el id ' + id
            });
         }

         let relacion_id = relacion.id; 

         await relacion.destroy();

         res.json({
            id: relacion_id,
            msg: 'Relación eliminada exitosamente!'
         });


      } catch (error) {
            
         console.log(error);
         res.status(500).json(error);
   
      }
   
   }

}

module.exports = new RelacionController();