
define([
	'console',
	'alert',
	'document',
	'html',
	'node',
	'underscore',
],function(
	console,
	alert,
	document,
	Html,
	Node,
	_
){
	html=(new Node({tag:"html"})).append([
		head=new Node({tag:"head"}).append([
			new Node({tag:"meta"}).attr('charset','utf-8'),
			new Node({tag:"style"}).text('*{background:#000000;color:#00FF00;}')
		]),
		body=new Node({tag:"body"}).append(
			(function(){
				ret=[];
				ret.push(new Node({tag:'h3'}).text("Underscore test"));
				_.each([1,2,3],function(val){
					ret.push(new Node({tag:'p'}).text(val));
				});
				return ret;
			})()
		)
	])
	document.write(html.toString());
});
