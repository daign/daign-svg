daign.ControlLayer = function ( app, viewport ) {

	this.app = app;
	this.viewport = viewport;

	this.node = document.createElementNS( daign.SVGNS, 'g' );
	viewport.contextNode.appendChild( this.node );

	this.controlElements = [];

};

daign.ControlLayer.prototype = {

	constructor: daign.ControlLayer,

	addElement: function ( nodeType, callback, className ) {

		var element = new daign.ControlElement( this.app, nodeType, callback, this.viewport, className );
		this.node.appendChild( element.node );
		this.controlElements.push( element );

		var self = this;
		element.addDestroyListener( function () {
			self.node.removeChild( element.node );
			var i = self.controlElements.indexOf( element );
			self.controlElements = self.controlElements.splice( i, i );
		} );

		return element;

	},

	update: function () {

		this.controlElements.forEach( function ( element ) {
			element.update();
		} );

	},

	clear: function () {

		var self = this;
		this.controlElements.forEach( function ( element ) {
			element.destroy();
		} );

	}

};

