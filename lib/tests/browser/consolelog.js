define([
	"module",
	"consolelog",
],function(
	module,
	log
){
	console.log([module.id,'start'].join(':'));
	console.log(log);
	{//basic usage
		log.settings({
			lineNumber: true,
			group: {
			label: 'Log:',
			collapsed: false
			}
		});
		log(42);
		log('lorem');
		log({'lorem':'ipsum'});
	}
});
