const Sequelize = require('sequelize');

const user = {
    id: {
        type: Sequelize.INTEGER(8),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(16),
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(16),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(64),
        allowNull: false,
    },
    avatar: {
        type: Sequelize.STRING(256),
        allowNull: true,
    },
    createdTime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    deleteFlag: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0
    },
    weixinId: {
        type: Sequelize.STRING(16),
        allowNull: true,
    },
    qqId: {
        type: Sequelize.STRING(16),
        allowNull: true,
    }
};

module.exports = user;
