const Sequelize = require('sequelize');

const appVersion = {
    id: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    appVersion: {
        type: Sequelize.STRING(10),
        allowNull: true,
    },
    appDownloadLink: {
        type: Sequelize.STRING(128),
        allowNull: true,
    },
    title: {
        type: Sequelize.STRING(64),
        allowNull: true,
    },
    createdTime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updateTip: {
        type: Sequelize.STRING(4000),
        allowNull: true,
    },
    deleteFlag: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0
    }
};

module.exports = appVersion;
