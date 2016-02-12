daign.PathSegment = function ( points, parameters, app ) {

	this.app = app;

	daign.Selectable.call( this, false );

	this.parameters = parameters;
	var self = this;
	points.forEach( function ( p ) {
		self.append( p );
	} );

};

daign.PathSegment.prototype = {

	constructor: daign.PathSegment,

	render: function () {

		return '';

	},

	getEndPoint: function () {

		if ( this.children.length > 0 ) {
			return this.children[ this.children.length-1 ];
		} else {
			return undefined;
		}

	},

	getPreviousSegment: function () {

		var siblings = this.parent.children;
		var i = siblings.indexOf( this );
		if ( i-1 >= 0 ) {
			return siblings[ i-1 ];
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
					snapshot = lastPoint.position.clone();
				},
				continuing: function () {
					lastPoint.position.copy( snapshot.clone().add( this.vectorT.sub( this.vector0 ).multiplyScalar( 0.25 ) ) );
					self.update();
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
		for ( var i = this.children.length-2; i >= 0; i-- ) {
			( function () {
				var pointI = self.children[ i ];
				var snapshot = undefined;
				var settings = {
					beginning: function () {
						snapshot = pointI.position.clone();
					},
					continuing: function () {
						pointI.position.copy( snapshot.clone().add( this.vectorT.sub( this.vector0 ).multiplyScalar( 0.25 ) ) );
						self.update();
					},
					ending: function () {},
					clicked: function () {},
					vector0: new daign.Vector2(),
					vectorT: new daign.Vector2()
				};
				var cPoint = new daign.ControlPoint( controlLayer.segmentPointsGroup, pointI, settings, controlLayer.viewport );
				controlLayer.segmentPoints.push( cPoint );
			} )();

			var nextPoint = this.children[ i ];
			var line = new daign.ControlLine( controlLayer.segmentLinesGroup, lastPoint, nextPoint, controlLayer.viewport );
			controlLayer.segmentLines.push( line );
			lastPoint = nextPoint;
		}

		var previous = this.getPreviousSegment();
		if ( previous !== undefined && previous.getEndPoint() !== undefined ) {
			var line = new daign.ControlLine( controlLayer.segmentLinesGroup, lastPoint, previous.getEndPoint(), controlLayer.viewport );
			controlLayer.segmentLines.push( line );
		}

	}

};

