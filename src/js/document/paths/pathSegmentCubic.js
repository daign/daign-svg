daign.PathSegmentCubic = function ( points, parameters, app ) {

	this.type = 'Cubic';

	daign.PathSegment.call( this, points, parameters, app );

};

daign.PathSegmentCubic.prototype = Object.create( daign.PathSegment.prototype );

daign.PathSegmentCubic.prototype.constructor = daign.PathSegmentCubic;

daign.PathSegmentCubic.prototype.render = function () {

	return ' C ' + this.children[ 0 ].position.x + ',' + this.children[ 0 ].position.y + ',' + this.children[ 1 ].position.x + ',' + this.children[ 1 ].position.y + ',' + this.children[ 2 ].position.x + ',' + this.children[ 2 ].position.y;

};

