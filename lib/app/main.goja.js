define(["module","console","request"],function(module,console,request){
	console.log([module.id,'start'].join(':'));
	switch(request.tojson().parameters['action']){
		case 'runtest':
			if(request.tojson().parameters['parameters']!=null){
				if(request.tojson().parameters['parameters']=="*"){
					require(["app/testrunner/main.goja"]);
				}else{
					require(["tests/goja/"+request.tojson().parameters['parameters']]);
				}
				break;
			}else{
				println('parameters null');
			}
			break;
		default:
			println('Invalid action');
			break;
	};
});

