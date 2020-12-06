/*
request.ResponseHeader().Set("Content-Type","application/json");
request.ResponseHeaders().forEach(function(a,b){
        println([a,request.ResponseHeader().Get(a)].join(":"));
});
request.ResponseHeader().Set("Content-Type","application/json");
*/
require([
	'console',
	'alert',
	'System',
	'Module',
	'Application'
],function(console,alert,System,Module,Application){
	console.time("create system");
	var sysmgr=System.SystemMgr;
	sys=new System.System();
	for(var i=0;i<8;i++)sys.addmod(
		new Module().addmod((function(){var modbuf=[];for(var i=0;i<8;i++)
			modbuf.push(new Module().addmod((function(){var modbuf=[];for(var i=0;i<8;i++)
				modbuf.push(new Module().addmod((function(){var modbuf=[];for(var i=0;i<8;i++)
					modbuf.push(new Module().addmod((function(){var modbuf=[];for(var i=0;i<8;i++)
						modbuf.push(new Module())
					return modbuf;}).bind(this)()))
				return modbuf;}).bind(this)()))
			return modbuf;}).bind(this)()))
		return modbuf;}).bind(this)())
	);
	for(var i=0;i<8;i++)sys.addapp(
		new Application().addmod((function(){var modbuf=[];for(var i=0;i<8;i++)
			modbuf.push(new Module().addmod((function(){var modbuf=[];for(var i=0;i<8;i++)
				modbuf.push(new Module().addmod((function(){var modbuf=[];for(var i=0;i<8;i++)
					modbuf.push(new Module().addmod((function(){var modbuf=[];for(var i=0;i<8;i++)
						modbuf.push(new Module())
					return modbuf;}).bind(this)()))
				return modbuf;}).bind(this)()))
			return modbuf;}).bind(this)()))
		return modbuf;}).bind(this)())

	);
	console.timeEnd("create system");
	console.time("serialize system");
	console.log(sys.toJson());
	console.timeEnd("serialize system");
});
