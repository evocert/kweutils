require([
	'console',
	'RemoteObject'
],function(console,RemoteObject){
	var ro=new RemoteObject({});
	println(JSON.stringify(ro.toJson()));
});
