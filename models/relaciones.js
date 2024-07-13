const {
  Model
} = require('sequelize');

module.exports = function(sequelize, DataTypes) {

  class Relacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Persona, Parentesco}) {
      // define association here
      this.belongsTo(Parentesco, { as: "parentesco", foreignKey: "parentesco_id"});
      this.belongsTo(Persona, { as: "persona_id_1_persona", foreignKey: "persona_id_1"});
      this.belongsTo(Persona, { as: "persona_id_2_persona", foreignKey: "persona_id_2"});
    }
  };
  
  Relacion.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    parentesco_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'parentescos',
        key: 'id'
      }
    },
    persona_id_1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'personas',
        key: 'id'
      }
    },
    persona_id_2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'personas',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'relaciones',
    modelName: 'Relacion',
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
        name: "parentesco_id",
        using: "BTREE",
        fields: [
          { name: "parentesco_id" },
        ]
      },
      {
        name: "persona_id_1",
        using: "BTREE",
        fields: [
          { name: "persona_id_1" },
        ]
      },
      {
        name: "persona_id_2",
        using: "BTREE",
        fields: [
          { name: "persona_id_2" },
        ]
      },
    ]
  });

  return Relacion;

};
