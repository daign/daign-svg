daign.ControlLine = function ( parent, p1, p2, viewport ) {

	this.parent = parent;
	this.node = document.createElementNS( daign.SVGNS, 'line' );
	this.node.setAttribute( 'class', 'controlLine' );
	this.parent.appendChild( this.node );

	this.p1 = p1;
	this.p2 = p2;

	var self = this;
	var update = function () {
		var p1 = viewport.projectToViewCoordinates( self.p1 );
		var p2 = viewport.projectToViewCoordinates( self.p2 );
		self.node.setAttribute( 'x1', p1.x );
		self.node.setAttribute( 'y1', p1.y );
		self.node.setAttribute( 'x2', p2.x );
		self.node.setAttribute( 'y2', p2.y );
	};

	update();
	this.remover1 = p1.addListener( update );
	this.remover2 = p2.addListener( update );

};

daign.ControlLine.prototype = {

	constructor: daign.ControlLine,

	destroy: function () {

		this.remover1();
		this.remover2();
		this.parent.removeChild( this.node );

	}

};

