daign.ScalingTransform = function ( x, y ) {

	daign.Observable.call( this );

	this.scale = new daign.Vector2( x || 0, y || 0 );

	this.asAttribute = false;

	this.matrix = new daign.Matrix3();
	this.backmatrix = new daign.Matrix3();
	this.attribute = '';

	this.update();

};

daign.ScalingTransform.prototype = {

	constructor: daign.ScalingTransform,

	set: function ( x, y ) {

		this.scale.set( x, y );
		this.update();
		return this;

	},

	setAsAttribute: function ( b ) {

		this.asAttribute = b;
		this.update();
		return this;

	},

	update: function () {

		this.matrix.setIdentity().applyScaling( this.scale.x, this.scale.y );
		this.backmatrix.setIdentity().applyScaling( 1/this.scale.x, 1/this.scale.y );

		if ( this.asAttribute ) {
			this.attribute = 'scale(' + this.scale.x + ',' + this.scale.y + ')';
		} else {
			this.attribute = '';
		}

		this.notifyObservers();

	}

};

