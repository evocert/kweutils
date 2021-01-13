//A JavaScript library that can upload anything you throw at it, optimizes images for faster uploads, and offers a great, accessible, silky smooth user experience.
//https://github.com/pqina/filepond
//https://pqina.nl/filepond/
//https://github.com/pqina/jquery-filepond
//note: minor modifications to jquery.filepond
define([
	"module",
	"jquery",
	"filepond",
	"filepond-plugin-image-preview",
	"filepond-plugin-file-encode",
	"filepond-plugin-file-metadata",
	"filepond-plugin-file-poster",
	"filepond-plugin-file-rename",
	"filepond-plugin-file-validate-size",
	"filepond-plugin-file-validate-type",
	"filepond-plugin-get-file",
	"filepond-plugin-image-crop",
	"filepond-plugin-image-edit",
	"filepond-plugin-image-exif-orientation",
	"filepond-plugin-image-filter",
	"filepond-plugin-image-overlay",
	"filepond-plugin-image-preview",
	"filepond-plugin-image-resize",
	"filepond-plugin-image-transform",
	"filepond-plugin-image-validate-size",
	"filepond-plugin-media-preview",
	"filepond-plugin-media-preview2",
	"filepond-plugin-pdf-preview",
	"filepond-plugin-zipper",
	"doka",
	"filepond.jquery",
	"css!vendor/filepond/4.25.1/filepond.min.css",
	"css!vendor/filepond/plugins/filepond-plugin-file-poster/2.1.0/filepond-plugin-file-poster.min.css",
	"css!vendor/filepond/plugins/filepond-plugin-get-file/1.0.3/filepond-plugin-get-file.min.css",
	"css!vendor/filepond/plugins/filepond-plugin-image-edit/1.3.1/filepond-plugin-image-edit.min.css",
	"css!vendor/filepond/plugins/filepond-plugin-image-overlay/1.0.6/filepond-plugin-image-overlay.min.css",
	"css!vendor/filepond/plugins/filepond-plugin-image-preview/4.5.0/filepond-plugin-image-preview.min.css",
	"css!vendor/filepond/plugins/filepond-plugin-media-preview/1.0.5/filepond-plugin-media-preview.min.css",
	"css!vendor/filepond/plugins/filepond-plugin-media-preview2/1.0.7/filepond-plugin-media-preview.min.css",
	"css!vendor/filepond/plugins/filepond-plugin-pdf-preview/1.0.2/filepond-plugin-pdf-preview.min.css",
],function(
	module,
	jq,
	FilePond,
	FilePondPluginImagePreview,
	FilePondPluginFileEncode,
	FilePondPluginFileMetadata,
	FilePondPluginFilePoster,
	FilePondPluginFileRename,
	FilePondPluginFileValidateSize,
	FilePondPluginFileValidateType,
	FilePondPluginGetFile,
	FilePondPluginImageCrop,
	FilePondPluginImageEdit,
	FilePondPluginImageExitOrientation,
	FilePondPluginImageFilter,
	FilePondPluginImageOverlay,
	FilePondPluginImagePreview,
	FilePondPluginImageResize,
	FilePondPluginImageTransform,
	FilePondPluginImageValidateSize,
	FilePondPluginMediaPreview,
	FilePondPluginMediaPreview2,
	FilePondPluginPdfPreview,
	FilePondPluginZipper,
	dokaCreate
){
	console.log([module.id,'start'].join(':'));
	console.log(FilePond);
	console.log($().filepond);
	console.log($.fn.filepond);
	console.log(FilePondPluginImagePreview);
	console.log(FilePondPluginFileEncode);
	console.log(FilePondPluginFileMetadata);
	console.log(FilePondPluginFilePoster);
	console.log(FilePondPluginFileRename);
	console.log(FilePondPluginFileValidateSize);
	console.log(FilePondPluginFileValidateType);
	console.log(FilePondPluginGetFile);
	console.log(FilePondPluginImageCrop);
	console.log(FilePondPluginImageEdit);
	console.log(FilePondPluginImageExitOrientation);
	console.log(FilePondPluginImageFilter);
	console.log(FilePondPluginImageOverlay);
	console.log(FilePondPluginImagePreview);
	console.log(FilePondPluginImageResize);
	console.log(FilePondPluginImageTransform);
	console.log(FilePondPluginImageValidateSize);
	console.log(FilePondPluginMediaPreview);
	console.log(FilePondPluginMediaPreview2);
	console.log(FilePondPluginPdfPreview);
	console.log(FilePondPluginZipper);
	console.log(dokaCreate);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
	`));
	{//register plugins
		// First register any plugins
		$.fn.filepond.registerPlugin(FilePondPluginImagePreview);
		$.fn.filepond.registerPlugin(FilePondPluginFileEncode);
		$.fn.filepond.registerPlugin(FilePondPluginFileMetadata);
		$.fn.filepond.registerPlugin(FilePondPluginFilePoster);
		$.fn.filepond.registerPlugin(FilePondPluginFileRename);
		$.fn.filepond.registerPlugin(FilePondPluginFileValidateSize);
		$.fn.filepond.registerPlugin(FilePondPluginFileValidateType);
		$.fn.filepond.registerPlugin(FilePondPluginGetFile);
		$.fn.filepond.registerPlugin(FilePondPluginImageCrop);
		$.fn.filepond.registerPlugin(FilePondPluginImageEdit);
		$.fn.filepond.registerPlugin(FilePondPluginImageExitOrientation);
		$.fn.filepond.registerPlugin(FilePondPluginImageFilter);
		$.fn.filepond.registerPlugin(FilePondPluginImageOverlay);
		$.fn.filepond.registerPlugin(FilePondPluginImagePreview);
		$.fn.filepond.registerPlugin(FilePondPluginImageResize);
		$.fn.filepond.registerPlugin(FilePondPluginImageTransform);
		$.fn.filepond.registerPlugin(FilePondPluginImageValidateSize);
		$.fn.filepond.registerPlugin(FilePondPluginMediaPreview);
		$.fn.filepond.registerPlugin(FilePondPluginMediaPreview2);
		$.fn.filepond.registerPlugin(FilePondPluginPdfPreview);
		$.fn.filepond.registerPlugin(FilePondPluginZipper);
	}
	{//basic usage
		var input=$(`<input type="file" class="filepond">`);
		$("body").append(input);
		FilePond.parse(document.body);
	}
	{//programatic
		// Create a multi file upload component
		const pond = FilePond.create({
			multiple: true,
			name: 'filepond',
			/*
			labelIdle: `Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`,
			imagePreviewHeight: 170,
			imageCropAspectRatio: '1:1',
			imageResizeTargetWidth: 200,
			imageResizeTargetHeight: 200,
			stylePanelLayout: 'compact circle',
			styleLoadIndicatorPosition: 'center bottom',
			styleProgressIndicatorPosition: 'right bottom',
			styleButtonRemoveItemPosition: 'left bottom',
			styleButtonProcessItemPosition: 'right bottom',

			// Use Doka.js as image editor
			//imageEditEditor: Doka.create({
			//	utils: ['crop', 'filter', 'color']
			//})
			imageEditEditor: dokaCreate({
				      utils: ['crop', 'filter', 'color']
				    })
			*/
		});
		// Add it to the DOM
		document.body.appendChild(pond.element);
	}
	{//jquery
		//$.fn.filepond.registerPlugin(FilePondPluginImagePreview);
		var input=$(`<input type="file" class="filepond">`);
		$("body").append(input);

		// Turn input element into a pond
		$(input).filepond();

		// Set allowMultiple property to true
		$(input).filepond('allowMultiple', true);
	  
		// Listen for addfile event
		$(input).on('FilePond:addfile', function(e) {
			console.log('file added event', e);
		});

		// Manually add a file using the addfile method
		//$(input).first().filepond('addFile', 'index.html').then(function(file){
		//	console.log('file added', file);
		//});	
	}
});

