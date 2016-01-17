daign.ControlLine = function ( parent, p1, p2 ) {

	this.parent = parent;
	this.node = document.createElementNS( daign.SVGNS, 'line' );
	this.node.setAttribute( 'class', 'controlLine' );
	this.parent.appendChild( this.node );

	this.p1 = p1;
	this.p2 = p2;

	var self = this;
	var update = function () {
		self.node.setAttribute( 'x1', self.p1.x );
		self.node.setAttribute( 'y1', self.p1.y );
		self.node.setAttribute( 'x2', self.p2.x );
		self.node.setAttribute( 'y2', self.p2.y );
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

