var __dirname = require('path').normalize(__dirname+'../../../');
console.log('__dirname ',__dirname);
module.exports = {
	development:{
		db:"mongodb://localhost:27017/cloudFarm",
		__dirname:__dirname,
		port: process.env.PORT || 3030
	},
	production:{
		db:'mongodb://rodrigosavage:rtopdfrtio@ds063869.mongolab.com:63869/cloudfarm',
		__dirname:__dirname,
		port: process.env.PORT || 80
	}
}