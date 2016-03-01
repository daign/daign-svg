daign.MatrixTransform = function ( a, b, c, d, e, f ) {

	daign.Observable.call( this );

	this.matrix = new daign.Matrix3().set( a, c, e, b, d, f, 0, 0, 1 );
	this.backmatrix = new daign.Matrix3();
	this.attribute = '';

	this.update();

};

daign.MatrixTransform.prototype = {

	constructor: daign.MatrixTransform,

	set: function ( a, b, c, d, e, f ) {

		this.matrix = new daign.Matrix3().set( a, c, e, b, d, f, 0, 0, 1 );
		this.update();

	},

	update: function () {

		this.backmatrix.setIdentity(); //TODO: invert matrix

		var a = this.matrix.elements;
		if ( a[6] !== 0 || a[7] !== 0 || a[8] !== 1 ) {
			console.warn( 'Matrix is not an affine transformation.' );
		}
		var b = [ a[0], a[3], a[1], a[4], a[2], a[5] ];
		this.attribute = 'matrix(' + b.join( ',' ) + ')';

		this.notifyObservers();

	}

};

