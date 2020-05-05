const Sequelize = require('sequelize');

const bill = {
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
    type: {
        type: Sequelize.TINYINT(1),
        allowNull: false
    },
    amount: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
    },
    defaultType: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 1
    },
    typeId: {
        type: Sequelize.INTEGER(8),
        allowNull: false,
        defaultValue: 1
    },
    time: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    createdTime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    description: {
        type: Sequelize.STRING(64),
        allowNull: true,
    },
    deleteFlag: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0
    }
};

module.exports = bill;
