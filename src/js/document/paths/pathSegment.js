daign.PathSegment = function ( points, parameters, previous, app ) {

	this.app = app;

	daign.Selectable.call( this, false );

	this.points = points;
	this.parameters = parameters;
	this.previous = previous;

};

daign.PathSegment.prototype = {

	constructor: daign.PathSegment,

	render: function () {

		return '';

	},

	setListeners: function ( l ) {

		this.points.forEach( function ( p ) {
			p.addListener( l );
		} );

	},

	getEndPoint: function () {

		if ( this.points.length > 0 ) {
			return this.points[ this.points.length-1 ];
		} else {
			return undefined;
		}

	},

	setUpEndControl: function ( controlLayer ) {

		var lastPoint = this.getEndPoint();
		if ( lastPoint !== undefined ) {
			var snapshot = undefined;
			var self = this;
			var settings = {
				beginning: function () {
					snapshot = lastPoint.clone();
				},
				continuing: function () {
					lastPoint.copy( snapshot.clone().add( this.vectorT.sub( this.vector0 ).multiplyScalar( 0.25 ) ) );
				},
				ending: function () {},
				clicked: function () {
					self.app.selectionManager.select( self );
				},
				vector0: new daign.Vector2(),
				vectorT: new daign.Vector2()
			}
			var cPoint = new daign.ControlPoint( controlLayer.pathGroup, lastPoint, settings, controlLayer.viewport );
			controlLayer.pathPoints.push( cPoint );
		}

	},

	setUpControls: function ( controlLayer ) {

		this.parent.setUpControls( controlLayer );

		var lastPoint = this.getEndPoint();
		var self = this;
		for ( var i = this.points.length-2; i >= 0; i-- ) {
			( function () {
				var pointI = self.points[ i ];
				var snapshot = undefined;
				var settings = {
					beginning: function () {
						snapshot = pointI.clone();
					},
					continuing: function () {
						pointI.copy( snapshot.clone().add( this.vectorT.sub( this.vector0 ).multiplyScalar( 0.25 ) ) );
					},
					ending: function () {},
					clicked: function () {},
					vector0: new daign.Vector2(),
					vectorT: new daign.Vector2()
				};
				var cPoint = new daign.ControlPoint( controlLayer.segmentPointsGroup, pointI, settings, controlLayer.viewport );
				controlLayer.segmentPoints.push( cPoint );
			} )();

			var nextPoint = this.points[ i ];
			var line = new daign.ControlLine( controlLayer.segmentLinesGroup, lastPoint, nextPoint, controlLayer.viewport );
			controlLayer.segmentLines.push( line );
			lastPoint = nextPoint;
		}
		if ( this.previous !== undefined && this.previous.getEndPoint() !== undefined ) {
			var line = new daign.ControlLine( controlLayer.segmentLinesGroup, lastPoint, this.previous.getEndPoint(), controlLayer.viewport );
			controlLayer.segmentLines.push( line );
		}

	}

};

