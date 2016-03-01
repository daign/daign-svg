daign.Translation = function ( x, y ) {

	daign.Observable.call( this );

	this.translation = new daign.Vector2( x || 0, y || 0 );

	this.matrix = new daign.Matrix3();
	this.backmatrix = new daign.Matrix3();
	this.attribute = '';

	this.update();

};

daign.Translation.prototype = {

	constructor: daign.Translation,

	set: function ( x, y ) {

		this.translation.set( x, y );
		this.update();

	},

	update: function () {

		this.matrix.setIdentity().applyTranslation( this.translation.x, this.translation.y );
		this.backmatrix.setIdentity().applyTranslation( -this.translation.x, -this.translation.y );
		this.attribute = 'translate(' + this.translation.x + ',' + this.translation.y + ')';
		this.notifyObservers();

	}

};

