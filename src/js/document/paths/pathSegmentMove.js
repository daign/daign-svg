daign.PathSegmentMove = function ( points, parameters, app ) {

	this.type = 'Move';

	daign.PathSegment.call( this, points, parameters, app );

};

daign.PathSegmentMove.prototype = Object.create( daign.PathSegment.prototype );

daign.PathSegmentMove.prototype.constructor = daign.PathSegmentMove;

daign.PathSegmentMove.prototype.render = function ( transformMatrix ) {

	var p1 = this.children[ 0 ].position.clone().transform( transformMatrix );
	return ' M ' + p1.x + ',' + p1.y;

};

