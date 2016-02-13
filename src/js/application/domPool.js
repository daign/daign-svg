daign.DomPool = function ( app ) {

	this.app = app;
	//this.pool = {};

};

daign.DomPool.prototype = {

	constructor: daign.DomPool,

	get: function ( nodeType ) {

		return document.createElementNS( daign.SVGNS, nodeType );

	}

};

