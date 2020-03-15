const Sequelize = require('sequelize');

const defaultType = {
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

module.exports = defaultType;
