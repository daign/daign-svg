daign.PathSegmentArc = function ( points, parameters, previous, document ) {

	daign.PathSegment.call( this, points, parameters, previous, document );
	var p0 = this.points[ 0 ];
	var pp = this.previous.getEndPoint();
	var px = new daign.Vector2();
	this.points.unshift( px );

	var self = this;
	var update = function () {
		var diff = pp.clone().sub( p0 );
		var pm = diff.clone().multiplyScalar( 0.5 ).add( p0 );
		var o = self.parameters[ 4 ]*2-1;
		var l = Math.sqrt( Math.max( 0, Math.pow( self.parameters[ 0 ], 2 ) - Math.pow( diff.length()*0.5, 2 ) ) );
		var n = diff.clone().perpendicular().setLength( o*l );
		px.copy( pm.add( n ) );
	};
	update();
	this.remover1 = p0.addListener( update );
	this.remover2 = pp.addListener( update );

};

daign.PathSegmentArc.prototype = Object.create( daign.PathSegment.prototype );

daign.PathSegmentArc.prototype.constructor = daign.PathSegmentArc;

daign.PathSegmentArc.prototype.render = function () {

	return ' A ' + this.parameters[ 0 ] + ',' + this.parameters[ 1 ] + ',' + this.parameters[ 2 ] + ',' + this.parameters[ 3 ] + ',' + this.parameters[ 4 ] + ',' + this.points[ 1 ].x + ',' + this.points[ 1 ].y;

};

daign.PathSegmentArc.prototype.setUpControls = function ( pointsArray, pointsGroup, linesArray, linesGroup ) {

	var line1 = new daign.ControlLine( linesGroup, this.points[ 1 ], this.points[ 0 ] );
	linesArray.push( line1 );

	if ( this.previous !== undefined && this.previous.getEndPoint() !== undefined ) {
		var line2 = new daign.ControlLine( linesGroup, this.points[ 0 ], this.previous.getEndPoint() );
		linesArray.push( line2 );
	}

	var self = this;
	var p0 = this.points[ 1 ];
	var pp = this.previous.getEndPoint();
	var px = this.points[ 0 ];
	var pxSnapshot = undefined;
	var settings = {
		beginning: function () {
			pxSnapshot = px.clone();
		},
		continuing: function () {
			var pxMoved = pxSnapshot.clone().add( this.vectorT.sub( this.vector0 ).multiplyScalar( 0.25 ) );
			var u = pp.clone().sub( p0 ).normalize();
			var p0x = pxMoved.clone().sub( p0 );
			var projected = p0.clone().add( u.clone().multiplyScalar( p0x.dot( u ) ) );
			var dis = pxMoved.clone().sub( projected );

			var diff = pp.clone().sub( p0 );
			var pm = diff.clone().multiplyScalar( 0.5 ).add( p0 );
			px.copy( pm.add( dis ) );

			var r = px.distanceTo( p0 );
			self.parameters[ 0 ] = r;
			self.parameters[ 1 ] = r;

			if ( dis.length() > 0 ) {
				var det = ( pp.x - p0.x ) * ( px.y - p0.y ) - ( pp.y - p0.y ) * ( px.x - p0.x );
				self.parameters[ 4 ] = ( det > 0 ) ? 0 : 1;
			}
		},
		ending: function () {},
		clicked: function () {},
		vector0: new daign.Vector2(),
		vectorT: new daign.Vector2()
	};
	var cPoint = new daign.ControlPoint( pointsGroup, px, settings );
	pointsArray.push( cPoint );

};

