daign.Matrix3 = function () {

	this.elements = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

};

daign.Matrix3.prototype = {

	constructor: daign.Matrix3,

	set: function ( a11, a12, a13, a21, a22, a23, a31, a32, a33 ) {

		this.elements[ 0 ] = a11; this.elements[ 1 ] = a12; this.elements[ 2 ] = a13;
		this.elements[ 3 ] = a21; this.elements[ 4 ] = a22; this.elements[ 5 ] = a23;
		this.elements[ 6 ] = a31; this.elements[ 7 ] = a32; this.elements[ 8 ] = a33;
		return this;

	},

	setIdentity: function () {

		this.set(
			1, 0, 0,
			0, 1, 0,
			0, 0, 1
		);
		return this;

	},

	setTranslation: function ( x, y ) {

		this.set(
			1, 0, x,
			0, 1, y,
			0, 0, 1
		);
		return this;

	},

	applyTranslation: function ( x, y ) {

		this.transform( new daign.Matrix3().setTranslation( x, y ) );
		return this;

	},

	setScaling: function ( sx, sy ) {

		this.set(
			sx,  0, 0,
			 0, sy, 0,
			 0,  0, 1
		);
		return this;

	},

	applyScaling: function ( sx, sy ) {

		this.transform( new daign.Matrix3().setScaling( sx, sy ) );
		return this;

	},

	setRotation: function ( a ) {

		var sin = Math.sin( a );
		var cos = Math.cos( a );

		this.set(
			cos, -sin, 0,
			sin,  cos, 0,
			  0,    0, 1
		);
		return this;

	},

	applyRotation: function ( a ) {

		this.transform( new daign.Matrix3().setRotation( a ) );
		return this;

	},

	_matrixMultiplication: function ( a, b ) {

		this.set(
			a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
			a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
			a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
			a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
			a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
			a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
			a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
			a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
			a[6] * b[2] + a[7] * b[5] + a[8] * b[8]
		);

	},

	multiply: function ( m ) {

		this._matrixMultiplication( this.elements, m.elements );
		return this;

	},

	transform: function ( m ) {

		this._matrixMultiplication( m.elements, this.elements );
		return this;

	},

	getTransformAttribute: function () {

		var a = this.elements;
		var b = [ a[0], a[3], a[1], a[4], a[2], a[5] ];
		return 'matrix(' + b.join( ',' ) + ')';

	}

};

