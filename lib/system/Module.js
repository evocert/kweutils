define([
	'console',
	'class',
	'idutils'
],function(console,Class,idutils){
	return new Class({
		id:null,
		mod:null,
		initialize:function(){
			this.id=idutils.uuidv4(),
			this.mod={};
			//console.log("Module:initialize");
		},
		addmod:function(arg){
			if(arg==null)return;
			var _this=this;
			if(Array.isArray(arg)){
			//if(typeof(arg.length)!=null){
				arg.forEach(function(mod){
					_this.mod[mod.id]=mod;
				});
			}else{
				this.mod[arg.id]=arg;
			}
			return this
		},
		toJson:function(){
			var _this=this;
			return {
				'id':this.id,
				'mod':(function(){
					var ret={};
					Object.keys(this.mod).forEach(function(sid){
						ret[sid]=_this.mod[sid].toJson();
					});
					return ret;
				}).call(this)
			};
		}
	});
});
