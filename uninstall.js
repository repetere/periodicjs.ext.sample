'use strict';

var path = require('path'),
	fs = require('fs-extra'),
	async = require('async'),
	extensionFilePath = path.resolve(__dirname,'../../content/extensions/extensions.json'),
	extensionFileJson = fs.readJSONSync(extensionFilePath),
	packagejsonFileJSON = fs.readJSONSync(path.resolve('./package.json')),
	extname = packagejsonFileJSON.name,
	extpublicdir = path.resolve(__dirname,'../../public/extensions/', extname),
	ExtensionCore = require('periodicjs.core.extensions'),
	Extension = new ExtensionCore({
		extensionFilePath: extensionFilePath 
	});

async.series({
	removeExtPublicDirectory: function(callback){
		Extension.removePublicFiles({
			publicdir : extpublicdir
		},callback);
	},
	removeExtFromPeriodicConf: function(callback){
		Extension.removeExtFromConf({
			extname : extname,
			currentExtensionsConfJson : extensionFileJson
		},callback);
	}
},function(err,results){
	if(err){
		throw new Error(err);
	}
	else{
		console.log(results);
	}
});
