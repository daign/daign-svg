daign.PathSegmentQuadratic = function ( points, parameters, app ) {

	this.type = 'Quadratic';

	daign.PathSegment.call( this, points, parameters, app );

};

daign.PathSegmentQuadratic.prototype = Object.create( daign.PathSegment.prototype );

daign.PathSegmentQuadratic.prototype.constructor = daign.PathSegmentQuadratic;

daign.PathSegmentQuadratic.prototype.render = function () {

	return ' Q ' + this.children[ 0 ].position.x + ',' + this.children[ 0 ].position.y + ',' + this.children[ 1 ].position.x + ',' + this.children[ 1 ].position.y;

};

