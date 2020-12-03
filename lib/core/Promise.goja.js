/*
 * goja promise wrapper
 */
define([
	'class'
],function(Class){
	var Promise=new Class({
		resval:null,
		rejval:null,
		initialize:function(cb){
			cb(this.resolve.bind(this),this.reject.bind(this))
		},
		then:function(cbres,cbrej){
			this.cbres=typeof(cbres)=='function'?cbres:(function(){});
			this.cbrej=typeof(cbrej)=='function'?cbrej:(function(){});
			if(this.rejval==null)
				return this.cbres(this.resval);
			else
				return this.cbrej(this.rejval);
		},
		resolve:function(val){
			this.resval=val;
		},
		reject:function(err){
			this.rejval=err;
		}
	});
	return Promise;
});
