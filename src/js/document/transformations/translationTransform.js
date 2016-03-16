daign.TranslationTransform = function ( x, y ) {

	daign.Observable.call( this );

	this.translation = new daign.Vector2( x || 0, y || 0 );

	this.asAttribute = false;

	this.matrix = new daign.Matrix3();
	this.backmatrix = new daign.Matrix3();
	this.attribute = '';

	this.update();

};

daign.TranslationTransform.prototype = {

	constructor: daign.TranslationTransform,

	set: function ( x, y ) {

		this.translation.set( x, y );
		this.update();
		return this;

	},

	setAsAttribute: function ( b ) {

		this.asAttribute = b;
		this.update();
		return this;

	},

	update: function () {

		this.matrix.setIdentity().applyTranslation( this.translation.x, this.translation.y );
		this.backmatrix.setIdentity().applyTranslation( -this.translation.x, -this.translation.y );

		if ( this.asAttribute ) {
			this.attribute = 'translate(' + this.translation.x + ',' + this.translation.y + ')';
		} else {
			this.attribute = '';
		}

		this.notifyObservers();

	}

};

