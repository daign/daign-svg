daign.ControlPoint = function ( parent, point, settings, viewport ) {

	this.parent = parent;
	this.node = document.createElementNS( daign.SVGNS, 'circle' );
	this.node.setAttribute( 'r', 4 );
	this.node.setAttribute( 'class', 'controlPoint' );
	this.parent.appendChild( this.node );

	this.point = point;

	var self = this;
	var update = function () {
		var p = viewport.projectToViewCoordinates( self.point );
		self.node.setAttribute( 'cx', p.x );
		self.node.setAttribute( 'cy', p.y );
	};

	update();
	this.remover = point.addListener( update );

	settings.domNode = this.node;

	var myHandle = new daign.Handle( settings );

};

daign.ControlPoint.prototype = {

	constructor: daign.ControlPoint,

	destroy: function () {

		this.remover();
		this.parent.removeChild( this.node );

	}

};

