daign.ControlLine = function ( parent, p1, p2, viewport ) {

	this.viewport = viewport;
	this.parent = parent;
	this.node = document.createElementNS( daign.SVGNS, 'line' );
	this.node.setAttribute( 'class', 'controlLine' );
	this.parent.appendChild( this.node );

	this.p1 = p1;
	this.p2 = p2;

	var self = this;
	var update = function () {
		self.update();
	};
	this.remover1 = p1.addListener( update );
	this.remover2 = p2.addListener( update );

	this.update();

};

daign.ControlLine.prototype = {

	constructor: daign.ControlLine,

	destroy: function () {

		this.remover1();
		this.remover2();
		if ( this.parent.contains( this.node ) ) {
			this.parent.removeChild( this.node );
		}

	},

	update: function () {

		var p1 = this.viewport.projectToViewCoordinates( this.p1 );
		var p2 = this.viewport.projectToViewCoordinates( this.p2 );
		this.node.setAttribute( 'x1', p1.x );
		this.node.setAttribute( 'y1', p1.y );
		this.node.setAttribute( 'x2', p2.x );
		this.node.setAttribute( 'y2', p2.y );

	}

};

