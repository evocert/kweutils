/*
request.ResponseHeader().Set("Content-Type","application/json");
request.ResponseHeaders().forEach(function(a,b){
        println([a,request.ResponseHeader().Get(a)].join(":"));
});
request.ResponseHeader().Set("Content-Type","application/json");
*/
require([
	'request',
	'document',
	'node',
	'console',
	'alert',
	'System',
	'Module',
	'Application'
],function(request,document,node,console,alert,System,Module,Application){
	console.time("create system");
	var sysmgr=System.SystemMgr;
	sys=new System.System();
	console.log(request);
	var nitr=parseInt(request.tojson().parameters["itr"]);
	nitr=nitr==null?4:isNaN(nitr)?4:nitr;
	for(var i=0;i<nitr;i++)sys.addmod(
		new Module().addmod((function(){var modbuf=[];for(var i=0;i<nitr;i++)
			modbuf.push(new Module().addmod((function(){var modbuf=[];for(var i=0;i<nitr;i++)
				modbuf.push(new Module().addmod((function(){var modbuf=[];for(var i=0;i<nitr;i++)
					modbuf.push(new Module().addmod((function(){var modbuf=[];for(var i=0;i<nitr;i++)
						modbuf.push(new Module())
					return modbuf;}).bind(this)()))
				return modbuf;}).bind(this)()))
			return modbuf;}).bind(this)()))
		return modbuf;}).bind(this)())
	);
	for(var i=0;i<nitr;i++)sys.addapp(
		new Application().addmod((function(){var modbuf=[];for(var i=0;i<nitr;i++)
			modbuf.push(new Module().addmod((function(){var modbuf=[];for(var i=0;i<nitr;i++)
				modbuf.push(new Module().addmod((function(){var modbuf=[];for(var i=0;i<nitr;i++)
					modbuf.push(new Module().addmod((function(){var modbuf=[];for(var i=0;i<nitr;i++)
						modbuf.push(new Module())
					return modbuf;}).bind(this)()))
				return modbuf;}).bind(this)()))
			return modbuf;}).bind(this)()))
		return modbuf;}).bind(this)())

	);
	console.log(sys.toJson());
	var html=(new node({tag:"html"})).append([
		new node({tag:"head"}).append([
			new node({tag:"meta"}).attr('charset','utf-8'),
			new node({tag:"style"}).text('*{background:#000000;color:#00FF00;}')
		]),
		new node({tag:"body"}).append([
			new node({tag:'h3'}).text('tests/system.js'),
			new node({tag:'p'}).text('(try url parameters: e.g. http://localhost/kweutils/goja.html?test=tests/system&itr=4)'),
			new node({tag:'hr'}),
			new node({tag:'h4'}).text(['Iterations',nitr].join(':')),
			new node({tag:'pre'}).text(JSON.stringify(sys.toJson(),0,2))
		])
	])
	document.write(html.toString());
});
