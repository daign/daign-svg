daign.Scaling = function ( x, y ) {

	daign.Observable.call( this );

	this.scale = new daign.Vector2( x || 0, y || 0 );

	this.matrix = new daign.Matrix3();
	this.backmatrix = new daign.Matrix3();
	this.attribute = '';

	this.update();

};

daign.Scaling.prototype = {

	constructor: daign.Scaling,

	set: function ( x, y ) {

		this.scale.set( x, y );
		this.update();

	},

	update: function () {

		this.matrix.setIdentity().applyScaling( this.scale.x, this.scale.y );
		this.backmatrix.setIdentity().applyScaling( 1/this.scale.x, 1/this.scale.y );
		this.attribute = 'scale(' + this.scale.x + ',' + this.scale.y + ')';
		this.notifyObservers();

	}

};

