define([],function(){
	return {
		log:function(val){
			console.Log(typeof(val)=='object'?JSON.stringify(val):val);
		},
		warn:function(val){
			console.Warn(typeof(val)=='object'?JSON.stringify(val):val);
		},
		error:function(val){
			console.Error(typeof(val)=='object'?JSON.stringify(val):val);
		},
		debug:function(val){
			console.Debug(typeof(val)=='object'?JSON.stringify(val):val);
		}
	};
});
