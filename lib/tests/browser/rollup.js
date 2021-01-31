//https://github.com/rollup/rollup/issues/3012
//http://rollupjs.org/repl/
//const generated = await (await rollup.rollup(inputOptions)).generate(options);
//https://jsfiddle.net/developit/rwk0qt4f/
//https://rollupjs.org/guide/en/#a-simple-example
//https://stackoverflow.com/questions/55690293/how-to-fix-typeerror-system-config-is-not-a-function
//https://riptutorial.com/systemjs
define([
	"module",
	"rollup",
	"uglifyjs"
],function(
	module,
	rollup,
	uglifyjs
){
	console.log([module.id,'start'].join(':'));
	{//basic usage
		var files={
			'./a.js':`
				export * from './b.js'
			`,
			'./b.js':`
				export default "b value"
				function fb0(){}
				export function fb1(){}
				function fb2(){}
				export function fb3(){}
			`,
			'./c.js':`
				function test(){console.log('test');}
				export default test;
			`,
			'./main.js':`
				import * as a from './a.js';
				import b from './b.js';
				import c from './c.js';
				console.log(a);
				console.log(b);
				console.log(c);
				export default {
					a:a,
					b:b,
					c:c
				}
			`
		};
		const inopt={
				plugins:[{
					resolveId(importee,importer){
						console.log(importee);
						console.log(importer);
						return importee;//+".js";
					},
					load:function(id){
						console.log(id);
						return files[id].trim();;
					},
				}],
				onwarn(warning){
					console.warn(warning);
				},
				input:'./main.js',
		};
		const outopt={
			file:'out.js',
			format:'amd',//'system',//'amd',//'system'
			amd:{id:'myBundle'},
			name:'myBundle',
			globals:{'foo':42},
			compact:true
		}
		rollup.rollup(inopt).then(function(val){
			console.log(val);
			val.generate(outopt).then(function(val){
				console.log(val);
				console.log('-'.repeat(8));
				val.output.forEach(function(val){
					console.log(val.fileName);
					try{val.code=uglifyjs.minify(val.code).code}catch(err){console.error(err)};
					console.log(val.code);
					console.log('-'.repeat(8));
					try{
						switch(outopt.format){
							case 'es':
								break;
							case 'amd':
								eval(val.code);
								console.log("requirejs test");
								require([
									outopt.amd.id,
									'cyclejs'
								],function(
									mod,
									cyclejs
								){
									console.log("value:");
									console.log(cyclejs.decycle(mod));
								});
								break;
							case 'system':
								console.log("systemjs test");
								require(["systemjs"],function(System){
									System.config(
									    {
										"packages": {
											"greeter": "bundle:"+outopt.name,
											"main": "bundle:main"
										}
									    }
									);
									System.defaultJSExtensions=false;
									console.log(System.getRegister());
									eval(val.code);
									console.log(System.getRegister());
									System.import(outopt.name).then(null, console.error.bind(console));
								});
								break;
							case 'cjs':
								break;
							default:
								break;
						}
					}catch(e){
						console.error(e.toString());
					}
				});
			},function(err){
				console.error(err);
			});
		},function(err){
			console.error(err);
		});
	}
});
