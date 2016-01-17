daign.SelectionManager = function () {

	this.controlLayers = [];

};

daign.SelectionManager.prototype = {

	constructor: daign.SelectionManager,

	addControlLayer: function ( controlLayer ) {

		this.controlLayers.push( controlLayer );

	},

	setPath: function ( path ) {

		this.controlLayers.forEach( function ( c ) {
			c.showPath( path );
		} );

	},

	setSegment: function ( segment ) {

		this.controlLayers.forEach( function ( c ) {
			c.showSegment( segment );
		} );

	}

};

