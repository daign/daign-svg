daign.Vector2 = function ( x, y ) {

	this.x = x || 0;
	this.y = y || 0;

	this.snapshot = undefined;
	this.listeners = [];

};

daign.Vector2.prototype = {

	constructor: daign.Vector2,

	set: function ( x, y ) {

		if ( this.x !== x || this.y !== y ) {
			this.x = x;
			this.y = y;
			for ( var l = 0; l < this.listeners.length; l++ ) {
				this.listeners[ l ]();
			}
		}
		return this;

	},

	setFromEvent: function ( event ) {

		var x = ( event.clientX !== undefined ) ? event.clientX : ( event.touches && event.touches[ 0 ].clientX );
		var y = ( event.clientY !== undefined ) ? event.clientY : ( event.touches && event.touches[ 0 ].clientY );
		this.set( x, y );
		return this;

	},

	copy: function ( v ) {

		this.set( v.x, v.y );
		return this;

	},

	clone: function () {

		return new daign.Vector2( this.x, this.y );

	},

	add: function ( v ) {

		this.set( this.x + v.x, this.y + v.y );
		return this;

	},

	sub: function ( v ) {

		this.set( this.x - v.x, this.y - v.y );
		return this;

	},

	multiply: function ( v ) {

		this.set( this.x * v.x, this.y * v.y );
		return this;

	},

	addScalar: function ( s ) {

		this.set( this.x + s, this.y + s );
		return this;

	},

	multiplyScalar: function ( s ) {

		this.set( this.x * s, this.y * s );
		return this;

	},

	min: function ( v ) {

		this.set( Math.min( this.x, v.x ), Math.min( this.y, v.y ) );
		return this;

	},

	max: function ( v ) {

		this.set( Math.max( this.x, v.x ), Math.max( this.y, v.y ) );
		return this;

	},

	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y );

	},

	normalize: function () {

		var length = this.length();
		if ( length !== 0 ) {
			this.multiplyScalar( 1 / length );
		}
		return this;

	},

	setLength: function ( l ) {

		var oldLength = this.length();
		if ( oldLength !== 0 ) {
			this.multiplyScalar( l / oldLength );
		}
		return this;

	},

	distanceTo: function ( v ) {

		return Math.sqrt( Math.pow( this.x - v.x, 2 ) + Math.pow( this.y - v.y, 2 ) );

	},

	dot: function ( v ) {

		return this.x * v.x + this.y * v.y;

	},

	perpendicular: function () {

		this.set( this.y, -this.x );
		return this;

	},

	snap: function () {

		this.snapshot = this.clone();
		return this;

	},

	drag: function ( v ) {

		this.copy( this.snapshot.clone().add( v ) );
		return this;

	},

	addListener: function ( l ) {

		this.listeners.push( l );
		var self = this;
		return function () {
			var i = self.listeners.indexOf( l );
			if ( i > -1 ) {
				self.listeners.splice( i, 1 );
			}
		};

	}

};

