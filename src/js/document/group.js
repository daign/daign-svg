daign.Group = function ( app ) {

	this.app = app;

	daign.Selectable.call( this );
	daign.Transformable.call( this );

	this.type = 'Group';

	this.nodes = {};

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

	}

};

