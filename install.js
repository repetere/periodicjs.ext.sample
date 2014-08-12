'use strict';

var path = require('path'),
	ExtensionCore = require('periodicjs.core.extensions'),
	Extension = new ExtensionCore({
		extensionFilePath: path.resolve(__dirname,'../../content/extensions/extensions.json') 
	}),
	fs = require('fs-extra'),
	async = require('async'),
	packagejsonFileJSON = fs.readJSONSync(path.resolve('./package.json')),
	extname = packagejsonFileJSON.name;

async.series({
	installExtPublicDirectory: function(callback){
		Extension.installPublicDirectory({
			extname: extname,
			extdir : path.resolve( './public'),
			extpublicdir : path.resolve(__dirname,'../../public/extensions/', extname)
		},callback);
	},
	installExtSetPeriodicConf: function(callback){
		Extension.setExtConf({
			extname:extname,
			extpackfile:path.resolve('./package.json'),
			extconffile:path.resolve('./periodicjs.ext.json')
		},callback);
	}
},function(err,results){
	if(err){
		throw new Error(err);
	}
	else{
		console.log(results.installExtPublicDirectory);
		Extension.updateExtConfFile(results.installExtSetPeriodicConf,
			function(err,status){
				if(err){
					throw new Error(err);
				}
				else{
					console.log(status);
				}
			});
	}
});
