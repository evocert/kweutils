define([
	"module",
	"jquery",
	"dukweb",
],function(
	module,
	jq,
	Duktape
){
	console.log([module.id,'start'].join(':'));
	console.log(Duktape);
	$=jq;
	$("html").css({
		"height":"100%",
		"overflow":"hidden"
	});
	$("body").css({
		"height":"100%",
		"overflow":"hidden",
		"background":"linear-gradient(#030303,#202020)",
		"padding":"8px"
	});
	var textarea=$("<textarea/>")
	.attr({"rows":24,})
	.css({
		"margin":"unset",
		"background":"#222222",
		"border":"0px",
		"width":"100%",
		"color":"#888888",
		"font-family":"monospace",
		"margin-bottom":"8px",
		"border":"none",
		"overflow":"auto",
		"outline":"none",
		"-webkit-box-shadow":"none",
		"-moz-box-shadow":"none",
		"box-shadow":"none",
		"resize":"none"
	});
	var feedback=$("<div/>").css({
		"min-height":"96px",
		"white-space":"pre",
		"padding":"8px",
		"background":"#222222",
		"border":"0px",
		"color":"#888888",
		"font-family":"monospace"
	})
	.text("READY");
	Duktape.printHandler=function(msg) {
		feedback.text('');
		feedback.text(msg);
	}
	Duktape.alertHandler = function(msg) {
		alert(msg);
	}
	$("body").append(textarea);
	$("body").append(feedback);
	textarea.keyup(function (e){
		var source = $(this).val();
		if(source==null||source==""){
			feedback.css({"background":"#222222","color":"#888888"}).text('');
		}else{
		}
		try{
			Duktape.eval(source);//'console.log(42);')
			//feedback.css({"background":"#222222","color":"#888888"}).text('');
		}catch(e){
			feedback.text(e.toString());
			feedback.css({"background":"linear-gradient(#a90000,#520101)","color":"#FF8888"});
		}
	});
/*
//try in Dukweb console
var t0=new Date();
var width=70;
var height=12;
var buf=[];
for(var i=0;i<height;i++){
  var line=[];
  for(var j=0;j<width;j++){
     line.push(" ");
  }
  buf.push(line);
}
for(var i=0;i<100;i++){
   buf[Math.floor(Math.random()*height)][Math.floor(Math.random()*width)]=".";
}
var out=(function(){
    var ret="";
    buf.forEach(function(line){
        ret=[ret,line.join(''),"\n"].join("");
    });
    return ret;
})();
var t1=new Date();
out="DURATION:"+(t1-t0)+" MS\n"+out;
buf.join("\n");
console.log(out);
*/

});
