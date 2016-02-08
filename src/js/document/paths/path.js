daign.Path = function ( app ) {

	this.app = app;
	this.type = 'Path';

	daign.Selectable.call( this, true );
	daign.Transformable.call( this );

	this.nodes = {};

	this.append = function ( segment ) {

		var self = this;
		var update = function () {
			self.update();
		};
		segment.setListeners( update );
		segment.parent = this;
		this.children.push( segment );
		this.setExpand( this.expanded );

	};

};

daign.Path.prototype = {

	constructor: daign.Path,

	getNode: function ( viewName ) {

		var node = document.createElementNS( daign.SVGNS, 'path' );
		this.nodes[ viewName ] = node;

		var self = this;
		var pathHandle = new daign.Handle( {
			domNode: node,
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
				self.app.selectionManager.select( self ); // path can be already active
			}
		} );

		this.update();
		return node;

	},

	getLastSegment: function () {

		if ( this.children.length > 0 ) {
			return this.children[ this.children.length-1 ];
		} else {
			return undefined;
		}

	},

	update: function () {

		var d = '';
		for ( var i = 0; i < this.children.length; i++ ) {
			d += this.children[ i ].render();
		}

		for ( var viewName in this.nodes ) {
			var node = this.nodes[ viewName ];
			node.setAttribute( 'd', d );
			node.setAttribute( 'fill', '#ccc' );
			node.setAttribute( 'stroke', '#000' );
			node.setAttribute( 'stroke-width', 0.3 );
		}

	},

	snap: function () {

		this.children.forEach( function( seg ) {
			seg.points.forEach( function ( p ) {
				p.snap();
			} );
		} );

	},

	drag: function ( v ) {

		v.multiplyScalar( 0.25 );
		this.children.forEach( function( seg ) {
			seg.points.forEach( function ( p ) {
				p.drag( v );
			} );
		} );
		this.update();

	},

	setUpControls: function ( controlLayer ) {

		this.children.forEach( function ( segment ) {
			segment.setUpEndControl( controlLayer );
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
						this.append( new daign.PathSegmentClose( [], [], previous, this.app ) );
					}
				} else {
					var vr = dataRaw[ i ].split( ',' );
					switch ( dataMode ) {
						case 'M':
							var p0 = new daign.Vector2( parseInt( vr[ 0 ] ), parseInt( vr[ 1 ] ) );
							this.append( new daign.PathSegmentMove( [ p0 ], [], previous, this.app ) );
							break;

						case 'L':
							var p0 = new daign.Vector2( parseInt( vr[ 0 ] ), parseInt( vr[ 1 ] ) );
							this.append( new daign.PathSegmentLine( [ p0 ], [], previous, this.app ) );
							break;

						case 'Q':
							var p0 = new daign.Vector2( parseInt( vr[ 0 ] ), parseInt( vr[ 1 ] ) );
							var p1 = new daign.Vector2( parseInt( vr[ 2 ] ), parseInt( vr[ 3 ] ) );
							this.append( new daign.PathSegmentQuadratic( [ p0, p1 ], [], previous, this.app ) );
							break;

						case 'C':
							var p0 = new daign.Vector2( parseInt( vr[ 0 ] ), parseInt( vr[ 1 ] ) );
							var p1 = new daign.Vector2( parseInt( vr[ 2 ] ), parseInt( vr[ 3 ] ) );
							var p2 = new daign.Vector2( parseInt( vr[ 4 ] ), parseInt( vr[ 5 ] ) );
							this.append( new daign.PathSegmentCubic( [ p0, p1, p2 ], [], previous, this.app ) );
							break;

						case 'A':
							var p0 = new daign.Vector2( parseInt( vr[ 5 ] ), parseInt( vr[ 6 ] ) );
							var parameters = [ parseInt( vr[ 0 ] ), parseInt( vr[ 1 ] ), parseInt( vr[ 2 ] ), parseInt( vr[ 3 ] ), parseInt( vr[ 4 ] ) ];
							this.append( new daign.PathSegmentArc( [ p0 ], parameters, previous, this.app ) );
							break;

						case 'Z':
							break;
					}
				}
			}
		this.update();

	}

};

