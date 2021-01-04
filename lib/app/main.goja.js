define(["module","console","request"],function(module,console,request){
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
				console.error('parameters null');
			}
			break;
		default:
			console.error('Invalid action');
			break;
	};
});

