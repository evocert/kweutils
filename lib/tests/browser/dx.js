//https://js.devexpress.com/Demos/WidgetsGallery/Demo/FileManager/Overview/jQuery/Dark/
//https://js.devexpress.com/Documentation/20_1/ApiReference/UI_Components/dxFileManager/Configuration/
define([
	"module",
	"jquery",
	"jspanel",
	"kwe.filemanager",
	"dx",
	"css!vendor/devexpress.filemanager/20.2.5/dx.common.css",
	/*
	"css!vendor/devexpress.filemanager/20.2.5/dx.dark.css",
	"css!vendor/devexpress.filemanager/20.2.5/dx.carmine.css",
	"css!vendor/devexpress.filemanager/20.2.5/dx.common.css",
	"css!vendor/devexpress.filemanager/20.2.5/dx.contrast.css",
	"css!vendor/devexpress.filemanager/20.2.5/dx.dark.css",
	"css!vendor/devexpress.filemanager/20.2.5/dx.greenmist.css",
	"css!vendor/devexpress.filemanager/20.2.5/dx.light.compact.css",
	"css!vendor/devexpress.filemanager/20.2.5/dx.light.css",
	"css!vendor/devexpress.filemanager/20.2.5/dx.softblue.css",
	"css!vendor/devexpress.filemanager/20.2.5/dx.darkviolet.css",
	"css!vendor/devexpress.filemanager/20.2.5/dx.contrast.compact.css",
	"css!vendor/devexpress.filemanager/20.2.5/dx.darkmoon.css",
	*/
	"css!vendor/devexpress.filemanager/20.2.5/dx.dark.compact.css",
	"css!vendor/jspanel/jspanel.css",
	"css!vendor/animate/4.4.1/animate.min.css"
],function(
	module,
	jq,
	jspanel,
	KweFileManager,
	obj
){
	console.log([module.id,'start'].join(':'));
	$=jq;
	var root="/";
	var fm=new KweFileManager({cwd:root});
	console.log($.fn.dxFileManager);
	{//basic usage
		$("body").append($("<style/>").text(`
			body,
			html{
				background:#2a2a2a
			}
			.photo-popup-content {
				/*text-align: center;*/
			}
			.photo-popup-content .photo-popup-image {
				height: 100%;
				max-width: 100%;
			}
			/*fixes*/
			.dx-splitter-wrapper{z-index:1;};
		`));
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
		var provider=new DevExpress.fileManagement.RemoteFileSystemProvider({
			//endpointUrl: "https://js.devexpress.com/Demos/Mvc/api/file-manager-file-system-images"
			endpointUrl: "/kweutils/lib/vendor/kwe/filemanager/index.svc.dx.js"
		});
		fileManager=div_file_manager.dxFileManager({
			name:"fileManager",
			//--------------------------------------------------------------------------------
			//File system providers are components that provide APIs used to access and modify virtual file systems.
			//--------------------------------------------------------------------------------
			fileSystemProvider:provider,
			//--------------------------------------------------------------------------------
			//Specifies the path that is used when the FileManager is initialized.
			//--------------------------------------------------------------------------------
			currentPath:root,
			//--------------------------------------------------------------------------------
			//Specifies an array of path keys to the current location.
			//Each path part has each own key. For example, path "folder1/folder2" has two parts: 'folder1' with the 'f1' key and folder2 with the 'f2' key. To open this location, assign the ["f1","f2"] array of strings to the currentPathKeys property value. 
			//--------------------------------------------------------------------------------
			currentPathKeys:["EB458000-0341-6943","92F5-4722-A7D6-98EB"],
			//--------------------------------------------------------------------------------
			//Specifies a key of the initially or currently focused item.
			//--------------------------------------------------------------------------------
			focusedItemKey:"item1_key",
			//--------------------------------------------------------------------------------
			//Specifies whether the UI component can be focused using keyboard navigation.
			//--------------------------------------------------------------------------------
			focusStateEnabled:false,
			//--------------------------------------------------------------------------------
			//Specifies the UI component's height. This property accepts a value of one of the following types:
			// Number
			//  The height in pixels.
			// String
			//  A CSS-accepted measurement of height. For example, "55px", "80%", "inherit".
			// Function
			//  A function returning either of the above. For example:
			//--------------------------------------------------------------------------------
			height:function(){
				return window.innerHeight/1.25;
			},
			//--------------------------------------------------------------------------------
			//Specifies text for a hint that appears when a user pauses on the UI component.
			//--------------------------------------------------------------------------------
			hint:'default hint text',
			//--------------------------------------------------------------------------------
			//Specifies whether the UI component changes its state when a user pauses on it.
			//--------------------------------------------------------------------------------
			hoverStateEnabled:true,
			//--------------------------------------------------------------------------------
			//Configures the file and folder view.
			//Set the itemView.mode property to details to configure columns in the UI component.
			//--------------------------------------------------------------------------------
			itemView:{
				mode:"details",
				showFolders:true,
				showParentFolder:true
			},
			//--------------------------------------------------------------------------------
			permissions:{
				create:true,
				copy:true,
				move:true,
				delete:true,
				rename:true,
				upload:true,
				download:true
			},
			//--------------------------------------------------------------------------------
			//Specifies whether the UI component responds to user interaction.
			//--------------------------------------------------------------------------------
			disabled:false,
			//--------------------------------------------------------------------------------
			//Specifies the global attributes to be attached to the UI component's container element.
			//--------------------------------------------------------------------------------
			elementAttr:{
				id:"elementId",
				class:"class-name"
			},
			//--------------------------------------------------------------------------------
			//Specifies the allowed upload file extensions.
			//--------------------------------------------------------------------------------
			allowedFileExtensions:[".js",".json",".css"],
			//--------------------------------------------------------------------------------
			//A function that is executed when the UI component's content is ready and each time the content is changed.
			// parameter details:
			//  component 	
			//   The UI component's instance.
			//  element 	
			//   The UI component's container. It is an HTML Element or a jQuery Element when you use jQuery.
			//  model 	
			//   Model data. Available only when using Knockout.
			//--------------------------------------------------------------------------------
			onContentReady:function(e){
				/*
				console.log(this);
				console.log(a);
				console.log(b);
				console.log(c);
				*/
				var container=$('<div/>').addClass([
					"dx-menu",
					"dx-widget",
					"dx-visibility-change-handler",
					"dx-collection dx-menu-base",
				]);
				this.cli=$("<input/>").css({
					"width":"100%",
					"background":"#FFF2",
					"border":"0px",
					"color":"#FFF"
				}).attr({
					"placeholder":"$"
				});
				//fileManager.getCurrentDirectory().path
				this.cli.keyup(function(e){
					if(e.keyCode==13){
						var cmd=$(this.cli).val();
						if(cmd.indexOf("mkdir ")==0){
							var path=cmd.substring("mkdir ".length);
							this._controller.createDirectory(this._controller._createDirInfoByName(path))							

						}else if(cmd=='../'){
							//var parentpath=this._controller.getCurrentDirectory().parentDirectory
							var parentpath="/"+this.getCurrentDirectory().parentPath;
							this._controller.setCurrentPath(parentpath);
							return;
						}else if(cmd=='./'){
							this.cli.val(["/",this.getCurrentDirectory().path].join(""));
							return;
						}else{
							this._controller.setCurrentPath($(this.cli).val());
						}
						$(this.cli).val("");
					}
				}.bind(this));
				container.append(this.cli);
				//$(fileManager._breadcrumbs._$element).append(container)
				$(this._$itemsPanel).prepend(container)
				this.cli.val(["/",this.getCurrentDirectory().path].join(""));
			},
			//--------------------------------------------------------------------------------
			//A function that is executed when the current directory is changed.
			//argument details:
			//component	FileManager		The UI component's instance.
			//directory	FileSystemItem		The current directory.
			//element	HTMLElement or jQuery	The UI component's container. It is an HTML Element or a jQuery Element when you use jQuery.
			//model		Object			The model data. Available only if you use Knockout.
			//--------------------------------------------------------------------------------
			onCurrentDirectoryChanged:function(e){
				this.cli.val(['/',e.directory.path].join(''))
			},
			//--------------------------------------------------------------------------------
			//Customizes columns in details view. Applies only if itemView.mode is "details".
			//--------------------------------------------------------------------------------
			customizeDetailColumns:function(columns){
				console.log(columns);
				// Customize the "columns" array objects here
				return columns;
			},
			//--------------------------------------------------------------------------------
			//Allows you to provide custom icons to be used as thumbnails.
			//--------------------------------------------------------------------------------
			customizeThumbnail:function(fileSystemItem){
				/*
				if(fileSystemItem.isDirectory)
					return"images/thumbnails/folder.svg";
				const fileExtension=fileSystemItem.getFileExtension();
				switch(fileExtension){
					case".txt":
						return"images/thumbnails/doc-txt.svg";
					case".rtf":
						return"images/thumbnails/doc-rtf.svg";
					case".xml":
						return"images/thumbnails/doc-xml.svg";
				}
				*/
			},
			//--------------------------------------------------------------------------------
			toolbar:{
				items:[
					{
						name:"showNavPane",
						visible:true
					},
					"separator","create",
					{
						widget:"dxMenu",
						location:"before",
						options:{
							items:[
								{
									text:"Create new file",
									icon:"plus",
									items:[
										{
											text:"Javascript Source",
											extension:".js",
											action:function(){alert('action');}
										},
										{
											text:"HTML Source",
											extension:".html"
										},
										{
											text:"JSON Source",
											extension:".json"
										},
										{
											text:"XML Source",
											extension:".xml"
										}
									]
								},
								"refresh",

							],
							//onItemClick: onItemClick
							onItemClick:function(args){
								/*
								console.log(args);
								if(args.itemData.action)args.itemData.action()||fileManager.refresh();
								//console.log(this);
								fileManager.getSelectedItems()[0]
								return;
								*/
								var updated=false;
								if(args.itemData.extension) {
									updated=createFile(args.itemData.extension, args.fileSystemItem);
								} else if(args.itemData.category !== undefined) {
									updated=updateCategory(args.itemData.category, args.fileSystemItem, args.viewArea);
								}
								if(updated) {
									fileManager.refresh();
								}
							}

						}
					},
					"refresh",
					{
						name: "separator",
						location: "after"
					},
					"switchView",
{
	options:{
		text: "Custom",
		icon: "movetofolder",
		temp: true  ,
		visible: false,
		action:function(){alert('act');}
	}
},

				],
				fileSelectionItems: [
					"rename", "separator", "delete", "separator",
					{
						widget: "dxMenu",
						options: {
							items: [
								{
									text: "Category",
									icon: "tags",
									items: [
										{
											text: "Work",
											category: "Work"
										},
										{
											text: "Important",
											category: "Important"
										},
										{
											text: "Home",
											category: "Home"
										},
										{
											text: "None",
											category: ""
										}
									]
								}
							],
						},
						location: "before"
					},
                			{
						options:{
							text:"Move to Temp",
							icon:"movetofolder",
							temp:true  
						}
			                },
					"refresh","clearSelection"
				]
			},
			//--------------------------------------------------------------------------------
			//A function that is executed when a context menu item is clicked.
			//argument structure:
			//component 		FileManager 			The UI component's instance.
			//element 		HTMLElement or jQuery 		The UI component's container. It is an HTML Element or a jQuery Element when you use jQuery.
			//event			Event (jQuery or dxEvent) 	The event that caused the function to execute. It is a dxEvent or a jQuery.Event when you use jQuery.
			//fileSystemItem	FileSystemItem 			The file system item for which you invoke the context menu.
			//itemData 		Object				The clicked item's data.
			//itemElement		HTMLElement or jQuery		The item's container. It is an HTML Element or a jQuery Element when you use jQuery.
			//itemIndex		Number				The clicked item's index.
			//model			Object				Model data. Available only if you use Knockout.
			//viewArea		'navPane' | 'itemView'		Specifies whether the context menu is invoked in the navigation panel or in the items area.
			//--------------------------------------------------------------------------------
			onContextMenuItemClick:function(args) {
				console.log(args);
				if(args.itemData.action)args.itemData.action()||fileManager.refresh();
				//console.log(this);
				fileManager.getSelectedItems()[0]
				return;
				var updated=false;
				if(args.itemData.extension) {
					updated=createFile(args.itemData.extension, args.fileSystemItem);
				} else if(args.itemData.category !== undefined) {
					updated=updateCategory(args.itemData.category, args.fileSystemItem, args.viewArea);
				}
				if(updated) {
					fileManager.refresh();
				}
				/*
				console.log(args);return;
				var updated = false;

				if(args.itemData.extension) {
					updated = createFile(args.itemData.extension, args.fileSystemItem);
				} else if(args.itemData.category !== undefined) {
					updated = updateCategory(args.itemData.category, args.fileSystemItem, args.viewArea);
				}

				if(updated) {
					fileManager.refresh();
				}
				*/
			},
			//--------------------------------------------------------------------------------
			//Configures the context menu settings.
			//--------------------------------------------------------------------------------
			contextMenu: {
				items: [
					"create",
					{
						text: "Create new file",
						icon: "plus",
						items:[
							{
								text:"Javascript Source",
								extension:".js",
								action:function(){alert('action');}
							},
							{
								text:"HTML Source",
								extension:".html"
							},
							{
								text:"JSON Source",
								extension:".json"
							},
							{
								text:"XML Source",
								extension:".xml"
							}
						]
					},
					{
						name: "rename",
						beginGroup: true
					},
					"delete",
					{
						text: "Category",
						icon: "tags",
						items: [
							{
								text: "Work",
								category: "Work"
							},
							{
								text: "Important",
								category: "Important"
							},
							{
								text: "Home",
								category: "Home"
							},
							{
								text: "None",
								category: ""
							}
						],
						beginGroup: true
					},
					"refresh"
				]
			},
			//--------------------------------------------------------------------------------
			onSelectedFileOpened: function(e) {
				var popup = $("#photo-popup").dxPopup("instance");
				fm.cat("/"+e.file.path).then(function(val){
					/*
					popup.option({
						"title": e.file.name,
						"contentTemplate": `<pre>${val}</pre>`
					});
					popup.show();
					*/
					var panelHintConfig={
						panelSize:[500,400].join(" "),
						theme:"#222222 fillcolor #444444",
						animateIn:"animate__animated animate__bounceIn",
						animateOut:"animate__animated animate__bounceOut"
					};
					jsPanel.create({
						config:panelHintConfig,
						//theme:"black",
						headerTitle:e.file.name,
						callback:function(panel){
							$(panel.content).append($("<pre/>").text(val));
						}.bind(this),
						panelSize:[320,240].join(" "),
						position:{
							offsetX:16,
							offsetY:16,
						},
						headerControls:{},
						resizeit:{
							start:$.proxy(function(panel,size){
							},this),
							resize:$.proxy(function(panel,size){
							},this),
							stop:$.proxy(function(panel,size){
							},this)
						},
						onclosed:function(){}
					});


				},function(err){
					console.error(err);
					popup.option({
						"title": e.file.name,
						"contentTemplate": `<h3>Error: ${e.toString}</h3>`
					});
					popup.show();

				});
			}
		}).dxFileManager("instance");
		window.fileManager=fileManager;
		div_photo_popup.dxPopup({
			maxHeight: 600,
			closeOnOutsideClick: true,
			onContentReady: function(e) {
				var $contentElement = e.component.content();  
				$contentElement.addClass("photo-popup-content");
			}
		});
		function createFile(fileExtension,directory){
			var newItem={
				__KEY__:Date.now(),
				name:"New file"+fileExtension,
				isDirectory:false,
				size:0
			};
			directory=directory||fileManager.getCurrentDirectory();
			if(!directory.isDirectory) {
				return false;
			}
			var array=null;
			if(!directory.dataItem) {
			  array = fileSystem;
			}
			else {
				array = directory.dataItem.items;
				if(!array) {
					directory.dataItem.items = array = [];
				}
			}
			array.push(newItem);
			return true;
		}
	}
/*
fileManager._controller.setCurrentDirectory(
        fileManager._controller._createDirInfoByName('/home/skullquake')
)
http://localhost:1030/kweutils/index.html?action=runtest&parameters=dk
fileManager.executeCommand('create')
fileManager.executeCommand('delete')
fileManager.executeCommand('copy')
fileManager.executeCommand('refresh')
//find commands here
fileManager._commandManager._commands
fileManager._commandManager._commandMap
*/
                /*
                */

});
