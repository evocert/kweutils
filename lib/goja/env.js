define([],function(){
	return {
		name:typeof(document)=='undefined'||document==null?'goja':'browser'
	}
});
