define([
	'console',
	'document',
	'html',
	'node',
	'lib/vendor/lodash/lodash.min'
],function(
	console,
	document,
	Html,
	Node,
	_
){
	var html=(new Node({tag:"html"})).append([
		new Node({tag:"head"}).append([
			new Node({tag:"meta"}).attr('charset','utf-8'),
			new Node({tag:"style"}).text('*{background:#000000;color:#00FF00;}')
		]),
		new Node({tag:"body"}).append([
			new Node({tag:'h3'}).text('lib/vendor/lodash test'),
			new Node({tag:'p'}).append((function(){
				var ret=[];
				ret.push(new Node({tag:"div"}).text(JSON.stringify(_.defaults({'a':1},{'a':3,'b':2}))));
				return ret;
			})())
		])
	])
	document.write(html.toString());
});
