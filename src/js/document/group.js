daign.Group = function ( app ) {

	this.app = app;
	this.type = 'Group';

	daign.Selectable.call( this, true );
	daign.Transformable.call( this );

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

	},

	setUpControls: function ( controlLayer ) {}

};

