define(["module","console","request","env","jquery"],function(module,console,request,env,jq){
	console.log([module.id,'start'].join(':'));
	console.log(env.name);
	console.log(request);
	$=jq;
	switch(request.tojson().parameters['action']){
		case 'runtest':
			if(request.tojson().parameters['parameters']!=null){
				if(request.tojson().parameters['parameters']=="*"){
					require(["app/testrunner/main."+env.name]);
				}else{
					require(["tests/"+env.name+"/"+request.tojson().parameters['parameters']]);
				}
				break;
			}else{
				console.error('parameters null');
			}
			break;
		case 'runapp':
			if(request.tojson().parameters['arguments'].app!=null){
				require([
					"app/"+
					request.tojson().parameters['arguments'].app+
					"/main"
					],function(app){
						if(typeof(app)=='function'){
							var appret=app(request.tojson().parameters['arguments'].options);
							console.log(appret);
						}else{
							$("body").append(
								$("<div/>")
									.css({
										"margin":"8px",
										"padding":"8px",
										"border-radius":"4px",
										"border":"1px solid #FF0000",
										"box-shadow":"0px 0px 8px #FF0000",
										"background":"#440000",
										"color":"#FF0000"
									})
									.text("Invalid App")
							);
						}
					}
				);
			}else{
				console.error('parameters null');
			}
			break;

		default:
			console.error('Invalid action');
			break;
		
	}
});

