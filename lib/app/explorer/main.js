//localhost:1030/kweutils/index.html?action=runapp&arguments={"app":"explorer","options":{"id":"foo","class":"myclass","style":"background:rgba(255,255,255,0.125);border:1px solid rgba(255,255,255,0.5);color:rgb(128,128,128);font-family:monospace;height:400px;width:400px;","node":"body"}}
//localhost:1030/kweutils/index.html?action=runapp&arguments={"app":"explorer","options":{"id":"foo","class":"myclass","style":"background:rgba(255,255,255,0.125);border:1px solid rgba(255,255,255,0.5);color:rgb(128,128,128);font-family:monospace;height:400px;","node":"body"}}
//localhost:1030/kweutils/index.html?action=runapp&arguments={"app":"explorer","options":{"id":"foo","class":"myclass","node":"body","stylesheet":"html,body{}.iconname{font-family:monospace;color:rgba(0,154,187,1.0)!important;}","root":"./pub/local"}}
//localhost:1030/kweutils/index.html?action=runapp&arguments={"app":"explorer"}
define([
	"module",
	'jquery',
	'lodash',
	'pubsub',
	'pathutils',
	'jspanel',
	'anime',
	'idutils',
	"css!./css/animate.min.css",
	"css!../../vendor/jspanel/jspanel.css",
	"css!../../../css/fonts/webfonts/04B_03__.css"
],function(
	module,
	jq,
	_,
	pubsub,
	pathutils,
	jspanel,
	anime,
	idutils
){
	window._=_;
	console.log([module.id,'start'].join(':'));
	return function(options){
		console.log([module.id,'app','start'].join(':'));
		options=options==null?{}:options;
		var $=jq;
		window['$']=$;
		window['anime']=anime;
		try{
			var loadingsvg='<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1145.7 288.31"><defs><style>.cls-1,.cls-2{fill:none;}.cls-2{stroke:#18d26e;stroke-width:4.32px;}.cls-3{fill:#fff;}.cls-4{fill:url(#_10_lpi_60_2);}.cls-5{fill:url(#_10_lpi_60_2-3);}</style><pattern id="_10_lpi_60_2" data-name="10 lpi 60% 2" x="-66.36" y="-94.35" width="72" height="72" patternUnits="userSpaceOnUse" viewBox="0 0 72 72"><rect class="cls-1" width="72" height="72"/><line class="cls-2" x1="71.75" y1="68.4" x2="144.25" y2="68.4"/><line class="cls-2" x1="71.75" y1="54" x2="144.25" y2="54"/><line class="cls-2" x1="71.75" y1="39.6" x2="144.25" y2="39.6"/><line class="cls-2" x1="71.75" y1="25.2" x2="144.25" y2="25.2"/><line class="cls-2" x1="71.75" y1="10.8" x2="144.25" y2="10.8"/><line class="cls-2" x1="71.75" y1="61.2" x2="144.25" y2="61.2"/><line class="cls-2" x1="71.75" y1="46.8" x2="144.25" y2="46.8"/><line class="cls-2" x1="71.75" y1="32.4" x2="144.25" y2="32.4"/><line class="cls-2" x1="71.75" y1="18" x2="144.25" y2="18"/><line class="cls-2" x1="71.75" y1="3.6" x2="144.25" y2="3.6"/><line class="cls-2" x1="-0.25" y1="68.4" x2="72.25" y2="68.4"/><line class="cls-2" x1="-0.25" y1="54" x2="72.25" y2="54"/><line class="cls-2" x1="-0.25" y1="39.6" x2="72.25" y2="39.6"/><line class="cls-2" x1="-0.25" y1="25.2" x2="72.25" y2="25.2"/><line class="cls-2" x1="-0.25" y1="10.8" x2="72.25" y2="10.8"/><line class="cls-2" x1="-0.25" y1="61.2" x2="72.25" y2="61.2"/><line class="cls-2" x1="-0.25" y1="46.8" x2="72.25" y2="46.8"/><line class="cls-2" x1="-0.25" y1="32.4" x2="72.25" y2="32.4"/><line class="cls-2" x1="-0.25" y1="18" x2="72.25" y2="18"/><line class="cls-2" x1="-0.25" y1="3.6" x2="72.25" y2="3.6"/><line class="cls-2" x1="-72.25" y1="68.4" x2="0.25" y2="68.4"/><line class="cls-2" x1="-72.25" y1="54" x2="0.25" y2="54"/><line class="cls-2" x1="-72.25" y1="39.6" x2="0.25" y2="39.6"/><line class="cls-2" x1="-72.25" y1="25.2" x2="0.25" y2="25.2"/><line class="cls-2" x1="-72.25" y1="10.8" x2="0.25" y2="10.8"/><line class="cls-2" x1="-72.25" y1="61.2" x2="0.25" y2="61.2"/><line class="cls-2" x1="-72.25" y1="46.8" x2="0.25" y2="46.8"/><line class="cls-2" x1="-72.25" y1="32.4" x2="0.25" y2="32.4"/><line class="cls-2" x1="-72.25" y1="18" x2="0.25" y2="18"/><line class="cls-2" x1="-72.25" y1="3.6" x2="0.25" y2="3.6"/></pattern><pattern id="_10_lpi_60_2-3" data-name="10 lpi 60% 2" width="72" height="72" patternUnits="userSpaceOnUse" viewBox="0 0 72 72"><rect class="cls-1" width="72" height="72"/><line class="cls-2" x1="71.75" y1="68.4" x2="144.25" y2="68.4"/><line class="cls-2" x1="71.75" y1="54" x2="144.25" y2="54"/><line class="cls-2" x1="71.75" y1="39.6" x2="144.25" y2="39.6"/><line class="cls-2" x1="71.75" y1="25.2" x2="144.25" y2="25.2"/><line class="cls-2" x1="71.75" y1="10.8" x2="144.25" y2="10.8"/><line class="cls-2" x1="71.75" y1="61.2" x2="144.25" y2="61.2"/><line class="cls-2" x1="71.75" y1="46.8" x2="144.25" y2="46.8"/><line class="cls-2" x1="71.75" y1="32.4" x2="144.25" y2="32.4"/><line class="cls-2" x1="71.75" y1="18" x2="144.25" y2="18"/><line class="cls-2" x1="71.75" y1="3.6" x2="144.25" y2="3.6"/><line class="cls-2" x1="-0.25" y1="68.4" x2="72.25" y2="68.4"/><line class="cls-2" x1="-0.25" y1="54" x2="72.25" y2="54"/><line class="cls-2" x1="-0.25" y1="39.6" x2="72.25" y2="39.6"/><line class="cls-2" x1="-0.25" y1="25.2" x2="72.25" y2="25.2"/><line class="cls-2" x1="-0.25" y1="10.8" x2="72.25" y2="10.8"/><line class="cls-2" x1="-0.25" y1="61.2" x2="72.25" y2="61.2"/><line class="cls-2" x1="-0.25" y1="46.8" x2="72.25" y2="46.8"/><line class="cls-2" x1="-0.25" y1="32.4" x2="72.25" y2="32.4"/><line class="cls-2" x1="-0.25" y1="18" x2="72.25" y2="18"/><line class="cls-2" x1="-0.25" y1="3.6" x2="72.25" y2="3.6"/><line class="cls-2" x1="-72.25" y1="68.4" x2="0.25" y2="68.4"/><line class="cls-2" x1="-72.25" y1="54" x2="0.25" y2="54"/><line class="cls-2" x1="-72.25" y1="39.6" x2="0.25" y2="39.6"/><line class="cls-2" x1="-72.25" y1="25.2" x2="0.25" y2="25.2"/><line class="cls-2" x1="-72.25" y1="10.8" x2="0.25" y2="10.8"/><line class="cls-2" x1="-72.25" y1="61.2" x2="0.25" y2="61.2"/><line class="cls-2" x1="-72.25" y1="46.8" x2="0.25" y2="46.8"/><line class="cls-2" x1="-72.25" y1="32.4" x2="0.25" y2="32.4"/><line class="cls-2" x1="-72.25" y1="18" x2="0.25" y2="18"/><line class="cls-2" x1="-72.25" y1="3.6" x2="0.25" y2="3.6"/></pattern></defs><g id="Black"><path class="cls-3" d="M138.3,321.47V100.16H138V376.84h44.05V321.47Z" transform="translate(-66.36 -94.35)"/><path class="cls-3" d="M356.54,155a66.53,66.53,0,0,0-41.27-53.41q-17.68-7.26-39.91-7.26H275V141.2l.71,0q6.66,0,8.8,5.38t2.13,24.69V298.4q0,24.45-2.05,30.93t-9.4,6.5H275v46.83h.36q23.42,0,41-7.7t27.94-22a66.2,66.2,0,0,0,12.31-31.7q2-17.36,2-59.05V214.83Q358.59,172.11,356.54,155Z" transform="translate(-66.36 -94.35)"/><path class="cls-3" d="M509.79,100.16H460v66.77c.23-1.68.46-3.37.7-5.08q5.51,69.21,11,116.22H460v49h13.55l3.86,49.73h73.53Z" transform="translate(-66.36 -94.35)"/><path class="cls-3" d="M727.39,145a49.82,49.82,0,0,0-12-24.35q-9.57-10.94-27.94-15.72-12.69-3.3-41.49-4.33v47.67a16.63,16.63,0,0,1,5.17,1.69,11.42,11.42,0,0,1,5.47,7.77q1.18,5.31,1.19,24.1V289.34q0,27.69-3.58,33.93-2.1,3.63-8.25,5.15v48.42h7.9q25.82,0,38.63-2.82a50.69,50.69,0,0,0,21.53-9.91q8.72-7.08,12.22-19.65t3.5-49.82v-96.9Q729.78,158.44,727.39,145Z" transform="translate(-66.36 -94.35)"/><path class="cls-3" d="M756.61,270.89v106h71.95V198.94Z" transform="translate(-66.36 -94.35)"/><path class="cls-3" d="M958,100.16V376.84h60.09V100.16Z" transform="translate(-66.36 -94.35)"/><path class="cls-3" d="M1205.74,138.19q-6.33-17.86-27.18-30.85-20.22-12.6-50.56-13v46.83h.32q7.7,0,9.74,6t2,29.73V202h72v-12Q1212.06,156,1205.74,138.19Zm-77.93,90.14v42h14.52v32.81q0,19.31-2.82,26t-10.68,6.67l-.83,0v45.57a47.12,47.12,0,0,0,13.63-5.13q11.2-6.42,18.56-19.23l6.66,19.82h45.21V228.33Z" transform="translate(-66.36 -94.35)"/></g><g id="Lines"><rect class="cls-4" y="5.81" width="71.64" height="276.68"/><path class="cls-5" d="M264.08,171.25v129.2q0,24.1,2,29.74t8.95,5.64v46.83q-22-.06-39.54-7.27A66.49,66.49,0,0,1,194.19,322q-2.06-17.1-2.05-59.82V214.83q0-41.69,2-59a66.1,66.1,0,0,1,12.31-31.7q10.34-14.36,27.94-22T275,94.35V141.2a9.68,9.68,0,0,0-7.92,4.33Q264.08,149.89,264.08,171.25Z" transform="translate(-66.36 -94.35)"/><path class="cls-5" d="M460,166.93q-10.38,75.58-13.1,111.14H460v49H447.81l-4.32,49.73H369.1l36.7-276.68H460Z" transform="translate(-66.36 -94.35)"/><path class="cls-5" d="M635.11,147.5v182A46,46,0,0,0,646,328.42v48.42H563.16V100.16H617q16.11,0,29,.46v47.67A61.24,61.24,0,0,0,635.11,147.5Z" transform="translate(-66.36 -94.35)"/><polygon class="cls-4" points="762.2 5.81 762.2 104.59 690.25 176.54 690.25 5.81 762.2 5.81"/><polygon class="cls-4" points="891.64 5.81 891.64 282.49 888.67 282.49 851.24 156.71 851.24 282.49 791.08 282.49 791.08 5.81 851.24 5.81 891.57 130.4 891.57 5.81 891.64 5.81"/><path class="cls-5" d="M1116.87,172.62V305.41q0,18.63,2.39,24.52,2.25,5.55,8.74,5.88v45.57a61.42,61.42,0,0,1-12.79,1.28,68.71,68.71,0,0,1-34-8.81q-15.83-8.79-24-21.79A69,69,0,0,1,1047,324.81q-2.06-14.28-2-42.81V199.79q0-39.64,4.27-57.59t24.53-32.9q20.25-15,52.38-15h1.9v46.83q-6.4.1-8.74,5.11T1116.87,172.62Z" transform="translate(-66.36 -94.35)"/></g></svg>';
			var panelHintConfig={
				panelSize:[500,400].join(" "),
				animateIn:'animate__animated animate__bounceIn',
				animateOut:'animate__animated animate__bounceOut'
			};

			//--------------------------------------------------------------------------------
			window.Ui=(function(options){
				var instance;
				function mobileCheck(){
					let check=false;
					(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
				  return check;
				}
				function init(options){
					options=options==null?{}:options;
					function prvmkwin(optionsarg){
						optionsarg=optionsarg==null?{}:optionsarg;
						optionsarg.node=optionsarg.node==null?null:optionsarg.node;
						optionsarg.iframesrc=optionsarg.iframesrc==null?null:optionsarg.iframesrc;
						optionsarg.width=optionsarg.width==null?320:optionsarg.width;
						optionsarg.height=optionsarg.height==null?240:optionsarg.height;
						optionsarg.x=optionsarg.x==null?0:optionsarg.x;
						optionsarg.y=optionsarg.y==null?0:optionsarg.y;
						optionsarg.title=optionsarg.title==null?"New Window":optionsarg.title;
						optionsarg.onclosed=optionsarg.onclosed==null?$.proxy(function(panel){}):optionsarg.onclosed;
						optionsarg.callback=optionsarg.callback==null?$.proxy(function(panel){}):optionsarg.callback;
						optionsarg.resizeit=optionsarg.resize==null?{
								start:$.proxy(function(panel,size){},this),
								resize:$.proxy(function(panel,size){},this),
								stop:$.proxy(function(panel,size){},this)
							}:optionsarg.resizeit
						;
						optionsarg.headerTitle=optionsarg.headerTitle==null?"New Window":optionsarg.headerTitle;

						optionsarg.headerControls=optionsarg.headerControls==null?{
								size:"xs"
							}:optionsarg.headerControls
						;
						optionsarg.fullscreen=optionsarg.fullscreen==null?false:optionsarg.fullscreen;
						if(optionsarg.fullscreen||mobileCheck()){
							var cover=$('<div/>')
								.addClass('cover')
								.css('overflow','hidden')
								.css('height','100vh')
								.css('width','100vw')
								.css('background','#000000')
								.css('z-index','99999')
								.css('position','fixed')
							;
							var btnclose=$('<button/>')
								.css({
									"position":"absolute",
									"z-index":999999,
									"top":"0px",
									"right":"0px",
									"padding":"0px",
									"width":"64px",
									"height":"64px",
									"background":"#000000",
									"color":"#4ceb95",
									"border-radius":"0px",
									"font-weight":"bold",
								})
								.text("X")
								.click(function(){
									cover.remove();
								});
							;
							$('body').append(cover);
							if(optionsarg.node!=null){
								cover.append(optionsarg.node);
							}else if(optionsarg.iframesrc!=null){
								var loadingmsg=$("<div/>").css({
									"background":"rgba(0,0,0,0.8)",
									"position":" absolute", 
									"display":" flex",
									"align-items":"center",
									"height":" 100%",  
									"width":" 100%",  
									"z-index":"10",
									"font-size":"32px",
									"text-transform":"uppercase",
									"position":"absolute",
									"left":"50%",
									"transform":"translate(-50%, 0)"
								}).addClass("loading")
								svg=$(loadingsvg).css({
									"display":"block",
									"height":"100%",
									"width":"128px",
									"margin":"auto"
								});
								loadingmsg.append(svg);

								cover.append(loadingmsg);
								anime({
								  targets: '.loading line',
								  translateX: [
								    {value: 270, duration: 1000, easing: 'easeOutSine'},
								    {value: 0, duration: 1000, easing: 'easeOutSine'}
								  ],
								  delay: anime.stagger(200, {grid: [16,10], from: 7}),
								  loop: true
								})
								var iframe;
								iframe=$("<iframe>")
									.attr("src",
										optionsarg.iframesrc
									)
									.attr("width",cover.width())
									.attr("height",cover.height())
									.css({border:"none"})
									.on('load',function(){
										loadingmsg.remove();
										iframe.contents().find('body').append($("<link/>").attr("rel","stylesheet").text(`
											html {
												scrollbar-width: none; /* For Firefox */
												-ms-overflow-style: none; 
											}
											html::-webkit-scrollbar {
											    width: 0px;
											}
										`));
									})
								;
								cover.append(iframe);
							}
							cover.append(btnclose);
							optionsarg.callback(cover[0]);
						}else{
							jsPanel.create({
								config:panelHintConfig,
								theme:"black",
								headerTitle:optionsarg.headerTitle,
								callback:$.proxy(function(panel){
									if(optionsarg.node!=null){
										$(panel.content).append(optionsarg.node);
									}else if(optionsarg.iframesrc!=null){
										var content=$(panel.content);
										content.css({width:"100%",height:"100%"});
										//content.css({width:"100%",height:"auto"});
										svg=$(loadingsvg).css({
											"display":"block",
											"height":"100%",
											"width":"128px",
											"margin":"auto"
										});
										var loadingmsg=$("<div/>").css({
											"height":"100%"
										}).attr('id','loadingmsg').addClass("loading").append(svg)
										content.append(loadingmsg);
										var iframe;
										iframe=$("<iframe>")
											.attr("src",
												optionsarg.iframesrc
											)
											.attr("width",content.width())
											.attr("height",content.height())
											.css({border:"none"})
											.css({background:"#222222"})
											.on('load',function(){
												loadingmsg.remove();
												iframe.focus();
												iframe.contents().find('body').append($("<link/>").attr("rel","stylesheet").text(`
													html {
														scrollbar-width: none;
														-ms-overflow-style: none;
													}

													html::-webkit-scrollbar {
													    width: 0px;
													}
												`));

											})
										;
										$(panel.content).append(iframe);
										panel.iframe=iframe;
									}
									optionsarg.callback(panel.content);
								}),
								panelSize:[optionsarg.width,optionsarg.height].join(" "),
								position:{
									offsetX:optionsarg.x,
									offsetY:optionsarg.y,
								},
								headerControls:optionsarg.headerControls,
								resizeit:optionsarg.iframesrc==null?optionsarg.resizeit:{
									start:$.proxy(function(panel,size){
										panel.iframe.attr("width",size.width);
										panel.iframe.attr("height",size.height);
									},this),
									resize:$.proxy(function(panel,size){
										panel.iframe.attr("width",size.width);
										panel.iframe.attr("height",size.height);
									},this),
									stop:$.proxy(function(panel,size){
										panel.iframe.attr("width",size.width);
										panel.iframe.attr("height",size.height);
									},this)
								},
								onclosed:optionsarg.onclosed
							});
						}

					};
					return{
						mkwin:prvmkwin
					};
				};
				return{
					getInstance:function(options){
						if(!instance){
							instance=init(options);
						}
						return instance;
					}
				};
			})();
			//--------------------------------------------------------------------------------
			var Mod=(function(options){
				var instance;
				function init(options){
					options=options==null?{}:options
					options.cwd=options.cwd==null?'.':options.cwd;
					options.root=options.root==null?".":options.root;
					options.cwd=options.cwd==null?".":options.cwd;
					cwd=[options.root,options.cwd].join('/');
					var CHLS="inbox/newMessage";
					var ps=pubsub();
					function prvcd(path){
					};
					function prvls(path){
						return new Promise(function(resolve,reject){
							path=path==null?options.cwd:['.',cwd,path].join('/');
							//path=[options.root,path].join('/');
							path=pathutils.normalizepath(path);
							var svcurl=require.toUrl(module.id.substring(0,module.id.lastIndexOf("/"))+"/srv/svc_fs.js");
							var svg_back=require.toUrl(module.id.substring(0,module.id.lastIndexOf("/"))+"/img/back.svg")
							$.ajax(
								{
									type:"POST",
									url:svcurl,
									contentType:"application/json",
									data:JSON.stringify({
										"action":"ls",
										"args":{"path":path}
									}),
									dataType:"json",
									success:$.proxy(function(data){
										if(path!=pathutils.normalizepath(options.root)){
											console.log("!ROOT");
											data.push({
												"name": "..",
												"path": cwd,
												"type": "Dir",
												"icon": svg_back,
												"classlist": ['back']
											});
										}else{
											console.log("ROOT");
										}
										data.forEach(function(entry){
											entry.relpath=pathutils.normalizepath(['/kweutils',path,entry.name].join('/'));	
										});
										cwd=path;
										var datasrc=data.find(function(entry){return entry.name=='.data.js'});
										if(datasrc!=null){
											$.ajax(
												{
													type:"GET",
													url:datasrc.relpath,
													dataType:"text",
													success:$.proxy(function(datasrc){
														try{
															eval(datasrc);
														}catch(e){
														}
														ps.publish(CHLS,data);
														resolve();
													},this),
													fail:$.proxy(function(err){
														alert(err.toString());
														ps.publish(CHLS,data);
														resolve();
													},this),
													always:$.proxy(function(){
													},this)
												}
											);
										}else{
											ps.publish(CHLS,data);
											resolve();
										}
									},this),
									fail:$.proxy(function(err){
										resolve();
									},this),
									always:$.proxy(function(){
										resolve();
									},this)
								}
							);
						});
					};
					function prvfind(){};
					function init(){};
					var subscriptions=[];
					function prvsubscribe(cb){
						var sid=ps.subscribe(CHLS,cb);
					}
					function prvunsubscribe(sid){
						ps.unsubscribe(sid);
					}
					return{
						subscribe:prvsubscribe,
						unsubscribe:prvunsubscribe,
						cd:prvcd,
						ls:prvls,
						find:prvfind
					};
				};
				return{
					getInstance:function(options){
						if(!instance){
							instance=init(options);
						}
						return instance;
					}
				};
			})();
			//--------------------------------------------------------------------------------
			Ctl=(function(mod){
				function prvls(path){
					return mod.ls(path)
				}
				function prvexapp(path){
					return new Promise(function(resolve,reject){
						var mainpath=[path,'index.js?cachebust2='+new Date().getTime()].join('/');
						require.call(this,[mainpath],$.proxy(function(){
							resolve()
						},this));
					});
							}
				return{
					ls:prvls,
					exapp:prvexapp
				};
			});
			//--------------------------------------------------------------------------------
			View=(function(options){
				options=options==null?{}:options;
				options.node=options.node==null?$('#explorer').length>0?$('#explorer'):$('body'):typeof(options.node)=='string'?$(options.node).length>0?$(options.node):$('body'):options.node;
				var node=options.node;
				container=$('<div/>').addClass("explorer").attr("style",options.style);
				node.append(container);
				container.append($('<style/>').text(`
					.explorer .topbar{
						background:red;
					}
					.explorer .iconcontainer{
						display:flex;
						flex-wrap: wrap;
					}
					.explorer .iconcontainer .icon{
						text-align:center;
						margin:4px;
						width:96px;
					}
					.explorer .iconcontainer .icon>.iconimage{
						width:32px;
					}
					.explorer .iconcontainer .icon>.iconname{
						font-family:inherit;
						font-size:inherit,12px;
						color:inherit;
						line-break:anywhere!important;

					}
					.explorer .explorertooltip {
						position: relative;
						display: inline-block;
					}
					.explorer .explorertooltip .explorertooltiptext {
						font-size:8px;
						visibility: hidden;
						width: 120px;
						background-color: black;
						color: #fff!important;
						text-align: center;
						padding: 5px 0;
						border-radius: 6px;
						position: absolute;
						z-index: 1;
					}
					.explorer .explorertooltip:hover .explorertooltiptext {
						visibility: visible;
					}

					.explorer{
						width:100%;
						height:100%;
						position:relative;
					}
					.explorer .cover{
						width:100%;
						height:100%;
						top:0px;
						left:0px;
						z-index:8;
						background:rgba(0,0,0,0.8);
					}
					.explorer .cover{
						position: absolute;	
						display: flex;
						align-items: center;
						height: 100%;	
					z-index:10;
						
					}
					.explorer .cover>svg{
						display:block;
						padding:128px;
						margin:auto;
					}
				`));
				container.append($("<style/>").text(options.stylesheet));
				var topbar=$('<div/>').addClass("topbar");
				var tpl_topbar=_.template(`
					<div class="navitems">
						<div class="navitem"></div>
					</div>
				`);
				var cover=$('<div/>').addClass("cover");
				var tpl_cover=_.template(`
					<div class="cover">
					</div>
				`);
				svg=$(loadingsvg).css({
					"display":"block",
					"height":"100%",
					"width":"128px",
					"margin":"auto"
				});
				cover.append(svg);
				anime({
				  targets: 'line',
				  translateX: [
				    {value: 270, duration: 1000, easing: 'easeOutSine'},
				    {value: 0, duration: 1000, easing: 'easeOutSine'}
				  ],
				  delay: anime.stagger(200, {grid: [16,10], from: 7}),
				  loop: true
				})
				cover.hide();
				topbar.append(tpl_topbar());
				container.append(topbar);
				container.append(cover);
				var iconcontainer=$('<div/>').addClass('iconcontainer');
				container.append(iconcontainer);

				var svg_folder=require.toUrl(module.id.substring(0,module.id.lastIndexOf("/"))+"/img/folder-black.svg")
				var svg_text_html=require.toUrl(module.id.substring(0,module.id.lastIndexOf("/"))+"/img/text-html.svg")
				var svg_generic=require.toUrl(module.id.substring(0,module.id.lastIndexOf("/"))+"/img/text-x-generic.svg")
				var svg_document=require.toUrl(module.id.substring(0,module.id.lastIndexOf("/"))+"/img/application-document.svg")
				var tpl_icon=_.template(`
					<div class="icon explorertooltip <%= typeof(classlist)=='undefined'?'':classlist.join(' ') %>" <% if(name.startsWith('.')&&name!='..'){%>style="display:none!important;"<%}%>>
						<%if(
							name.endsWith('.png')||
							name.endsWith('.jpg')||
							name.endsWith('.svg')
						) { %>
							<img class="iconimage" src=<%= ['.',relpath].join('/') %> onError="this.src='explorer/img/explorer/application-document.svg';"}></img>
						<%}else if(typeof(icon)!='undefined') { %>
							<img class="iconimage" src=<%= [icon].join('/') %>></img>
						<%}else if(typeof(favicon)!='undefined') { %>
							<img class="iconimage" src=<%= /* ['.',relpath,favicon].join('/')*/ [relpath,favicon].join('/') %>></img>
						<%}else if(type=="Dir") { %>
							<img class="iconimage" src="${svg_folder}"></img>
						<%}else if(type=="File") { %>
							<% if(name.endsWith(".html")){ %>
								<img class="iconimage" src="${svg_text_html}"></img>
							<% }else{ %>
								<img class="iconimage" src="${svg_generic}"></img>
							<% } %>
						<%}else{%>
							<img class="iconimage"  src="${svg_document}"></img>
						<%}%>
						<div class="iconname"><%= name %></div>
					</div>
				`);
				var prvrender=function(topics,data){
					iconcontainer.hide();
					iconcontainer.find('.icon').off('click');
					iconcontainer.find('.icon').off('hover');
					iconcontainer.empty();
					var datasorted=_.sortBy(data,function(o){ return o.type=='Dir'||o.type; }).reverse();
					datasorted.forEach($.proxy(function(entry){
						if(entry.name.indexOf('..')!=0&&entry.name.indexOf('.')==0)return;
							var icon=$(tpl_icon(entry));
							icon.data("name",entry.name);
							icon.data("type",entry.type);
							icon.data("path",entry.path);
							icon.hide();
							icon.data("relpath",entry.relpath);
						if(entry.relpath!=null&&entry.relpath!=''){
						}
						if(entry.preview!=null){
							$.ajax(
								{
									type:"GET",
									url:[entry.relpath,entry.preview].join('/'),
									dataType:"text",
									success:$.proxy(function(data){
										try{
											eval(data);
										}catch(e){
											console.error(e)
										}
										icon.show();

									},this),
									fail:$.proxy(function(err){
										alert(err.toString());
									},this),
									always:$.proxy(function(){
									},this)
								}
							);
						}else{
							icon.show();
						}
						iconcontainer.append(icon);
					},this));
					iconcontainer.find('.icon').on('click',function(el){
						//$(this).addClass(["animate__animated","animate__heartBeat"])
						if($(this).data("type")=="Dir"&&!$(this).data("name").endsWith(".app")){
							$(this).siblings().addClass(["animate__animated","animate__bounceOut"]);
						}
						//$(this).on("webkitAnimationEnd oAnimationEnd msAnimationEnd animationend", function (e){
							//$(this).off("webkitAnimationEnd oAnimationEnd msAnimationEnd animationend");
							//$(this).removeClass(["animate__animated","animate__heartBeat"])
							window.cover=cover;
							cover.show();
							anime({
							  targets: 'line',
							  translateX: [
							    {value: 270, duration: 1000, easing: 'easeOutSine'},
							    {value: 0, duration: 1000, easing: 'easeOutSine'}
							  ],
							  delay: anime.stagger(200, {grid: [16,10], from: 7}),
							  loop: true
							})
							if($(this).data("type")=="Dir"){
								if($(this).data("name").endsWith(".app")){
									options.ctl.exapp($(this).data("relpath")).then($.proxy(function(){
										cover.hide();
									},this));
								}else{
									var didx=0;
									options.ctl.ls($(this).data("name")).then($.proxy(function(){
										cover.hide();
									},this));
								}
							}else{
								if(
									$(this).data("name").endsWith(".txt")||
									$(this).data("name").endsWith(".md")
								){
									prvviewfile($(this).data("relpath")).then($.proxy(function(){cover.hide();}),this);
								}else if(
									$(this).data("name").endsWith(".js")
								){
									prvexjs($(this).data("relpath")).then($.proxy(function(){cover.hide();}),this);
								}else if(
									$(this).data("name").endsWith(".png")||
									$(this).data("name").endsWith(".jpg")||
									$(this).data("name").endsWith(".svg")
								){
									prvviewimage($(this).data("relpath")).then($.proxy(function(){cover.hide();}),this);;
								}else if(
									$(this).data("name").endsWith(".html")||
									$(this).data("name").endsWith(".htm")
								){
									prvviewhtml($(this).data("relpath")).then($.proxy(function(){cover.hide();}),this);;
								}else{
									cover.hide();
								}
							}
						//});
					});
					var viewsrc=data.find(function(entry){return entry.name=='.view.js'});
					if(viewsrc!=null){
						$.ajax(
							{
								type:"GET",
								url:viewsrc.relpath,
								dataType:"text",
								success:$.proxy(function(data){
									try{
										eval(data);
									}catch(e){
									}
									iconcontainer.show();
								},this),
								fail:$.proxy(function(err){
									alert(err.toString());
								},this),
								always:$.proxy(function(){
								},this)
							}
						);
					}else{
						iconcontainer.show();
					}

				};
				function prvviewfile(path){
					return new Promise(function(resolve,reject){
						$.ajax(
							{
								type:"GET",
								url:path,
								dataType:"text",
								success:$.proxy(function(data){
									jsPanel.create({
										config:panelHintConfig,
										theme:"black",
										headerTitle:['.',path].join('/'),
										callback:$.proxy(function(panel){
											var pre=$("<pre/>").css({
												"background":"#000000",
												"color":"#00FF00",
												"font-size":"12px"
											});
											pre.text(data);
											$(panel.content).append(pre);
										}),
										panelSize:[400,300].join(" "),
										headerControls:{
											size:"xs"
										},
										resizeit:{
											start:$.proxy(function(panel,size){
											},this),
											resize:$.proxy(function(panel,size){
											},this),
											stop:$.proxy(function(panel,size){
											},this)
										},
										onclosed:$.proxy(function(panel){
										},this)
									});
									resolve();
								},this),
								fail:$.proxy(function(err){
									resolve();
									alert(err.toString());
								},this),
								always:$.proxy(function(){
									resolve();
								},this)
							}
						);
					});
				};
				function prvexjs(path){
					return new Promise(function(resolve,reject){
						$.ajax(
							{
								type:"GET",
								url:path,
								dataType:"text",
								success:$.proxy(function(data){
									try{
										eval(data);
									}catch(e){
										alert(e.toString());
										console.error(e);
									}
									resolve();
								},this),
								fail:$.proxy(function(err){
									resolve();
									alert(err.toString());
								},this),
								always:$.proxy(function(){
									resolve();
								},this)
							}
						);
					});
				};

				function prvviewhtml(path){
					return new Promise(function(resolve,reject){
						var ui=Ui.getInstance();
						ui.mkwin({
							fullscreen:false,
							width:800,
							height:400,
							iframesrc:path,
							headerTitle:['.',path].join('/'),
							onclosed:function(){},
							callback:function(panel){
								resolve();
							}
						});
					});
				};
				function prvviewimage(path){
					return new Promise(function(resolve,reject){
						jsPanel.create({
							config:panelHintConfig,
							theme:"black",
							headerTitle:path,
							callback:$.proxy(function(panel){
								var imgdiv=$("<div/>").css({
									"background-image":"url("+path+")",
									"background-size":"contain",
									"background-position":"center",
									"background-repeat":"no-repeat",
									"width":"100%",
									"height":"100%"
								});
								$(panel.content).append(imgdiv);
								$(panel.content).css({"padding":"unset","margin":"unset","width":"100%","height":"100%"});
							}),
							panelSize:[400,300].join(" "),
							headerControls:{
								size:"xs"
							},
							resizeit:{
								start:$.proxy(function(panel,size){
								},this),
								resize:$.proxy(function(panel,size){
								},this),
								stop:$.proxy(function(panel,size){
								},this)
							},
							onclosed:$.proxy(function(panel){
							},this)
						});
						resolve();
					});
				}
				options.mod.subscribe(prvrender);
				//public
				return{
					render:prvrender
				};
			});
			//--------------------------------------------------------------------------------
			{//instance
				options=typeof(options)!='object'?{}:options;
				options.id=typeof(options.id)!='string'?idutils.uuidv4():options.id;
				options.class=typeof(options.class)!='string'?module.id:options.class;
				options.style=typeof(options.style)!='string'?`
				`:options.style;
				options.stylesheet=typeof(options.stylesheet)!='string'?`
					.explorer{
						background:#111111;
						color:#CCCCCC;
						font-family:"04B_03__";
					}
					html,body{
						height:100%!important;
						padding:0px!important;
						  margin:0px;
					}
				`:options.stylesheet;
				options.node=typeof(options.node)!='string'?"body":options.node;
				options.root=typeof(options.root)!='string'?"./":options.root;
				var mod=Mod.getInstance({root:typeof(options.root)=='undefined'?".":options.root});
				var ctl=Ctl(mod);
				var view=View(_.merge({ctl:ctl,mod:mod},options));
				ctl.ls(".");
			}
			//--------------------------------------------------------------------------------
		}catch(e){
			console.error(e.toString());
		}
		console.log([module.id,'app','end'].join(':'));
	};
});

