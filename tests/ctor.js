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
	//Object creation
	//--------------------------------------------------------------------------------
	try{
		var o;
		o={};
		addline(o);
		o=Object.create(Object.prototype);
		addline(o);
		o=new Object();
		addline(o);
		addline('----------------------------------------');
	}catch(e){
		addline(e.toString());
	}
	//--------------------------------------------------------------------------------
	//Assigning keys and values to objects
	//--------------------------------------------------------------------------------
	try{
		//es3+
		var o={};
		o.k0=42;
		addline(o.k0);
		o['k0']=24;
		addline(o['k0']);
		addline('----------------------------------------');
	}catch(e){
		addline(e.toString());
	}
	try{
		//es5
		var o={};
		Object.defineProperty(o,'k0',{
			value:24,
			writable:true,
			enumerable:true,
			configurable:true
		});
		addline(o);
		addline('----------------------------------------');
	}catch(e){
		addline(e.toString());
	}
	try{
		//es5
		var o={};
		Object.defineProperties(o,{
			'k0':{
				value:24,
				writable:true,
				enumerable:true,
				configurable:true
			},
			'k1':{
				value:42,
				writable:true,
				enumerable:true,
				configurable:true
			}
		});
		addline(o);
		addline('----------------------------------------');
	}catch(e){
		addline(e.toString());
	}
	try{
		//inheritance
		bas=Object.create(Object.prototype);
		Object.defineProperties(bas,{
			'k0':{
				value:24,
				writable:true,
				enumerable:true,
				configurable:true
			}
		});
		sub=Object.create(bas);
		Object.defineProperties(sub,{
			'k1':{
				value:24,
				writable:true,
				enumerable:true,
				configurable:true
			},
			'k2':{
				value:'lorem',
				writable:true,
				enumerable:true,
				configurable:true
			}
		});
		addline(bas);
		addline(sub);
		addline('----------------------------------------');
	}catch(e){
		addline(e.toString());
	}
	try{
		//constructor functions
		function C0(){
			this.k0=0;
			this.k1=0;
			this.set_k0=function(val){
				this.k0=val;
			}
			this.set_k1=function(val){
				this.k1=val;
			}
			this.get_k0=function(){
				return this.k0;
			}
			this.get_k1=function(){
				return this.k1;
			}
		}
		c0=new C0();
		addline(c0);
		c0.set_k0(42);
		c0.set_k1(24);
		addline(c0.get_k0());
		addline(c0.get_k1());
		addline(c0);
		c1=new C0();
		addline(c0.prototype==c1.prototype);//true
		addline(c0.set_k0==c1.set_k0);//false - indicates copies of functions created
		addline('----------------------------------------');
	}catch(e){
		addline(e.toString());
	}
	try{
		//constructor functions
		function C1(){
			this.k0=0;
			this.k1=0;
		}
		C1.prototype.set_k0=function(val){
			this.k0=val;
		}
		C1.prototype.set_k1=function(val){
			this.k1=val;
		}
		C1.prototype.get_k0=function(){
			return this.k0;
		}
		C1.prototype.get_k1=function(){
			return this.k1;
		}
		c0=new C1();
		addline(c0);
		c0.set_k0(42);
		c0.set_k1(24);
		addline(c0.get_k0());
		addline(c0.get_k1());
		addline(c0);
		c1=new C1();
		addline(c0.prototype==c1.prototype);//true
		addline(c0.set_k0==c1.set_k0);//true - indicates shared
		addline('----------------------------------------');
	}catch(e){
		addline(e.toString());
	}
	try{
		//test jsclass
		C2=new Class({
			k0:null,
			k1:null,
			initialize:function(){
				this.k0=0;
				this.k1=0;
			},
			set_k0:function(val){
				this.k0=val;
			},
			set_k1:function(val){
				this.k1=val;
			},
			get_k0:function(){
				return this.k0;
			},
			get_k1:function(){
				return this.k1;
			}
		});
		c0=new C2();
		addline(c0);
		c0.set_k0(42);
		c0.set_k1(24);
		addline(c0.get_k0());
		addline(c0.get_k1());
		c1=new C2();
		addline(c1);
		c1.set_k0(42);
		c1.set_k1(24);
		addline(c1.get_k0());
		addline(c1.get_k1());
		addline(c0.prototype==c1.prototype);//true
		addline(c0.set_k0==c1.set_k1);//false, indicating library creates copies of functions
		addline('----------------------------------------');

	}catch(e){
		addline(e.toString());
	}
	document.close();
});
