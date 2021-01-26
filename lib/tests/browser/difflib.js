//jsdifflib - A Javascript visual diff tool & library
//https://github.com/gildas-lormeau/jsdifflib
//I needed a good in-browser visual diff tool, and couldn’t find anything suitable, so I built jsdifflib in Feb 2007 and open-sourced it soon thereafter. It’s apparently been used a fair bit since then. Maybe you’ll find it useful.
//Overview
//jsdifflib is a Javascript library that provides:
// a partial reimplementation of Python’s difflib module (specifically, the SequenceMatcher class)
// a visual diff view generator, that offers side-by-side as well as inline formatting of file data
//Yes, I ripped off the formatting of the diff view from the Trac project. It’s a near-ideal presentation of diff data as far as I’m concerned. If you don’t agree, you can hack the CSS to your heart’s content.
//jsdifflib does not require jQuery or any other Javascript library.
//
define([
	"module",
	"jquery",
	"difflib",
	"diffview",
	"text!vendor/requirejs/require.js",
	"text!vendor/requirejs/require.evocert.js",
	"css!vendor/jsdifflib/diffview.css"
],function(
	module,
	jq,
	difflib,
	diffview,
	src_0,
	src_1,
){
	console.log([module.id,'start'].join(':'));
	console.log(difflib);
	console.log(diffview);
	{//basic usage
		$=jq;
		$("body").append($("<div/>").attr({"id":"diffoutput"}));
		// get the baseText and newText values from the two textboxes, and split them into lines
		var base = difflib.stringAsLines(src_0);//$("baseText").value);
		var newtxt = difflib.stringAsLines(src_1);//$("newText").value);

		// create a SequenceMatcher instance that diffs the two sets of lines
		var sm = new difflib.SequenceMatcher(base, newtxt);

		// get the opcodes from the SequenceMatcher instance
		// opcodes is a list of 3-tuples describing what changes should be made to the base text
		// in order to yield the new text
		var opcodes = sm.get_opcodes();
		var diffoutputdiv = $("#diffoutput")[0];
		while (diffoutputdiv.firstChild) diffoutputdiv.removeChild(diffoutputdiv.firstChild);
		var contextSize = $("contextSize").value;
		contextSize = contextSize ? contextSize : null;

		// build the diff view and add it to the current DOM
		diffoutputdiv.appendChild(diffview.buildView({
			baseTextLines: base,
			newTextLines: newtxt,
			opcodes: opcodes,
			// set the display titles for each resource
			baseTextName: "Base Text",
			newTextName: "New Text",
			contextSize: contextSize,
			viewType: $("inline").checked ? 1 : 0
		}));

		// scroll down to the diff view window.
		//location = url + "#diff";
	}
});
