const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Good = require('./good')(sequelize, Sequelize);
db.Auction = require('./auction')(sequelize, Sequelize);

db.Good.belongsTo(db.User, { as: 'owner' }); // 사용자가 여러 상품 등록 가능
db.Good.belongsTo(db.User, { as: 'sold' }); // 사용자가 여러 상품 낙찰받을 수 있음
db.User.hasMany(db.Auction); // 사용자가 입찰을 여러 번 할 수 있음
db.Good.hasMany(db.Auction); // 한 상품에 여러 명이 입찰할 수 있음
db.Auction.belongsTo(db.User);
db.Auction.belongsTo(db.Good);

module.exports = db;