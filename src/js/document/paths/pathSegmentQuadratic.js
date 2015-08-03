daign.PathSegmentQuadratic = function ( points, parameters, previous, document ) {

	daign.PathSegment.call( this, points, parameters, previous, document );

};

daign.PathSegmentQuadratic.prototype = Object.create( daign.PathSegment.prototype );

daign.PathSegmentQuadratic.prototype.constructor = daign.PathSegmentQuadratic;

daign.PathSegmentQuadratic.prototype.render = function () {

	return ' Q ' + this.points[ 0 ].x + ',' + this.points[ 0 ].y + ',' + this.points[ 1 ].x + ',' + this.points[ 1 ].y;

};

