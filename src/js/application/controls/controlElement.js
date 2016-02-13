daign.ControlElement = function ( app, nodeType, callback, viewport, className ) {

	this.app = app;
	this.node = app.domPool.get( nodeType );
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

	}

};

