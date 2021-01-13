define([
	"module",
	"jquery",
	"jquery.jsonbrowser",
	"css!vendor/jsonbrowser/jquery.jsonbrowser.css"
],function(
	module,
	jq
){
	console.log([module.id,'start'].join(':'));
	console.log($().jsonbrowser);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
		input{
			background:#444444;
			color:#888888;
			padding:4px;
			border:none;
			margin:0px;
		}
		.button{
			color:#888888;
			background:#444444;
			padding:6px;
			text-decoration:unset;
			margin:0px;
		}
            	`));
	{//basic usage
		$("body").append($(`
			<div class="controls">
				<a class="button" href="#" id="collapse-all">Collapse All</a>
				<a class="button" href="#" id="expand-all">Expand All</a>
				<input type="text" id="search" placeholder="Search ...">
			</div>
			<div id="browser" class="jsonbrowser"></div>
			`));
            



		var data = JSON.parse(JSON.stringify(require.s.contexts._.config));
                $('#browser').jsonbrowser(data);
                
                $('#collapse-all').on('click', function(e) {
                    e.preventDefault();
                    $.jsonbrowser.collapseAll('#browser');
                });
                
                $('#expand-all').on('click', function(e) {
                    e.preventDefault();
                    $.jsonbrowser.expandAll('#browser');
                });

                $('#search').on('keyup', function(e) {
                    e.preventDefault();
                    $.jsonbrowser.search('#browser', $(this).val());
                });
                $('#search').focus().trigger('keyUp');
	}
});

