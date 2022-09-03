'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserProfile.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    website: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    user_img: DataTypes.STRING,
    user_id: {
      type:  DataTypes.INTEGER,
      allowNull: false,
      unique: true  
    },
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  },{
    freezeTableName: true
});
  return UserProfile;
};