//Lightweight client & server-side logging with Stream-API backends
//https://github.com/mixu/minilog/
//http://mixu.net/minilog/
//note: Browser: Array, Console, jQuery, localStorage
define([
	"module",
	"minilog",
],function(
	module,
	Minilog
){
	console.log([module.id,'start'].join(':'));
	console.log(Minilog);
	{//basic usage
		var log = Minilog('app');
		Minilog.enable();
		log
			.debug('debug message')
			.info('info message')
			.log('info message')
			.warn('warning')
			.error('this is an error message');
	}
});
