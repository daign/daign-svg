daign.PathSegmentMove = function ( points, parameters, app ) {

	this.type = 'Move';

	daign.PathSegment.call( this, points, parameters, app );

};

daign.PathSegmentMove.prototype = Object.create( daign.PathSegment.prototype );

daign.PathSegmentMove.prototype.constructor = daign.PathSegmentMove;

daign.PathSegmentMove.prototype.render = function () {

	return ' M ' + this.children[ 0 ].position.x + ',' + this.children[ 0 ].position.y;

};

