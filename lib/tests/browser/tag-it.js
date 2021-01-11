//https://github.com/aehlke/tag-it
//note: set up specific versions of jqueryui and jquery for this (error:  TypeError: this.element.find(...).andSelf is not a function)
define([
	"module",
	"jquery-1.5.2",
	"tag-it",
	"css!vendor/tag-it/2.0/jquery.tagit.css"
],function(
	module,
	jq
){
	console.log([module.id,'start'].join(':'));
	$=jq;
	{//basic usage
		$("body").append($(`
		<ul id="myTags">
			<!-- Existing list items will be pre-added to the tags -->
			<li>Tag1</li>
			<li>Tag2</li>
		</ul>
		`));
		$("#myTags").tagit();
	}
});
