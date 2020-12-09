/*
 * goja class and object creation conformance test
 */
require([
	'class',
	'console',
	'document',
	'Promise',
	'alert',
	'idutils',
	'db',
	'lib/vendor/domino/Node',
],function(Class,console,document,Promise,alert,idutils,db,w){
	document.head.append((function(){
		var el=document.createElement('meta');
		el.setAttribute('charset','utf-8')
		return el;
	})());
	document.head.append((function(){
		var el=document.createElement('style');
		el.innerText='*{background:#000000;color:#00FF00;font-family:monospace;}';
		return el;
	})());
	function addline(val){
		var el=document.createElement('div');
		el.innerText=typeof(val)=='object'?JSON.stringify(val):val;
		document.body.append(el);
	}
	//--------------------------------------------------------------------------------
	//closures for emulating public/private
	//--------------------------------------------------------------------------------
	try{
		var mod=(function(){
			var prvcounter=0;//shielded
			var prvfunc=function(){
				addline("Im a private function");
			};
			return{
				inc:function(){
					prvcounter++;
					return this;
				},
				dec:function(){
					prvcounter--;
					return this;
				},
				rst:function(){
					prvcounter=0;
					return this;
				},
				get:function(){
					return prvcounter;
				},
				tst:function(){
					prvfunc();
					return this;
				}
			};
		})();
		addline(mod.get());
		mod.inc();
		addline(mod.get());
		mod.dec().dec();
		addline(mod.get());
		mod.inc().inc().inc();
		addline(mod.get());
		addline(mod.rst().get());
		addline(mod.prvcounter);//undefined
		mod.tst().tst().tst();
		addline(mod.prvfunc);//undefined
		addline('--------------------------------------------------------------------------------');
	}catch(e){
		addline(e.toString());
	}
	document.close();
});
