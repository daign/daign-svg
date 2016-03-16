daign.AffineTransform = function ( a, b, c, d, e, f ) {

	daign.Observable.call( this );

	this.asAttribute = false;

	this.matrix = new daign.Matrix3().set( a, c, e, b, d, f, 0, 0, 1 );
	this.backmatrix = new daign.Matrix3();
	this.attribute = '';

	this.update();

};

daign.AffineTransform.prototype = {

	constructor: daign.AffineTransform,

	set: function ( a, b, c, d, e, f ) {

		this.matrix = new daign.Matrix3().set( a, c, e, b, d, f, 0, 0, 1 );
		this.update();
		return this;

	},

	setAsAttribute: function ( b ) {

		this.asAttribute = b;
		this.update();
		return this;

	},

	update: function () {

		this.backmatrix.setIdentity(); //TODO: invert matrix

		if ( this.asAttribute ) {
			var a = this.matrix.elements;
			var b = [ a[0], a[3], a[1], a[4], a[2], a[5] ];
			this.attribute = 'matrix(' + b.join( ',' ) + ')';
		} else {
			this.attribute = '';
		}

		this.notifyObservers();

	}

};

