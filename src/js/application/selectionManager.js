daign.SelectionManager = function () {

	this.selected = null;
	this.last_selected = undefined;
	this.controlLayers = [];

};

daign.SelectionManager.prototype = {

	constructor: daign.SelectionManager,

	addControlLayer: function ( controlLayer ) {

		this.controlLayers.push( controlLayer );

	},

	select: function ( o ) {

		if ( this.selected !== o ) {

			if ( this.selected !== null ) {
				this.selected.select( false, this.controlLayers );
				this.last_selected = this.selected;
			}

			this.selected = o;
			if ( this.selected !== null ) {
				this.selected.select( true, this.controlLayers );
			} else {
				this.controlLayers.forEach( function ( c ) {
					c.clear();
					c.setBox( null );
				} );
			}

		}

	},

	onKeyDown: function ( keyCode ) {

		if ( this.selected === null ) {
			this.select( this.last_selected );
		} else {
			if ( keyCode === 37 ) {
				this.selected.left();
			} else if ( keyCode === 38 ) {
				this.selected.up();
			} else if ( keyCode === 39 ) {
				this.selected.right();
			} else if ( keyCode === 40 ) {
				this.selected.down();
			} else if ( keyCode === 72 ) {
				this.selected.toggleHide();
			}
		}

	}

};

