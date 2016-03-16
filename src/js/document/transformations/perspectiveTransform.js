daign.PerspectiveTransform = function ( matrix ) {

	daign.Observable.call( this );

	this.asAttribute = false;

	this.matrix = matrix;
	this.backmatrix = new daign.Matrix3();
	this.attribute = '';

	this.update();

};

daign.PerspectiveTransform.prototype = {

	constructor: daign.PerspectiveTransform,

	set: function ( matrix ) {

		this.matrix.copy( matrix );
		this.update();
		return this;

	},

	setAsAttribute: function ( b ) {

		this.asAttribute = false;
		return this;

	},

	update: function () {

		this.backmatrix.setIdentity(); //TODO: invert matrix

		this.notifyObservers();

	}

};

