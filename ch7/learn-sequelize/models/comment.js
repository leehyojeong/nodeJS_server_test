module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment', {
        comment: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE, 
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
    },{
        timestamps: false,
    });
};

// user 테이블과 연결된 commenter 컬럼이 없음
// 모델을 정의할 때 넣어줘도 되지만, 
// 시퀄라이즈 자체에서 관계를 따로 정의할 수 있음