
define([
	'console',
	'document',
	'html',
	'node',
	'idutils',
	'underscore',
],function(
	console,
	document,
	Html,
	Node,
	idutils,
	underscore
){
	console.time('dom building');
	var html=(new Node({tag:"html"}).attr('id',idutils.uuidv4())).append([
		new Node({tag:"head"}).attr('id',idutils.uuidv4()).append([
			new Node({tag:"meta"}).attr('charset','utf-8').attr('id',idutils.uuidv4()),
			new Node({tag:"style"}).attr('id',idutils.uuidv4()).text('*{background:#000000;color:#00FF00;}')
		]),
		new Node({tag:"body"}).append([
			new Node({tag:'h3'}).attr('id',idutils.uuidv4()).text('lib/html/node.js test'),
			new Node({tag:'p'}).attr('id',idutils.uuidv4()).append((function(){
				var ret=[];
				for(var i=0;i<128;i++){
					ret.push(new Node({tag:"pre"}).attr('id',idutils.uuidv4()).text((function(){
						var ret=[];
						for(var i=0;i<64;i++){
							ret.push(idutils.uuidv4());
						}
						return ret.join('\n');
					})()));
				}
				return ret;
			})())
		])
	])
	console.timeEnd('dom building');
	console.time('dom serialization');
	document.write(html.toString());
	console.timeEnd('dom serialization');
});
