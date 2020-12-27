define([ "dojo/text", "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/dom-construct", "dojo/dom-class", "dojo/_base/event"],
	   function(t, declare, base, templated, domCon, NotificationNode, domClass, event)
{
	return declare('dGrowl',
	[base, templated],
	{
		'templateString':'<div id="${id}" class="dGrowl-notification dGrowl-notification-${channel} ${stickyClass}"><a href="#x" class="dGrowl-close-btn" data-dojo-attach-event="onclick:killme">x</a><span class="dGrowl-header"><span class="dGrowl-title">${!title}</span></span><div class="dGrowl-message">${!message}</div></div>',
		'title':'',
		'message':'',
		'duration':5000,
		'sticky':false,
		'stickyClass':'',
		'constructor':function(a)
		{
			if(a.channel == undefined)
				console.error('NotificationNode requires a "channel" definition!');
			if(a.sticky === true)
				this.stickyClass = 'dGrowl-notification-sticky';
		},
		'postCreate':function()
		{
			this.inherited(arguments);
			if(this.sticky === false)
				setTimeout(dojo.hitch(this, this.killme), this.duration);
		},
		'show':function()
		{
			var v = this.domNode.clientHeight; // trigger reflow so transition animates... hack!!!!!!!
			dojo.addClass(this.domNode, 'dGrowl-visible');
			this.onShow(this);
		},
		'onShow':function(){},
		'onHide':function(){},
		'killme':function(evt)
		{
			if(evt)
				event.stop(evt);
			// delay on destroy for animation to do its thing...
			dojo.removeClass(this.domNode, 'dGrowl-visible');
			setTimeout(dojo.hitch(this, this.destroy),1100);
			this.onHide(this);
		}
	});
});

