daign.PathSegmentCubic = function ( points, parameters, previous, app ) {

	daign.PathSegment.call( this, points, parameters, previous, app );

};

daign.PathSegmentCubic.prototype = Object.create( daign.PathSegment.prototype );

daign.PathSegmentCubic.prototype.constructor = daign.PathSegmentCubic;

daign.PathSegmentCubic.prototype.render = function () {

	return ' C ' + this.points[ 0 ].x + ',' + this.points[ 0 ].y + ',' + this.points[ 1 ].x + ',' + this.points[ 1 ].y + ',' + this.points[ 2 ].x + ',' + this.points[ 2 ].y;

};

