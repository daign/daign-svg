daign.PathSegmentLine = function ( points, parameters, previous ) {

	daign.PathSegment.call( this, points, parameters, previous );

};

daign.PathSegmentLine.prototype = Object.create( daign.PathSegment.prototype );

daign.PathSegmentLine.prototype.constructor = daign.PathSegmentLine;

daign.PathSegmentLine.prototype.render = function () {

	return ' L ' + this.points[ 0 ].x + ',' + this.points[ 0 ].y;

};

