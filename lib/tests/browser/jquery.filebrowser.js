//https://github.com/jcubic/jquery.filebrowser
//https://www.jqueryscript.net/other/Mac-OS-Like-Directory-File-Browser-Plugin-For-jQuery-File-Browser.html
define([
	"module",
	"jquery",
	"jquery.filebrowser",
	"css!vendor/jquery.filebrowser/0.8.2/css/jquery.filebrowser.min.css"
],function(
	module,
	jquery
){
	console.log([module.id,'start'].join(':'));
	{//basic usage
		var container=$("<div/>").attr({"id":"browser"});
		$("body").append(container);
		var browse = container.browse({
		root: '/',
		separator: '/',
		contextmenu: true,
		dir: function(path) {
			return new Promise(function(resolve, reject) {
			 if (path == '/') {
				 resolve({dirs: ['foo', 'bar'], files: []});
			 } else if (path == '/foo/') {
				 resolve({dirs: [], files: ['baz', 'quux']});
			 } else if (path == '/bar/') {
				 resolve({dirs: [], files: ['lorem', 'ipsum']});
			 } else {
				 reject(); // for cases when you type wrong path in address bar
			 }
			 });
		},
		open: function(filename) {
			console.log('opening ' + filename);
		}
		});
	}
});
