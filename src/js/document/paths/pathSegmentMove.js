daign.PathSegmentMove = function ( points, parameters, previous, app ) {

	daign.PathSegment.call( this, points, parameters, previous, app );

};

daign.PathSegmentMove.prototype = Object.create( daign.PathSegment.prototype );

daign.PathSegmentMove.prototype.constructor = daign.PathSegmentMove;

daign.PathSegmentMove.prototype.render = function () {

	return ' M ' + this.points[ 0 ].x + ',' + this.points[ 0 ].y;

};

