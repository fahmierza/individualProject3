module.exports = (sequelize, Sequelize) => {
	const News3 = sequelize.define("news3", {
		judul: {
			type: Sequelize.STRING
		},
		author: {
			type: Sequelize.STRING
		},
		artikel: {
			type: Sequelize.TEXT
		}		
	});

	return News3;
};