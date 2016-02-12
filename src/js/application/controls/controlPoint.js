daign.ControlPoint = function ( parent, point, settings, viewport ) {

	this.viewport = viewport;
	this.parent = parent;
	this.node = document.createElementNS( daign.SVGNS, 'circle' );
	this.node.setAttribute( 'r', 5 );
	this.node.setAttribute( 'class', 'controlPoint' );
	this.parent.appendChild( this.node );

	this.point = point;

	var self = this;
	var update = function () {
		self.update();
	};
	update();
	this.remover = point.position.addListener( update );

	settings.domNode = this.node;

	var myHandle = new daign.Handle( settings );

};

daign.ControlPoint.prototype = {

	constructor: daign.ControlPoint,

	destroy: function () {

		this.remover();
		this.parent.removeChild( this.node );

	},

	update: function () {

		var p = this.viewport.projectToViewCoordinates( this.point.position );
		this.node.setAttribute( 'cx', p.x );
		this.node.setAttribute( 'cy', p.y );

	}

};

