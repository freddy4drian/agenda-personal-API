const {
  Model
} = require('sequelize');

module.exports = function(sequelize, DataTypes) {

  class Genero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Persona}) {
      // define association here
      this.hasMany(Persona, { as: "personas", foreignKey: "genero_id"});
    }
  };
  
  Genero.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'generos',
    modelName: 'Genero',
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
    ]
  });

  return Genero
};
