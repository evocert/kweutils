/*
 * easy request utility
 * curl -X GET 'http://localhost/security/sjs/test/test.js?usr=skullquake&pas=1234'
 * curl -X POST -F 'usr=skullquake' -F 'pas=1234' 'http://localhost/security/sjs/test/test.js'
 * curl -X POST -H "Content-Type: application/json" --data '{"usr":"skullquake","pas":"1234"}' 'http://localhost/security/sjs/test/test.js'
 */
define([
	'class'
],function(Class){
	var R=new Class({
		initialize:function(){
		},
		parameters:(function(){
			var parameters={}
			request.Parameters().StandardKeys().forEach(function(k){
				parameters[k]=request.Parameters().StringParameter(k);
			});
			return parameters;
		})(),
		headers:(function(){
			var headers={};
			request.RequestHeaders().forEach(function(k){
				headers[k]=request.RequestHeader().Get(k)
			});
			return headers;
		})(),
		body:(function(){
			return request.RequestBodyS(/*cache*//*true*/);
		})(),
		method:(function(){
			return request.ProtoMethod();
		})(),
		//utility merge parameters and json body
		data:function(){
			var _this=this;
			var ret={};
			Object.keys(this.parameters).forEach(function(k){
				//header keys capital...remember
				ret[k.toLowerCase()]=_this.parameters[k]
			});
			//add/overwrite json body
			if(this.headers["Content-type"]=="application/json"||
			   this.headers["Content-Type"]=="application/json"){
				try{
					var obj=JSON.parse(this.body);
					Object.keys(obj).forEach(function(k){
						ret[k]=obj[k]
					});
				}catch(e){
				}
			}
			return ret;
		},
		tojson:function(){
			return {
				parameters:this.parameters,
				headers:this.headers,
				method:this.method,
				body:this.body
			}
		}
	});
	return new R();

});
