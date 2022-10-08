const { ApolloServer, gql } = require('apollo-server');


const db = require("./models");
db.sequelize.sync()
	.then(() => {
		console.log("sync db");
	})
	.catch((err) => {
		console.log("error: " + err.message);
	});

const News = db.newss3;
const Comment = db.comments3;
const Op = db.Sequelize.Op;

const resolvers = {
	Query: {
		news: () => {
			return News.findAll()
				.then(news => {
					return news;
				})
				.catch(err => {
					return [];
				});
		},
		comment: () => {
			return Comment.findAll()
				.then(comment => {
					return comment;
				})
				.catch(err => {
					return [];
				});
		}
	},

	Mutation: {
		createNews: (parent, { judul, author, artikel }) => {
			var news = {
				judul: judul,
				author: author,
				artikel: artikel
			}
			return News.create(news)
				.then(data => {
					return data;
				})
				.catch(err => {
					return {};
				});
		},
		getNews: (parent, { id }) => {
			return News.findByPk(id)
				.then(detailNews => {
					return detailNews;
				})
				.catch(err => {
					return {};
				});
			
			
		},
		getComment: (parent, { idnews }) => {
			var id = idnews;
			return Comment.findAll({where: {idnews: id}})
				.then(data => {
					return data;
				})
				.catch(err => {
					return {};
				});
			
			
		},
		updateNews: (parent, { id, judul, author, artikel }) => {
			var news = {
				judul: judul,
				author: author,
				artikel: artikel
			}
			return News.update(news, {
				where: { id: id }
			})
				.then(data => {
					return data;
				})
				.catch(err => {
					return {};
				});
		},
		deleteNews: (parent, { id }) => {
			return News.destroy({
				where: { id: id }
			})
				.then(data => {
					return data;
				})
				.catch(err => {
					return {};
				});
		},
		comment: (parent, {idnews, nama, komentar}) => {
			var comment = {
				idnews: idnews,
				nama: nama,
				komentar: komentar
			}
			return Comment.create(comment)
			.then(data => {
				return data;
			})
			.catch(err => {
				return {};
			});
		}

	}
};


const {
	ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const fs = require('fs');
const path = require('path');
const typeDefs = fs.readFileSync("./schema.graphql", "utf8").toString();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	csrfPrevention: true,
	cache: 'bounded',
	/**
	 * What's up with this embed: true option?
	 * These are our recommended settings for using AS;
	 * they aren't the defaults in AS3 for backwards-compatibility reasons but
	 * will be the defaults in AS4. For production environments, use
	 * ApolloServerPluginLandingPageProductionDefault instead.
	**/
	plugins: [
		ApolloServerPluginLandingPageLocalDefault({ embed: true }),
	],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});  