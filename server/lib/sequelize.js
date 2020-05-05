const Sequelize = require('sequelize'); // 引入sequelize
const CONFIG = require('../config/config');
const user = require('../models/user');
const bill = require('../models/bill');
const userType = require('../models/userType');
const defaultType = require('../models/defaultType');
const appVersion = require('../models/appVersion');

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
		dateStrings: true,
		typeCast: true,
		useUTC: false //for reading from database
	},
});

const UserModel = sequelize.define('user', user, {
	timestamps: false // 不要默认时间戳
});
const BillModel = sequelize.define('bill', bill, {
	timestamps: false
});
const DefaultTypeModel = sequelize.define('defaultTypes', defaultType, {
	timestamps: false
});
const UserTypeModel = sequelize.define('userTypes', userType, {
	timestamps: false
});
const AppVersionModel = sequelize.define('appVersions', appVersion, {
	timestamps: false
});

module.exports = {
	UserModel,
	BillModel,
	DefaultTypeModel,
	UserTypeModel,
	AppVersionModel
};
