//http://andysylvester.com/2019/08/25/computer-music-formats/
define([
	"module",
	"jquery",
	"vexflow",
],function(
	module,
	jq,
	Vex
){
	console.log([module.id,'start'].join(':'));
	console.log(Vex);
	$=jq;
	const VF=Vex.Flow;
	$("body").append($("<div/>").attr("id","boo").css({"background":"#FFFFFF"}));
	// Create a VexFlow renderer attaced to the DIV element "boo"
	var vf=new VF.Factory({renderer:{elementId:'boo'}});
	var score=vf.EasyScore();
	var system=vf.System();
	// Create a 4/4 treble stave, and add two parallel voices
	system.addStave({
	  voices:[
	    // Top voice has 4 quarter notes with stems up
	    score.voice(score.notes('C#5/q, B4, A4, G#4',{stem:'up'})),
	    // Bottom voice has two half notes, with the stem down
	    score.voice(score.notes('C#4/h, C#4',{stem:'down'}))
	  ]
	}).addClef('treble').addTimeSignature('4/4');
	// Draw it!
	vf.draw();
});
