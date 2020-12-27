define(["module","console"],function(module,console){
	console.log([module.id,'start'].join(':'));
	console.log(JSON.stringify(requirejs.s.contexts._.config ))
	//tests
	require([
		/*
		"app/tests/jquery",
		"app/tests/jspanel",
		"app/tests/classjs",
		"app/tests/ace",
		"app/tests/babylon",
		"app/tests/jquery.terminal",
		"app/tests/jquery.player",
		"app/tests/jsnes",
		"app/tests/js-dos",
		"app/tests/pdfjs",//not getting this to work
		"app/tests/xlsx",
		"app/tests/jquery.jsonForm",
		"app/tests/datatables",
		"app/tests/babel",
		"app/tests/text",
		*/
		"tests/goja/underscore",
		"tests/goja/lodash",
	],function(){});
});

