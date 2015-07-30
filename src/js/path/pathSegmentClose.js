daign.PathSegmentClose = function ( points, parameters, previous, view ) {

	daign.PathSegment.call( this, points, parameters, previous, view );

};

daign.PathSegmentClose.prototype = Object.create( daign.PathSegment.prototype );

daign.PathSegmentClose.prototype.constructor = daign.PathSegmentClose;

daign.PathSegmentClose.prototype.render = function () {

	return ' Z';

};

