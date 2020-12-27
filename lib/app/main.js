define(["module",],function(module){
	console.log([module.id,'start'].join(':'));
	//tests
	require([
		"tests/browser/jquery",
		"tests/browser/jspanel",
		"tests/browser/classjs",
		"tests/browser/ace",
		"tests/browser/babylon",
		"tests/browser/jquery.terminal",
		"tests/browser/jquery.player",
		"tests/browser/jsnes",
		"tests/browser/js-dos",
		"tests/browser/pdfjs",//browser/not getting this to work
		"tests/browser/xlsx",
		"tests/browser/jquery.jsonForm",
		"tests/browser/datatables",
		"tests/browser/babel",
		"tests/browser/text",
		"tests/browser/underscore",
		"tests/browser/lodash",
	],function(){});
});

