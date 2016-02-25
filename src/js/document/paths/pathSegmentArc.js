daign.PathSegmentArc = function ( points, parameters, previous, app ) {

	this.type = 'Arc';

	daign.PathSegment.call( this, points, parameters, app );

	var p0 = this.children[ 0 ];
	var pp = previous.getEndPoint();
	var px = new daign.Point( app );
	px.parent = this;
	this.children.unshift( px );

	var self = this;
	var update = function () {
		var diff = pp.position.clone().sub( p0 );
		var pm = diff.clone().multiplyScalar( 0.5 ).add( p0.position );
		var o = self.parameters[ 4 ]*2-1;
		var l = Math.sqrt( Math.max( 0, Math.pow( self.parameters[ 0 ], 2 ) - Math.pow( diff.length()*0.5, 2 ) ) );
		var n = diff.clone().perpendicular().setLength( o*l );
		px.position.copy( pm.add( n ) );
	};
	update();
	this.remover1 = p0.position.addListener( update );
	this.remover2 = pp.position.addListener( update );

};

daign.PathSegmentArc.prototype = Object.create( daign.PathSegment.prototype );

daign.PathSegmentArc.prototype.constructor = daign.PathSegmentArc;

daign.PathSegmentArc.prototype.render = function () {

	return ' A ' + this.parameters[ 0 ] + ',' + this.parameters[ 1 ] + ',' + this.parameters[ 2 ] + ',' + this.parameters[ 3 ] + ',' + this.parameters[ 4 ] + ',' + this.children[ 1 ].position.x + ',' + this.children[ 1 ].position.y;

};

daign.PathSegmentArc.prototype.setUpControls = function ( controlLayer ) {

	this.parent.setUpControls( controlLayer );

	var line1 = new daign.ControlLine( controlLayer.segmentLinesGroup, this.children[ 1 ], this.children[ 0 ], controlLayer.viewport );
	controlLayer.segmentLines.push( line1 );

	var line2 = new daign.ControlLine( controlLayer.segmentLinesGroup, this.children[ 0 ], this.getPreviousSegment().getEndPoint(), controlLayer.viewport );
	controlLayer.segmentLines.push( line2 );

	var self = this;
	var p0 = this.children[ 1 ];
	var pp = this.getPreviousSegment().getEndPoint();
	var px = this.children[ 0 ];
	var pxSnapshot = undefined;
	var settings = {
		beginning: function () {
			pxSnapshot = px.position.clone();
		},
		continuing: function () {
			var pxMoved = pxSnapshot.clone().add( this.vectorT.sub( this.vector0 ).multiplyScalar( 0.25 ) );
			var u = pp.position.clone().sub( p0.position ).normalize();
			var p0x = pxMoved.clone().sub( p0.position );
			var projected = p0.position.clone().add( u.clone().multiplyScalar( p0x.dot( u ) ) );
			var dis = pxMoved.clone().sub( projected );

			var diff = pp.position.clone().sub( p0.position );
			var pm = diff.clone().multiplyScalar( 0.5 ).add( p0.position );
			px.position.copy( pm.add( dis ) );

			var r = px.position.distanceTo( p0.position );
			self.parameters[ 0 ] = r;
			self.parameters[ 1 ] = r;

			if ( dis.length() > 0 ) {
				var det = ( pp.position.x - p0.position.x ) * ( px.position.y - p0.position.y ) - ( pp.position.y - p0.position.y ) * ( px.position.x - p0.position.x );
				self.parameters[ 4 ] = ( det > 0 ) ? 0 : 1;
			}
			self.update();
		},
		ending: function () {},
		clicked: function () {},
		vector0: new daign.Vector2(),
		vectorT: new daign.Vector2()
	};
	var cPoint = new daign.ControlPoint( controlLayer.segmentPointsGroup, px, settings, controlLayer.viewport );
	controlLayer.segmentPoints.push( cPoint );

};

