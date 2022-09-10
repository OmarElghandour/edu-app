'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class UserCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserCategory.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'user'
          },
          key: 'id',
          allowNull: false
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'category'
          },
          key: 'id'
        }
      },
  }, {
    sequelize,
    modelName: 'UserCategory',
    freezeTableName: true,
    tableName: 'userCategory',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'categoryId']
      }
     ]
  });
  return UserCategory;
};