define(['console','class'],function(console,Class){
	if(typeof(GOJA)!='undefined'){
		//server implementation
		var R=new Class({
			initialize:function(){},
			parameters:(function(){
				var parameters={}
				request.Parameters().StandardKeys().forEach(function(k){
					parameters[k.toLowerCase()]=request.Parameters().StringParameter(k);
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
				Object.keys(ret).forEach(function(k){
					try{
						if(
							typeof(ret[k])=='string'&&
							(
								ret[k][0]=="{"||
								ret[k][0]=="["
							)
						){
							var json=JSON.parse(ret[k]);
							ret[k]=json;
						}else{
						}
					}catch(e){
						console.log("failed parsing json url argument: "+e.toString());
					}
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
	}else{
		//browser implementation
		var R=new Class({
			initialize:function(){},
			parameters:(function(){})(),
			headers:(function(){})(),
			body:(function(){})(),
			method:(function(){})(),
			data:function(){},
			tojson:function(){
				return {
					parameters:(function(){
						queryString=window.location.search;
						urlParams=new URLSearchParams(queryString);
						entries=urlParams.entries();
						ret={};
						entry=entries.next();
						do{
							ret[entry.value[0].toLowerCase()]=entry.value[1];
							entry=entries.next();
						}while(!entry.done);
						return ret;
					})(),
					headers:null,
					method:null,
					body:null
				}
			}
		});
		return new R();

	}

});
