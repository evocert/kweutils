define([
	'console',
	'class',
	'idutils'
],function(console,Class,idutils){
	return new Class({
		id:null,
		data:null,
		initialize:function(){
			this.id=idutils.uuidv4();
		},
		tojson:function(){
			var _this=this;
			return {
				'id':this.id,
				'data':(function(){
					if(typeof(_this.data)=='object')return JSON.stringify(_this.data);
					return{};
				}).call(this)
			};
		}
	});
});
