//JavaScript plugin for playing sounds on user actions and page events.
//https://github.com/IonDen/ion.sound
//http://ionden.com/a/plugins/ion.sound/en.html
//http://ionden.com/a/plugins/ion.sound/demo_advanced.html
define([
	"module",
	"jquery",
	"ion.sound",
],function(
	module,
	jq,
	ion
){
	console.log([module.id,'start'].join(':'));
	console.log(ion.sound);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
	`));
	{//demo
		var style=$("<style/>").text(`
			.demo {
			  position: relative;
			  margin-bottom: 20px;
			  overflow: hidden;
			}
			.key {
			  position: absolute;
			  display: block;
			  bottom: 2px;
			  right: 2px;
			  text-decoration: none;
			  color: #fff;
			  border: 1px solid #fff;
			  border-bottom-width: 2px;
			  width: 14px;
			  padding: 1px 0;
			  text-align: center;
			  border-radius: 2px;
			  font-size: 10px;
			}
			.key.key_state_active {
			  border-width: 1px;
			  border-top-width: 2px;
			  border-color: #000;
			  color: #000;
			  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.8);
			}
			.key:before, .key:after {
				display: none;
			}

			.dm {
				position: relative;
				margin: 0 0 15px;
			}
				.dm__left {
					position: relative;
					float: left;
					width: 60%;
				}
				.dm__right {
					position: relative;
					float: right;
					padding: 15px 0 0;
					width: 40%;
				}

			.demo .button {
				display: block;
				float: left;
				margin: 0 10px 10px 0;
				width: 130px;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.is-demo {
				position: relative;
				overflow: hidden;
				border-top: 1px solid #ccc;
				padding: 5px 0;
		}
			.is-demo__info {
				position: relative;
				float: right;
				padding: 3px 0 0;
			}
			.is-demo__info b, .is-demo__ended {
				display: inline-block;
				margin-right: 20px;
			}
			.is-demo__loaded, .is-demo__ended {
				position: relative;
				display: inline-block;
				width: 10px; height: 10px;
				border: 2px solid #900;
				background: #fff;
				border-radius: 50%;
				vertical-align: top;
				margin-top: 3px;
			}
			.loaded .is-demo__loaded {
				border: 2px solid #030;
				background: #008000;
			}
			.ended .is-demo__ended {
				border: 2px solid #030;
				background: #008000;
			}
			.is-demo__extra {
				position: relative;
				display: block;
				padding: 3px 0 0;
			}
			button,
			input,
			optgroup,
			select,
			textarea {
				color:inherit;
				font:inherit;
				margin:0
			}
			button {
				overflow:visible
			}
			button,
			select {
				text-transform:none
			}
			button,
			html input[type="button"],
			input[type="reset"],
			input[type="submit"] {
				-webkit-appearance:button;
				cursor:pointer
			}
			button[disabled],
			html input[disabled] {
				cursor:default
			}
			button::-moz-focus-inner,
			input::-moz-focus-inner {
				border:0;
				padding:0
			}
			input {
				line-height:normal
			}
			input[type="checkbox"],
			input[type="radio"] {
				box-sizing:border-box;
				padding:0
			}
			input[type="number"]::-webkit-inner-spin-button,
			input[type="number"]::-webkit-outer-spin-button {
				height:auto
			}
			input[type="search"] {
				-webkit-appearance:textfield;
				-moz-box-sizing:content-box;
				-webkit-box-sizing:content-box;
				box-sizing:content-box
			}
			input[type="search"]::-webkit-search-cancel-button,
			input[type="search"]::-webkit-search-decoration {
				-webkit-appearance:none
			}
			fieldset {
				border:1px solid #c0c0c0;
				margin:0 2px;
				padding:.35em .625em .75em
			}
			legend {
				border:0;
				padding:0
			}
			textarea {
				overflow:auto
			}
			optgroup {
				font-weight:bold
			}
			table {
				border-collapse:collapse;
				border-spacing:0
			}
			td,
			th {
				padding:0
			}
			.font {
				font-size:12px;
				line-height:1.9;
				font-family:"Trebuchet MS",Arial,sans-serif
			}
			html {
				height:100%;
				overflow-y:scroll
			}
			body {
				height:100%;
				font-size:12px;
				line-height:1.9;
				font-family:"Trebuchet MS",Arial,sans-serif;
				color:#67767d
			}
			::-moz-selection {
				background:#000;
				color:#fff;
				text-shadow:none
			}
			::selection {
				background:#000;
				color:#fff;
				text-shadow:none
			}
			img {
				vertical-align:middle
			}
			a {
				outline:0;
				color:#cf5241;
				text-decoration:none
			}
			a:focus {
				outline:0
			}
			a:hover {
				text-decoration:underline
			}
			h1,
			h2,
			h3,
			h4,
			h5,
			h6 {
				font-size:12px;
				line-height:1.9;
				font-family:"Trebuchet MS",Arial,sans-serif;
				line-height:1.2;
				color:#3f3f3f;
				margin:25px 0 10px;
				font-weight:normal
			}
			h1 {
				font-size:20px
			}
			h2 {
				font-size:20px
			}
			h3 {
				font-size:16px
			}
			h4 {
				font-size:14px;
				margin-bottom:20px
			}
			h5 {
				font-size:12px
			}
			h6 {
				font-size:10px
			}
			p {
				margin:10px 0 25px
			}
			table {
				border-spacing:0;
				border-collapse:collapse;
				font-size:12px;
				line-height:1.9;
				font-family:"Trebuchet MS",Arial,sans-serif
			}
			table tr,
			table td {
				vertical-align:middle;
				padding:0;
				text-align:left;
				font-size:12px;
				line-height:1.9;
				font-family:"Trebuchet MS",Arial,sans-serif
			}
			ul {
				margin:10px 0 25px;
				padding:0;
				list-style-type:none
			}
			ul li {
				margin:0 0 1px;
				padding:0 0 0 15px;
				background:url(_common/list.png) no-repeat 0 5px
			}
			blockquote {
				position:relative;
				margin:0 0 20px;
				padding:20px;
				background:#eee;
				border-left:2px solid #c00
			}
			blockquote .button {
				margin-top:7px
			}
			.ya-site-suggest-items li {
				background:none
			}
			.ir {
				background-color:transparent;
				border:0;
				overflow:hidden;
				*text-indent:-9999px
			}
			.ir:before {
				content:"";
				display:block;
				width:0;
				height:100%
			}
			.hidden {
				display:none !important;
				visibility:hidden
			}
			.visuallyhidden {
				border:0;
				clip:rect(0 0 0 0);
				height:1px;
				margin:-1px;
				overflow:hidden;
				padding:0;
				position:absolute;
				width:1px
			}
			.visuallyhidden.focusable:active,
			.visuallyhidden.focusable:focus {
				clip:auto;
				height:auto;
				margin:0;
				overflow:visible;
				position:static;
				width:auto
			}
			.invisible {
				visibility:hidden
			}
			.clearfix:before,
			.clearfix:after {
				content:" ";
				display:table
			}
			.clearfix:after {
				clear:both
			}
			.clearfix {
				*zoom:1
			}
			.button {
				position:relative;
				display:inline-block;
				cursor:pointer;
				border:1px solid #9f4c2a;
				height:30px;
				padding:0 15px;
				font-size:13px;
				line-height:30px;
				vertical-align:top;
				background:#cd503f url(/a/plugins/static/bem/blocks/buttons/bg-button.png) repeat-x 0 0;
				color:#fff;
				text-shadow:-1px -1px 0 rgba(0,0,0,0.3);
				outline:none;
				border-radius:5px;
				-moz-border-radius:5px;
				-webkit-border-radius:5px
			}
			.button:hover {
				background-color:#dc6352;
				background-position:0 100%;
				color:#fff;
				text-decoration:none
			}
			.button:active {
				box-shadow:inset 0 3px 10px rgba(0,0,0,0.5);
				-moz-box-shadow:inset 0 3px 10px rgba(0,0,0,0.5);
				-webkit-box-shadow:inset 0 3px 10px rgba(0,0,0,0.5)
			}
			.button_type_sound {
				height:auto;
				text-align:left;
				padding:5px 5px;
				font-size:11px;
				line-height:12px
			}
			.button_is_new:after {
				position:absolute;
				display:block;
				content:"new";
				background:#333;
				color:#fff;
				font-size:9px;
				line-height:12px;
				top:-3px;
				right:-3px;
				padding:1px 3px;
				border-radius:3px;
				-moz-border-radius:3px;
				-webkit-border-radius:3px
			}
			.button span {
				display:block;
				padding:3px 0 1px 14px;
				font-size:9px;
				line-height:10px
			}
			.catalog {
				position:relative
			}
			.catalog__item {
				position:relative;
				float:left;
				width:48%
			}
			.catalog__item+.catalog__item {
				float:right
			}
			.catalog__item p {
				margin:0
			}
			.catalog__title {
				margin:0;
				font-size:16px;
				background:url(_common/list.png) no-repeat 0 10px;
				padding:0 0 0 15px
			}
			.catalog__title a {
				color:#3f3f3f
			}
			.catalog__image {
				position:relative;
				display:block;
				border:1px solid #d4d4d4;
				padding:5px;
				margin:0 0 15px;
				background:#fff;
				border-radius:2px;
				-moz-border-radius:2px;
				-webkit-border-radius:2px;
				box-shadow:0 0 2px rgba(0,0,0,0.2);
				-moz-box-shadow:0 0 2px rgba(0,0,0,0.2);
				-webkit-box-shadow:0 0 2px rgba(0,0,0,0.2)
			}
			.catalog__image:hover {
				border-color:#cf5241
			}
			.catalog__image span {
				display:block;
				height:116px;
				background-color:#3f3f3f;
				background-position:50% 50%;
				background-repeat:no-repeat
			}
			.lt-ie8 .catalog__image {
				zoom:1
			}
			.cols {
				position:relative
			}
			.cols.type_table {
				display:table;
				width:100%
			}
			.cols__item {
				position:relative;
				float:left
			}
			.cols__item_type_side {
				width:210px;
				padding-top:70px
			}
			.cols__item_type_main {
				width:560px
			}
			.cols__item_type_big {
				width:770px
			}
			.cols__item_type_single {
				float:none;
				width:auto
			}
			.cols__item-content {
				position:relative;
				width:160px;
				margin:0 auto
			}
			.cols__cell {
				position:relative;
				display:table-cell;
				vertical-align:top
			}
			.cols__cell.type_side {
				width:210px;
				padding-top:70px
			}
			.contacts {
				position:relative
			}
			.contacts__item {
				position:relative;
				display:block;
				padding:0 0 0 25px;
				margin:0 0 10px
			}
			.contacts__item.contacts__item_type_github {
				background:url(/a/plugins/static/bem/blocks/contacts/ico-github.png) no-repeat 0 0
			}
			.contacts__item.contacts__item_type_facebook {
				background:url(/a/plugins/static/bem/blocks/contacts/ico-facebook.png) no-repeat 0 0
			}
			.contacts__item.contacts__item_type_email {
				background:url(/a/plugins/static/bem/blocks/contacts/ico-email.png) no-repeat 0 0
			}
			.lt-ie8 .contacts__item {
				zoom:1
			}
			.demo-big {
				position:relative;
				display:table;
				width:100%;
				margin-bottom:20px
			}
			.demo-big__code {
				position:relative;
				display:table-cell;
				vertical-align:top;
				width:35%;
				min-width:290px
			}
			.demo-big__code pre {
				margin:0;
				min-height:60px
			}
			.demo-big__example {
				position:relative;
				display:table-cell;
				vertical-align:top;
				padding:0 20px 10px 30px
			}
			.demo-big__note {
				position:relative;
				padding:0 0 15px
			}
			.demo-big__extra {
				position:relative;
				margin:20px 0 0;
				padding:20px 0 0;
				border-top:1px solid #ccc;
				overflow:hidden
			}
			.demo-big__reaction {
				display:block;
				float:left;
				margin:0 10px 10px 0;
				width:100px;
				padding:20px 0;
				text-align:center;
				background:#fff;
				border:1px solid green;
				-webkit-transition:all 100ms cubic-bezier(.6, .04, .98, .335);
				-moz-transition:all 100ms cubic-bezier(.6, .04, .98, .335);
				-o-transition:all 100ms cubic-bezier(.6, .04, .98, .335);
				transition:all 100ms cubic-bezier(.6, .04, .98, .335);
				-webkit-transition-timing-function:cubic-bezier(.6, .04, .98, .335);
				-moz-transition-timing-function:cubic-bezier(.6, .04, .98, .335);
				-o-transition-timing-function:cubic-bezier(.6, .04, .98, .335);
				transition-timing-function:cubic-bezier(.6, .04, .98, .335)
			}
			.demo-big__reaction.active {
				background:green;
				color:#fff
			}
			.demo-first {
				position:relative;
				height:90px
			}
			.demo-first input {
				position:relative;
				z-index:-9999
			}
			.patreon {
				display:block;
				box-sizing:border-box;
				width:150px;
				border:1px solid #999;
				border-bottom-color:#666;
				color:#333;
				border-radius:3px;
				padding:5px;
				background:linear-gradient(to bottom, #fff 0, #ddd 100%);
				font-size:20px;
				line-height:24px;
				text-decoration:none;
				margin-top:10px;
				text-align:center;
				box-shadow:0 1px 2px rgba(0,0,0,0.2)
			}
			.patreon b {
				color:#9f4c2a
			}
			.patreon:hover {
				text-decoration:none
			}
			.bitcoin {
				position:relative;
				box-sizing:border-box;
				width:150px;
				border:1px solid #999;
				border-top-color:#666;
				border-bottom-color:#eee;
				background:linear-gradient(to top, #fff 0, #ddd 100%);
				margin-top:10px;
				border-radius:3px;
				text-align:center;
				font-size:18px;
				line-height:1.1;
				padding:5px;
				cursor:default;
				color:#333;
				box-shadow:inset 0 1px 2px rgba(0,0,0,0.2)
			}
			.bitcoin b {
				display:block;
				font-size:12px;
				word-break:break-all;
				font-weight:normal;
				cursor:text;
				padding-top:5px
			}
			.donate {
				padding-bottom:20px
			}
			.donate a,
			.donate div {
				display:inline-block;
				vertical-align:top;
				margin-top:0;
				margin-right:5px
			}
			.donate .bitcoin {
				width:310px;
				font-size:14px;
				padding:8px 8px 9px
			}
			.donate .bitcoin b {
				display:inline-block;
				margin-left:5px
			}
			.title {
				position:relative;
				margin:0 0 20px;
				background:url(blocks/elements/bg-line.png) repeat-x 0 11px
			}
			.title h1,
			.title h2 {
				display:inline-block;
				margin:0;
				padding:0 20px 2px 0;
				background:#fff
			}
			.title.type_group {
				margin:40px 0 20px
			}
			.title__star {
				position:absolute;
				top:-7px;
				right:-20px;
				background:#fff;
				padding:5px 0 5px 15px;
				z-index:2
			}
			.lt-ie8 .title h1 {
				display:inline
			}
			.line {
				position:relative;
				height:6px;
				overflow:hidden;
				background:url(blocks/elements/bg-line.png) repeat-x;
				margin:20px 0
			}
			.download {
				margin:0 0 25px
			}
			.try-resize {
				position:relative;
				float:right;
				font-size:25px;
				font-family:"Courier New",Courier,monospace
			}
			.footer {
				position:relative;
				margin:-110px 0 0;
				cursor:default
			}
			.footer__layout {
				position:relative;
				width:980px;
				height:110px;
				margin:0 auto
			}
			.footer__spacer {
				position:relative;
				height:110px
			}
			.footer__info {
				position:relative;
				text-align:center;
				padding-top:30px
			}
			.footer__item {
				display:inline-block;
				margin:0 10px
			}
			.footer__item.footer__item_color_black {
				color:#3f3f3f
			}
			.footer__donate {
				position:relative;
				padding-top:10px
			}
			.footer__donate-paypal {
				vertical-align:top;
				display:inline-block;
				padding:4px 0 0 5px
			}
			.footer__donate-yandex {
				vertical-align:top;
				display:inline-block
			}
			.header {
				position:relative;
				width:980px;
				height:68px;
				margin:0 auto;
				color:#bebebe
			}
			.header__logo {
				position:absolute;
				display:block;
				top:0;
				left:15px;
				width:208px;
				height:65px;
				background:url(blocks/header/logo.png) no-repeat
			}
			.header__button {
				position:relative;
				float:right;
				padding:17px 25px 0 25px
			}
			.lang {
				position:absolute;
				top:10px;
				right:25px
			}
			.lang__item {
				display:block;
				float:left;
				padding:3px 15px;
				border:1px solid #999;
				margin-left:-1px;
				color:#67767d;
				border-radius:7px 0 0 7px;
				background:#fff;
				box-shadow:inset 0 -2px 2px rgba(0,0,0,0.2);
				-moz-box-shadow:inset 0 -2px 2px rgba(0,0,0,0.2);
				-webkit-box-shadow:inset 0 -2px 2px rgba(0,0,0,0.2)
			}
			.lang__item+.lang__item {
				border-radius:0 7px 7px 0
			}
			.lang__item.lang__item_state_active {
				background:none;
				color:#9c9c9c;
				box-shadow:inset 0 3px 10px rgba(0,0,0,0.5);
				-moz-box-shadow:inset 0 3px 10px rgba(0,0,0,0.5);
				-webkit-box-shadow:inset 0 3px 10px rgba(0,0,0,0.5)
			}
			.lang__item.lang__item_state_active:hover {
				color:#9c9c9c
			}
			.lang__item:hover {
				color:#cf5241;
				text-decoration:none
			}
			.menu {
				position:relative;
				float:right;
				padding:15px 10px 0 0;
				font-size:14px;
				font-weight:bold
			}
			.menu__item {
				position:relative;
				display:block;
				float:left;
				padding:5px 15px;
				color:#bebebe
			}
			.menu__item:hover,
			.menu__item.menu__item_state_active {
				color:#fff
			}
			.news {
				position:relative
			}
			.news__item {
				position:relative;
				margin:20px 0
			}
			.news__item:last-child {
				margin-bottom:0
			}
			.news__item p {
				margin:0
			}
			.news__title {
				margin:0;
				font-size:16px
			}
			.news__title a {
				color:#3f3f3f
			}
			.news__info {
				position:relative;
				color:#9c9c9c;
				margin:0 0 10px
			}
			.news__author {
				position:relative;
				display:inline-block;
				vertical-align:top;
				margin-right:20px;
				padding:1px 0 1px 21px;
				background:url(/a/plugins/static/bem/blocks/news/ico-pen.png) no-repeat 0 4px
			}
			.news__date {
				position:relative;
				display:inline-block;
				vertical-align:top;
				padding:1px 0 1px 23px;
				background:url(/a/plugins/static/bem/blocks/news/ico-calendar.png) no-repeat 0 3px
			}
			.news__image {
				position:relative;
				display:block;
				border:1px solid #d4d4d4;
				padding:5px;
				margin:0 0 15px;
				background:#fff;
				border-radius:2px;
				-moz-border-radius:2px;
				-webkit-border-radius:2px;
				box-shadow:0 0 2px rgba(0,0,0,0.2);
				-moz-box-shadow:0 0 2px rgba(0,0,0,0.2);
				-webkit-box-shadow:0 0 2px rgba(0,0,0,0.2)
			}
			.news__image:hover {
				border-color:#cf5241
			}
			.news__image img {
				display:block;
				width:100%
			}
			.lt-ie8 .news__image {
				zoom:1
			}
			.options {
				width:100%;
				margin:0 0 25px
			}
			.options th {
				border:1px solid #e8e8e8;
				white-space:nowrap;
				background:#f7f7f7;
				box-shadow:inset 0 15px 30px rgba(255,255,255,0.9);
				padding:13px 15px;
				color:#b3b3b3;
				text-shadow:1px 1px 0 rgba(255,255,255,0.5);
				text-align:center
			}
			.options th+th+th+th {
				text-align:left
			}
			.options td {
				border:1px solid #e8e8e8;
				padding:10px 15px;
				text-align:center;
				color:#9c9c9c
			}
			.options tr td:first-child {
				white-space:nowrap;
				color:#67767d
			}
			.options tr td:first-child div {
				color:#9c9c9c;
				font-size:9px
			}
			.options td+td+td+td {
				text-align:left;
				color:#67767d
			}
			.options__step td {
				border-bottom:3px solid #ccc
			}
			.options__new td:first-child {
				background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmY0NzQ3IiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iMyUiIHN0b3AtY29sb3I9IiNmZjYwNjAiIHN0b3Atb3BhY2l0eT0iMSIvPgogICAgPHN0b3Agb2Zmc2V0PSIzJSIgc3RvcC1jb2xvcj0iI2ZmNjA2MCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjMlIiBzdG9wLWNvbG9yPSIjZmZmZmZmIiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iMyUiIHN0b3AtY29sb3I9IiNmZmZmZmYiIHN0b3Atb3BhY2l0eT0iMSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmZmZmZmIiBzdG9wLW9wYWNpdHk9IjEiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjZ3JhZC11Y2dnLWdlbmVyYXRlZCkiIC8+Cjwvc3ZnPg==);
				background:-moz-linear-gradient(-45deg, #ff4747 0, #ff6060 3%, #ff6060 3%, #fff 3%, #fff 3%, #fff 100%);
				background:-webkit-gradient(linear, left top, right bottom, color-stop(0, #ff4747), color-stop(3%, #ff6060), color-stop(3%, #ff6060), color-stop(3%, #fff), color-stop(3%, #fff), color-stop(100%, #fff));
				background:-webkit-linear-gradient(-45deg, #ff4747 0, #ff6060 3%, #ff6060 3%, #fff 3%, #fff 3%, #fff 100%);
				background:-o-linear-gradient(-45deg, #ff4747 0, #ff6060 3%, #ff6060 3%, #fff 3%, #fff 3%, #fff 100%);
				background:-ms-linear-gradient(-45deg, #ff4747 0, #ff6060 3%, #ff6060 3%, #fff 3%, #fff 3%, #fff 100%);
				background:linear-gradient(135deg, #ff4747 0, #ff6060 3%, #ff6060 3%, #fff 3%, #fff 3%, #fff 100%)
			}
			.panel {
				position:relative;
				background:rgba(255,255,255,0.35);
				padding:6px;
				border-radius:10px;
				-moz-border-radius:10px;
				-webkit-border-radius:10px
			}
			.lt-ie9 .panel {
				background:url(/a/plugins/static/bem/blocks/panel/bg-panel.png)
			}
			.panel__layout {
				position:relative;
				background:#fff;
				padding:20px 25px;
				border-radius:4px;
				-moz-border-radius:4px;
				-webkit-border-radius:4px;
				min-height:900px
			}
			.cols__item_type_single .panel__layout {
				min-height:450px
			}
			.lt-ie8 .panel__layout {
				zoom:1
			}
			.panel-banner {
				position:relative;
				margin:-5px auto 20px;
				height:90px
			}
			.panel-banner__cont {
				position:absolute;
				top:0;
				left:50%;
				margin-left:-364px;
				width:728px;
				height:90px;
				background:rgba(0,0,0,0.2)
			}
			code {
				font-size:12px;
				font-family:"Lucida Console","Courier New",monospace;
				display:inline-block;
				background:#171929;
				background:#555 url(/a/plugins/static/bem/blocks/prettify/bg-prettify.png) repeat 50% 50%;
				padding:1px 5px 1px 7px;
				color:#ff0;
				border-radius:2px;
				box-shadow:inset 0 0 10px rgba(0,0,0,0.7)
			}
			pre {
				font-size:12px;
				line-height:130%;
				font-family:"Lucida Console","Courier New",monospace;
				margin:-15px 0 25px;
				background:#171929;
				background:#555 url(/a/plugins/static/bem/blocks/prettify/bg-prettify.png) repeat 50% 50%;
				padding:10px 15px;
				overflow-x:auto;
				color:#fff;
				border-radius:2px;
				box-shadow:inset 0 0 10px rgba(0,0,0,0.7)
			}
			.lt-ie9 pre {
				border:1px solid #000
			}
			.share {
				position:relative;
				overflow:hidden
			}
			.share__all {
				position:relative;
				float:left;
				margin-right:15px
			}
			.share__git {
				position:relative;
				float:left;
				padding:4px 0 0
			}
			.side {
				position:relative;
				padding:25px 0
			}
			.side.side_scheme_dark {
				height:185px;
				overflow:hidden;
				color:#8b949d
			}
			.side.side_scheme_dark h3 {
				color:#bebebe;
				text-shadow:1px 1px 0 rgba(0,0,0,0.5)
			}
			.side h3 {
				margin:0 0 15px;
				font-size:16px;
				font-weight:bold;
				text-shadow:1px 1px 0 rgba(255,255,255,0.5)
			}
			.side p {
				margin:0
			}
			.side__share {
				position:relative;
				padding:8px 10px;
				background:#f4f4f4;
				border-top:1px solid #adbac1;
				border-bottom:1px solid #fff;
				border-radius:5px;
				-moz-border-radius:5px;
				-webkit-border-radius:5px;
				padding:2px 0 3px 2px;
				overflow:hidden
			}
			.skins {
				position:relative;
				overflow:hidden;
				margin:0 0 20px;
				padding:0 0 0 1px
			}
			.skins span {
				display:block;
				float:left;
				padding:13px 25px;
				cursor:pointer;
				border:1px solid #e8e8e8;
				background:#f7f7f7;
				box-shadow:inset 0 15px 30px rgba(255,255,255,0.9);
				margin-left:-1px
			}
			.skins span:first-child {
				border-radius:10px 0 0 10px
			}
			.skins span:last-child {
				border-radius:0 10px 10px 0
			}
			.skins span.on {
				background:#fff;
				box-shadow:inset 0 5px 10px rgba(0,0,0,0.3);
				color:#000
			}
			.slogan {
				position:relative;
				height:200px
			}
			.slogan-logo {
				position:relative;
				height:80px;
				padding-top:25px
			}
			.slogan-logo img {
				display:block;
				margin:0 auto
			}
			.type_demo .slogan-logo {
				padding-top:15px;
				height:40px
			}
			.type_demo .slogan-logo img {
				height:40px
			}
			.slogan h1 {
				margin:0;
				padding-top:10px;
				text-align:center;
				text-shadow:1px 1px 0 rgba(255,255,255,0.9);
				font-size:20px
			}
			.type_demo .slogan h1 {
				padding-top:0
			}
			.slogan h1.slogan-single {
				padding-top:70px;
				font-size:25px
			}
			.slogan__banner {
				position:relative;
				margin:15px auto 0;
				width:728px;
				height:90px;
				background:rgba(0,0,0,0.2)
			}
			.search {
				position:absolute;
				top:15px;
				left:20px;
				width:250px
			}
			.switch {
				position:relative;
				overflow:hidden;
				margin:0 0 30px;
				padding:0 0 0 1px
			}
			.switch.type_big {
				font-size:18px
			}
			.switch__item {
				display:block;
				float:left;
				padding:13px 25px;
				cursor:pointer;
				border:1px solid #e8e8e8;
				background:#f7f7f7;
				box-shadow:inset 0 15px 30px rgba(255,255,255,0.9);
				margin-left:-1px
			}
			.switch__item:first-child {
				border-radius:10px 0 0 10px
			}
			.switch__item:last-child {
				border-radius:0 10px 10px 0
			}
			.switch__item.state_active {
				background:#fff;
				box-shadow:inset 0 5px 10px rgba(0,0,0,0.3);
				color:#000
			}
			.twitter {
				position:relative
			}
			.twitter__window {
				position:relative;
				padding:8px 10px;
				background:#f4f4f4;
				border-top:1px solid #adbac1;
				border-bottom:1px solid #fff;
				border-radius:5px;
				-moz-border-radius:5px;
				-webkit-border-radius:5px
			}
			.twitter__ug {
				position:relative;
				margin:-1px auto 10px;
				width:24px;
				height:14px;
				background:url(/a/plugins/static/bem/blocks/twitter/ug.png) no-repeat
			}
			.twitter__link {
				position:relative;
				display:block;
				text-align:center;
				padding:35px 0 0;
				font-size:14px;
				font-weight:bold;
				background:url(/a/plugins/static/bem/blocks/twitter/ico-twitter.png) no-repeat 50% 0
			}
			.lt-ie8 .twitter__link {
				zoom:1
			}
			.useful {
				position:relative
			}
			.useful__item {
				position:relative;
				background:url(/a/plugins/static/bem/blocks/elements/bg-line.png) repeat-x 0 100%;
				padding-bottom:20px;
				margin-bottom:14px
			}
			.useful__item:last-child {
				margin-bottom:0
			}
			.useful__title {
				position:relative;
				padding:0 0 0 15px;
				font-size:16px;
				background:url(_common/list.png) no-repeat 0 10px
			}
			.useful__text {
				padding:0 0 0 15px
			}
			.wrapper {
				position:relative;
				min-height:100%;
				background:#cbd4da url(blocks/wrapper/bg.png) repeat 50% 50%;
				cursor:default
			}
			.wrapper__line {
				position:absolute;
				top:338px;
				left:0;
				width:100%;
				height:235px;
				background:#414a54 url(blocks/wrapper/bg-grey.png) repeat-x 50% 0;
				z-index:1
			}
			.wrapper__top {
				position:relative;
				height:68px;
				background:#414a54 url(blocks/wrapper/bg-grey.png) repeat-x 50% 100%;
				z-index:2
			}
			.wrapper__layout {
				position:relative;
				width:980px;
				margin:0 auto;
				z-index:2
			}
			.wrapper__flex {
				position:relative;
				width:94%;
				min-width:980px;
				margin:0 auto;
				z-index:2
			}

		`);
		$("body").append(style);
		var el=$(`
			<div class="demo">
				<button class="button button_type_sound" id="b01">► Beer Can<span>beer_can_opening</span><q class="key" id="key_q">Q</q></button>
				<button class="button button_type_sound" id="b02">► Bell Ring<span>bell_ring</span><q class="key" id="key_w">W</q></button>
				<button class="button button_type_sound" id="b03">► Branch Break<span>branch_break</span><q class="key" id="key_e">E</q></button>
				<button class="button button_type_sound" id="b04">► Button Click<span>button_click</span><q class="key" id="key_r">R</q></button>
				<button class="button button_type_sound" id="b05">► Keyboard Click<span>button_click_on</span><q class="key" id="key_t">T</q></button>
				<button class="button button_type_sound" id="b06">► Big button<span>button_push</span><q class="key" id="key_y">Y</q></button>
				<button class="button button_type_sound" id="b07">► Tiny Button<span>button_tiny</span><q class="key" id="key_u">U</q></button>
				<button class="button button_type_sound" id="b-camera-1">► Camera Flashing<span>camera_flashing</span><q class="key" id="key_i">I</q></button>
				<button class="button button_type_sound" id="b-camera-2">► Camera Flashing 2<span>camera_flashing_2</span><q class="key" id="key_o">O</q></button>
				<button class="button button_type_sound" id="b-cdtray">► CD Tray<span>cd_tray</span><q class="key" id="key_p">P</q></button>
				<button class="button button_type_sound" id="b10">► Computer Error<span>computer_error</span><q class="key" id="key_a">A</q></button>
				<button class="button button_type_sound" id="b11">► Door Bell<span>door_bell</span><q class="key" id="key_s">S</q></button>
				<button class="button button_type_sound" id="b-door">► Door Bump<span>door_bump</span><q class="key" id="key_d">D</q></button>
				<button class="button button_type_sound" id="b-glass">► Glass<span>glass</span><q class="key" id="key_f">F</q></button>
				<button class="button button_type_sound" id="b-keyboard">► Keyboard Desk<span>keyboard_desk</span><q class="key" id="key_g">G</q></button>
				<button class="button button_type_sound" id="b12">► Light Bulb Breaking<span>light_bulb_breaking</span><q class="key" id="key_h">H</q></button>
				<button class="button button_type_sound" id="b-metal-1">► Metal Plate<span>metal_plate</span><q class="key" id="key_j">J</q></button>
				<button class="button button_type_sound" id="b-metal-2">► Metal Plate 2<span>metal_plate_2</span><q class="key" id="key_k">K</q></button>
				<button class="button button_type_sound" id="b14">► Pop Cork<span>pop_cork</span><q class="key" id="key_l">L</q></button>
				<button class="button button_type_sound" id="b-snap">► Snap<span>snap</span><q class="key" id="key_z">Z</q></button>
				<button class="button button_type_sound" id="b-staple">► Staple Gun<span>staple_gun</span><q class="key" id="key_x">X</q></button>
				<button class="button button_type_sound" id="b-tap">► Tap<span>tap</span><q class="key" id="key_c">C</q></button>
				<button class="button button_type_sound" id="b-water-1">► Water Droplet 1<span>water_droplet</span><q class="key" id="key_v">V</q></button>
				<button class="button button_type_sound" id="b-water-2">► Water Droplet 2<span>water_droplet_2</span><q class="key" id="key_b">B</q></button>
				<button class="button button_type_sound" id="b-water-3">► Water Droplet 3<span>water_droplet_3</span><q class="key" id="key_n">N</q></button>
			</div>
		`);
		/**
		 * main_demo.js
		 * © 2015 Denis Ineshin | IonDen.com
		 */

		$(function () {
			"use strict";

			ion.sound({
				sounds: [
					{
						alias: "beer",
						name: "beer_can_opening",
						volume: 0.9,
						preload: false
					},
					{
						name: "bell_ring",
						volume: 0.2
					},
					{name: "branch_break", volume: 0.3},
					{name: "button_click"},
					{name: "button_click_on"},
					{name: "button_push"},
					{name: "button_tiny", volume: 0.6},
					{name: "camera_flashing"},
					{name: "camera_flashing_2"},
					{name: "cd_tray"},
					{name: "computer_error"},
					{name: "door_bell"},
					{name: "door_bump", volume: 0.3},
					{name: "glass"},
					{name: "keyboard_desk"},
					{name: "light_bulb_breaking", volume: 0.2},
					{name: "metal_plate"},
					{name: "metal_plate_2"},
					{name: "pop_cork"},
					{name: "snap"},
					{name: "staple_gun"},
					{name: "tap"},
					{name: "water_droplet"},
					{name: "water_droplet_2"},
					{name: "water_droplet_3"}
				],
				path: "./lib/data/sound/",
				preload: true,
				multiplay: true
			});

			$("#b01").on("click", function () {
				ion.sound.play("beer");
			});
			$("#b02").on("click", function () {
				$.ionSound.play("bell_ring");
			});
			$("#b03").on("click", function () {
				ion.sound.play("branch_break");
			});
			$("#b04").on("click", function () {
				ion.sound.play("button_click");
			});
			$("#b05").on("click", function () {
				ion.sound.play("button_click_on");
			});
			$("#b06").on("click", function () {
				ion.sound.play("button_push");
			});
			$("#b07").on("click", function () {
				ion.sound.play("button_tiny");
			});
			$("#b-camera-1").on("click", function () {
				ion.sound.play("camera_flashing");
			});
			$("#b-camera-2").on("click", function () {
				ion.sound.play("camera_flashing_2");
			});
			$("#b-cdtray").on("click", function () {
				ion.sound.play("cd_tray");
			});
			$("#b10").on("click", function () {
				ion.sound.play("computer_error");
			});
			$("#b-door").on("click", function () {
				ion.sound.play("door_bump");
			});
			$("#b-glass").on("click", function () {
				ion.sound.play("glass");
			});
			$("#b-keyboard").on("click", function () {
				ion.sound.play("keyboard_desk");
			});
			$("#b11").on("click", function () {
				ion.sound.play("door_bell");
			});
			$("#b12").on("click", function () {
				ion.sound.play("light_bulb_breaking");
			});
			$("#b-metal-1").on("click", function () {
				ion.sound.play("metal_plate");
			});
			$("#b-metal-2").on("click", function () {
				ion.sound.play("metal_plate_2");
			});
			$("#b14").on("click", function () {
				ion.sound.play("pop_cork");
			});
			$("#b-snap").on("click", function () {
				ion.sound.play("snap");
			});
			$("#b-staple").on("click", function () {
				ion.sound.play("staple_gun");
			});
			$("#b-tap").on("click", function () {
				ion.sound.play("tap");
			});
			$("#b-water-1").on("click", function () {
				ion.sound.play("water_droplet");
			});
			$("#b-water-2").on("click", function () {
				ion.sound.play("water_droplet_2");
			});
			$("#b-water-3").on("click", function () {
				ion.sound.play("water_droplet_3");
			});

			// keyboard
			$(document.body).on("keypress", function (e) {
				var key = e.which,
					$key_ico = $("q.key");

				var clearAll = function () {
					clearTimeout(window.myTm);

					window.myTm = setTimeout(function () {
						$key_ico.removeClass("key_state_active");
					}, 200);
				};

				if (/^(81|113|1049|1081)$/.test(key)) {		 // Q
					ion.sound.play("beer");
					$("#key_q").addClass("key_state_active");
					clearAll();
				} else if (/^(87|119|1062|1094)$/.test(key)) {  // W
					ion.sound.play("bell_ring");
					$("#key_w").addClass("key_state_active");
					clearAll();
				} else if (/^(69|101|1059|1091)$/.test(key)) {  // E
					ion.sound.play("branch_break");
					$("#key_e").addClass("key_state_active");
					clearAll();
				} else if (/^(81|114|1050|1082)$/.test(key)) {  // R
					ion.sound.play("button_click");
					$("#key_r").addClass("key_state_active");
					clearAll();
				} else if (/^(84|116|1045|1077)$/.test(key)) {  // T
					ion.sound.play("button_click_on");
					$("#key_t").addClass("key_state_active");
					clearAll();
				} else if (/^(89|121|1053|1085)$/.test(key)) {  // Y
					ion.sound.play("button_push");
					$("#key_y").addClass("key_state_active");
					clearAll();
				} else if (/^(85|117|1043|1075)$/.test(key)) {  // U
					ion.sound.play("button_tiny");
					$("#key_u").addClass("key_state_active");
					clearAll();
				} else if (/^(73|105|1064|1096)$/.test(key)) {  // I
					ion.sound.play("camera_flashing");
					$("#key_i").addClass("key_state_active");
					clearAll();
				} else if (/^(79|111|1065|1097)$/.test(key)) {  // O
					ion.sound.play("camera_flashing_2");
					$("#key_o").addClass("key_state_active");
					clearAll();
				} else if (/^(80|112|1047|1079)$/.test(key)) {  // P
					ion.sound.play("cd_tray");
					$("#key_p").addClass("key_state_active");
					clearAll();
				} else if (/^(65|97|1060|1092)$/.test(key)) {   // A
					ion.sound.play("computer_error");
					$("#key_a").addClass("key_state_active");
					clearAll();
				} else if (/^(83|115|1067|1099)$/.test(key)) {  // S
					ion.sound.play("door_bump");
					$("#key_s").addClass("key_state_active");
					clearAll();
				} else if (/^(68|100|1042|1074)$/.test(key)) {  // D
					ion.sound.play("glass");
					$("#key_d").addClass("key_state_active");
					clearAll();
				} else if (/^(70|102|1040|1072)$/.test(key)) {  // F
					ion.sound.play("keyboard_desk");
					$("#key_f").addClass("key_state_active");
					clearAll();
				} else if (/^(71|103|1055|1087)$/.test(key)) {  // G
					ion.sound.play("door_bell");
					$("#key_g").addClass("key_state_active");
					clearAll();
				} else if (/^(72|104|1056|1088)$/.test(key)) {  // H
					ion.sound.play("light_bulb_breaking");
					$("#key_h").addClass("key_state_active");
					clearAll();
				} else if (/^(74|106|1054|1086)$/.test(key)) {  // J
					ion.sound.play("metal_plate");
					$("#key_j").addClass("key_state_active");
					clearAll();
				} else if (/^(75|107|1051|1083)$/.test(key)) {  // K
					ion.sound.play("metal_plate_2");
					$("#key_k").addClass("key_state_active");
					clearAll();
				} else if (/^(76|108|1044|1076)$/.test(key)) {  // L
					ion.sound.play("pop_cork");
					$("#key_l").addClass("key_state_active");
					clearAll();
				} else if (/^(90|122|1071|1103)$/.test(key)) {  // Z
					ion.sound.play("snap");
					$("#key_z").addClass("key_state_active");
					clearAll();
				} else if (/^(88|120|1063|1095)$/.test(key)) {  // X
					ion.sound.play("staple_gun");
					$("#key_x").addClass("key_state_active");
					clearAll();
				} else if (/^(67|99|1057|1089)$/.test(key)) {   // C
					ion.sound.play("tap");
					$("#key_c").addClass("key_state_active");
					clearAll();
				} else if (/^(86|118|1052|1084)$/.test(key)) {  // V
					ion.sound.play("water_droplet");
					$("#key_v").addClass("key_state_active");
					clearAll();
				} else if (/^(66|98|1048|1080)$/.test(key)) {   // B
					ion.sound.play("water_droplet_2");
					$("#key_b").addClass("key_state_active");
					clearAll();
				} else if (/^(78|110|1058|1090)$/.test(key)) {  // N
					ion.sound.play("water_droplet_3");
					$("#key_n").addClass("key_state_active");
					clearAll();
				}

			});

		});

	$("body").append(el);
	}
});
