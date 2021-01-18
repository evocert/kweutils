//The simpliest store for managing the state in your application.
//Works in all environments and all browsers.
//Why do I need a centralized state management?
//Managing the information rendered is difficult, mostly when our apps grow large and the state is scattered across many components and the interactions between them without control.
//To solve this, the current state of the art solution is to use a globalized state where we can centralize and have more control over the information we have to render. Almy is a simple library that uses a pub/sub façade along with a centralized state management which makes the the side effects of changing information easy to control and eliminates the risk of getting race conditions in our applications.
//https://github.com/tomas2387/almy
define([
	"module",
	"jquery",
	"almy",
],function(
	module,
	jq,
	almy
){
	console.log([module.id,'start'].join(':'));
	console.log(almy);
	$=jq;
	almy=almy.almy;
	{//basic usage
		$("body").append($("<div/>").attr({"id":"content"}));
		almy.subscribe('user->name', (username) => {
			document.getElementById('content').textContent = username;
		});
		almy.dispatch('user', {id: 1, name: 'nick'})
	}
	{//dispatch
		almy.subscribe('cpu', function(cpu) {
			    console.log(cpu.temperature)
		})
		almy.subscribe('cpu->ips', function(ips) {
			    console.log(ips)
		})
		almy.dispatch('cpu->temperature', 65)
		almy.dispatch('cpu',{"ips":1024})
		almy.dispatch('cpu->ips',4096)
	}
});
