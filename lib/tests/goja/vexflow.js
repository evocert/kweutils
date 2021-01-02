//https://ourcodeworld.com/articles/read/293/rendering-music-notation-music-sheet-in-javascript-with-vexflow-2
//https://medium.com/@bran.rowell/rendering-music-data-with-vexflow-4e742e32ba0c
define([
	"module",
	"console",
	"window",
	"document",
],function(
	module,
	console,
	_window,
	_document
){
	try{
		console.log('----------------------------------------');
		console.log([module.id,'start'].join(':'));
		//bootstrap globals
		window=_window;
		document=_document;
		this.window=window;
		this.document=window;
		require(["console","jquery","vexflow"],function(console,jq,Vex){
			$=jq;
			var VF=Vex.Flow;
			$("body").append($("<div/>").attr("id","boo").css({"background":"#FFFFFF"}));
			// Create a VexFlow renderer attaced to the DIV element "boo"
			var vf=new VF.Factory({renderer:{elementId:'boo'}});
/*
var WorkspaceInformation = {
    // The div in which you're going to work
    div: document.getElementById("some-div-id"),
    // Vex creates a svg with specific dimensions
    canvasWidth: 500,
    canvasHeight: 500
};
var vf= new VF.Renderer(
	    WorkspaceInformation.div,
	    VF.Renderer.Backends.SVG
);
*/
var context = vf.getContext();
// And give some style to our canvas
context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
context.setBackgroundFillStyle("#222222");;
			//
			var score=vf.EasyScore();
			var system=vf.System();
			var notes='abcdefg'.split('');
			// Create a 4/4 treble stave, and add two parallel voices
			system.addStave({
			  voices:[
			    // Top voice has 4 quarter notes with stems up
			    //score.voice(score.notes('C#5/q, B4, A4, G#4',{stem:'up'})),
			    // Bottom voice has two half notes, with the stem down
			    //score.voice(score.notes('C#4/h, C#4',{stem:'down'})),
			    score.voice(
				    score.beam(
					    score.notes((function(){
						    ret=[];
						    for(var i=0;i<32;i++){
							    ret.push(
								    [
								    notes[Math.floor(Math.random()*notes.length)],
								    '4'+
								    '/'+
								    '32'
								    ].join('')
							    )
						    }
						    ret=ret.join(',');
						    console.log(ret);
						    return ret;
					    })(),{stem:'down'}))
			    	)
			  ]
			}).addClef('treble')//.addTimeSignature('4/4');
			// Draw it!
			vf.draw();

			println($('body').prop('outerHTML'));
		});
		console.log('----------------------------------------');
	}catch(e){console.error(e.toString());}
});
