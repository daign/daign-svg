daign.SelectionManager = function () {

	this.selected = null;
	this.last_selected = null;
	this.controlLayers = [];

};

daign.SelectionManager.prototype = {

	constructor: daign.SelectionManager,

	addControlLayer: function ( controlLayer ) {

		this.controlLayers.push( controlLayer );

	},

	select: function ( o ) {

		if ( this.selected !== null ) {
			if ( this.selected !== o ) {
				this.selected.select( false, this.controlLayers );
			}
			this.last_selected = this.selected;
		}

		this.selected = o;
		if ( this.selected !== null ) {
			this.selected.select( true, this.controlLayers );
		} else {
			this.controlLayers.forEach( function ( c ) {
				c.clear();
			} );
		}

	}

};

