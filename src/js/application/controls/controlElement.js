daign.ControlElement = function ( app, nodeName, callback, viewport, className ) {

	this.app = app;
	this.node = this.app.domPool.get( nodeName );
	this.node.setAttribute( 'class', className );
	this.callback = callback;
	this.viewport = viewport;

	this.callback( this.node, this.viewport );
	this.destroyListeners = [];

};

daign.ControlElement.prototype = {

	constructor: daign.ControlElement,

	update: function () {

		this.callback( this.node, this.viewport );

	},

	addDestroyListener: function ( callback ) {

		this.destroyListeners.push( callback );

	},

	destroy: function () {

		this.destroyListeners.forEach( function ( callback ) {
			callback();
		} );

		this.app.domPool.giveBack( this.node );
		this.node = undefined;

	}

};

