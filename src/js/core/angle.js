daign.Angle = function ( a ) {

	this.angle = a || 0;

};

daign.Angle.prototype = {

	constructor: daign.Angle,

	setRad: function ( r ) {

		this.angle = r;
		return this;

	},

	getRad: function () {

		return this.angle;

	},

	setDeg: function ( d ) {

		this.angle = d * Math.PI / 180;
		return this;

	},

	getDeg: function () {

		return ( this.angle * 180 / Math.PI );

	}

};

