daign.PathSegmentLine = function ( points, parameters, app ) {

	this.type = 'Line';

	daign.PathSegment.call( this, points, parameters, app );

};

daign.PathSegmentLine.prototype = Object.create( daign.PathSegment.prototype );

daign.PathSegmentLine.prototype.constructor = daign.PathSegmentLine;

daign.PathSegmentLine.prototype.render = function () {

	return ' L ' + this.children[ 0 ].position.x + ',' + this.children[ 0 ].position.y;

};

