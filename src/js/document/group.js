daign.Group = function ( app ) {

	daign.mixin( this, new daign.Selectable() );
	daign.mixin( this, new daign.Transformable() );

	this.type = 'Group';

	this.nodes = {};
	this.children = [];

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

