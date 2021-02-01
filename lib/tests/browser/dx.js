//https://js.devexpress.com/Demos/WidgetsGallery/Demo/FileManager/Overview/jQuery/Dark/
define([
	"module",
	"jquery",
	"dx",
	"css!vendor/devexpress.filemanager/20.2.5/dx.common.css",
	"css!vendor/devexpress.filemanager/20.2.5/dx.dark.css"
],function(
	module,
	jq,
	obj
){
	console.log([module.id,'start'].join(':'));
	$=jq;
	console.log($.fn.dxFileManager);
	{//basic usage
		$("body").append($("<style/>").text(`
			body,
			html{
				background:#2a2a2a
			}
			.photo-popup-content {
				text-align: center;
			}
			.photo-popup-content .photo-popup-image {
				height: 100%;
				max-width: 100%;
			}
		`));
		//var div_dx_viewport=$("<div/>").addClass(["dx-viewport","demo-container"]);
		var div_dx_viewport=$("<div/>").addClass([
			"dx-viewport",
			"demo-container",
			"dx-device-desktop",
			"dx-device-generic",
			"dx-theme-generic",
			"dx-theme-generic-typography",
			"dx-color-scheme-dark"
		]);
		var div_file_manager=$("<div/>").attr({"id":"file-manager"});
		var div_photo_popup=$("<div/>").attr({"id":"photo-popup"});
		$("body").append(div_dx_viewport);
		div_dx_viewport.append(div_file_manager);
		div_dx_viewport.append(div_photo_popup);
		var provider = new DevExpress.fileManagement.RemoteFileSystemProvider({
			//endpointUrl: "https://js.devexpress.com/Demos/Mvc/api/file-manager-file-system-images"
			endpointUrl: "/kweutils/lib/vendor/kwe/filemanager/index.svc.dx.js"
		});
		div_file_manager.dxFileManager({
			name: "fileManager",
			fileSystemProvider: provider,
			currentPath: "Widescreen",
			permissions: {
				create: true,
				copy: true,
				move: true,
				delete: true,
				rename: true,
				upload: true,
				download: true
			},
			onSelectedFileOpened: function(e) {
				var popup = $("#photo-popup").dxPopup("instance");
				popup.option({
					"title": e.file.name,
					"contentTemplate": "<img src=\"" + e.file.dataItem.url + "\" class=\"photo-popup-image\" />"
				});
				popup.show();
			}
		});
		div_photo_popup.dxPopup({
			maxHeight: 600,
			closeOnOutsideClick: true,
			onContentReady: function(e) {
				var $contentElement = e.component.content();  
				$contentElement.addClass("photo-popup-content");
			}
		});
	}
	console.log(jq);
});



