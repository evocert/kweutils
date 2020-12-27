define(["module"],function(module){
	var baseurl=module.id.substring(0,module.id.lastIndexOf('/'));
	requirejs.config({
		//"urlArgs":["cachebust",(new Date()).getTime()].join("="),
		"waitSeconds":0,
		"baseUrl":baseurl,
		"paths": {
			"console":"goja/console",
			"alert":"goja/alert",
			"classjs":"vendor/classjs/class.min",
			"underscore":"vendor/underscore/underscore-min",
			"lodash":"vendor/lodash/lodash.min",
			"babel":"vendor/babel/babel.min",
			"text":"vendor/requirejs/require.text",
		},
		"config":{
			"text":{
				//"env":"goja"
				"env":"xhr"
			}
		},
		"map":{
		},
		"shim": {
			"underscore":{
				"deps":[],
				"exports":"_"
			},
			"lodash":{
				"deps":[],
				"exports":"_"
			},
			"babel":{
				"deps":[],
				"exports":"Babel"
			},
		}
	});
})
