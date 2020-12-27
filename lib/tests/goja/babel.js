define([
	'module',
	'console',
	'babel',
],function(module,console,Babel){
	console.log([module.id,'start'].join(':'));
	console.log(typeof(Babel));
	var output=Babel.transform(
		'const test=()=>"Hello World";\n'+
		'test();\n'
		,
		{
			presets:['env'],
		}
	);
	console.log(output.code);
});
