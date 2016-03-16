daign.PathSegmentQuadratic = function ( points, parameters, app ) {

	this.type = 'Quadratic';

	daign.PathSegment.call( this, points, parameters, app );

};

daign.PathSegmentQuadratic.prototype = Object.create( daign.PathSegment.prototype );

daign.PathSegmentQuadratic.prototype.constructor = daign.PathSegmentQuadratic;

daign.PathSegmentQuadratic.prototype.render = function ( transformMatrix ) {

	var p1 = this.children[ 0 ].position.clone().transform( transformMatrix );
	var p2 = this.children[ 1 ].position.clone().transform( transformMatrix );
	return ' Q ' + p1.x + ',' + p1.y + ',' + p2.x + ',' + p2.y;

};

