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
db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Domain = require('./domain')(sequelize, Sequelize);

// User 모델과 Post 모델은 1:N 관계
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);
// Post와 Hashtag 모델은 N:M 관계
db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });

// 같은 테이블끼리도 N:M 관계를 가질 수 있음
// 사용자 한 명이 팔로워를 여러 명 가질 수도 있고,
db.User.belongsToMany(db.User, {
  foreignKey: 'followingId',
  as: 'Followers',
  through: 'Follow',
});
// 여러 명을 팔로잉할 수도 있음
db.User.belongsToMany(db.User, {
  foreignKey: 'followerId',
  as: 'Followings',
  through: 'Follow',
});

// 사용자 모델과 도메인 모델은 일대다 관계
// 사용자 한 명이 여러 도메인 소유 가능
db.User.hasMany(db.Domain);
db.Domain.belongsTo(db.User);

// as에 등록한 이름을 바탕으로 시퀄라이즈는
// getFollowings, getFollowers, getFollowing, getFollower 등의 메서드 자동 추가

module.exports = db;