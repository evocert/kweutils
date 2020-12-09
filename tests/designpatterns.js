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
	'db'
],function(Class,console,document,Promise,alert,idutils,db){
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
	//module pattern: closures for emulating public/private
	//--------------------------------------------------------------------------------
	try{
		var mod=(function(){
			var prvacc=0;//shielded
			var prvfunc=function(){
				addline("Im a private function");
			};
			return{
				inc:function(){
					prvacc++;
					return this;
				},
				dec:function(){
					prvacc--;
					return this;
				},
				rst:function(){
					prvacc=0;
					return this;
				},
				get:function(){
					return prvacc;
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
		addline(mod.prvacc);//undefined
		mod.tst().tst().tst();
		addline(mod.prvfunc);//undefined
		addline('--------------------------------------------------------------------------------');
	}catch(e){
		addline(e.toString());
	}
	//--------------------------------------------------------------------------------
	//revealing module pattern
	//--------------------------------------------------------------------------------
	try{
		var mod=(function(){
			//all private ...
			var prvacc=0;
			var prvfunc=function(){
				addline("Im a private function");
			};
			function prvinc(){
				prvacc++;
				return this;
			};
			function prvdec(){
				prvacc--;
				return this;
			};
			function prvrst(){
				prvacc=0;
				return this;
			};
			function prvget(){
				return prvacc;
			};
			function prvtst(){
				prvfunc();
				return this;
			};
			return{//exposed as needed, change naming...
				inc:prvinc,
				dec:prvdec,
				rst:prvrst,
				get:prvget,
				tst:prvtst
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
		addline(mod.prvacc);//undefined
		mod.tst().tst().tst();
		addline(mod.prvfunc);//undefined
		addline('--------------------------------------------------------------------------------');
	}catch(e){
		addline(e.toString());
	}
	//--------------------------------------------------------------------------------
	//singleton pattern
	//--------------------------------------------------------------------------------
	try{
		var Sgl=(function(){
			var instance;
			function init(){
				//all private ...
				var prvacc=0;
				var prvrnd=Math.random();
				var prvfunc=function(){
					addline("Im a private function");
				};
				function prvinc(){
					prvacc++;
					return this;
				};
				function prvdec(){
					prvacc--;
					return this;
				};
				function prvrst(){
					prvacc=0;
					return this;
				};
				function prvget(){
					return prvacc;
				};
				function prvgetrnd(){
					return prvrnd;
				};

				function prvtst(){
					prvfunc();
					return this;
				};
				return{//exposed as needed, change naming...
					inc:prvinc,
					dec:prvdec,
					rst:prvrst,
					get:prvget,
					getrnd:prvgetrnd,
					tst:prvtst
				};
			};
			return{
				getInstance:function(){
					if(!instance){
						instance=init();
					}
					return instance;
				}
			};
		})();
		{//instance
			var sgl=Sgl.getInstance();
			addline(sgl.get());
			addline(sgl.getrnd());//confirmation of singleton
			sgl.inc();
		}
		{//instance
			var sgl=Sgl.getInstance();
			addline(sgl.get());
			addline(sgl.getrnd());//confirmation of singleton
		}
		addline('--------------------------------------------------------------------------------');
	}catch(e){
		addline(e.toString());
	}
	//--------------------------------------------------------------------------------
	//observer pattern
	//--------------------------------------------------------------------------------
	try{
		function ObserverList(){
			this.observerList=[];
		}
		ObserverList.prototype.add=function(obj){
			return this.observerList.push(obj);
		};
		
		ObserverList.prototype.count=function(){
			return this.observerList.length;
		};
		
		ObserverList.prototype.get=function(index){
			if(index>-1&&index<this.observerList.length){
				return this.observerList[index];
			}
		};
		
		ObserverList.prototype.indexOf=function(obj,startIndex){
			var i=startIndex;
			while(i<this.observerList.length){
				if(this.observerList[i]===obj){
					return i;
				}
				i++;
			}
			return-1;
		};
		ObserverList.prototype.removeAt=function(index){
			this.observerList.splice(index,1);
		};
		function Subject(){
			this.observers=new ObserverList();
		}
		Subject.prototype.addObserver=function(observer){
			this.observers.add(observer);
		};
		Subject.prototype.removeObserver=function(observer){
			this.observers.removeAt(this.observers.indexOf(observer,0));
		};
		Subject.prototype.notify=function(context){
			var observerCount=this.observers.count();
			for(var i=0;i<observerCount;i++){
				this.observers.get(i).update(context);
			}
		};
		function Observer(){
			/*
				this.update=function(){
					addline('Observer:update()');
				};
			*/
		}
		function extend(obj,extension ){
			for(var key in extension){
				obj[key]=extension[key];
			}
		}
		//concrete
		var sub={};
		extend(sub,new Subject());
		var arrobs=[];
		for(var i=0;i<8;i++){
			var obs={
				update:function(val){
					addline('obs['+this.id+']:update():'+val);
				},
				id:idutils.uuidv4()
			};
			extend(obs,new Observer());
			sub.addObserver(obs);
			arrobs.push(obs);
		}
		sub.notify((function(){
			addline("sub:notifying...");
			return 'hello';
		})());
		sub.notify((function(){
			addline("sub:notifying...");
			return 'world!';
		})());

		addline('--------------------------------------------------------------------------------');
	}catch(e){
		addline(e.toString());
	}

	document.close();
});
