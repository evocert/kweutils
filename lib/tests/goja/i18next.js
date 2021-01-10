//not getting this working in goja yet
//requires promise etc
define([
	"module",
	"console",
	"cyclejs",
	"i18next",
],function(
	module,
	console,
	cyclejs,
	i18next,
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(i18next));
	{//basic usage
		i18next.init({
			lng: 'en',
			debug: true,
			resources: {
				en: {
					translation: {
						"key": "hello world"
					}
				}
			}
		},function(err, t) {
			console.log('ok');
			//console.log(i18next.t('key'));
		});
	}
});
