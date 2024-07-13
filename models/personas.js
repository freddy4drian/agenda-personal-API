const {
  Model
} = require('sequelize');

module.exports = function(sequelize, DataTypes) {

  class Persona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Relacion, Genero}) {
      // define association here
      this.belongsTo(Genero, { as: "genero", foreignKey: "genero_id"});
      this.hasMany(Relacion, { as: "relaciones", foreignKey: "persona_id_1"});
      this.hasMany(Relacion, { as: "persona_id_2_relaciones", foreignKey: "persona_id_2"});
    }
  };
  
  Persona.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    genero_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'generos',
        key: 'id'
      }
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    linkedin: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'personas',
    modelName: 'Persona',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "genero_id",
        using: "BTREE",
        fields: [
          { name: "genero_id" },
        ]
      },
    ]
  });

  return Persona;
};
