daign.Point = function ( app, position ) {

	this.app = app;
	this.type = 'Point';

	daign.Selectable.call( this, false );

	this.position = position || new daign.Vector2();

	this.getBox = function () {

		var box = new daign.Box2();
		box.expandByPoint( this.position );
		return box;

	};

};

daign.Point.prototype = {

	constructor: daign.Point,

	setUpControls: function ( controlLayer ) {}

};

