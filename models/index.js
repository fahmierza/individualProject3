const { Sequelize, DataTypes } = require('sequelize');

// sql server
const sequelize = new Sequelize('NodeDB', 'test1', '1234', {
	dialect: 'mssql',
	//host: "192.168.xx",
	dialectOptions: {
	  // Observe the need for this nested `options` field for MSSQL
	  options: {
		// Your tedious options here
		useUTC: false,
		dateFirst: 1,
	  },
	},
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.newss3 = require('./news')(sequelize, Sequelize);
db.comments3 = require('./comment')(sequelize, Sequelize);

db.newss3.hasMany(db.comments3, {as: "comments"})
db.comments3.belongsTo(db.newss3,{foreignKey:'idnews'});

module.exports = db;