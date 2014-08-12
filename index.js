'use strict';
// var path = require('path'),
// 	passport = require('passport');

module.exports = function(periodic){
	// express,app,logger,config,db,mongoose
	var sampleRouter = periodic.express.Router(),
		sampleController = require('./controller/sample')(periodic);

	sampleRouter.get('/sampleextension', sampleController.examplefunction);

	periodic.app.use('/sample',sampleRouter);
};