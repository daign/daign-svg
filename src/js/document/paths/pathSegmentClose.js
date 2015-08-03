daign.PathSegmentClose = function ( points, parameters, previous, document ) {

	daign.PathSegment.call( this, points, parameters, previous, document );

};

daign.PathSegmentClose.prototype = Object.create( daign.PathSegment.prototype );

daign.PathSegmentClose.prototype.constructor = daign.PathSegmentClose;

daign.PathSegmentClose.prototype.render = function () {

	return ' Z';

};

