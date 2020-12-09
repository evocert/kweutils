define([
	'console',
	'document',
	'html',
	'node',
	'canvas',
	'idutils',
],function(
	console,
	document,
	html,
	node,
	canvas,
	idutils,
){
	var html=(new node({tag:"html"})).append([
		new node({tag:"head"}).append([
			new node({tag:"meta"}).attr('charset','utf-8'),
			new node({tag:"style"}).text('*{background:#000000;color:#00FF00;}')
		]),
		new node({tag:"body"}).append([
			new node({tag:'h3'}).text('lib/html test'),
			new node({tag:'p'}).append((function(){
				var ret=[];
				for(var i=0;i<4;i++){
					ret.push(new node({tag:"pre"}).attr('id',idutils.uuidv4()).text((function(){
						var ret=[];
						for(var i=0;i<4;i++){
							ret.push(idutils.uuidv4());
						}
						return ret.join('\n');
					})()));
				}
				return ret;
			})()),
			new canvas({width:128,height:128,data:(function(){
				var data=[];
				var width=128;
				var height=128;
				for(var x=0;x<width;x++){
					var row=[]
					for(var y=0;y<width;y++)
						row.push([x%255,y%255,255-y%255,255]);
					data.push(row);
				}
				return data;
			})()}),

		])
	])
	document.write(html.toString());
});
