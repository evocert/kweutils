define([],function(){
	return typeof(alert)=='undefined'?function(val){println(typeof(val)=='object'?JSON.stringify(val):val);}:alert;
});
