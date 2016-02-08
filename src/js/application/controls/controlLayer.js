daign.ControlLayer = function ( viewport ) {

	this.viewport = viewport;

	this.node = document.createElementNS( daign.SVGNS, 'g' );
	viewport.contextNode.appendChild( this.node );

	this.pathPoints = [];
	this.segmentLines = [];
	this.segmentPoints = [];

	this.pathGroup = document.createElementNS( daign.SVGNS, 'g' );
	this.segmentLinesGroup = document.createElementNS( daign.SVGNS, 'g' );
	this.segmentPointsGroup = document.createElementNS( daign.SVGNS, 'g' );
	this.node.appendChild( this.segmentLinesGroup );
	this.node.appendChild( this.pathGroup );
	this.node.appendChild( this.segmentPointsGroup );

};

daign.ControlLayer.prototype = {

	constructor: daign.ControlLayer,

	clear: function () {

		this.pathPoints.forEach( function ( p ) {
			p.destroy();
		} );
		this.pathPoints = [];

		this.segmentPoints.forEach( function ( p ) {
			p.destroy();
		} );
		this.segmentPoints = [];

		this.segmentLines.forEach( function ( l ) {
			l.destroy();
		} );
		this.segmentLines = [];

	},

	update: function () {

		this.pathPoints.forEach( function ( p ) {
			p.update();
		} );
		this.segmentPoints.forEach( function ( p ) {
			p.update();
		} );
		this.segmentLines.forEach( function ( l ) {
			l.update();
		} );

	}

};

