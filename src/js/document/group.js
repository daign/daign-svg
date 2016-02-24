daign.Group = function ( app ) {

	this.app = app;
	this.type = 'Group';

	daign.Selectable.call( this, true );
	daign.Transformable.call( this );

	this.nodes = {};
	this.controlElements = [];

};

daign.Group.prototype = {

	constructor: daign.Group,

	getNode: function ( viewName ) {

		var node = document.createElementNS( daign.SVGNS, 'g' );
		this.nodes[ viewName ] = node;

		this.children.forEach( function ( child ) {
			node.appendChild( child.getNode( viewName ) );
		} );

		return node;

	},

	setUpControls: function ( controlLayer ) {

		var self = this;
		var element = controlLayer.addElement( 'rect', function ( node, viewport ) {
			var box = self.getBox();
			var a = viewport.projectToViewCoordinates( box.min );
			var b = viewport.projectToViewCoordinates( box.max );
			node.setAttribute( 'x', a.x );
			node.setAttribute( 'y', a.y );
			node.setAttribute( 'width', b.x - a.x );
			node.setAttribute( 'height', b.y - a.y );
		}, 'controlBoundary' );
		this.controlElements.push( element );
		element.addDestroyListener( function () {
			var i = self.controlElements.indexOf( element );
			self.controlElements = self.controlElements.slice( i, i );
		} );

	},

	snap: function () {

	},

	drag: function () {

	}

};

