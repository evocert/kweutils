define([
	"module",
	"tonejs",
],function(
	module,
	Tone
){
	console.log([module.id,'start'].join(':'));
	const osc = new Tone.Oscillator(0, "square").toDestination()
	function beep(freq){
		osc.start();
		osc.frequency.value=freq;
		window.setTimeout(function(){
			osc.stop();
		},50);

	}
	//var socket = new WebSocket("ws://localhost:1030");
	var socket = new WebSocket("ws://"+window.location.host);
	function sendtest(){
		console.log("sendtest");
		socket.send(
`
#!js
<@
	println(typeof(dbms));
	println(["Server","start",new Date().getTime()].join(":"));
	println(Math.random());
@>
#!commit
`);
	}
	socket.onopen = function(e) {
		beep(880);
		console.log('onopen');
		sendtest();

	};
	socket.onmessage = function(event) {
		beep(440+Math.random()*100);
		console.log('onmessage');
		console.log(event.data);
		window.setTimeout(function(){
			sendtest();
		},100);

	};
	socket.onclose = function(event) {
		console.log('onclose');
		if (event.wasClean) {
			console.log(event.code);
			console.log(event.reason);
		} else {
			// e.g. server process killed or network down
			// event.code is usually 1006 in this case
			console.error('[close] Connection died');
		}
	};

	socket.onerror = function(error) {
		console.error('onerror');
		console.error(error.message);
	};
});
