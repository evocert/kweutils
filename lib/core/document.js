define([
	'class'
],function(Class){
	return typeof(document)=='undefined'?new (new Class({
		initialize:function(){},
		write:function(val){
			if(val!=null)
				println(typeof(val)=='object'?JSON.stringify(object):val);
		},
	})):document;
});
