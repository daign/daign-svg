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

	},

	expandByBox: function ( box ) {

		this.min.min( box.min );
		this.max.max( box.max );
		return this;

	},

	expandToMinimumSize: function ( minimum ) {

		if ( this.max.x - this.min.x < minimum ) {
			var midpoint = this.min.x + ( this.max.x - this.min.x ) / 2;
			this.min.x = midpoint - minimum/2;
			this.max.x = midpoint + minimum/2;
		}
		if ( this.max.y - this.min.y < minimum ) {
			var midpoint = this.min.y + ( this.max.y - this.min.y ) / 2;
			this.min.y = midpoint - minimum/2;
			this.max.y = midpoint + minimum/2;
		}
		return this;

	}

};

