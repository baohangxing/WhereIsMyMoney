const Sequelize = require('sequelize'); // 引入sequelize
const CONFIG = require('../config/config');
const user = require('../model/user');
const bill = require('../model/bill');
const userType = require('../model/userType');
const defaultType = require('../model/defaultType');

const sequelize = new Sequelize(`${CONFIG.mysql.database}`, `${CONFIG.mysql.user}`, `${CONFIG.mysql.password}`, {
    host: `${CONFIG.host}`,
    dialect: 'mysql',
    pool: {
        max: 6,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00',
    define: {
        timestamps: false
    },
    dialectOptions: {
        useUTC: false //for reading from database
    }
});

const UserModel = sequelize.define('user', user, {
    timestamps: false // 不要默认时间戳
});
const BillModel = sequelize.define('bill', bill, {
    timestamps: false
});
const DefaultTypeModel = sequelize.define('defaultType', defaultType, {
    timestamps: false
});
const UserType = sequelize.define('userType', userType, {
    timestamps: false
});
module.exports = {
    UserModel,
    BillModel,
    DefaultTypeModel,
    UserType
};
