const {
  Model
} = require('sequelize');

module.exports = function(sequelize, DataTypes) {

  class Parentesco extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Relacion}) {
      // define association here
      this.hasMany(Relacion, { as: "relaciones", foreignKey: "parentesco_id"});
    }
  };

  Parentesco.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    peso: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'parentescos',
    modelName: 'Parentesco',
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

  return Parentesco;

};
