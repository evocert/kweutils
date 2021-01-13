//Dropzone.js is a light weight JavaScript library that turns an HTML element into a dropzone. This means that a user can drag and drop a file onto it, and the file gets uploaded to the server via AJAX.
//https://github.com/enyo/dropzone
//https://www.dropzonejs.com/
//note: also available as a jquery plugin, just set shim deps:["jquery"]
//https://stackoverflow.com/questions/46728205/dropzone-submit-button-on-upload/46732882
//https://www.dropzonejs.com/#events
define([
	"module",
	"dropzone",
	"jquery",
	"css!vendor/dropzone/5.7.0/min/basic.min.css",
	"css!vendor/dropzone/5.7.0/min/dropzone.min.css",
],function(
	module,
	Dropzone,
	jq
){
	console.log([module.id,'start'].join(':'));
	console.log(Dropzone);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
	`));
	{//basic usage
		Dropzone.autoDiscover = false;
		var form=$(`
			<div id="dZUpload" class="dropzone">
				<div class="dz-default dz-message"></div>
			</div>
		`);
		var submit=$("<button/>").text("submit");
		$("body").append(submit);
		$("body").append(form);
		var dz=$("#dZUpload").dropzone({
			autoProcessQueue: false,
			uploadMultiple: true,
			parallelUploads:1024,
			maxFiles :1024,
			url:"http://localhost:1030/kweutils/index.goja.html?action=runtest&parameters=fileupload",
			paramName: "file", // The name that will be used to transfer the file
			maxFilesize: 1024, // MB
			init: function () {
				var dz=this;
				submit.click(function(){console.log(dz);dz.processQueue();});
				/*
				this.on('sending', function(file, xhr, formData) {
					console.log('sending');
					// Append all form inputs to the formData Dropzone will POST
					var data = $('#frmTarget').serializeArray();
					$.each(data, function(key, el) {
						formData.append(el.name, el.value);
					});
				});
				*/
			},
			accept: function(file, done) {
				if (file.name == "000.jpg") {
					console.log("FILE REJECTED: "+file.name);
					done("Naha, you don't.");
				}else {
					//console.log("FILE ACCEPTED: "+file.name);
					done();
				}
			},
			success: function (file, response) {
				//console.log(file);
				//console.log(response);
			},
			queuecomplete:function(response){
				alert('queuecomplete');
			},
			error: function (file, response) {
				//console.error(file);
				//console.error(response);
			},
			dictDefaultMessage: 'Upload your files here',
			addRemoveLinks: true,
			clickable: true,	
			paramName: 'file',
		});
	}
});
