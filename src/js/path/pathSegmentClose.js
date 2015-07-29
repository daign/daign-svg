daign.PathSegmentClose = function ( points, parameters, previous ) {

	daign.PathSegment.call( this, points, parameters, previous );

};

daign.PathSegmentClose.prototype = Object.create( daign.PathSegment.prototype );

daign.PathSegmentClose.prototype.constructor = daign.PathSegmentClose;

daign.PathSegmentClose.prototype.render = function () {

	return ' Z';

};

