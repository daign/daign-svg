daign.DomPool = function ( app ) {

	this.app = app;
	this.pool = {};

};

daign.DomPool.prototype = {

	constructor: daign.DomPool,

	get: function ( nodeName ) {

		if ( this.pool[ nodeName ] !== undefined && this.pool[ nodeName ].length > 0 ) {
			return this.pool[ nodeName ].pop();
		} else {
			return document.createElementNS( daign.SVGNS, nodeName );
		}

	},

	giveBack: function ( node ) {

		nodeName = node.nodeName;
		if ( this.pool[ nodeName ] === undefined ) {
			this.pool[ nodeName ] = [];
		}
		this.pool[ nodeName ].push( node );

	}

};

