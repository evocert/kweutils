define([
	"module",
	"jquery",
	"lodash",
	"tonejs",
],function(
	module,
	jq,
	_,
	Tone
){
window._=_;
	console.log([module.id,'start'].join(':'));
	$=jq;
	const osc = new Tone.Oscillator(0, "square").toDestination()
	var beepon=false;
	function beep(freq){
		if(beepon){
			try{
				osc.start();
				osc.frequency.value=freq;
				window.setTimeout(function(){
					osc.stop();
				},10);
			}catch(e){}
		}

	}
	//--------------------------------------------------------------------------------
	//socket
	//--------------------------------------------------------------------------------
	//var socket = new WebSocket("ws://localhost:1030");
	var socket = new WebSocket("ws://"+window.location.host);
	var loopstart=null;
	var loopon=false;
	var loopidx=0;
	function loop(){
		if(loopon){
			var valproc=['\x3C\x40',$(input).val().trim(),'\x40\x3E',"#!commit","\r\n"].join("\r\n")
			loopidx++;
			status.text([loopidx,1000*loopidx/(new Date()-loopstart)].join("\n"));
			socket.send(
				valproc
			);
		}else{
			status.text("STATUS");
		}
	}
	function sendtest(socket,val){
		beep(220);
		//console.log("sendtest:");
		//var valproc=["#!js",'\x3C\x40',val.trim(),'\x40\x3E',"#!commit","\r\n"].join("\r\n")
		var valproc=['\x3C\x40',val.trim(),'\x40\x3E',"#!commit","\r\n"].join("\r\n")
		socket.send(
			valproc
		);
	}
	socket.onopen = function(e) {
		beep(880);
		console.log('onopen');
		socket.send(
//`
`#!js
<@
println("Ready>");
@>
#!commit
`
);
	};
	socket.onmessage = function(event) {
		beep(440+Math.random()*100);
		//console.log('onmessage');
		output.text(event.data.trim());
		if(loopon)loop();
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
	//--------------------------------------------------------------------------------
	//ui
	//--------------------------------------------------------------------------------
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#FFFFFF;
			font-family:monospace;
			font-weight:bold;
		}
		input,textarea{
			color:#FFFFFF;
			font-family:monospace;
			font-weight:bold;
			background:#444444;
			border:0px;
			width:100%;
		}
		.info,
		.status{
			min-height:32px;
			background:#555555;
		}
		.input{
		}
		.output{
			background:#888888;
			margin-top:8px;
			min-height:24px;
			white-space:pre-wrap;
		}
	`));
	var info=$("<div/>").attr({}).addClass("info").text("ctrl-enter: execute, alt-l: toggle looped execute");
	var input=$("<textarea/>").attr({"rows":"24"}).addClass("input").val(`var self=this;
require([
    "module",
    "./www/kweutils/lib/vendor/lodash/lodash.min.js"
],function(
    module,
    _
){
    try{
        println(JSON.stringify(require.s.contexts._.config,0,2))
        println(_.VERSION);
        println(JSON.stringify(Object.keys(self),0,2));
    }catch(e){
        println(e.toString());
    }
});`);
	var status=$("<div/>").attr({}).addClass("status").text("STATUS");
	input.on("keydown",function(e){
		if(e.altKey && e.keyCode==76){
			loopstart=new Date();
			loopidx=0;
			loopon=!loopon;
			if(loopon)loop()
			console.log('here');
		}
		else if(e.ctrlKey && e.keyCode==13){
			if($(this).val().trim()=='clear'){
				beep(1234);
				$(output).text('');
			}else{
				sendtest(socket,$(this).val());
			}
			//$(this).val('');
		}
	});
	var output=$("<div/>").attr({}).addClass("output");
	$("body").append(info);
	$("body").append(input);
	$("body").append(status);
	$("body").append(output);
	input.focus();
});
