daign.PathSegment = function ( points, parameters, previous, view ) {

	this.points = points;
	this.parameters = parameters;
	this.previous = previous;
	this.view = view;

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

	setUpEndControl: function ( pointsArray, pointsGroup ) {

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
					self.view.controls.showSegment( self );
				},
				vector0: new daign.Vector2(),
				vectorT: new daign.Vector2()
			}
			var cPoint = new daign.ControlPoint( pointsGroup, lastPoint, settings );
			pointsArray.push( cPoint );
		}

	},

	setUpControls: function ( pointsArray, pointsGroup, linesArray, linesGroup ) {

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
				var cPoint = new daign.ControlPoint( pointsGroup, pointI, settings );
				pointsArray.push( cPoint );
			} )();

			var nextPoint = this.points[ i ];
			var line = new daign.ControlLine( linesGroup, lastPoint, nextPoint );
			linesArray.push( line );
			lastPoint = nextPoint;
		}
		if ( this.previous !== undefined && this.previous.getEndPoint() !== undefined ) {
			var line = new daign.ControlLine( linesGroup, lastPoint, this.previous.getEndPoint() );
			linesArray.push( line );
		}

	}

};

