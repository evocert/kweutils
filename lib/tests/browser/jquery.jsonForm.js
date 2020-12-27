define(['module','jquery','jquery.jsonForm'],function(module,jq,obj){
	var $=jq;
	console.log([module.id,'start'].join(':'));
	console.log($('<form/>').jsonForm);
});
