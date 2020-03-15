const Sequelize = require('sequelize');
const sequelize = require('./../lib/sequelize.js');

const userType = {
    id: {
        type: Sequelize.INTEGER(8),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.INTEGER(8),
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING(16),
        allowNull: false,
    },
    type: {
        type: Sequelize.TINYINT(1),
        allowNull: false
    },
    icon: {
        type: Sequelize.STRING(16),
        allowNull: false
    },
    deleteFlag: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0
    }
};

module.exports = userType;
