daign.Rotation = function ( d, x, y ) {

	daign.Observable.call( this );

	this.rotationDegree = new daign.Angle().setDeg( d || 0 );
	this.rotationCenter = new daign.Vector2( x || 0, y || 0 );

	this.matrix = new daign.Matrix3();
	this.backmatrix = new daign.Matrix3();
	this.attribute = '';

	this.update();

};

daign.Rotation.prototype = {

	constructor: daign.Rotation,

	set: function ( d, x, y ) {

		this.rotationDegree.setDeg( d );
		this.rotationCenter.set( x, y );
		this.update();

	},

	update: function () {

		this.matrix.setIdentity()
			.applyTranslation( -this.rotationCenter.x, -this.rotationCenter.y )
			.applyRotation( this.rotationDegree.getRad() )
			.applyTranslation( this.rotationCenter.x, this.rotationCenter.y );

		this.backmatrix.setIdentity()
			.applyTranslation( -this.rotationCenter.x, -this.rotationCenter.y )
			.applyRotation( -this.rotationDegree.getRad() )
			.applyTranslation( this.rotationCenter.x, this.rotationCenter.y );

		this.attribute = (
			  'rotate(' + this.rotationDegree.getDeg() + ','
			+ this.rotationCenter.x + ',' + this.rotationCenter.y + ')'
		);
		this.notifyObservers();

	}

};

