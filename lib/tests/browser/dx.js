//https://js.devexpress.com/Demos/WidgetsGallery/Demo/FileManager/Overview/jQuery/Dark/
//https://js.devexpress.com/Documentation/20_1/ApiReference/UI_Components/dxFileManager/Configuration/
define([
	"module",
	"jquery",
	"jspanel",
	"kwe.filemanager",
	"kwe.wslogger",
	"ace",
	"idutils",
	"dx",
	"jquery.jsonForm",
	"jsv",
	"jsonform",
	"css!vendor/bootswatch/4.5.2/slate/bootstrap.css",
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
	"css!vendor/devexpress.filemanager/20.2.5/dx.dark.compact.css",
	"css!vendor/devexpress.filemanager/20.2.5/dx.slate.compact.css",
	*/
	"css!vendor/devexpress.filemanager/20.2.5/dx.slate.compact.css",
	"css!vendor/jspanel/jspanel.css",
	"css!vendor/animate/4.4.1/animate.min.css",
	"css!vendor/kwe/workbench/css/style.css",
	"css!vendor/kwe/workbench/fonts/04B_03__.css",
	"css!vendor/fontawesome/css/font-awesome.min.css",

],function(
	module,
	jq,
	jspanel,
	KweFileManager,
	wslogger,
	ace,
	idutils,
	dx
){
	console.log([module.id,'start'].join(':'));
	//--------------------------------------------------------------------------------
	$=jq;
	//--------------------------------------------------------------------------------
	var panelHintConfig={
		panelSize:[500,400].join(" "),
		theme:"#222222 fillcolor #252525",
		headerControls:{
			size:"xs"
		},
		animateIn:"animate__animated animate__bounceIn",
		animateOut:"animate__animated animate__bounceOut"
	};
	//--------------------------------------------------------------------------------
	var root="/"////mnt/c/tmp/kweutils";
	var fm=new KweFileManager({cwd:root});
	//--------------------------------------------------------------------------------
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
			//--------------------------------------------------------------------------------
			//Specifies whether the UI component is visible.
			//--------------------------------------------------------------------------------
			visible:true,
			//--------------------------------------------------------------------------------
			//Specifies the number of the element when the Tab key is used for navigating.
			//--------------------------------------------------------------------------------
			tabIndex:0,
			//--------------------------------------------------------------------------------
			name:"fileManager",
			//--------------------------------------------------------------------------------
			//Switches the UI component to a right-to-left representation.
			//When this property is set to true, the UI component text flows from right to left,
			//and the layout of elements is reversed. To switch the entire application/site to
			//the right-to-left representation, assign true to the rtlEnabled field of the
			//object passed to the DevExpress.config(config) method.
			//--------------------------------------------------------------------------------
			rtlEnabled:false,
			//--------------------------------------------------------------------------------
			//File system providers are components that provide APIs used to access and modify virtual file systems.
			//--------------------------------------------------------------------------------
			fileSystemProvider:provider,
			//--------------------------------------------------------------------------------
			//Specifies the root folder name.
			//--------------------------------------------------------------------------------
			rootFolderName:"$KWE",
			//--------------------------------------------------------------------------------
			//Specifies the path that is used when the FileManager is initialized.
			//--------------------------------------------------------------------------------
			currentPath:root,
			//--------------------------------------------------------------------------------
			//Specifies an array of path keys to the current location.
			//Each path part has each own key. For example, path "folder1/folder2" has two parts: 'folder1' with the 'f1' key and folder2 with the 'f2' key. To open this location, assign the ["f1","f2"] array of strings to the currentPathKeys property value. 
			//--------------------------------------------------------------------------------
			//currentPathKeys:["EB458000-0341-6943","92F5-4722-A7D6-98EB"],
			//--------------------------------------------------------------------------------
			//Contains an array of initially or currently selected files and directories' keys.
			//--------------------------------------------------------------------------------
			//selectedItemKeys:["item1_key","item2_key","item3_key"],
			//--------------------------------------------------------------------------------
			//Specifies whether a user can select a single or multiple files and folders in the item view simultaneously.
			//The check boxes that select/unselect individual items are displayed only in multiple selection mode.
			//"multiple"|"single"
			//--------------------------------------------------------------------------------
			selectionMode:"multiple",
			//--------------------------------------------------------------------------------
			//Specifies a key of the initially or currently focused item.
			//--------------------------------------------------------------------------------
			//focusedItemKey:"item1_key",
			//--------------------------------------------------------------------------------
			//Specifies whether the UI component can be focused using keyboard navigation.
			//--------------------------------------------------------------------------------
			//focusStateEnabled:false,
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
			//Specifies the UI component's width.
			// Number
			//  The height in pixels.
			// String
			//  A CSS-accepted measurement of height. For example, "55px", "80%", "inherit".
			// Function
			//  A function returning either of the above. For example:
			//--------------------------------------------------------------------------------
			width:function(){
				//return window.innerWidth/1.25;
			},
			//--------------------------------------------------------------------------------
			//Specifies text for a hint that appears when a user pauses on the UI component.
			//--------------------------------------------------------------------------------
			//hint:'default hint text',
			//--------------------------------------------------------------------------------
			//Specifies whether the UI component changes its state when a user pauses on it.
			//--------------------------------------------------------------------------------
			hoverStateEnabled:true,
			//--------------------------------------------------------------------------------
			//Configures the file and folder view.
			//Set the itemView.mode property to details to configure columns in the UI component.
			//--------------------------------------------------------------------------------
			/*
			itemView:{
				mode:"details",
				showFolders:true,
				showParentFolder:true
			},
			*/
			//--------------------------------------------------------------------------------
			//Specifies actions that a user is allowed to perform on files and folders.
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
			//Configures upload settings.
			//argument object:
			// chunkSize: The FileManager can divide a large file in parts and upload them
			//            in separate requests. 
			// maxFileSize: Maximum file size
			//--------------------------------------------------------------------------------
			upload:{
				chunkSize:500000,
				maxFileSize:1000000
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
			//also filters view!
			//--------------------------------------------------------------------------------
			//allowedFileExtensions:[".js",".json",".css"],
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
				})
				.addClass([
					"dx-cli"
				]);
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
			//A function that is executed before the UI component is disposed of.
			//called on fileManager.dispose()
			//argument details:
			//component	FileManager		The UI component's instance.
			//element	HTMLElement or jQuery	The UI component's container. It is an HTML Element or a jQuery Element when you use jQuery.
			//model		Object			Model data. Available only if you use Knockout.
			//--------------------------------------------------------------------------------
			onDisposing:function(arg){
				console.log(arg);
			},
			//--------------------------------------------------------------------------------
			//A function that is executed when an error occurs.
			//component		FileManager		The UI component's instance.
			//element		HTMLElement or jQuery	The UI component's container. It is an HTML Element or a jQuery Element when you use jQuery.
			//errorCode		Number			The error code. The following error codes are supported:
			//						 NoAccess = 0
			//						 FileExists = 1
			//						 FileNotFound = 2
			//						 DirectoryExists = 3
			//						 DirectoryNotFound = 4
			//						 WrongFileExtension = 5
			//						 MaxFileSizeExceeded = 6
			//						 Other = 32767
			//errorText		String	The error message.
			//fileSystemItem	FileSystemItem	The processed file or directory.
			//model		Object	Model data. Available only if you use Knockout.
			//--------------------------------------------------------------------------------
			onErrorOccurred:function(err){
				console.log(err);
			},
			//--------------------------------------------------------------------------------
			//A function that is executed when the focused item is changed.
			//argument details
			//component	FileManager		The UI component's instance.
			//element	HTMLElement or jQuery	The UI component's container. It is an HTML Element or a jQuery Element when you use jQuery.
			//item		FileSystemItem		The currently focused file or directory.
			//itemElement	HTMLElement or jQuery	The item's container. It is an HTML Element or a jQuery Element when you use jQuery.
			//model		Object			The model data. Available only if you use Knockout.
			//--------------------------------------------------------------------------------
			onFocusedItemChanged:function(arg){
				console.log(arg);
				//$(arg.itemElement).css({'background':'red'});
			},
			//--------------------------------------------------------------------------------
			//A function used in JavaScript frameworks to save the UI component instance.
			//argument details:
			//component	FileManager		The UI component's instance.
			//element	HTMLElement or jQuery	The UI component's container. It is an HTML Element or a jQuery Element when you use jQuery.
			//--------------------------------------------------------------------------------
			onInitialized:function(e){
				console.log(e);
			},
			//--------------------------------------------------------------------------------
			//A function that is executed after a UI component property is changed.
			//component	FileManager		The UI component's instance.
			//fullName	String			The path to the modified property that includes all parent properties.
			//name		String			The modified property if it belongs to the first level. Otherwise, the first-level property it is nested into.
			//value		any			The modified property's new value.
			//element	HTMLElement or jQuery	The UI component's container. It is an HTML Element or a jQuery Element when you use jQuery.
			//model		Object			Model data. Available only if you use Knockout.
			//--------------------------------------------------------------------------------
			onOptionChanged:function(e){
				/*
				console.log(e);
				if(e.name==="changedProperty"){
					// handle the property change here
				}
				*/
			},
			//--------------------------------------------------------------------------------
			//A function that is executed after a UI component property is changed.
			//component	FileManager		The UI component's instance.
			//fullName	String			The path to the modified property that includes all parent properties.
			//name		String			The modified property if it belongs to the first level. Otherwise, the first-level property it is nested into.
			//value		any			The modified property's new value.
			//element	HTMLElement or jQuery	The UI component's container. It is an HTML Element or a jQuery Element when you use jQuery.
			//model		Object			Model data. Available only if you use Knockout.
			//--------------------------------------------------------------------------------
			onSelectionChanged:function(e){
				console.log(e);
			},
			//--------------------------------------------------------------------------------
			//Customizes columns in details view. Applies only if itemView.mode is "details".
			//--------------------------------------------------------------------------------
			/*
			customizeDetailColumns:function(columns){
				console.log(columns);
				// Customize the "columns" array objects here
				return columns;
			},
			*/
			//--------------------------------------------------------------------------------
			//Allows you to provide custom icons to be used as thumbnails.
			//--------------------------------------------------------------------------------
				/*
			customizeThumbnail:function(fileSystemItem){
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
			},
				*/
			//--------------------------------------------------------------------------------
			//Configures toolbar settings.
			//Predefined toolbar items include:
			// 'showNavPane' - Shows or hides the navigation panel.
			// 'create' - Creates a new directory.
			// 'upload' - Uploads a file.
			// 'refresh' - Refreshes the file manager content and shows the progress panel.
			// 'download' - Downloads a file.
			// 'move' - Moves files and directories.
			// 'copy' - Copies files and directories.
			// 'rename' - Renames files and directories.
			// 'delete' - Deletes files and directories.
			// 'switchView' - Switches between the 'Details' and 'Thumbnails' file system representation modes.
			// 'clearSelection' - Clears selection from files and directories in the Item View area.
			//To add a predefined item to the toolbar, specify its name and optional settings
			//('visible', 'location', 'locateInMenu', 'text', 'icon', 'disabled')
			//and add the item to one of the following collections:
			// items - Displays toolbar items when no file system item is selected.
			// fileSelectionItems - Displays toolbar items when one or more file system items are selected.
			//Note that optional settings for predefined toolbar items should be specified
			//at the same level as the item's name property.
			//To add a custom toolbar item, specify its text and optional settings
			//(for example, a file extension for the toolbar item that creates a new file)
			//and add the item to one of the following collections:
			// items - Displays toolbar items when no file system item is selected.
			// fileSelectionItems - Displays toolbar items when one or more file system items are selected.
			//The widget property allows you to specify a UI component for a custom toolbar
			//item (dxButton is the default UI component).
			//Use the toolbarItemClick event to handle clicks on custom toolbar items.
			//--------------------------------------------------------------------------------
			toolbar:{
				//Displays toolbar items when no file system item is selected.
				items:[
					/*
					{//sample item
						name:"testname",		//key
						options:{			//
							text:"testtext",	//text
							icon:"newfolder",	//icon
							disabled:false,		//disabled
							locateInMenu:false,	//true:do not show in menu,false:show in menu
							visible:true,		//visibility
							widget:'dxButton',	//widget???
							customK:'customV',	//custom
							customFn:function(){	//custom
								alert("TEST");
							}
						}
					},
					*/
					{//create file
						name:"createFile",		//key
						options:{			//
							text:"Create File",	//text
							icon:"file",	//icon
							disabled:false,		//disabled
							locateInMenu:false,	//true:do not show in menu,false:show in menu
							visible:true,		//visibility
						},
						action:function(args){
							jsPanel.create({
								config:panelHintConfig,
								//theme:"black",
								headerTitle:"Create File",
								callback:function(panel){
									var feedback=$("<div/>").addClass(["alert","alert-danger"]).hide();
									var form=$("<form/>");
									var btngroup=$("<div/>").addClass(["btn-group"]);
									var btncreate=$("<button/>").addClass(["btn","btn-sm"]).text("Create")
									var btncancel=$("<button/>").addClass(["btn","btn-sm"]).text("Cancel")
									btngroup.append([btncreate,btncancel]);
									$(panel.content).append([
										$("<div/>").addClass(["container"]).append([
											$("<div/>").addClass(["row"]).append([
												$("<div/>").addClass(["col-md-12"]).append([
													form,
													feedback,
													btngroup
												])
											])
										])
									]);
									var jsf=form.jsonForm({
										schema: {
											name: {
												type: 'string',
												title: 'Name',
												required: true
											}
										},
										form:[
											{
												"key":"name",
												"fieldHtmlClass": "form-control-sm"
											},
											/*
											{
												"type":"submit",
												"title":"Create",
												"buttonHtmlClass": "btn-sm"
											},
											{
												"type":"button",
												"title":"Cancel",
												"buttonHtmlClass": "btn-sm"
											},
											*/
										],
										onSubmit: function (errors, values) {
											console.log(errors);
											console.log(values);
											console.log(args);
											console.log(args.component._controller._fileProvider._endpointUrl);
											//fileProvider._executeRequest(
											//commadore plus 4
											console.log('-------------');
											var r=args.component._controller._fileProvider._executeRequest(
												"CreateFile",{
													"pathInfo":fileManager.getCurrentDirectory().getFullPathInfo(),
													//"pathInfo":args.component.getCurrentDirectory().pathinfo,
													//"pathInfo":[],//args.component.getCurrentDirectory().pathinfo,
													"name":values.name//"asdf"//name:args.component.getCurrentDirectory().name
												}
											);
											console.log(r);
											r.then(function(val){
												console.log('-success');
												console.log(val);
												args.component.refresh();
												panel.close();
											}.bind(this),function(err){
												console.log('-failed');
												feedback.text(err.errorText);
												feedback.show();
												console.error(err);
											}.bind(this));
											console.log('-------------');
											/*
											if (errors) {
												$('#res').html('<p>I beg your pardon?</p>');
											}
											else {
												values.name
											}
											*/
										}.bind(this)
									});
									btncreate.click(function(){jsf.submit();}.bind(this));
									btncancel.click(function(){panel.close();}.bind(this));
									$(form.find(".form-control")[0]).focus();
									console.log(jsf);
								}.bind(this),
								panelSize:[320,160].join(" "),
								position:{
									offsetX:16,
									offsetY:16,
								},
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

						}
					},
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
				//Displays toolbar items when one or more file system items are selected.
				fileSelectionItems:[
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
			//A function that is executed when a toolbar item is clicked.
			//argument details:
			//component	FileManager			The UI component's instance.
			//element	HTMLElement or jQuery		The UI component's container. It is an HTML Element or a jQuery Element when you use jQuery.
			//event		Event (jQuery or dxEvent)	The event that caused the function to execute. It is a dxEvent or a jQuery.Event when you use jQuery.
			//itemData	Object				The clicked item's data.
			//itemElement	HTMLElement or jQuery		The item's container. It is an HTML Element or a jQuery Element when you use jQuery.
			//itemIndex	Number				The clicked item's index.
			//model		Object				Model data. Available only if you use Knockout.
			//--------------------------------------------------------------------------------
			onToolbarItemClick:function(args){
				console.log(args);
				if(typeof(args.itemData.action)=="function"){
					args.itemData.action.call(this,args);
				}
				/*
				if(args.itemData.extension){
					// your code
				}else{
					if(args.itemData.options.customK){
						console.log('customK');
					}
					if(args.itemData.options.customFn){
						args.itemData.options.customFn();
					}
				}
				*/
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
			//function that is executed when the selected file is opened.
			//component	FileManager		The UI component's instance.
			//element	HTMLElement or jQuery	The UI component's container. It is an HTML Element or a jQuery Element when you use jQuery.
			//file		FileSystemItem		The opened file.
			//model		Object			Model data. Available only if you use Knockout.
			//--------------------------------------------------------------------------------
			onSelectedFileOpened:function(args){
				var popup=$("#photo-popup").dxPopup("instance");
					var r=args.component._controller._fileProvider._executeRequest(
						"GetFileContents",{
							"pathInfo":args.file.getFullPathInfo(),
							"name":args.name
						}
					);
					console.log(r);
					r.then(function(val){
						console.log('val');
						console.log(val);
						jsPanel.create({
							config:panelHintConfig,
							//theme:"black",
							headerTitle:args.file.name,
							callback:function(panel){
								//$(panel.content).append($("<pre/>").text(val.result));
								$(panel.content).css({"height":"100%"});
								var id=idutils.uuidv4();
								var container=$("<div/>").attr({"id":id});
								$(panel.content).append(container);
								this.bool_vikeys=true;
								this.editor=ace.edit(id);
								window.editor=this.editor;
								this.editor.setValue(val.result,-1);
								this.editor.setTheme("ace/theme/chaos");


								this.editor.setKeyboardHandler("ace/keyboard/vim");
								ace.config.loadModule(
									'ace/keyboard/vim',
									function(module){
										var VimApi = module.CodeMirror.Vim;
										VimApi.defineEx("write", "w", function(cm, input) {
											cm.ace.execCommand("save");
											/*
											cm.openNotification(
												'<span style="color: red">'+
												'test'+//str+
												'</span>',
												{bottom: true, duration: 5000}
											);
											*/
										});
									}.bind(this)
								);
								if(this.bool_vikeys){
									this.editor.setKeyboardHandler("ace/keyboard/vim");
									this.bool_vikeys=!this.bool_vikeys;

								}else{
									this.editor.setKeyboardHandler();
									this.bool_vikeys=!this.bool_vikeys;
								}
								//--------------------------------------------------------------------------------
								//toggle vi
								//--------------------------------------------------------------------------------
								this.editor.commands.addCommand(
									{
										name:"toggleVi",
										bindKey:{
											win:"Alt-J",
											mac:"Command-J",
											sender:"editor|cli"
										},
										exec:function(aceenv,aceargs,acerequest){
											if(this.bool_vikeys){
												this.editor.setKeyboardHandler("ace/keyboard/vim");
												this.bool_vikeys=!this.bool_vikeys;

											}else{
												this.editor.setKeyboardHandler();
												this.bool_vikeys=!this.bool_vikeys;
											}
										}.bind(this)
									}
								);
								//--------------------------------------------------------------------------------
								//save
								//--------------------------------------------------------------------------------
								this.editor.commands.addCommand(
									{
										name:"save",
										bindKey:{
											win:"Alt-W",
											mac:"Command-W",
											sender:"editor|cli"
										},
										exec:function(aceenv,aceargs,acerequest){
											var r=args.component._controller._fileProvider._executeRequest(
												"SetFileContents",{
													"pathInfo":args.file.getFullPathInfo(),
													"value":this.editor.getValue(),
													"name":args.file.name
												}
											);
											console.log(r);
											r.then(function(val){
												editor.state.cm.openNotification(val.result,{bottom:true,duration:5000})
												console.log(val);
											}.bind(this),function(err){
												editor.state.cm.openNotification(val.errorText,{bottom:true,duration:5000})
												console.error(err);
											}.bind(this));
										}.bind(this)
									}
								);


								//this.editor.getSession().setMode("ace/mode/c");
								this.editor.focus();
								this.editor.renderer.on('afterRender', function() {
									var nlines=Math.floor($(panel.content).height()/this.editor.renderer.lineHeight);
									this.editor.setOptions({
										minLines:nlines,
										maxLines:nlines
									});
									$(this.editor.container).css({
										height:"100%",
										width:"100%"
									})
								}.bind(this));

								function hdliconclick(a,b,c){
									console.log(a);
									console.log(b);
									console.log(c);
								}
								var iconstyle={
									"padding-right":"4px"
								}

								var headertoolbar=[
									$("<span/>").css(iconstyle).click(hdliconclick).addClass(["fa","fa-folder-open"]).text('').click(function(){
										alert('stub');
										editor.focus();
									}.bind(this))[0],
									$("<span/>").css(iconstyle).click(hdliconclick).addClass(["fa","fa-save"]).text('').click(function(){
										editor.execCommand('save')
										editor.focus();
									}.bind(this))[0],
								];
								panel.addToolbar('header',headertoolbar,(panel)=>{
									// callback to add handlers for example
								});
								var footertoolbar=[
									$("<span/>").css(iconstyle).click(hdliconclick).css({"font-size":"8px"}).addClass().text("Editor Version 0.1")[0],
									$("<span/>").css(iconstyle).click(hdliconclick).css({"font-size":"8px"}).addClass(["fa","fa-question"])[0],
								];
								panel.addToolbar('footer',footertoolbar,(panel)=>{
									// callback to add handlers for example
								});

								panel.options.resizeit.resize.push(function(){//note how to add callbacks
									var nlines=Math.floor(0.8*$(panel.content).height()/this.editor.renderer.lineHeight);
									this.editor.setOptions({
										minLines:nlines,
										maxLines:nlines
									});
								}.bind(this));
								panel.options.resizeit.stop.push(function(){//note how to add callbacks
									var nlines=Math.floor(0.8*$(panel.content).height()/this.editor.renderer.lineHeight);
									//var nlines=Math.floor($(this.editor.container).height()/this.editor.renderer.lineHeight);
									this.editor.setOptions({
										minLines:nlines,
										maxLines:nlines
									});
								}.bind(this));
							}.bind(this),
							panelSize:[320,240].join(" "),
							position:{
								offsetX:16,
								offsetY:16,
							},
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

					}.bind(this),
					function(err){
						console.log('-failed');
						feedback.text(err.errorText);
						feedback.show();
						console.error(err);
						console.error(err);
						popup.option({
							"title":"ERROR",
							"contentTemplate": `<h3>Error: ${err.errorText}</h3>`
						});
						popup.show();
					}.bind(this)
				);
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
});

