// sequelize-cli가 자동 생성하는 코드는 그대로 사용했을 때 에러가 발생하고
// 예제에서 필요없는 부분도 많으므로 다음과 같이 수정

const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;