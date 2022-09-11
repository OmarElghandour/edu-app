const Sequelize = require('sequelize');
const dbConfig = require("../dbConfig");
const UserModel = require('./User');
const SessionModel = require('./Session');
const UserSessionModel = require('./UserSession');
const UserProfileModel = require('./userprofile');
const CategoryModel = require('./category');
const UserCategoryModel = require('./userCategory');
const pg = require('pg');


console.log('====================');
console.log(process.env.POSTGRES_DB);
console.log(process.env.POSTGRES_USER);
console.log(process.env.POSTGRES_PASSWORD);
console.log('====================');





// const sequelize = new Sequelize('eduapp', 'OMAR', '123456', {
//     host: '127.0.0.1',
//     dialect: dbConfig.dialect,
//     dialectModule : pg,
//     operatorsAliases: false,
//     logging : false,
//     pool: {
//         max: dbConfig.pool.max,
//         min: dbConfig.pool.min,
//         acquire: dbConfig.pool.acquire,
//         idle: dbConfig.pool.idle
//     }
// });

const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres'
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

UserCategory.belongsTo(Category , {foreignKey : 'categoryId'});

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




