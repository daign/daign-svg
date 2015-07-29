daign.ControlPoint = function ( parent, point, settings ) {

	this.parent = parent;
	this.node = document.createElementNS( daign.SVGNS, 'circle' );
	this.node.setAttribute( 'r', 1.5 );
	this.node.setAttribute( 'class', 'controlPoint' );
	this.parent.appendChild( this.node );

	this.point = point;

	var self = this;
	var update = function () {
		self.node.setAttribute( 'cx', self.point.x );
		self.node.setAttribute( 'cy', self.point.y );
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

