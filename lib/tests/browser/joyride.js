//Joyride is an easy to configure site tour wizard for Foundation for Sites.
//https://github.com/zurb/joyride
//note: plugin not attaching to jquery propperly??? see below
define([
	"module",
	"jquery",
	"jquery.joyride",
	"css!vendor/joyride/2.0.0/joyride-2.1.css"
],function(
	module,
	jq,
	obj
){
	console.log([module.id,'start'].join(':'));
	$=jq;
	console.log($().joyride);
	console.log(obj);
	{//basic usage
		var ol=$(`
			<ol data-joyride data-autostart="true" id="docs-joyride">
				<li data-target="#basic-joyride">
					<p>This is the default one without settings</p>
				</li>
				<li data-target="#footer" data-position="bottom" data-closable="false">
					<p>This one isn't closable</p>
				</li>
				<li>
					<p>If no target is specified, you create a modal.</p>
				</li>
				<li data-target="#open-issues">
					<p>Your ride ends here!</p>
					<p class="text-center">
						<button class="button success" data-joyride-close>OK, thanks!</button>
					</p>
				</li>
			</ol>
		`);
		$("body").append(ol);
		//$(ol).joyride().start();
		//$("#docs-joyride").joyride().start();
		//$("#docs-joyride").joyride().joyride();//invokable like this
		ol.joyride().joyride();//invokable like this
	}
});
