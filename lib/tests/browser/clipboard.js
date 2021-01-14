//Copying text to the clipboard shouldn't be hard. It shouldn't require dozens of steps to configure or hundreds of KBs to load. But most of all, it shouldn't depend on Flash or any bloated framework.
//https://github.com/zenorocha/clipboard.js
//note: demo not working, fix up
define([
	"module",
	"jquery",
	"clipboardjs",
],function(
	module,
	jq,
	ClipboardJS
){
	console.log([module.id,'start'].join(':'));
	console.log(ClipboardJS);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
	`));
	{//declarative usage
		$("body").append($(`
			<!-- Target -->
			<input id="foo" value="https://github.com/zenorocha/clipboard.js.git">

			<!-- Trigger -->
			<button class="btn" data-clipboard-target="#foo">
				<img src="assets/clippy.svg" alt="Copy to clipboard">
			</button>
		`));
	}
	{//programattic
		var btn=$("<button/>").text("copy").attr({"id":"btn0","data-clipboard-target":"input0"});
		var input=$("<input/>").val("test value").attr({"id":"input0"});
		$("body").append(btn);
		$("body").append(input);
		var clipboard = new ClipboardJS('#button0');
		clipboard.on('success', function(e) {
			console.info('Action:', e.action);
			console.info('Text:', e.text);
			console.info('Trigger:', e.trigger);
			e.clearSelection();
		});
		clipboard.on('error', function(e) {
			console.error('Action:', e.action);
			console.error('Trigger:', e.trigger);
		});
	}
});
