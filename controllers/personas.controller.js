const { response } = require('express');
const { Persona, Genero } = require('../models');
require('../utils/functions');




class PersonaController {
   getPersonas = async (req, res = response) => {


      try {

         const personas = await Persona.findAll({ include: { model: Genero, as: 'genero' } });
         const total = personas.length;
         
         res.json({
            total,
            personas
         });

      } catch (error) {

         console.log(error);
         res.status(500).json(error);

      }

   
   }

    getPersona = async (req, res = response) => {
        
      try {
         
         const { id } = req.params;
         const persona = await Persona.findByPk(id);

         if (!persona) {
            return res.status(404).json({
               msg: 'No existe una persona con el id ' + id
            });
         }

         res.status(200).json(persona);

      } catch (error) {

         console.log(error);
         res.status(500).json(error);
         
      }

    }


   createPersona = async (req, res = response) => {

      try {
         const { 
            genero_id,
            nombre,
            fecha_nacimiento,
            telefono,
            linkedin 
         } = req.body; 

         let errors = [];
         if( !genero_id ){
            errors.push({
               attr: 'genero_id',
               msg: 'Debe seleccionar al menos un Genero'
            })
         } 
         if (!nombre) {
            errors.push({
               attr: 'nombre',
               msg: 'El nombre es obligatorio'
            });
         }
         if (!fecha_nacimiento) {
            errors.push({
               attr: 'fecha_nacimiento',
               msg: 'La fecha de nacimiento es obligatoria'
            });
         }

         if (errors.length > 0) {
            return res.status(400).json({
               errors
            });   
         }
      
         const persona = await Persona.create({ genero_id, nombre, fecha_nacimiento, telefono, linkedin });

         res.status(201).json(persona);

      } catch (error) {

            console.log(error);
            res.status(500).json(error);

      }
      
      
   }

   updatePersona = async (req, res = response) => {

      try {
         
         const { id } = req.params;
         const { 
            genero_id,
            nombre,
            fecha_nacimiento,
            telefono,
            linkedin 
         } = req.body; 

         const persona = await Persona.findByPk( id );

         if (!persona) {
            return res.status(404).json({
               msg: 'No existe una persona con el id ' + id
            });
         }

         persona.genero_id = genero_id ? genero_id : persona.genero_id
         persona.nombre = nombre ? nombre : persona.nombre
         persona.fecha_nacimiento = fecha_nacimiento ? fecha_nacimiento : persona.fecha_nacimiento
         persona.telefono = telefono ? telefono : persona.telefono
         persona.linkedin = linkedin ? linkedin : persona.linkedin
         await persona.save();

         res.json({
            persona,
            msg: 'Persona actualizada exitosamente!'
         });

      } catch (error) {
         
         console.log(error);
         res.status(500).json(error);

      }

   }

   deletePersona = async (req, res = response) => {

      try {

         const { id } = req.params;

         const persona = await Persona.findByPk(id);

         if (!persona) {
            return res.status(404).json({
               msg: 'No existe una persona con el id ' + id
            });
         }

         let nombre = persona.nombre; 

         await persona.destroy();

         res.json({
            nombre,
            msg: 'Persona eliminada exitosamente!'
         });


      } catch (error) {
            
         console.log(error);
         res.status(500).json(error);
   
      }
   
   }

}

module.exports = new PersonaController();