//Flow.js is a JavaScript library providing multiple simultaneous, stable and resumable uploads via the HTML5 File API. (Demo)
//The library is designed to introduce fault-tolerance into the upload of large files through HTTP. This is done by splitting each file into small chunks. Then, whenever the upload of a chunk fails, uploading is retried until the procedure completes. This allows uploads to automatically resume uploading after a network connection is lost either locally or to the server. Additionally, it allows for users to pause, resume and even recover uploads without losing state because only the currently uploading chunks will be aborted, not the entire upload.
//Flow.js does not have any external dependencies other than the HTML5 File API. This is relied on for the ability to chunk files into smaller pieces. Currently, this means that support is limited to Firefox 4+, Chrome 11+, Safari 6+ and Internet Explorer 10+.
//Samples and examples are available in the samples/ folder. Please push your own as Markdown to help document the project.
//https://github.com/flowjs/flow.js
//todo: finish demo (upload part etc);
define([
	"module",
	"jquery",
	"flowjs",
],function(
	module,
	jq,
	Flow
){
	console.log([module.id,'start'].join(':'));
	console.log(Flow);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
		.browsearea{
			background:#444444;
			width:512px;
			height:64px;
		}
		.droparea{
			background:#333333;
			width:512px;
			height:256px;
		}
		.dropitem{
			background:#444444;
			padding:8px;
			border:2px solid #555555;
		}
		.dropitem>.title{
			background:#444444;
			padding:4px;
		}
		.dropitem>.remove{
			background:#440000;
			padding:4px;
			float:right;
			margin-top:-4px;
		}
		.button{
			background:#444444;
			color:#888888;
			font-weight:bold;
			padding:8px;
			width:64px;
		}
	`));
	{//basic usage
		$("body").append($("<h3/>").text("Browse..."));
		var browsearea=$("<div/>").addClass(["browsearea"]);$("body").append(browsearea);
		$("body").append($("<h3/>").text("Drop..."));
		var droparea=$("<div/>").addClass(["droparea"]);$("body").append(droparea);
		var upload=$("<div/>").addClass(["button"]).text("Upload");$("body").append(upload);
		upload.click(function(){
			flow.upload();
		});
		var flow=new Flow({
			target:'/api/photo/redeem-upload-token', 
			query:{upload_token:'my_token'}
		});
		window.flow=flow;
		// Flow.js isn't supported, fall back on a different method
		if(!flow.support) location.href = "http://localhost:1030/kweutils/index.goja.html?action=runtest&parameters=fileupload";
		flow.assignBrowse(browsearea[0]);
		flow.assignDrop(droparea[0]);
		flow.on('fileAdded', function(file, event){
			console.log(flow.getSize())
			console.log(file, event);
			var el=$("<div/>").addClass(["dropitem"]);
			el.append($("<span/>").addClass(["title"]).text(file.name))
			el.append($("<span/>").addClass(["remove"]).text("remove").click(function(){
				flow.removeFile(el.data("file"));
				el.remove();
			}));
			el.data("file",file)
			el.click(function(){
				console.log($(this).data("file"));
			});
			droparea.append(el)
			
		});
		flow.on('fileSuccess', function(file,message){
			console.log(file,message);
		});
		flow.on('fileError', function(file, message){
			console.log(file, message);
		});
	}
});
