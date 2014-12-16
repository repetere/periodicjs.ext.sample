'use strict';

var // path = require('path'),
	ControllerHelper = require('periodicjs.core.controller'),
	CoreController,
	appSettings,
	mongoose,
	logger;

var examplefunction = function (req, res) {
	CoreController.getPluginViewDefaultTemplate({
			viewname: 'sample/index',
			themefileext: appSettings.templatefileextension,
			extname: 'periodicjs.ext.sample'
		},
		function (err, templatepath) {
			CoreController.handleDocumentQueryRender({
				res: res,
				req: req,
				renderView: templatepath,
				responseData: {
					pagedata: {
						title: 'Sample Extension',
					},
					user: req.user
				}
			});
		}
	);
};


var controller = function (resources) {
	logger = resources.logger;
	mongoose = resources.mongoose;
	appSettings = resources.settings;
	CoreController = new ControllerHelper(resources);

	return {
		examplefunction: examplefunction
	};
};

module.exports = controller;
