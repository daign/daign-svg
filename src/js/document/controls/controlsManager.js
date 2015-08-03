daign.ControlsManager = function ( group ) {

	this.pathPoints = [];
	this.segmentLines = [];
	this.segmentPoints = [];

	this.pathGroup = document.createElementNS( daign.SVGNS, 'g' );
	this.segmentLinesGroup = document.createElementNS( daign.SVGNS, 'g' );
	this.segmentPointsGroup = document.createElementNS( daign.SVGNS, 'g' );
	group.appendChild( this.segmentLinesGroup );
	group.appendChild( this.pathGroup );
	group.appendChild( this.segmentPointsGroup );

};

daign.ControlsManager.prototype = {

	constructor: daign.ControlsManager,

	showPath: function ( path ) {

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

		if ( path !== null ) {
			path.setUpControls( this.pathPoints, this.pathGroup );
		}

	},

	showSegment: function ( segment ) {

		this.segmentPoints.forEach( function ( p ) {
			p.destroy();
		} );
		this.segmentPoints = [];

		this.segmentLines.forEach( function ( l ) {
			l.destroy();
		} );
		this.segmentLines = [];

		if ( segment !== null ) {
			segment.setUpControls( this.segmentPoints, this.segmentPointsGroup, this.segmentLines, this.segmentLinesGroup );
		}

	}

};

