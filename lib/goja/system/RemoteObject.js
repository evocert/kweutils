define([
	'console',
	'class',
	'idutils'
],function(console,Class,idutils){
	return new Class({
		options:{
			id:null,
			data:null,
		},
		initialize:function(options){
			if(options==null){
				this.options=options;
			}else{
				this.options.id=idutils.uuidv4();
			}
		},
		toJson:function(){
			var _this=this;
			return {
				'id':this.options.id,
				'data':(function(){
					if(typeof(_this.data)=='object')return JSON.stringify(_this.options.data);
					return{};
				}).call(this)
			};
		}
	});
});
