'use strict';

var path = require('path'),
	AppController = require(path.join(process.cwd(),'app/controller/application')),
	applicationController,
	appSettings,
	mongoose,
	logger;

var examplefunction = function(req, res) {
	res.send('extention works');
};

var controller = function(resources){
	logger = resources.logger;
	mongoose = resources.mongoose;
	appSettings = resources.settings;
	applicationController = new AppController(resources);

	return{
		examplefunction:examplefunction
	};
};

module.exports = controller;