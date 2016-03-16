daign.PathSegmentCubic = function ( points, parameters, app ) {

	this.type = 'Cubic';

	daign.PathSegment.call( this, points, parameters, app );

};

daign.PathSegmentCubic.prototype = Object.create( daign.PathSegment.prototype );

daign.PathSegmentCubic.prototype.constructor = daign.PathSegmentCubic;

daign.PathSegmentCubic.prototype.render = function ( transformMatrix ) {

	var p1 = this.children[ 0 ].position.clone().transform( transformMatrix );
	var p2 = this.children[ 1 ].position.clone().transform( transformMatrix );
	var p3 = this.children[ 2 ].position.clone().transform( transformMatrix );
	return ' C ' + p1.x + ',' + p1.y + ',' + p2.x + ',' + p2.y + ',' + p3.x + ',' + p3.y;

};

