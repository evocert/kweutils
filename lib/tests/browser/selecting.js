define([
	"module",
	"jquery",
	"LoremIpsum",
	"selecting",
],function(
	module,
	jq,
	LoremIpsum,
	selecting
){
	console.log([module.id,'start'].join(':'));
	console.log(selecting);
	
	$=jq;
	{//usage
		$("<div/>").text("").css({"padding":"8px","margin-bottom":"8px","margin-top":"8px","background":"#CCCCCC","min-height":"12px"});
		Array(8).fill(null).forEach(function(){
			var paragraph=$("<p/>").css({"padding":"8px","margin-bottom":"8px","margin-top":"8px","background":"#CCCCCC","min-height":"12px"}).text(new LoremIpsum().paragraph(Math.floor(Math.random()*42+42)));
			var feedback=$("<div/>").css({"padding":"8px","margin-bottom":"8px","margin-top":"8px","background":"#222222","color":"#CCCCCC","font-family":"monospace","min-height":"12px"}).text("Select text above...");
			$("body").append(paragraph);
			$("body").append(feedback);
			selecting(paragraph,function(selector) {
				// Properties
				//console.log(selector); // The selected text
				//console.log(selector.text); // The selected text
				//console.log(selector.wordCount); // The number of words selected
				if(selector==null||selector.length==0){
					feedback.text("No selection"); // The selected text /*skullquake*/
				}else{
					feedback.text(selector); // The selected text /*skullquake*/
				}
			});
		});
	}
});

