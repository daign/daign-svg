daign.Box2 = function ( min, max ) {

	this.min = min || new daign.Vector2( +Infinity, +Infinity );
	this.max = max || new daign.Vector2( -Infinity, -Infinity );

};

daign.Box2.prototype = {

	constructor: daign.Box2,

	set: function ( min, max ) {

		this.min.copy( min );
		this.max.copy( max );
		return this;

	},

	expandByPoint: function ( point ) {

		this.min.min( point );
		this.max.max( point );
		return this;

	}

};

