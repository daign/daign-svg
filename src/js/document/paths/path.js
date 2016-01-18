daign.Path = function ( document ) {

	this.segments = [];
	this.node = window.document.createElementNS( daign.SVGNS, 'path' );

	this.document = document;

	var self = this;
	var pathHandle = new daign.Handle( {
		domNode: self.node,
		vector0: new daign.Vector2(),
		vectorT: new daign.Vector2(),
		beginning: function () {
			self.snap();
		},
		continuing: function () {
			self.drag( this.vectorT.sub( this.vector0 ) );
		},
		ending: function () {},
		clicked: function () {
			self.document.app.selectionManager.setPath( self ); // path can be already active
		}
	} );

};

daign.Path.prototype = {

	constructor: daign.Path,

	append: function ( segment ) {

		var self = this;
		var update = function () {
			self.update();
		};
		segment.setListeners( update );
		this.segments.push( segment );

	},

	getLastSegment: function () {

		if ( this.segments.length > 0 ) {
			return this.segments[ this.segments.length-1 ];
		} else {
			return undefined;
		}

	},

	update: function () {

		var d = '';
		for ( var i = 0; i < this.segments.length; i++ ) {
			d += this.segments[ i ].render();
		}
		this.node.setAttribute( 'd', d );
		this.node.setAttribute( 'fill', '#ccc' );
		this.node.setAttribute( 'stroke', '#000' );
		this.node.setAttribute( 'stroke-width', 0.3 );

	},

	snap: function () {

		this.segments.forEach( function( seg ) {
			seg.points.forEach( function ( p ) {
				p.snap();
			} );
		} );

	},

	drag: function ( v ) {

		v.multiplyScalar( 0.25 );
		this.segments.forEach( function( seg ) {
			seg.points.forEach( function ( p ) {
				p.drag( v );
			} );
		} );
		this.update();

	},

	setUpControls: function ( pointsArray, pointsGroup, viewport ) {

		this.segments.forEach( function ( segment ) {
			segment.setUpEndControl( pointsArray, pointsGroup, viewport );
		} );

	},

	parse: function ( string ) {

		var dataRaw = string.split( ' ' );
		var dataMode = undefined;
		for ( var i = 0; i < dataRaw.length; i++ ) {
				var previous = this.getLastSegment();
				if ( dataRaw[ i ].length === 1 ) {
					dataMode = dataRaw[ i ];
					if ( dataMode === 'Z' ) {
						this.append( new daign.PathSegmentClose( [], [], previous, this.document ) );
					}
				} else {
					var vr = dataRaw[ i ].split( ',' );
					switch ( dataMode ) {
						case 'M':
							var p0 = new daign.Vector2( parseInt( vr[ 0 ] ), parseInt( vr[ 1 ] ) );
							this.append( new daign.PathSegmentMove( [ p0 ], [], previous, this.document ) );
							break;

						case 'L':
							var p0 = new daign.Vector2( parseInt( vr[ 0 ] ), parseInt( vr[ 1 ] ) );
							this.append( new daign.PathSegmentLine( [ p0 ], [], previous, this.document ) );
							break;

						case 'Q':
							var p0 = new daign.Vector2( parseInt( vr[ 0 ] ), parseInt( vr[ 1 ] ) );
							var p1 = new daign.Vector2( parseInt( vr[ 2 ] ), parseInt( vr[ 3 ] ) );
							this.append( new daign.PathSegmentQuadratic( [ p0, p1 ], [], previous, this.document ) );
							break;

						case 'C':
							var p0 = new daign.Vector2( parseInt( vr[ 0 ] ), parseInt( vr[ 1 ] ) );
							var p1 = new daign.Vector2( parseInt( vr[ 2 ] ), parseInt( vr[ 3 ] ) );
							var p2 = new daign.Vector2( parseInt( vr[ 4 ] ), parseInt( vr[ 5 ] ) );
							this.append( new daign.PathSegmentCubic( [ p0, p1, p2 ], [], previous, this.document ) );
							break;

						case 'A':
							var p0 = new daign.Vector2( parseInt( vr[ 5 ] ), parseInt( vr[ 6 ] ) );
							var parameters = [ parseInt( vr[ 0 ] ), parseInt( vr[ 1 ] ), parseInt( vr[ 2 ] ), parseInt( vr[ 3 ] ), parseInt( vr[ 4 ] ) ];
							this.append( new daign.PathSegmentArc( [ p0 ], parameters, previous, this.document ) );
							break;

						case 'Z':
							break;
					}
				}
			}
		this.update();

	}

};

