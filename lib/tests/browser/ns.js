//https://github.com/Soldier-B/ns.js
//A small and simple Javascript namespace function
define([
	"module",
	"ns",
],function(
	module,
	Namespace
){
	console.log([module.id,'start'].join(':'));
	console.log(Namespace);
	{//basic usage
		// define namespace
		Namespace('utility.component');

		// define namespace with callback
		Namespace('utility.component', function(){
			this.name = 'component';
		});

		// assign namespace with callback
		var component = Namespace('utility.component', function(){
			this.name = 'component';
		});
		console.log(component);
	}
});
