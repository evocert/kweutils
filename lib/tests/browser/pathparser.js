//pathparser.js is a tiny, simple-to-use JavaScript URL parser/router with no dependencies. It supports optional named parameters, query string parameter parsing, and automatic parameter assignment:
//https://github.com/dstillman/pathparser.js
define([
	"module",
	"pathparser",
],function(
	module,
	PathParser
){
	console.log([module.id,'start'].join(':'));
	console.log(PathParser);
	{//basic usage
		var params = { format: 'html' };
		var router = new PathParser(params);
		router.add('users/:userID', function () {
		    params.controller = 'users';
		});
		router.add('groups/:groupID', function () {
		    params.controller = 'groups';
		});

		router.run('/users/12345?format=json');
		// params.controller == 'users'
		// params.userID == 12345
		// params.format == 'json'
	}
});
