define(["module","console","request","env"],function(module,console,request,env){
	console.log([module.id,'start'].join(':'));
	console.log(env.name);
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
		default:
			console.error('Invalid action');
			break;
		
	}
});

