define([
	'console',
	'class',
	'idutils',
	'Module',
	'Application',
],function(console,Class,idutils,Module,Application){
	this.SystemMgr=new Class({
		systems:{},
		id:null,
		initialize:function(options){
			this.id=idutils.uuidv4();
			//console.log(["SystemMgr","initialize",this.serialize()].join(":"));
		},
		addsystem:function(system){
			this.systems[system.id]=system;
			return system;
		},
		getsystems:function(options){
			return this.systems;
		},
		serialize:function(options){
			_this=this;
			var ret=JSON.stringify({
				systems:(function(){
					var ret={};
					Object.keys(_this.systems).forEach(function(sid){
						ret[sid]=_this.systems[sid].toJson();
					});
					return ret;
				})()
			},0,2);
			return ret;
		},
		deserialize:function(options){
		}
	});
	this.systemMgr=new SystemMgr();
	this.System=Class({
		mod:null,
		app:null,
		id:null,
		initialize:function(options){
			options=options==null?{}:options
			this.options={};
			this.id=options.id==null?idutils.uuidv4():options.id;
			this.mod={};
			this.app={};
			systemMgr.addsystem(this);
			//console.log(["System","initialize",this.serialize()].join(":"));
		},
		addmod:function(arg){
			if(arg==null)return;
			this.mod[arg.id]=arg;
			return arg;
		},
		addapp:function(arg){
			if(arg==null)return;
			this.app[arg.id]=arg;
			return arg;
		},
		getsystems:function(options){
			return systemMgr.serialize();
		},
		toJson:function(options){
			var _this=this;
			return {
				id:this.id,
				app:(function(){
					var ret={};
					Object.keys(this.app).forEach(function(mid){
						ret[mid]=_this.app[mid].toJson();
					});
					return ret;
				}).call(this),
				mod:(function(){
					var ret={};
					Object.keys(this.mod).forEach(function(mid){
						ret[mid]=_this.mod[mid].toJson();
					});
					return ret;
				}).call(this)
			};
		},
		serialize:function(options){
			return JSON.stringify(this.toJson());
		},
		deserialize:function(options){
		}
	});
	return{
		SystemMgr:systemMgr,
		System:System
	}
});
