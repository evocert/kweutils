//A lightweight analytics abstraction library for tracking page views, custom events, & identify visitors. Designed to work with any third-party analytics tool.
//https://github.com/davidwells/analytics
//https://getanalytics.io/
define([
	"module",
	"analytics",
],function(
	module,
	Analytics
){
	console.log([module.id,'start'].join(':'));
	console.log(Analytics);
	{//basic usage
		/* Initialize analytics */
		const analytics = _analytics.Analytics({
			  app: 'my-app-name',
			  version: 100,
			  plugins: []
		});
		console.log(analytics);
	}
});
