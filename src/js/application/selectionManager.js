daign.SelectionManager = function () {

	this.controlLayers = [];
	this.selected = undefined;

};

daign.SelectionManager.prototype = {

	constructor: daign.SelectionManager,

	addControlLayer: function ( controlLayer ) {

		this.controlLayers.push( controlLayer );

	},

	setPath: function ( path ) {

		this.deselect();
		this.selected = path;
		this.selected.select( true );
		this.controlLayers.forEach( function ( c ) {
			c.showPath( path );
		} );

	},

	setSegment: function ( segment ) {

		this.deselect();
		this.selected = segment;
		this.selected.select( true );
		this.controlLayers.forEach( function ( c ) {
			c.showPath( segment.parent );
			c.showSegment( segment );
		} );

	},

	deselect: function () {

		if ( this.selected !== undefined ) {
			this.selected.select( false );
			this.selected = undefined;
			this.controlLayers.forEach( function ( c ) {
				c.showPath( null );
			} );
		}

	}

};

