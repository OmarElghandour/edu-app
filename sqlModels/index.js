const Sequelize = require('sequelize');
const dbConfig = require("../dbConfig");
const UserModel = require('./User');
const SessionModel = require('./Session');
const UserSessionModel = require('./UserSession');
const UserProfileModel = require('./userprofile');
const CategoryModel = require('./category');
const UserCategoryModel = require('./userCategory');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    logging : false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};
const User = UserModel(sequelize, Sequelize);
const Session = SessionModel(sequelize, Sequelize);
const UserSession = UserSessionModel(sequelize, Sequelize);
const UserProfile = UserProfileModel(sequelize , Sequelize);
const Category = CategoryModel(sequelize , Sequelize);
const UserCategory = UserCategoryModel(sequelize , Sequelize);

User.hasMany(UserSession , {foreignKey : 'user_id'});
UserSession.belongsTo(User , {foreignKey : 'user_id'});

User.hasOne(UserProfile , {foreignKey : 'user_id'})
UserProfile.belongsTo(User , {foreignKey : 'user_id'});

Session.hasMany(UserSession , {foreignKey : 'session_id'});
UserSession.belongsTo(Session , {foreignKey : 'session_id'});

User.hasMany(UserCategory);
UserCategory.belongsTo(User);


db.User = User;
db.Session = Session;
db.Category = Category;
db.UserSession = UserSession;
db.UserCategory = UserCategory;
db.UserProfile = UserProfile;
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = {
    User,
    Session,
    UserSession,
    Category,
    UserProfile,
    UserCategory,
    sequelize
};




