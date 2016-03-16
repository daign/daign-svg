daign.PathSegmentLine = function ( points, parameters, app ) {

	this.type = 'Line';

	daign.PathSegment.call( this, points, parameters, app );

};

daign.PathSegmentLine.prototype = Object.create( daign.PathSegment.prototype );

daign.PathSegmentLine.prototype.constructor = daign.PathSegmentLine;

daign.PathSegmentLine.prototype.render = function ( transformMatrix ) {

	var p1 = this.children[ 0 ].position.clone().transform( transformMatrix );
	return ' L ' + p1.x + ',' + p1.y;

};

